// =============================================
// 📘 SHIFTPILOT - TYPES TYPESCRIPT
// Version: 1.0 Production Ready
// =============================================

// ============================================
// ENUMS & TYPES SIMPLES
// ============================================

export type TypeContrat = 
  | 'CDI' 
  | 'CDD' 
  | 'Extra' 
  | 'Apprenti' 
  | 'Stage' 
  | 'Interim';

export type RoleEmploye = 
  | 'manager' 
  | 'chef' 
  | 'second'
  | 'cuisinier' 
  | 'commis' 
  | 'patissier'
  | 'serveur' 
  | 'chef_rang'
  | 'runner' 
  | 'barman' 
  | 'sommelier'
  | 'plongeur' 
  | 'hote'
  | 'polyvalent';

export type StatutShift = 
  | 'planifie' 
  | 'confirme' 
  | 'en_cours' 
  | 'termine' 
  | 'annule' 
  | 'absence';

export type StatutPlanning = 
  | 'brouillon' 
  | 'publie' 
  | 'archive';

export type StatutIndisponibilite = 
  | 'en_attente' 
  | 'approuve' 
  | 'refuse';

export type TypeIndisponibilite = 
  | 'conge_paye'
  | 'conge_sans_solde'
  | 'rtt'
  | 'maladie'
  | 'accident'
  | 'maternite'
  | 'paternite'
  | 'formation'
  | 'personnel'
  | 'autre';

export type TypeAlerte = 
  | 'sous_effectif'
  | 'sur_effectif'
  | 'depassement_heures_jour'
  | 'depassement_heures_semaine'
  | 'repos_insuffisant'
  | 'fatigue_elevee'
  | 'budget_depasse'
  | 'budget_proche_limite'
  | 'shift_non_confirme'
  | 'absence_imprevue'
  | 'conflit_planning'
  | 'jours_consecutifs'
  | 'soirees_consecutives'
  | 'conge_a_traiter'
  | 'planning_non_publie';

export type SeveriteAlerte = 
  | 'info' 
  | 'attention' 
  | 'urgent' 
  | 'critique';

export type NiveauActivite = 
  | 'faible' 
  | 'normal' 
  | 'fort' 
  | 'tres_fort';

export type PlanAbonnement = 
  | 'trial' 
  | 'lite' 
  | 'pro' 
  | 'business';

export type CanalMessage = 
  | 'sms' 
  | 'email' 
  | 'push' 
  | 'app';

export type TypeMessage = 
  | 'nouveau_shift'
  | 'modification_shift'
  | 'annulation_shift'
  | 'rappel_confirmation'
  | 'demande_remplacement'
  | 'planning_publie'
  | 'conge_approuve'
  | 'conge_refuse';

export type ReponseMessage = 
  | 'accepte' 
  | 'refuse' 
  | 'sans_reponse';

// ============================================
// INTERFACES STRUCTURES
// ============================================

export interface HorairesJour {
  ouvert: boolean;
  debut: string | null; // Format "HH:mm"
  fin: string | null;
  coupure?: boolean;
}

export interface HorairesOuverture {
  lundi: HorairesJour;
  mardi: HorairesJour;
  mercredi: HorairesJour;
  jeudi: HorairesJour;
  vendredi: HorairesJour;
  samedi: HorairesJour;
  dimanche: HorairesJour;
}

export interface DisponibiliteJour {
  disponible: boolean;
  debut: string | null; // Format "HH:mm"
  fin: string | null;
}

export interface DisponibilitesEmploye {
  lundi: DisponibiliteJour;
  mardi: DisponibiliteJour;
  mercredi: DisponibiliteJour;
  jeudi: DisponibiliteJour;
  vendredi: DisponibiliteJour;
  samedi: DisponibiliteJour;
  dimanche: DisponibiliteJour;
}

export interface PreferencesEmploye {
  matin: boolean;
  midi: boolean;
  soir: boolean;
  weekend: boolean;
  jours_preferes: string[];
  jours_evites: string[];
  heures_max_jour?: number;
  commentaire?: string;
}

export interface ServicePrevision {
  niveau: NiveauActivite;
  couverts: number | null;
  staff_cuisine: number;
  staff_salle: number;
}

// ============================================
// INTERFACES ENTITÉS PRINCIPALES
// ============================================

export interface Restaurant {
  id: string;
  created_at: string;
  updated_at: string;
  
  // Informations
  nom: string;
  adresse?: string;
  code_postal?: string;
  ville?: string;
  telephone?: string;
  email?: string;
  siret?: string;
  
  // Horaires
  horaires_ouverture: HorairesOuverture;
  
  // Budget
  budget_rh_hebdo: number;
  seuil_alerte_budget: number;
  
  // Paramètres planning
  duree_shift_min: number;
  duree_shift_max: number;
  pause_auto_6h: number;
  pause_auto_9h: number;
  
  // Notifications
  rappel_publication_planning: boolean;
  notification_absence: boolean;
  
  // Propriétaire
  owner_id: string;
  
  // Abonnement
  plan: PlanAbonnement;
  plan_expire_le?: string;
}

export interface Employe {
  id: string;
  created_at: string;
  updated_at: string;
  
  restaurant_id: string;
  
  // Informations personnelles
  prenom: string;
  nom: string;
  email?: string;
  telephone?: string;
  photo_url?: string;
  date_naissance?: string;
  
  // Contrat
  type_contrat: TypeContrat;
  date_debut: string;
  date_fin?: string;
  heures_contrat: number;
  taux_horaire: number;
  
  // Rôle
  role: RoleEmploye;
  competences: string[];
  niveau_experience: number;
  peut_ouvrir: boolean;
  peut_fermer: boolean;
  
  // Préférences
  preferences: PreferencesEmploye;
  disponibilites: DisponibilitesEmploye;
  
  // Affichage
  couleur: string;
  
  // Statut
  actif: boolean;
  archive: boolean;
}

export interface Indisponibilite {
  id: string;
  created_at: string;
  
  employe_id: string;
  
  date_debut: string;
  date_fin: string;
  type: TypeIndisponibilite;
  motif?: string;
  justificatif_url?: string;
  
  statut: StatutIndisponibilite;
  traite_par?: string;
  traite_le?: string;
  commentaire_refus?: string;
  
  // Relations
  employe?: Employe;
}

export interface Planning {
  id: string;
  created_at: string;
  updated_at: string;
  
  restaurant_id: string;
  
  // Période
  semaine_debut: string;
  semaine_fin: string;
  
  // Statut
  statut: StatutPlanning;
  publie_le?: string;
  publie_par?: string;
  
  // Scores IA
  score_global?: number;
  score_equite?: number;
  score_fatigue?: number;
  score_budget?: number;
  score_conformite?: number;
  
  // Totaux
  cout_total: number;
  heures_totales: number;
  
  // Métadonnées
  genere_par_ia: boolean;
  parametres_generation?: ParametresGeneration;
  notes?: string;
  
  // Relations
  shifts?: Shift[];
  alertes?: Alerte[];
}

export interface Shift {
  id: string;
  created_at: string;
  updated_at: string;
  
  restaurant_id: string;
  planning_id?: string;
  employe_id: string;
  
  // Horaires
  date: string;
  heure_debut: string;
  heure_fin: string;
  pause_minutes: number;
  
  // Détails
  poste: string;
  zone?: string;
  
  // Statut
  statut: StatutShift;
  confirme_par_employe: boolean;
  date_confirmation?: string;
  
  // Calculé
  heures_travaillees: number;
  
  // Métadonnées
  genere_par_ia: boolean;
  notes?: string;
  
  // Remplacement
  remplace_shift_id?: string;
  motif_remplacement?: string;
  
  // Relations
  employe?: Employe;
}

export interface Alerte {
  id: string;
  created_at: string;
  
  restaurant_id: string;
  planning_id?: string;
  employe_id?: string;
  shift_id?: string;
  
  // Type et sévérité
  type: TypeAlerte;
  severite: SeveriteAlerte;
  
  // Contenu
  titre: string;
  message: string;
  date_concernee?: string;
  
  // Actions
  action_suggeree?: string;
  action_url?: string;
  
  // État
  lue: boolean;
  lue_le?: string;
  resolue: boolean;
  resolue_le?: string;
  resolue_par?: string;
  
  // Métadonnées
  donnees: Record<string, unknown>;
  
  // Relations
  employe?: Employe;
}

export interface ContraintesLegales {
  id: string;
  restaurant_id?: string;
  
  // Temps de travail
  heures_max_jour: number;
  heures_max_semaine: number;
  heures_max_moyenne_12_semaines: number;
  
  // Repos
  repos_min_entre_shifts: number;
  repos_hebdo_min: number;
  
  // Pauses
  pause_min_6h: number;
  pause_min_9h: number;
  
  // Heures supplémentaires
  seuil_heures_sup: number;
  majoration_heures_sup_1: number;
  majoration_heures_sup_2: number;
  seuil_heures_sup_2: number;
  
  // Nuit
  heure_debut_nuit: string;
  heure_fin_nuit: string;
  majoration_nuit: number;
  
  // Majorations
  majoration_dimanche: number;
  majoration_ferie: number;
  
  // Limites
  max_jours_consecutifs: number;
  max_soirees_consecutives: number;
  
  est_defaut: boolean;
}

export interface PrevisionActivite {
  id: string;
  created_at: string;
  
  restaurant_id: string;
  date: string;
  
  niveau_global: NiveauActivite;
  ca_prevu?: number;
  couverts_prevus?: number;
  
  service_midi: ServicePrevision;
  service_soir: ServicePrevision;
  
  meteo?: string;
  evenement?: string;
  est_ferie: boolean;
  
  notes?: string;
}

export interface HistoriqueFatigue {
  id: string;
  created_at: string;
  
  employe_id: string;
  semaine: string;
  
  heures_travaillees: number;
  nombre_shifts: number;
  soirees_consecutives: number;
  jours_consecutifs: number;
  heures_nuit: number;
  
  score_fatigue: number;
}

export interface MessagePlanning {
  id: string;
  created_at: string;
  
  restaurant_id: string;
  shift_id?: string;
  employe_id: string;
  
  type: TypeMessage;
  sujet: string;
  contenu: string;
  
  canal: CanalMessage;
  envoye: boolean;
  envoye_le?: string;
  erreur_envoi?: string;
  
  necessite_reponse: boolean;
  reponse?: ReponseMessage;
  repondu_le?: string;
  commentaire_reponse?: string;
}

// ============================================
// TYPES POUR L'ALGORITHME IA
// ============================================

export interface ParametresGeneration {
  // Priorités (1-10)
  priorite_budget: number;
  priorite_equite: number;
  priorite_preferences: number;
  priorite_experience: number;
  
  // Options
  autoriser_heures_sup: boolean;
  max_heures_sup_semaine: number;
  respecter_preferences_strictement: boolean;
  
  // Filtres
  inclure_extras: boolean;
  exclure_employes?: string[];
}

export interface BesoinsJournaliers {
  date: string;
  creneaux: CreneauBesoin[];
}

export interface CreneauBesoin {
  debut: string;
  fin: string;
  postes_requis: Record<string, number>;
  niveau_activite: NiveauActivite;
  priorite_competences?: string[];
}

export interface ResultatGeneration {
  succes: boolean;
  planning_id: string;
  shifts_generes: Shift[];
  alertes: Alerte[];
  
  scores: {
    global: number;
    equite: number;
    fatigue: number;
    budget: number;
    conformite: number;
  };
  
  resume: {
    total_heures: number;
    cout_total: number;
    employes_assignes: number;
    shifts_total: number;
    creneaux_couverts: number;
    creneaux_manquants: number;
    contraintes_violees: ContrainteViolee[];
  };
  
  suggestions: string[];
  temps_generation_ms: number;
}

export interface ContrainteViolee {
  type: string;
  employe_id?: string;
  date?: string;
  description: string;
  severite: SeveriteAlerte;
}

// ============================================
// TYPES POUR LE REMPLACEMENT
// ============================================

export interface CandidatRemplacement {
  employe: Employe;
  score_compatibilite: number;
  disponible: boolean;
  raisons: string[];
  blocages: string[];
  
  impact_budget: number;
  impact_fatigue: number;
  heures_semaine_actuelles: number;
  heures_semaine_apres: number;
}

export interface ResultatRemplacement {
  shift_original: Shift;
  candidats: CandidatRemplacement[];
  meilleur_candidat?: CandidatRemplacement;
  
  alternatives: {
    reorganisation_possible: boolean;
    description?: string;
    shifts_a_modifier?: Shift[];
  };
}

// ============================================
// TYPES POUR LA SIMULATION
// ============================================

export type TypeSimulation = 
  | 'ajout_employe' 
  | 'retrait_employe' 
  | 'modification_budget' 
  | 'ajout_shift' 
  | 'modification_horaires'
  | 'ajout_creneau'
  | 'suppression_creneau';

export interface SimulationModification {
  type: TypeSimulation;
  donnees: Record<string, unknown>;
}

export interface ResultatSimulation {
  modification: SimulationModification;
  
  impact: {
    budget: {
      avant: number;
      apres: number;
      difference: number;
      pourcentage: number;
    };
    couverture: {
      avant: number;
      apres: number;
      creneaux_affectes: number;
    };
    scores: {
      avant: ResultatGeneration['scores'];
      apres: ResultatGeneration['scores'];
    };
  };
  
  alertes_nouvelles: Alerte[];
  alertes_resolues: Alerte[];
  
  faisable: boolean;
  recommandation: string;
}

// ============================================
// TYPES POUR L'EXPORT PAIE
// ============================================

export interface LigneExportPaie {
  employe_id: string;
  employe_nom: string;
  matricule?: string;
  
  periode_debut: string;
  periode_fin: string;
  
  // Heures
  heures_normales: number;
  heures_supplementaires_25: number;
  heures_supplementaires_50: number;
  heures_nuit: number;
  heures_dimanche: number;
  heures_feries: number;
  total_heures: number;
  
  // Coûts
  taux_horaire: number;
  cout_heures_normales: number;
  cout_heures_sup: number;
  cout_majorations: number;
  cout_total_brut: number;
  
  // Détail par semaine
  detail_semaines: {
    semaine: string;
    heures: number;
    heures_sup: number;
  }[];
}

export interface ExportPaie {
  restaurant_id: string;
  restaurant_nom: string;
  
  periode_debut: string;
  periode_fin: string;
  genere_le: string;
  
  lignes: LigneExportPaie[];
  
  totaux: {
    heures_totales: number;
    heures_sup_totales: number;
    cout_total: number;
    nombre_employes: number;
  };
}

// ============================================
// TYPES POUR L'API
// ============================================

export interface ApiResponse<T> {
  succes: boolean;
  data?: T;
  erreur?: string;
  code?: string;
}

export interface ApiPagination {
  page: number;
  par_page: number;
  total: number;
  total_pages: number;
}

export interface ApiListResponse<T> extends ApiResponse<T[]> {
  pagination?: ApiPagination;
}

// ============================================
// TYPES POUR LES FORMULAIRES
// ============================================

export interface EmployeFormData {
  prenom: string;
  nom: string;
  email?: string;
  telephone?: string;
  type_contrat: TypeContrat;
  date_debut: string;
  date_fin?: string;
  heures_contrat: number;
  taux_horaire: number;
  role: RoleEmploye;
  competences: string[];
  niveau_experience: number;
  peut_ouvrir: boolean;
  peut_fermer: boolean;
  preferences: PreferencesEmploye;
  disponibilites: DisponibilitesEmploye;
  couleur: string;
}

export interface ShiftFormData {
  employe_id: string;
  date: string;
  heure_debut: string;
  heure_fin: string;
  pause_minutes: number;
  poste: string;
  zone?: string;
  notes?: string;
}

export interface IndisponibiliteFormData {
  employe_id: string;
  date_debut: string;
  date_fin: string;
  type: TypeIndisponibilite;
  motif?: string;
}

// ============================================
// TYPES UTILITAIRES
// ============================================

export type JourSemaine = 
  | 'lundi' 
  | 'mardi' 
  | 'mercredi' 
  | 'jeudi' 
  | 'vendredi' 
  | 'samedi' 
  | 'dimanche';

export const JOURS_SEMAINE: JourSemaine[] = [
  'lundi',
  'mardi',
  'mercredi',
  'jeudi',
  'vendredi',
  'samedi',
  'dimanche',
];

export const ROLES_LABELS: Record<RoleEmploye, string> = {
  manager: 'Manager',
  chef: 'Chef de cuisine',
  second: 'Second de cuisine',
  cuisinier: 'Cuisinier',
  commis: 'Commis',
  patissier: 'Pâtissier',
  serveur: 'Serveur',
  chef_rang: 'Chef de rang',
  runner: 'Runner',
  barman: 'Barman',
  sommelier: 'Sommelier',
  plongeur: 'Plongeur',
  hote: 'Hôte/Hôtesse',
  polyvalent: 'Polyvalent',
};

export const CONTRATS_LABELS: Record<TypeContrat, string> = {
  CDI: 'CDI',
  CDD: 'CDD',
  Extra: 'Extra',
  Apprenti: 'Apprenti',
  Stage: 'Stagiaire',
  Interim: 'Intérim',
};

export const SEVERITE_CONFIG: Record<SeveriteAlerte, {
  couleur: string;
  icone: string;
  label: string;
}> = {
  info: {
    couleur: 'blue',
    icone: 'ℹ️',
    label: 'Information',
  },
  attention: {
    couleur: 'yellow',
    icone: '💡',
    label: 'Attention',
  },
  urgent: {
    couleur: 'orange',
    icone: '⚠️',
    label: 'Urgent',
  },
  critique: {
    couleur: 'red',
    icone: '🚨',
    label: 'Critique',
  },
};

