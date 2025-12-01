import { createClient } from "@/lib/supabase/server";
import { WorkflowService } from "./workflow-service";
import { WebhookService } from "./webhook-service";
import { PDFExportService } from "./pdf-export-service";
import { ArchiveService } from "./archive-service";

export class AutoPublishService {
  /**
   * Auto-publish validated schedules
   * This would typically be called by a cron job
   */
  static async autoPublishSchedules(): Promise<void> {
    const supabase = await createClient();
    
    // Find all validated schedules that should be published
    const { data: schedules } = await supabase
      .from('schedule_weeks')
      .select('*')
      .eq('status', 'validated')
      .lte('week_start', new Date().toISOString().split('T')[0]); // Only publish if week has started or is starting soon

    if (!schedules || schedules.length === 0) {
      return;
    }

    for (const schedule of schedules) {
      await this.publishSchedule(schedule.id, schedule.organization_id);
    }
  }

  /**
   * Publish a single schedule
   */
  private static async publishSchedule(
    scheduleWeekId: string,
    organizationId: string
  ): Promise<void> {
    const supabase = await createClient();
    
    // 1. Publish the schedule
    const result = await WorkflowService.publishSchedule(scheduleWeekId);
    if (!result.success) {
      console.error(`Failed to publish schedule ${scheduleWeekId}:`, result.error);
      return;
    }

    // 2. Get schedule details
    const schedule = await WorkflowService.getScheduleWeek(scheduleWeekId);
    if (!schedule) return;

    // 3. Trigger webhook
    await WebhookService.trigger(organizationId, 'planning.published', {
      scheduleWeekId,
      weekStart: schedule.week_start,
      weekEnd: schedule.week_end
    });

    // 4. Generate and send PDF (would need email service)
    // const pdf = await PDFExportService.exportPlanning({...});
    // await EmailService.sendPlanningPDF(organizationId, pdf);

    // 5. Archive the schedule
    await ArchiveService.archiveScheduleWeek(
      organizationId,
      schedule.establishment_id,
      schedule.week_start,
      schedule.week_end
    );

    // 6. Send notifications to employees
    // This would be handled by the notification service
  }

  /**
   * Schedule auto-publish (to be called by cron)
   */
  static async scheduleAutoPublish(): Promise<void> {
    // This would be set up as a Vercel Cron job or Supabase Edge Function
    // Example Vercel cron: "0 8 * * *" (8 AM daily)
    // Or Supabase pg_cron: SELECT cron.schedule('auto-publish', '0 8 * * *', $$SELECT auto_publish_schedules()$$);
  }
}

