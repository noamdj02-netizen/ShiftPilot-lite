-- =============================================
-- 🗄️ SHIFTPILOT - SCHÉMA BASE DE DONNÉES SUPABASE
-- Version: 1.0 Production Ready (FINAL - Gestion d'erreurs)
-- Migration: 026
-- Date: 2024
-- =============================================
-- 
-- Ce schéma définit la structure complète de la base de données
-- pour ShiftPilot, optimisée pour la gestion de planning HCR.
--
-- Cette version utilise EXCEPTION handling pour gérer les erreurs
-- si les colonnes n'existent pas encore.
--
-- =============================================

-- =============================================
-- TABLE: restaurants
-- Le restaurant du propriétaire
-- =============================================
-- Supprimer la table si elle existe sans les bonnes colonnes
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'restaurants') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'restaurants' AND column_name = 'owner_id') THEN
      DROP TABLE IF EXISTS restaurants CASCADE;
    END IF;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Informations générales
  nom VARCHAR(255) NOT NULL,
  adresse TEXT,
  code_postal VARCHAR(10),
  ville VARCHAR(100),
  telephone VARCHAR(20),
  email VARCHAR(255),
  siret VARCHAR(14),
  
  -- Horaires d'ouverture (JSON)
  horaires_ouverture JSONB NOT NULL DEFAULT '{
    "lundi": {"ouvert": true, "debut": "11:00", "fin": "23:00", "coupure": false},
    "mardi": {"ouvert": true, "debut": "11:00", "fin": "23:00", "coupure": false},
    "mercredi": {"ouvert": true, "debut": "11:00", "fin": "23:00", "coupure": false},
    "jeudi": {"ouvert": true, "debut": "11:00", "fin": "23:00", "coupure": false},
    "vendredi": {"ouvert": true, "debut": "11:00", "fin": "00:00", "coupure": false},
    "samedi": {"ouvert": true, "debut": "11:00", "fin": "00:00", "coupure": false},
    "dimanche": {"ouvert": false, "debut": null, "fin": null, "coupure": false}
  }',
  
  -- Budget RH
  budget_rh_hebdo DECIMAL(10,2) DEFAULT 0,
  seuil_alerte_budget DECIMAL(5,2) DEFAULT 90,
  
  -- Paramètres planning
  duree_shift_min INTEGER DEFAULT 4,
  duree_shift_max INTEGER DEFAULT 10,
  pause_auto_6h INTEGER DEFAULT 20,
  pause_auto_9h INTEGER DEFAULT 30,
  
  -- Paramètres notifications
  rappel_publication_planning BOOLEAN DEFAULT true,
  notification_absence BOOLEAN DEFAULT true,
  
  -- Propriétaire
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Abonnement
  plan VARCHAR(20) DEFAULT 'trial' CHECK (plan IN ('trial', 'lite', 'pro', 'business')),
  plan_expire_le DATE
);

-- Index
CREATE INDEX IF NOT EXISTS idx_restaurants_owner ON restaurants(owner_id);

-- =============================================
-- TABLE: employes
-- Les membres de l'équipe
-- =============================================
-- Supprimer la table si elle existe sans restaurant_id
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'employes') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'employes' AND column_name = 'restaurant_id') THEN
      DROP TABLE IF EXISTS employes CASCADE;
    END IF;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS employes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  
  -- Informations personnelles
  prenom VARCHAR(100) NOT NULL,
  nom VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  telephone VARCHAR(20),
  photo_url TEXT,
  date_naissance DATE,
  
  -- Contrat
  type_contrat VARCHAR(20) NOT NULL DEFAULT 'CDI' 
    CHECK (type_contrat IN ('CDI', 'CDD', 'Extra', 'Apprenti', 'Stage', 'Interim')),
  date_debut DATE NOT NULL DEFAULT CURRENT_DATE,
  date_fin DATE,
  heures_contrat DECIMAL(4,1) NOT NULL DEFAULT 35,
  taux_horaire DECIMAL(6,2) NOT NULL DEFAULT 11.65,
  
  -- Rôle et compétences
  role VARCHAR(50) NOT NULL DEFAULT 'serveur'
    CHECK (role IN ('manager', 'chef', 'second', 'cuisinier', 'commis', 'patissier', 'serveur', 'chef_rang', 'runner', 'barman', 'sommelier', 'plongeur', 'hote', 'polyvalent')),
  competences TEXT[] DEFAULT '{}',
  niveau_experience INTEGER DEFAULT 1 CHECK (niveau_experience BETWEEN 1 AND 5),
  peut_ouvrir BOOLEAN DEFAULT false,
  peut_fermer BOOLEAN DEFAULT false,
  
  -- Préférences
  preferences JSONB DEFAULT '{
    "matin": true,
    "midi": true,
    "soir": true,
    "weekend": true,
    "jours_preferes": [],
    "jours_evites": [],
    "heures_max_jour": 10,
    "commentaire": ""
  }',
  
  -- Disponibilités récurrentes
  disponibilites JSONB DEFAULT '{
    "lundi": {"disponible": true, "debut": "08:00", "fin": "23:00"},
    "mardi": {"disponible": true, "debut": "08:00", "fin": "23:00"},
    "mercredi": {"disponible": true, "debut": "08:00", "fin": "23:00"},
    "jeudi": {"disponible": true, "debut": "08:00", "fin": "23:00"},
    "vendredi": {"disponible": true, "debut": "08:00", "fin": "00:00"},
    "samedi": {"disponible": true, "debut": "08:00", "fin": "00:00"},
    "dimanche": {"disponible": false, "debut": null, "fin": null}
  }',
  
  -- Couleur pour l'affichage planning
  couleur VARCHAR(7) DEFAULT '#8B5CF6',
  
  -- Statut
  actif BOOLEAN DEFAULT true,
  archive BOOLEAN DEFAULT false,
  
  CONSTRAINT employes_restaurant_email_unique UNIQUE (restaurant_id, email)
);

-- Index (avec gestion d'erreurs)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'employes' AND column_name = 'restaurant_id') THEN
    CREATE INDEX IF NOT EXISTS idx_employes_restaurant ON employes(restaurant_id);
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'employes' AND column_name = 'role') THEN
    CREATE INDEX IF NOT EXISTS idx_employes_role ON employes(role);
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'employes' AND column_name = 'actif') THEN
    CREATE INDEX IF NOT EXISTS idx_employes_actif ON employes(actif) WHERE actif = true;
  END IF;
END $$;

-- =============================================
-- TABLE: indisponibilites
-- Congés, absences ponctuelles
-- =============================================
CREATE TABLE IF NOT EXISTS indisponibilites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  employe_id UUID NOT NULL REFERENCES employes(id) ON DELETE CASCADE,
  
  date_debut DATE NOT NULL,
  date_fin DATE NOT NULL,
  
  type VARCHAR(30) NOT NULL DEFAULT 'conge_paye'
    CHECK (type IN ('conge_paye', 'conge_sans_solde', 'rtt', 'maladie', 'accident', 'maternite', 'paternite', 'formation', 'personnel', 'autre')),
  
  motif TEXT,
  justificatif_url TEXT,
  
  statut VARCHAR(20) DEFAULT 'en_attente' 
    CHECK (statut IN ('en_attente', 'approuve', 'refuse')),
  
  traite_par UUID REFERENCES auth.users(id),
  traite_le TIMESTAMPTZ,
  commentaire_refus TEXT,
  
  CONSTRAINT indisponibilites_dates_check CHECK (date_fin >= date_debut)
);

-- Index
CREATE INDEX IF NOT EXISTS idx_indisponibilites_employe ON indisponibilites(employe_id);
CREATE INDEX IF NOT EXISTS idx_indisponibilites_dates ON indisponibilites(date_debut, date_fin);
CREATE INDEX IF NOT EXISTS idx_indisponibilites_statut ON indisponibilites(statut);

-- =============================================
-- TABLE: plannings
-- Planning d'une semaine
-- =============================================
-- Supprimer la table si elle existe sans restaurant_id
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'plannings') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'plannings' AND column_name = 'restaurant_id') THEN
      DROP TABLE IF EXISTS plannings CASCADE;
    END IF;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS plannings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  
  -- Période (lundi à dimanche)
  semaine_debut DATE NOT NULL,
  semaine_fin DATE NOT NULL,
  
  -- Statut
  statut VARCHAR(20) DEFAULT 'brouillon' 
    CHECK (statut IN ('brouillon', 'publie', 'archive')),
  publie_le TIMESTAMPTZ,
  publie_par UUID REFERENCES auth.users(id),
  
  -- Scores IA (0-100)
  score_global INTEGER CHECK (score_global BETWEEN 0 AND 100),
  score_equite INTEGER CHECK (score_equite BETWEEN 0 AND 100),
  score_fatigue INTEGER CHECK (score_fatigue BETWEEN 0 AND 100),
  score_budget INTEGER CHECK (score_budget BETWEEN 0 AND 100),
  score_conformite INTEGER CHECK (score_conformite BETWEEN 0 AND 100),
  
  -- Totaux calculés
  cout_total DECIMAL(10,2) DEFAULT 0,
  heures_totales DECIMAL(6,1) DEFAULT 0,
  
  -- Métadonnées génération IA
  genere_par_ia BOOLEAN DEFAULT false,
  parametres_generation JSONB,
  
  -- Notes
  notes TEXT,
  
  CONSTRAINT plannings_semaine_unique UNIQUE (restaurant_id, semaine_debut)
);

-- Index (avec gestion d'erreurs)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'plannings' AND column_name = 'restaurant_id') THEN
    CREATE INDEX IF NOT EXISTS idx_plannings_restaurant ON plannings(restaurant_id);
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'plannings' AND column_name = 'semaine_debut') THEN
    CREATE INDEX IF NOT EXISTS idx_plannings_semaine ON plannings(semaine_debut);
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'plannings' AND column_name = 'statut') THEN
    CREATE INDEX IF NOT EXISTS idx_plannings_statut ON plannings(statut);
  END IF;
END $$;

-- =============================================
-- TABLE: shifts
-- Créneaux de travail individuels
-- =============================================
-- Supprimer la table si elle existe sans restaurant_id
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'shifts') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'shifts' AND column_name = 'restaurant_id') THEN
      DROP TABLE IF EXISTS shifts CASCADE;
    END IF;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS shifts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  planning_id UUID REFERENCES plannings(id) ON DELETE CASCADE,
  employe_id UUID NOT NULL REFERENCES employes(id) ON DELETE CASCADE,
  
  -- Horaires
  date DATE NOT NULL,
  heure_debut TIME NOT NULL,
  heure_fin TIME NOT NULL,
  pause_minutes INTEGER DEFAULT 0,
  
  -- Détails
  poste VARCHAR(50) NOT NULL,
  zone VARCHAR(50),
  
  -- Statut
  statut VARCHAR(20) DEFAULT 'planifie' 
    CHECK (statut IN ('planifie', 'confirme', 'en_cours', 'termine', 'annule', 'absence')),
  
  -- Confirmation employé
  confirme_par_employe BOOLEAN DEFAULT false,
  date_confirmation TIMESTAMPTZ,
  
  -- Heures calculées (colonne générée)
  heures_travaillees DECIMAL(4,2) GENERATED ALWAYS AS (
    EXTRACT(EPOCH FROM (heure_fin - heure_debut)) / 3600 - (pause_minutes::DECIMAL / 60)
  ) STORED,
  
  -- Métadonnées
  genere_par_ia BOOLEAN DEFAULT false,
  notes TEXT,
  
  -- Remplacement
  remplace_shift_id UUID REFERENCES shifts(id),
  motif_remplacement TEXT,
  
  CONSTRAINT shifts_heures_check CHECK (
    heure_fin > heure_debut OR 
    (heure_fin < heure_debut AND heure_fin < '06:00') -- Passage minuit
  )
);

-- Index (avec gestion d'erreurs)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'shifts' AND column_name = 'restaurant_id') THEN
    CREATE INDEX IF NOT EXISTS idx_shifts_restaurant_date ON shifts(restaurant_id, date);
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'shifts' AND column_name = 'employe_id') THEN
    CREATE INDEX IF NOT EXISTS idx_shifts_employe_date ON shifts(employe_id, date);
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'shifts' AND column_name = 'planning_id') THEN
    CREATE INDEX IF NOT EXISTS idx_shifts_planning ON shifts(planning_id);
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'shifts' AND column_name = 'statut') THEN
    CREATE INDEX IF NOT EXISTS idx_shifts_statut ON shifts(statut);
  END IF;
END $$;

-- =============================================
-- TABLE: alertes
-- Alertes et notifications système
-- =============================================
-- Supprimer la table si elle existe sans restaurant_id
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'alertes') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'alertes' AND column_name = 'restaurant_id') THEN
      DROP TABLE IF EXISTS alertes CASCADE;
    END IF;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS alertes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  planning_id UUID REFERENCES plannings(id) ON DELETE CASCADE,
  employe_id UUID REFERENCES employes(id) ON DELETE SET NULL,
  shift_id UUID REFERENCES shifts(id) ON DELETE SET NULL,
  
  -- Type et sévérité
  type VARCHAR(50) NOT NULL CHECK (type IN (
    'sous_effectif',
    'sur_effectif', 
    'depassement_heures_jour',
    'depassement_heures_semaine',
    'repos_insuffisant',
    'fatigue_elevee',
    'budget_depasse',
    'budget_proche_limite',
    'shift_non_confirme',
    'absence_imprevue',
    'conflit_planning',
    'jours_consecutifs',
    'soirees_consecutives',
    'conge_a_traiter',
    'planning_non_publie'
  )),
  
  severite VARCHAR(20) NOT NULL DEFAULT 'info'
    CHECK (severite IN ('info', 'attention', 'urgent', 'critique')),
  
  -- Contenu
  titre VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  date_concernee DATE,
  
  -- Actions
  action_suggeree TEXT,
  action_url TEXT,
  
  -- État
  lue BOOLEAN DEFAULT false,
  lue_le TIMESTAMPTZ,
  resolue BOOLEAN DEFAULT false,
  resolue_le TIMESTAMPTZ,
  resolue_par UUID REFERENCES auth.users(id),
  
  -- Métadonnées
  donnees JSONB DEFAULT '{}'
);

-- Index (avec gestion d'erreurs)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'alertes' AND column_name = 'restaurant_id') THEN
    CREATE INDEX IF NOT EXISTS idx_alertes_restaurant ON alertes(restaurant_id);
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'alertes' AND column_name = 'lue') THEN
      CREATE INDEX IF NOT EXISTS idx_alertes_non_lues ON alertes(restaurant_id, lue) WHERE lue = false;
    END IF;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'alertes' AND column_name = 'severite') THEN
    CREATE INDEX IF NOT EXISTS idx_alertes_severite ON alertes(severite);
  END IF;
END $$;

-- =============================================
-- TABLE: contraintes_legales
-- Paramètres légaux (par défaut ou personnalisés)
-- =============================================
-- Supprimer la table si elle existe sans restaurant_id
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'contraintes_legales') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'contraintes_legales' AND column_name = 'restaurant_id') THEN
      DROP TABLE IF EXISTS contraintes_legales CASCADE;
    END IF;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS contraintes_legales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Restaurant (NULL = contraintes par défaut)
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  
  -- Temps de travail
  heures_max_jour DECIMAL(4,1) DEFAULT 10,
  heures_max_semaine DECIMAL(4,1) DEFAULT 48,
  heures_max_moyenne_12_semaines DECIMAL(4,1) DEFAULT 44,
  
  -- Repos
  repos_min_entre_shifts INTEGER DEFAULT 11,
  repos_hebdo_min INTEGER DEFAULT 35,
  
  -- Pauses
  pause_min_6h INTEGER DEFAULT 20,
  pause_min_9h INTEGER DEFAULT 30,
  
  -- Heures supplémentaires
  seuil_heures_sup DECIMAL(4,1) DEFAULT 35,
  majoration_heures_sup_1 DECIMAL(3,2) DEFAULT 1.25,
  majoration_heures_sup_2 DECIMAL(3,2) DEFAULT 1.50,
  seuil_heures_sup_2 DECIMAL(4,1) DEFAULT 43,
  
  -- Heures de nuit
  heure_debut_nuit TIME DEFAULT '21:00',
  heure_fin_nuit TIME DEFAULT '06:00',
  majoration_nuit DECIMAL(3,2) DEFAULT 1.10,
  
  -- Dimanche et jours fériés
  majoration_dimanche DECIMAL(3,2) DEFAULT 1.00,
  majoration_ferie DECIMAL(3,2) DEFAULT 1.00,
  
  -- Limites consécutives
  max_jours_consecutifs INTEGER DEFAULT 6,
  max_soirees_consecutives INTEGER DEFAULT 5,
  
  -- Est défaut
  est_defaut BOOLEAN DEFAULT false,
  
  CONSTRAINT contraintes_restaurant_unique UNIQUE (restaurant_id),
  CONSTRAINT contraintes_une_seule_defaut CHECK (
    NOT est_defaut OR restaurant_id IS NULL
  )
);

-- Insérer les contraintes par défaut
INSERT INTO contraintes_legales (est_defaut) 
VALUES (true)
ON CONFLICT DO NOTHING;

-- =============================================
-- TABLE: previsions_activite
-- Prévisions de charge pour ajuster le staff
-- =============================================
-- Supprimer la table si elle existe sans restaurant_id
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'previsions_activite') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'previsions_activite' AND column_name = 'restaurant_id') THEN
      DROP TABLE IF EXISTS previsions_activite CASCADE;
    END IF;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS previsions_activite (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  
  date DATE NOT NULL,
  
  -- Prévisions
  niveau_global VARCHAR(20) DEFAULT 'normal'
    CHECK (niveau_global IN ('faible', 'normal', 'fort', 'tres_fort')),
  
  ca_prevu DECIMAL(10,2),
  couverts_prevus INTEGER,
  
  -- Détail par service
  service_midi JSONB DEFAULT '{
    "niveau": "normal",
    "couverts": null,
    "staff_cuisine": 2,
    "staff_salle": 2
  }',
  
  service_soir JSONB DEFAULT '{
    "niveau": "normal",
    "couverts": null,
    "staff_cuisine": 3,
    "staff_salle": 3
  }',
  
  -- Facteurs externes
  meteo VARCHAR(50),
  evenement TEXT,
  est_ferie BOOLEAN DEFAULT false,
  
  notes TEXT,
  
  CONSTRAINT previsions_unique UNIQUE (restaurant_id, date)
);

-- Index (avec gestion d'erreurs)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'previsions_activite' AND column_name = 'restaurant_id') THEN
    CREATE INDEX IF NOT EXISTS idx_previsions_restaurant_date ON previsions_activite(restaurant_id, date);
  END IF;
END $$;

-- =============================================
-- TABLE: historique_fatigue
-- Suivi de la fatigue des employés
-- =============================================
CREATE TABLE IF NOT EXISTS historique_fatigue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  employe_id UUID NOT NULL REFERENCES employes(id) ON DELETE CASCADE,
  semaine DATE NOT NULL,
  
  -- Métriques
  heures_travaillees DECIMAL(5,1) NOT NULL DEFAULT 0,
  nombre_shifts INTEGER NOT NULL DEFAULT 0,
  soirees_consecutives INTEGER DEFAULT 0,
  jours_consecutifs INTEGER DEFAULT 0,
  heures_nuit DECIMAL(4,1) DEFAULT 0,
  
  -- Score (0 = reposé, 100 = épuisé)
  score_fatigue INTEGER DEFAULT 0 CHECK (score_fatigue BETWEEN 0 AND 100),
  
  CONSTRAINT historique_fatigue_unique UNIQUE (employe_id, semaine)
);

-- Index
CREATE INDEX IF NOT EXISTS idx_fatigue_employe ON historique_fatigue(employe_id);
CREATE INDEX IF NOT EXISTS idx_fatigue_semaine ON historique_fatigue(semaine);

-- =============================================
-- TABLE: messages_planning
-- Messages envoyés aux employés
-- =============================================
-- Supprimer la table si elle existe sans restaurant_id
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'messages_planning') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'messages_planning' AND column_name = 'restaurant_id') THEN
      DROP TABLE IF EXISTS messages_planning CASCADE;
    END IF;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS messages_planning (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  shift_id UUID REFERENCES shifts(id) ON DELETE CASCADE,
  employe_id UUID NOT NULL REFERENCES employes(id) ON DELETE CASCADE,
  
  -- Type
  type VARCHAR(30) NOT NULL CHECK (type IN (
    'nouveau_shift',
    'modification_shift',
    'annulation_shift',
    'rappel_confirmation',
    'demande_remplacement',
    'planning_publie',
    'conge_approuve',
    'conge_refuse'
  )),
  
  -- Contenu
  sujet VARCHAR(255) NOT NULL,
  contenu TEXT NOT NULL,
  
  -- Envoi
  canal VARCHAR(20) DEFAULT 'app' CHECK (canal IN ('sms', 'email', 'push', 'app')),
  envoye BOOLEAN DEFAULT false,
  envoye_le TIMESTAMPTZ,
  erreur_envoi TEXT,
  
  -- Réponse
  necessite_reponse BOOLEAN DEFAULT false,
  reponse VARCHAR(20) CHECK (reponse IN ('accepte', 'refuse', 'sans_reponse')),
  repondu_le TIMESTAMPTZ,
  commentaire_reponse TEXT
);

-- Index (avec gestion d'erreurs)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'messages_planning' AND column_name = 'restaurant_id') THEN
    CREATE INDEX IF NOT EXISTS idx_messages_restaurant ON messages_planning(restaurant_id);
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'messages_planning' AND column_name = 'employe_id') THEN
    CREATE INDEX IF NOT EXISTS idx_messages_employe ON messages_planning(employe_id);
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'messages_planning' AND column_name = 'shift_id') THEN
    CREATE INDEX IF NOT EXISTS idx_messages_shift ON messages_planning(shift_id);
  END IF;
END $$;

-- =============================================
-- FONCTIONS UTILITAIRES
-- =============================================

-- Fonction: Calculer les heures d'un employé sur une semaine
CREATE OR REPLACE FUNCTION get_heures_semaine(
  p_employe_id UUID,
  p_date DATE
) RETURNS DECIMAL AS $$
DECLARE
  v_debut_semaine DATE;
  v_heures DECIMAL;
BEGIN
  v_debut_semaine := date_trunc('week', p_date)::DATE;
  
  SELECT COALESCE(SUM(heures_travaillees), 0)
  INTO v_heures
  FROM shifts
  WHERE employe_id = p_employe_id
    AND date >= v_debut_semaine
    AND date < v_debut_semaine + INTERVAL '7 days'
    AND statut NOT IN ('annule', 'absence');
  
  RETURN v_heures;
END;
$$ LANGUAGE plpgsql;

-- Fonction: Vérifier le repos minimum entre shifts
CREATE OR REPLACE FUNCTION check_repos_entre_shifts(
  p_employe_id UUID,
  p_date DATE,
  p_heure_debut TIME
) RETURNS BOOLEAN AS $$
DECLARE
  v_dernier_shift RECORD;
  v_heures_repos DECIMAL;
BEGIN
  SELECT date, heure_fin
  INTO v_dernier_shift
  FROM shifts
  WHERE employe_id = p_employe_id
    AND (date < p_date OR (date = p_date AND heure_fin <= p_heure_debut))
    AND statut NOT IN ('annule', 'absence')
  ORDER BY date DESC, heure_fin DESC
  LIMIT 1;
  
  IF v_dernier_shift IS NULL THEN
    RETURN true;
  END IF;
  
  v_heures_repos := EXTRACT(EPOCH FROM (
    (p_date + p_heure_debut) - (v_dernier_shift.date + v_dernier_shift.heure_fin)
  )) / 3600;
  
  RETURN v_heures_repos >= 11;
END;
$$ LANGUAGE plpgsql;

-- Fonction: Compter les jours consécutifs travaillés
CREATE OR REPLACE FUNCTION get_jours_consecutifs(
  p_employe_id UUID,
  p_date DATE
) RETURNS INTEGER AS $$
DECLARE
  v_count INTEGER := 0;
  v_current_date DATE := p_date;
BEGIN
  LOOP
    v_current_date := v_current_date - INTERVAL '1 day';
    
    IF NOT EXISTS (
      SELECT 1 FROM shifts 
      WHERE employe_id = p_employe_id 
        AND date = v_current_date
        AND statut NOT IN ('annule', 'absence')
    ) THEN
      EXIT;
    END IF;
    
    v_count := v_count + 1;
    
    IF v_count >= 7 THEN
      EXIT;
    END IF;
  END LOOP;
  
  RETURN v_count;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Mise à jour automatique de updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Appliquer les triggers
DROP TRIGGER IF EXISTS update_restaurants_updated_at ON restaurants;
CREATE TRIGGER update_restaurants_updated_at
  BEFORE UPDATE ON restaurants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_employes_updated_at ON employes;
CREATE TRIGGER update_employes_updated_at
  BEFORE UPDATE ON employes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_plannings_updated_at ON plannings;
CREATE TRIGGER update_plannings_updated_at
  BEFORE UPDATE ON plannings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_shifts_updated_at ON shifts;
CREATE TRIGGER update_shifts_updated_at
  BEFORE UPDATE ON shifts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Activer RLS
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE employes ENABLE ROW LEVEL SECURITY;
ALTER TABLE indisponibilites ENABLE ROW LEVEL SECURITY;
ALTER TABLE plannings ENABLE ROW LEVEL SECURITY;
ALTER TABLE shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE alertes ENABLE ROW LEVEL SECURITY;
ALTER TABLE previsions_activite ENABLE ROW LEVEL SECURITY;
ALTER TABLE historique_fatigue ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages_planning ENABLE ROW LEVEL SECURITY;
ALTER TABLE contraintes_legales ENABLE ROW LEVEL SECURITY;

-- Supprimer les politiques existantes
DROP POLICY IF EXISTS "Utilisateurs voient leurs restaurants" ON restaurants;
DROP POLICY IF EXISTS "Utilisateurs créent leurs restaurants" ON restaurants;
DROP POLICY IF EXISTS "Utilisateurs modifient leurs restaurants" ON restaurants;
DROP POLICY IF EXISTS "Utilisateurs suppriment leurs restaurants" ON restaurants;
DROP POLICY IF EXISTS "Accès employés via restaurant" ON employes;
DROP POLICY IF EXISTS "Accès indisponibilités via employé" ON indisponibilites;
DROP POLICY IF EXISTS "Accès plannings via restaurant" ON plannings;
DROP POLICY IF EXISTS "Accès shifts via restaurant" ON shifts;
DROP POLICY IF EXISTS "Accès alertes via restaurant" ON alertes;
DROP POLICY IF EXISTS "Accès prévisions via restaurant" ON previsions_activite;
DROP POLICY IF EXISTS "Accès fatigue via employé" ON historique_fatigue;
DROP POLICY IF EXISTS "Accès messages via restaurant" ON messages_planning;
DROP POLICY IF EXISTS "Accès contraintes via restaurant" ON contraintes_legales;

-- Créer les politiques RLS avec gestion d'erreurs
DO $$
BEGIN
  -- Policies pour restaurants
  BEGIN
    CREATE POLICY "Utilisateurs voient leurs restaurants"
      ON restaurants FOR SELECT
      USING (owner_id = auth.uid());
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  BEGIN
    CREATE POLICY "Utilisateurs créent leurs restaurants"
      ON restaurants FOR INSERT
      WITH CHECK (owner_id = auth.uid());
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  BEGIN
    CREATE POLICY "Utilisateurs modifient leurs restaurants"
      ON restaurants FOR UPDATE
      USING (owner_id = auth.uid());
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  BEGIN
    CREATE POLICY "Utilisateurs suppriment leurs restaurants"
      ON restaurants FOR DELETE
      USING (owner_id = auth.uid());
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  -- Policies pour employes
  BEGIN
    CREATE POLICY "Accès employés via restaurant"
      ON employes FOR ALL
      USING (
        restaurant_id IN (
          SELECT id FROM restaurants WHERE owner_id = auth.uid()
        )
      );
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  -- Policies pour indisponibilites
  BEGIN
    CREATE POLICY "Accès indisponibilités via employé"
      ON indisponibilites FOR ALL
      USING (
        employe_id IN (
          SELECT e.id FROM employes e
          JOIN restaurants r ON e.restaurant_id = r.id
          WHERE r.owner_id = auth.uid()
        )
      );
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  -- Policies pour plannings
  BEGIN
    CREATE POLICY "Accès plannings via restaurant"
      ON plannings FOR ALL
      USING (
        restaurant_id IN (
          SELECT id FROM restaurants WHERE owner_id = auth.uid()
        )
      );
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  -- Policies pour shifts
  BEGIN
    CREATE POLICY "Accès shifts via restaurant"
      ON shifts FOR ALL
      USING (
        restaurant_id IN (
          SELECT id FROM restaurants WHERE owner_id = auth.uid()
        )
      );
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  -- Policies pour alertes
  BEGIN
    CREATE POLICY "Accès alertes via restaurant"
      ON alertes FOR ALL
      USING (
        restaurant_id IN (
          SELECT id FROM restaurants WHERE owner_id = auth.uid()
        )
      );
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  -- Policies pour previsions_activite
  BEGIN
    CREATE POLICY "Accès prévisions via restaurant"
      ON previsions_activite FOR ALL
      USING (
        restaurant_id IN (
          SELECT id FROM restaurants WHERE owner_id = auth.uid()
        )
      );
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  -- Policies pour historique_fatigue
  BEGIN
    CREATE POLICY "Accès fatigue via employé"
      ON historique_fatigue FOR ALL
      USING (
        employe_id IN (
          SELECT e.id FROM employes e
          JOIN restaurants r ON e.restaurant_id = r.id
          WHERE r.owner_id = auth.uid()
        )
      );
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  -- Policies pour messages_planning
  BEGIN
    CREATE POLICY "Accès messages via restaurant"
      ON messages_planning FOR ALL
      USING (
        restaurant_id IN (
          SELECT id FROM restaurants WHERE owner_id = auth.uid()
        )
      );
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  -- Policies pour contraintes_legales
  BEGIN
    CREATE POLICY "Accès contraintes via restaurant"
      ON contraintes_legales FOR ALL
      USING (
        restaurant_id IS NULL OR restaurant_id IN (
          SELECT id FROM restaurants WHERE owner_id = auth.uid()
        )
      );
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
END $$;

