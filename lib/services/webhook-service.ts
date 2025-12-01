import { createClient } from "@/lib/supabase/server";
import crypto from 'crypto';

export type WebhookEvent = 
  | 'planning.validated'
  | 'planning.published'
  | 'employee.created'
  | 'employee.updated'
  | 'shift.updated'
  | 'shift.completed'
  | 'timeoff.approved'
  | 'timeoff.rejected'
  | 'message.sent';

export class WebhookService {
  /**
   * Trigger webhook for an event
   */
  static async trigger(
    organizationId: string,
    event: WebhookEvent,
    payload: any
  ): Promise<void> {
    const supabase = await createClient();
    
    // Find all active webhooks for this organization that listen to this event
    const { data: webhooks } = await supabase
      .from('webhook_endpoints')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('is_active', true)
      .contains('events', [event]);

    if (!webhooks || webhooks.length === 0) {
      return; // No webhooks configured
    }

    // Send to each webhook
    for (const webhook of webhooks) {
      await this.sendWebhook(webhook, event, payload);
    }
  }

  /**
   * Send webhook to a specific endpoint
   */
  private static async sendWebhook(
    webhook: any,
    event: WebhookEvent,
    payload: any
  ): Promise<void> {
    const supabase = await createClient();
    
    const webhookPayload = {
      event,
      timestamp: new Date().toISOString(),
      data: payload
    };

    // Create HMAC signature
    const signature = crypto
      .createHmac('sha256', webhook.secret)
      .update(JSON.stringify(webhookPayload))
      .digest('hex');

    try {
      const response = await fetch(webhook.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Signature': signature,
          'X-Webhook-Event': event
        },
        body: JSON.stringify(webhookPayload)
      });

      // Log delivery
      await supabase
        .from('webhook_deliveries')
        .insert({
          webhook_endpoint_id: webhook.id,
          event_type: event,
          payload: webhookPayload,
          response_status: response.status,
          response_body: await response.text().catch(() => null),
          succeeded: response.ok,
          retry_count: 0
        });

      // Retry logic for failed webhooks (simplified)
      if (!response.ok && webhook.retry_count < 3) {
        // TODO: Implement retry queue
      }
    } catch (error) {
      // Log failed delivery
      await supabase
        .from('webhook_deliveries')
        .insert({
          webhook_endpoint_id: webhook.id,
          event_type: event,
          payload: webhookPayload,
          response_status: null,
          succeeded: false,
          retry_count: 0
        });
    }
  }

  /**
   * Create a webhook endpoint
   */
  static async createWebhook(
    organizationId: string,
    url: string,
    events: WebhookEvent[],
    secret: string
  ): Promise<{ success: boolean; webhookId?: string; error?: string }> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('webhook_endpoints')
      .insert({
        organization_id: organizationId,
        url,
        events,
        secret
      })
      .select('id')
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, webhookId: data.id };
  }

  /**
   * Get webhook delivery history
   */
  static async getDeliveryHistory(webhookId: string, limit: number = 50) {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('webhook_deliveries')
      .select('*')
      .eq('webhook_endpoint_id', webhookId)
      .order('attempted_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching delivery history:', error);
      return [];
    }

    return data || [];
  }
}

