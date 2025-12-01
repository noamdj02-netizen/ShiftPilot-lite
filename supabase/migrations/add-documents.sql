-- Document Management System

-- 1. Create documents table
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE, -- Employee who owns the document
    type VARCHAR(50) NOT NULL, -- 'contract', 'cv', 'certificate', 'medical_leave', 'id_card', etc.
    name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL, -- Supabase Storage URL
    file_size INTEGER, -- in bytes
    mime_type VARCHAR(100),
    expiration_date DATE,
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'expired', 'archived'
    uploaded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'
);

-- 2. Create document_versions table (for versioning)
CREATE TABLE IF NOT EXISTS document_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
    file_url TEXT NOT NULL,
    version_number INTEGER NOT NULL,
    uploaded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(document_id, version_number)
);

-- 3. RLS Policies
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_versions ENABLE ROW LEVEL SECURITY;

-- Documents: View in your organization
CREATE POLICY "Users can view documents in their org" ON documents
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        ) OR profile_id = auth.uid()
    );

CREATE POLICY "RH can manage documents" ON documents
    FOR ALL USING (
        organization_id IN (
            SELECT organization_id FROM profiles 
            WHERE id = auth.uid() AND role IN ('owner', 'manager', 'rh')
        )
    );

CREATE POLICY "Users can upload own documents" ON documents
    FOR INSERT WITH CHECK (
        profile_id = auth.uid() OR
        organization_id IN (
            SELECT organization_id FROM profiles 
            WHERE id = auth.uid() AND role IN ('owner', 'manager', 'rh')
        )
    );

-- Document versions: Same rules as documents
CREATE POLICY "Users can view document versions" ON document_versions
    FOR SELECT USING (
        document_id IN (
            SELECT id FROM documents WHERE organization_id IN (
                SELECT organization_id FROM profiles WHERE id = auth.uid()
            )
        )
    );

CREATE POLICY "RH can manage document versions" ON document_versions
    FOR ALL USING (
        document_id IN (
            SELECT id FROM documents WHERE organization_id IN (
                SELECT organization_id FROM profiles 
                WHERE id = auth.uid() AND role IN ('owner', 'manager', 'rh')
            )
        )
    );

-- 4. Indexes
CREATE INDEX idx_documents_profile ON documents(profile_id);
CREATE INDEX idx_documents_type ON documents(type);
CREATE INDEX idx_documents_expiration ON documents(expiration_date) WHERE expiration_date IS NOT NULL;
CREATE INDEX idx_document_versions_document ON document_versions(document_id);

-- 5. Function to check for expiring documents
CREATE OR REPLACE FUNCTION get_expiring_documents(days_ahead INTEGER DEFAULT 30)
RETURNS TABLE (
    document_id UUID,
    profile_id UUID,
    name VARCHAR,
    expiration_date DATE,
    days_until_expiry INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        d.id,
        d.profile_id,
        d.name,
        d.expiration_date,
        (d.expiration_date - CURRENT_DATE)::INTEGER as days_until_expiry
    FROM documents d
    WHERE d.expiration_date IS NOT NULL
      AND d.expiration_date BETWEEN CURRENT_DATE AND CURRENT_DATE + (days_ahead || ' days')::INTERVAL
      AND d.status = 'active'
    ORDER BY d.expiration_date;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

