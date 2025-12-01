import { createClient } from "@/lib/supabase/server";

export class FranchiseService {
  /**
   * Get brands for an organization
   */
  static async getBrands(organizationId: string) {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('brand_organizations')
      .select('brand:brands(*)')
      .eq('organization_id', organizationId);

    if (error) {
      console.error('Error fetching brands:', error);
      return [];
    }

    return (data || []).map((bo: any) => bo.brand).filter(Boolean);
  }

  /**
   * Get locations for a brand
   */
  static async getBrandLocations(brandId: string) {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('brand_locations')
      .select('*, establishment:establishments(*)')
      .eq('brand_id', brandId)
      .eq('is_active', true);

    if (error) {
      console.error('Error fetching brand locations:', error);
      return [];
    }

    return data || [];
  }

  /**
   * Get users for a brand
   */
  static async getBrandUsers(brandId: string) {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('brand_users')
      .select('*, profile:profiles(*)')
      .eq('brand_id', brandId);

    if (error) {
      console.error('Error fetching brand users:', error);
      return [];
    }

    return data || [];
  }

  /**
   * Create a brand
   */
  static async createBrand(
    name: string,
    organizationId: string,
    logoUrl?: string,
    description?: string
  ): Promise<{ success: boolean; brandId?: string; error?: string }> {
    const supabase = await createClient();
    
    // Create brand
    const { data: brand, error: brandError } = await supabase
      .from('brands')
      .insert({
        name,
        logo_url: logoUrl,
        description
      })
      .select('id')
      .single();

    if (brandError || !brand) {
      return { success: false, error: brandError?.message || 'Failed to create brand' };
    }

    // Link to organization
    const { error: linkError } = await supabase
      .from('brand_organizations')
      .insert({
        brand_id: brand.id,
        organization_id: organizationId,
        is_primary: true
      });

    if (linkError) {
      return { success: false, error: linkError.message };
    }

    return { success: true, brandId: brand.id };
  }

  /**
   * Add location to brand
   */
  static async addLocationToBrand(
    brandId: string,
    establishmentId: string,
    locationCode?: string
  ): Promise<{ success: boolean; error?: string }> {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from('brand_locations')
      .insert({
        brand_id: brandId,
        establishment_id: establishmentId,
        location_code: locationCode
      });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  }

  /**
   * Add user to brand
   */
  static async addUserToBrand(
    brandId: string,
    profileId: string,
    role?: string
  ): Promise<{ success: boolean; error?: string }> {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from('brand_users')
      .insert({
        brand_id: brandId,
        profile_id: profileId,
        role
      });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  }
}

