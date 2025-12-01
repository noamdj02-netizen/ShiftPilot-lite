-- Franchise / Multi-Brand System

-- 1. Create brands table
CREATE TABLE IF NOT EXISTS brands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    logo_url TEXT,
    description TEXT,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create brand_organizations table (many-to-many)
CREATE TABLE IF NOT EXISTS brand_organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT false,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(brand_id, organization_id)
);

-- 3. Create brand_locations table (establishments per brand)
CREATE TABLE IF NOT EXISTS brand_locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
    establishment_id UUID REFERENCES establishments(id) ON DELETE CASCADE,
    location_code VARCHAR(50), -- Internal code for the location
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(brand_id, establishment_id)
);

-- 4. Create brand_users table (users can belong to multiple brands)
CREATE TABLE IF NOT EXISTS brand_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    role VARCHAR(50), -- Brand-specific role
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(brand_id, profile_id)
);

-- 5. RLS Policies
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_users ENABLE ROW LEVEL SECURITY;

-- Brands: View if in your organization
CREATE POLICY "Users can view brands in their orgs" ON brands
    FOR SELECT USING (
        id IN (
            SELECT brand_id FROM brand_organizations WHERE organization_id IN (
                SELECT organization_id FROM profiles WHERE id = auth.uid()
            )
        )
    );

CREATE POLICY "Admins can manage brands" ON brands
    FOR ALL USING (
        id IN (
            SELECT brand_id FROM brand_organizations WHERE organization_id IN (
                SELECT organization_id FROM profiles 
                WHERE id = auth.uid() AND role = 'owner'
            )
        )
    );

-- Brand organizations: View if in your org
CREATE POLICY "Users can view brand_organizations" ON brand_organizations
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        )
    );

-- Brand locations: View if in your org
CREATE POLICY "Users can view brand_locations" ON brand_locations
    FOR SELECT USING (
        brand_id IN (
            SELECT brand_id FROM brand_organizations WHERE organization_id IN (
                SELECT organization_id FROM profiles WHERE id = auth.uid()
            )
        )
    );

-- Brand users: View if in your brand
CREATE POLICY "Users can view brand_users" ON brand_users
    FOR SELECT USING (
        brand_id IN (
            SELECT brand_id FROM brand_users WHERE profile_id = auth.uid()
        ) OR profile_id = auth.uid()
    );

-- 6. Indexes
CREATE INDEX idx_brand_organizations_brand ON brand_organizations(brand_id);
CREATE INDEX idx_brand_organizations_org ON brand_organizations(organization_id);
CREATE INDEX idx_brand_locations_brand ON brand_locations(brand_id);
CREATE INDEX idx_brand_locations_est ON brand_locations(establishment_id);
CREATE INDEX idx_brand_users_brand ON brand_users(brand_id);
CREATE INDEX idx_brand_users_profile ON brand_users(profile_id);

