# Documentation API - ShiftPilot

Toutes les routes API sont préfixées par `/api`.
L'authentification est requise via cookie de session Supabase.

## Employés

### `GET /api/employees`
Récupère la liste des employés du restaurant de l'utilisateur connecté.

**Réponse :**
```json
[
  {
    "id": "uuid",
    "first_name": "Jean",
    "last_name": "Dupont",
    "role": "Serveur",
    "status": "active"
    // ...
  }
]
```

### `POST /api/employees`
Crée un nouvel employé.

**Body :**
```json
{
  "first_name": "Marie",
  "last_name": "Curie",
  "email": "marie@example.com",
  "role": "Manager"
}
```

### `PATCH /api/employees/[id]`
Met à jour un employé.

### `DELETE /api/employees/[id]`
Supprime un employé.

## Shifts

### `GET /api/shifts?start=ISO_DATE&end=ISO_DATE`
Récupère les shifts sur une période donnée.

**Paramètres :**
- `start` : Date de début (ISO 8601)
- `end` : Date de fin (ISO 8601)

### `POST /api/shifts`
Crée un shift.

**Body :**
```json
{
  "employee_id": "uuid",
  "start_time": "2024-01-01T09:00:00Z",
  "end_time": "2024-01-01T17:00:00Z",
  "role": "Serveur"
}
```

## RH & Documents

### `POST /api/rh/upload-cv`
Upload un document (CV, contrat) pour un employé.

**Body (FormData) :**
- `file` : Le fichier
- `employeeId` : ID de l'employé

## Planning & Exports

### `GET /api/planning/pdf?start=ISO_DATE&end=ISO_DATE`
Génère et télécharge le planning en PDF.

### `POST /api/email/send-planning`
Envoie le planning par email.

