-- Enhance Time Off Requests System

-- 1. Enhance time_off_requests table (add fields if not exists)
ALTER TABLE time_off_requests
ADD COLUMN IF NOT EXISTS attachments JSONB DEFAULT '[]', -- Array of file URLs
ADD COLUMN IF NOT EXISTS approval_chain JSONB DEFAULT '[]', -- Array of {approver_id, status, comment, date}
ADD COLUMN IF NOT EXISTS requested_at TIMESTAMPTZ DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ;

-- 2. Create time_off_approvals table for detailed approval tracking
CREATE TABLE IF NOT EXISTS time_off_approvals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    time_off_request_id UUID REFERENCES time_off_requests(id) ON DELETE CASCADE,
    approver_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL, -- approved, rejected, pending
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(time_off_request_id, approver_id)
);

-- 3. RLS Policies
ALTER TABLE time_off_approvals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view approvals for their requests" ON time_off_approvals
    FOR SELECT USING (
        time_off_request_id IN (
            SELECT id FROM time_off_requests WHERE profile_id = auth.uid()
        ) OR approver_id = auth.uid()
    );

CREATE POLICY "Approvers can create approvals" ON time_off_approvals
    FOR INSERT WITH CHECK (
        approver_id = auth.uid() AND
        time_off_request_id IN (
            SELECT id FROM time_off_requests WHERE 
            profile_id IN (
                SELECT id FROM profiles WHERE organization_id IN (
                    SELECT organization_id FROM profiles WHERE id = auth.uid()
                )
            )
        )
    );

-- 4. Indexes
CREATE INDEX idx_time_off_approvals_request ON time_off_approvals(time_off_request_id);
CREATE INDEX idx_time_off_approvals_approver ON time_off_approvals(approver_id);

-- 5. Function to update request status based on approvals
CREATE OR REPLACE FUNCTION update_timeoff_status_from_approvals()
RETURNS TRIGGER AS $$
DECLARE
    v_request_id UUID;
    v_approval_count INTEGER;
    v_rejected_count INTEGER;
    v_approved_count INTEGER;
BEGIN
    v_request_id := NEW.time_off_request_id;
    
    -- Count approvals
    SELECT 
        COUNT(*),
        COUNT(*) FILTER (WHERE status = 'rejected'),
        COUNT(*) FILTER (WHERE status = 'approved')
    INTO v_approval_count, v_rejected_count, v_approved_count
    FROM time_off_approvals
    WHERE time_off_request_id = v_request_id;
    
    -- Update request status
    IF v_rejected_count > 0 THEN
        UPDATE time_off_requests 
        SET status = 'REJECTED', reviewed_at = NOW()
        WHERE id = v_request_id AND status = 'PENDING';
    ELSIF v_approved_count = v_approval_count AND v_approval_count > 0 THEN
        UPDATE time_off_requests 
        SET status = 'APPROVED', reviewed_at = NOW()
        WHERE id = v_request_id AND status = 'PENDING';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER timeoff_approval_status_update
    AFTER INSERT OR UPDATE ON time_off_approvals
    FOR EACH ROW EXECUTE FUNCTION update_timeoff_status_from_approvals();

