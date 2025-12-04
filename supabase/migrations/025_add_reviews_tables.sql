-- Table Demandes Avis
CREATE TABLE IF NOT EXISTS review_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    customer_email VARCHAR(255),
    customer_name VARCHAR(255),
    customer_phone VARCHAR(20),
    review_link TEXT,
    status VARCHAR(50) DEFAULT 'sent',
    sent_at TIMESTAMPTZ DEFAULT NOW(),
    responded_at TIMESTAMPTZ
);

-- Table Avis Google
CREATE TABLE IF NOT EXISTS google_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    reviewer_name VARCHAR(255),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    review_date TIMESTAMPTZ,
    google_review_id VARCHAR(255) UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ajouter colonne google_place_id à organizations si elle n'existe pas
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'organizations' AND column_name = 'google_place_id'
    ) THEN
        ALTER TABLE organizations ADD COLUMN google_place_id VARCHAR(255);
    END IF;
END $$;

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_review_requests_org ON review_requests(organization_id);
CREATE INDEX IF NOT EXISTS idx_review_requests_sent ON review_requests(sent_at);
CREATE INDEX IF NOT EXISTS idx_google_reviews_org ON google_reviews(organization_id);
CREATE INDEX IF NOT EXISTS idx_google_reviews_rating ON google_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_google_reviews_created ON google_reviews(created_at);

-- RLS Policies
ALTER TABLE review_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE google_reviews ENABLE ROW LEVEL SECURITY;

-- Policies pour review_requests
DROP POLICY IF EXISTS "Users can view their organization review requests" ON review_requests;
CREATE POLICY "Users can view their organization review requests"
    ON review_requests FOR SELECT
    USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Users can create review requests" ON review_requests;
CREATE POLICY "Users can create review requests"
    ON review_requests FOR INSERT
    WITH CHECK (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        )
    );

-- Policies pour google_reviews
DROP POLICY IF EXISTS "Users can view their organization reviews" ON google_reviews;
CREATE POLICY "Users can view their organization reviews"
    ON google_reviews FOR SELECT
    USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        )
    );

