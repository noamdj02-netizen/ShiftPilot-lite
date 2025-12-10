# 🗄️ SHIFTPILOT - SCHÉMA BASE DE DONNÉES

## Vue d'ensemble

Ce document décrit le schéma complet de la base de données Supabase pour ShiftPilot, optimisé pour la gestion de planning HCR (Hôtellerie-Restauration).

## 📋 Tables principales

### 1. `restaurants`
Le restaurant du propriétaire.

**Colonnes clés :**
- `nom`, `adresse`, `code_postal`, `ville`, `telephone`, `email`, `siret`
- `horaires_ouverture` (JSONB) : Horaires par jour de la semaine
- `budget_rh_hebdo` : Budget RH hebdomadaire
- `owner_id` : Référence vers `auth.users(id)`
- `plan` : Abonnement ('trial', 'lite', 'pro', 'business')

### 2. `employes`
Les membres de l'équipe.

**Colonnes clés :**
- `prenom`, `nom`, `email`, `telephone`, `photo_url`
- `type_contrat` : CDI, CDD, Extra, Apprenti, Stage, Interim
- `heures_contrat`, `taux_horaire`
- `role` : manager, chef, cuisinier, serveur, barman, etc.
- `competences` : Tableau de compétences
- `preferences` (JSONB) : Préférences de planning
- `disponibilites` (JSONB) : Disponibilités récurrentes par jour
- `couleur` : Couleur pour l'affichage planning (hex)
- `actif`, `archive` : Statut

### 3. `plannings`
Planning d'une semaine.

**Colonnes clés :**
- `semaine_debut`, `semaine_fin` : Période (lundi à dimanche)
- `statut` : 'brouillon', 'publie', 'archive'
- `score_global`, `score_equite`, `score_fatigue`, `score_budget`, `score_conformite` : Scores IA (0-100)
- `cout_total`, `heures_totales` : Totaux calculés
- `genere_par_ia` : Indique si généré par IA
- `parametres_generation` (JSONB) : Paramètres utilisés pour la génération

### 4. `shifts`
Créneaux de travail individuels.

**Colonnes clés :**
- `date`, `heure_debut`, `heure_fin`, `pause_minutes`
- `poste`, `zone`
- `statut` : 'planifie', 'confirme', 'en_cours', 'termine', 'annule', 'absence'
- `confirme_par_employe` : Confirmation de l'employé
- `heures_travaillees` : Colonne générée automatiquement
- `genere_par_ia` : Indique si généré par IA
- `remplace_shift_id` : Pour les remplacements

### 5. `indisponibilites`
Congés et absences ponctuelles.

**Colonnes clés :**
- `date_debut`, `date_fin`
- `type` : conge_paye, conge_sans_solde, rtt, maladie, accident, maternite, paternite, formation, personnel, autre
- `statut` : 'en_attente', 'approuve', 'refuse'
- `traite_par`, `traite_le` : Qui et quand traité
- `commentaire_refus` : Raison du refus si applicable

### 6. `alertes`
Alertes et notifications système.

**Colonnes clés :**
- `type` : sous_effectif, sur_effectif, depassement_heures_jour, depassement_heures_semaine, repos_insuffisant, fatigue_elevee, budget_depasse, budget_proche_limite, shift_non_confirme, absence_imprevue, conflit_planning, jours_consecutifs, soirees_consecutives, conge_a_traiter, planning_non_publie
- `severite` : 'info', 'attention', 'urgent', 'critique'
- `titre`, `message`, `date_concernee`
- `action_suggeree`, `action_url`
- `lue`, `resolue` : État de l'alerte

### 7. `contraintes_legales`
Paramètres légaux HCR (par défaut ou personnalisés).

**Colonnes clés :**
- `heures_max_jour`, `heures_max_semaine`, `heures_max_moyenne_12_semaines`
- `repos_min_entre_shifts` : 11h minimum
- `repos_hebdo_min` : 35h minimum
- `pause_min_6h`, `pause_min_9h` : Pauses obligatoires
- `seuil_heures_sup`, `majoration_heures_sup_1`, `majoration_heures_sup_2`
- `heure_debut_nuit`, `heure_fin_nuit`, `majoration_nuit`
- `majoration_dimanche`, `majoration_ferie`
- `max_jours_consecutifs`, `max_soirees_consecutives`
- `est_defaut` : Contraintes par défaut si true

### 8. `previsions_activite`
Prévisions de charge pour ajuster le staff.

**Colonnes clés :**
- `date`
- `niveau_global` : 'faible', 'normal', 'fort', 'tres_fort'
- `ca_prevu`, `couverts_prevus`
- `service_midi` (JSONB), `service_soir` (JSONB) : Détail par service
- `meteo`, `evenement`, `est_ferie`

### 9. `historique_fatigue`
Suivi de la fatigue des employés.

**Colonnes clés :**
- `semaine`
- `heures_travaillees`, `nombre_shifts`
- `soirees_consecutives`, `jours_consecutifs`, `heures_nuit`
- `score_fatigue` : 0 (reposé) à 100 (épuisé)

### 10. `messages_planning`
Messages envoyés aux employés.

**Colonnes clés :**
- `type` : nouveau_shift, modification_shift, annulation_shift, rappel_confirmation, demande_remplacement, planning_publie, conge_approuve, conge_refuse
- `sujet`, `contenu`
- `canal` : 'sms', 'email', 'push', 'app'
- `envoye`, `envoye_le`, `erreur_envoi`
- `necessite_reponse`, `reponse` : 'accepte', 'refuse', 'sans_reponse'

## 🔧 Fonctions utilitaires

### `get_heures_semaine(p_employe_id UUID, p_date DATE)`
Calcule les heures travaillées d'un employé sur une semaine.

### `check_repos_entre_shifts(p_employe_id UUID, p_date DATE, p_heure_debut TIME)`
Vérifie que le repos minimum (11h) est respecté entre deux shifts.

### `get_jours_consecutifs(p_employe_id UUID, p_date DATE)`
Compte le nombre de jours consécutifs travaillés.

## 🔒 Row Level Security (RLS)

Toutes les tables ont RLS activé. Les politiques garantissent que :
- Les utilisateurs ne voient que leurs propres restaurants
- L'accès aux employés, plannings, shifts se fait via le restaurant
- Les contraintes légales par défaut sont accessibles à tous

## 📊 Index

Index créés pour optimiser les requêtes :
- Par `restaurant_id` sur toutes les tables liées
- Par `date` sur `shifts` et `previsions_activite`
- Par `statut` sur `plannings`, `shifts`, `indisponibilites`
- Par `lue` sur `alertes` (pour les alertes non lues)
- Par `employe_id` sur `shifts`, `indisponibilites`, `historique_fatigue`

## 🚀 Migration

Le schéma est disponible dans :
```
supabase/migrations/026_shiftpilot_production_schema.sql
```

Pour appliquer la migration :
```bash
# Via Supabase CLI
supabase db push

# Ou directement dans Supabase Dashboard → SQL Editor
```

## 📝 Notes importantes

1. **JSONB** : Les colonnes JSONB (`horaires_ouverture`, `preferences`, `disponibilites`, etc.) permettent des requêtes flexibles et des mises à jour partielles.

2. **Colonnes générées** : `heures_travaillees` dans `shifts` est calculée automatiquement.

3. **Contraintes** : Les CHECK constraints garantissent la cohérence des données (dates, heures, statuts).

4. **Triggers** : `updated_at` est mis à jour automatiquement sur toutes les tables concernées.

5. **Cascade** : Les suppressions en cascade garantissent l'intégrité référentielle.

## 🔄 Relations

```
restaurants (1) ──→ (N) employes
restaurants (1) ──→ (N) plannings
restaurants (1) ──→ (N) shifts
restaurants (1) ──→ (N) alertes
restaurants (1) ──→ (N) previsions_activite
restaurants (1) ──→ (1) contraintes_legales

employes (1) ──→ (N) indisponibilites
employes (1) ──→ (N) shifts
employes (1) ──→ (N) historique_fatigue
employes (1) ──→ (N) messages_planning

plannings (1) ──→ (N) shifts
plannings (1) ──→ (N) alertes

shifts (1) ──→ (N) alertes
shifts (1) ──→ (N) messages_planning
```

## 📚 Exemples de requêtes

### Récupérer un planning avec ses shifts
```sql
SELECT 
  p.*,
  json_agg(s.*) as shifts
FROM plannings p
LEFT JOIN shifts s ON s.planning_id = p.id
WHERE p.restaurant_id = $1
  AND p.semaine_debut = $2
GROUP BY p.id;
```

### Calculer le coût total d'un planning
```sql
SELECT 
  SUM(s.heures_travaillees * e.taux_horaire) as cout_total
FROM shifts s
JOIN employes e ON e.id = s.employe_id
WHERE s.planning_id = $1
  AND s.statut NOT IN ('annule', 'absence');
```

### Récupérer les alertes non lues
```sql
SELECT *
FROM alertes
WHERE restaurant_id = $1
  AND lue = false
ORDER BY 
  CASE severite
    WHEN 'critique' THEN 1
    WHEN 'urgent' THEN 2
    WHEN 'attention' THEN 3
    ELSE 4
  END,
  created_at DESC;
```

