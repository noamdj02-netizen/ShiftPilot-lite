import { createClient } from "@/lib/supabase/server";

export type AssistantQuery = 
  | 'hcr_compliance'
  | 'optimize_schedule'
  | 'explain_conflict'
  | 'generate_cv'
  | 'generate_job_description'
  | 'general';

export interface AssistantResponse {
  answer: string;
  sources?: string[];
  suggestions?: string[];
}

export class AIAssistantService {
  /**
   * Chat with AI assistant
   */
  static async chat(
    query: string,
    context?: {
      organizationId?: string;
      scheduleId?: string;
      employeeId?: string;
    }
  ): Promise<AssistantResponse> {
    // This is a placeholder - in production, you'd integrate with OpenAI, Anthropic, etc.
    // For now, we'll provide rule-based responses

    const lowerQuery = query.toLowerCase();

    // HCR Compliance questions
    if (lowerQuery.includes('repos') || lowerQuery.includes('11h')) {
      return {
        answer: "Le Code du Travail impose un repos minimum de 11 heures consécutives entre deux journées de travail. ShiftPilot vérifie automatiquement cette règle lors de la génération des plannings.",
        sources: ['Code du Travail - Article L3131-1']
      };
    }

    if (lowerQuery.includes('heures') && (lowerQuery.includes('max') || lowerQuery.includes('maximum'))) {
      return {
        answer: "Les limites légales sont :\n- Maximum 10 heures par jour\n- Maximum 48 heures par semaine (moyenne sur 12 semaines)\n- Maximum 6 jours consécutifs de travail",
        sources: ['Code du Travail - Articles L3121-18, L3121-20']
      };
    }

    // Schedule optimization
    if (lowerQuery.includes('optimiser') || lowerQuery.includes('optimisation')) {
      return {
        answer: "Pour optimiser votre planning :\n1. Utilisez l'IA de génération automatique\n2. Vérifiez les disponibilités des employés\n3. Respectez les contraintes HCR\n4. Ajustez selon la météo et le trafic prévu\n5. Répartissez équitablement les heures",
        suggestions: [
          'Générer un nouveau planning',
          'Voir les disponibilités',
          'Vérifier la conformité'
        ]
      };
    }

    // Conflict explanation
    if (lowerQuery.includes('conflit') || lowerQuery.includes('problème')) {
      if (context?.scheduleId) {
        // Would fetch actual conflicts from compliance service
        return {
          answer: "Votre planning présente des non-conformités. Utilisez l'outil de vérification de conformité pour voir les détails.",
          suggestions: [
            'Vérifier la conformité du planning',
            'Ajuster les shifts problématiques'
          ]
        };
      }
    }

    // General fallback
    return {
      answer: "Je peux vous aider avec :\n- Questions sur la conformité HCR\n- Optimisation des plannings\n- Explication des conflits\n- Génération de documents RH\n\nPosez-moi une question plus spécifique !",
      suggestions: [
        'Quelles sont les règles de repos ?',
        'Comment optimiser mon planning ?',
        'Générer une fiche de poste'
      ]
    };
  }

  /**
   * Generate employee CV/resume
   */
  static async generateCV(employeeId: string): Promise<string> {
    const supabase = await createClient();
    
    const { data: employee } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', employeeId)
      .single();

    if (!employee) {
      return '';
    }

    // Generate CV template
    const cv = `
CV - ${employee.first_name} ${employee.last_name}

Informations personnelles:
- Email: ${employee.email}
- Téléphone: ${employee.phone || 'N/A'}
- Contrat: ${employee.contract_type || 'N/A'}
- Heures/semaine: ${employee.contract_hours_per_week || 'N/A'}

Compétences:
${(employee.skills as string[] || []).map(s => `- ${s}`).join('\n')}

Expérience:
[À compléter]
    `.trim();

    return cv;
  }

  /**
   * Generate job description
   */
  static async generateJobDescription(position: string): Promise<string> {
    const descriptions: Record<string, string> = {
      'serveur': `
Poste: Serveur/Serveuse

Missions:
- Accueillir et servir les clients
- Prendre les commandes
- Assurer le service en salle
- Gérer la caisse

Compétences requises:
- Sens du service client
- Résistance au stress
- Disponibilité soirées et weekends
      `,
      'cuisinier': `
Poste: Cuisinier/Cuisinière

Missions:
- Préparation des plats
- Respect des recettes
- Gestion des stocks
- Nettoyage de la cuisine

Compétences requises:
- Expérience en restauration
- Rapidité et organisation
- Respect des normes d'hygiène
      `
    };

    return descriptions[position.toLowerCase()] || 'Description à compléter';
  }
}

