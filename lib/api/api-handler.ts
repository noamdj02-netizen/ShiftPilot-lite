import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { RBACService } from "@/lib/services/rbac-service";

/**
 * API Route Handler Base Class
 * Provides common functionality for all API routes
 */
export class ApiHandler {
  protected supabase: any;
  protected user: any;
  protected profile: any;

  async initialize() {
    this.supabase = await createClient();
    const { data: { user } } = await this.supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    this.user = user;

    const { data: profile } = await this.supabase
      .from('profiles')
      .select('*, organization_id')
      .eq('id', user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    this.profile = profile;
    return null;
  }

  async checkPermission(permission: string, establishmentId?: string): Promise<boolean> {
    if (!this.profile) return false;
    return await RBACService.hasPermission(this.profile.id, permission as any, establishmentId);
  }
}

