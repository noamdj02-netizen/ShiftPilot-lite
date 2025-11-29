export const metadata = {
  title: "Conditions Générales d'Utilisation | ShiftPilot",
  description: "CGU de ShiftPilot - Conditions d'utilisation du service",
}

export default function CGUPage() {
  return (
    <div className="section">
      <div className="container-tight">
        <h1 className="text-display-md text-foreground mb-8">
          Conditions Générales d'Utilisation
        </h1>
        <div className="prose prose-lg max-w-none">
          <p className="lead">
            Les présentes conditions générales régissent l'utilisation du service ShiftPilot.
            En utilisant notre service, vous acceptez ces conditions.
          </p>
          <h2>1. Objet</h2>
          <p>
            ShiftPilot est un service en ligne de gestion de plannings pour les établissements
            de restauration. Ces CGU définissent les conditions d'accès et d'utilisation du service.
          </p>
          <h2>2. Inscription</h2>
          <p>
            L'utilisation du service nécessite la création d'un compte. Vous vous engagez à :
          </p>
          <ul>
            <li>Fournir des informations exactes et complètes</li>
            <li>Maintenir la confidentialité de vos identifiants</li>
            <li>Nous informer de toute utilisation non autorisée</li>
          </ul>
          <h2>3. Description du service</h2>
          <p>ShiftPilot propose les fonctionnalités suivantes :</p>
          <ul>
            <li>Création et gestion de plannings</li>
            <li>Gestion des employés et de leurs disponibilités</li>
            <li>Notifications par SMS, email et WhatsApp</li>
            <li>Gestion des échanges de shifts</li>
            <li>Tableaux de bord et statistiques</li>
          </ul>
          <h2>4. Tarification</h2>
          <p>
            Les tarifs en vigueur sont indiqués sur notre page Tarifs. Nous nous réservons
            le droit de modifier nos tarifs avec un préavis de 30 jours.
          </p>
          <ul>
            <li>Essai gratuit de 14 jours sans engagement</li>
            <li>Facturation mensuelle ou annuelle</li>
            <li>Résiliation possible à tout moment</li>
          </ul>
          <h2>5. Obligations de l'utilisateur</h2>
          <p>L'utilisateur s'engage à :</p>
          <ul>
            <li>Utiliser le service conformément à sa destination</li>
            <li>Ne pas porter atteinte à la sécurité du service</li>
            <li>Respecter les droits de propriété intellectuelle</li>
            <li>Ne pas utiliser le service à des fins illégales</li>
          </ul>
          <h2>6. Responsabilité</h2>
          <p>
            ShiftPilot s'engage à fournir le service avec diligence. Toutefois, notre
            responsabilité est limitée au montant des sommes versées sur les 12 derniers mois.
          </p>
          <p>
            ShiftPilot ne saurait être tenu responsable des dommages indirects, pertes
            d'exploitation ou de données.
          </p>
          <h2>7. Propriété intellectuelle</h2>
          <p>
            ShiftPilot reste propriétaire de tous les droits de propriété intellectuelle
            relatifs au service. L'utilisateur bénéficie d'une licence d'utilisation
            non-exclusive pendant la durée de l'abonnement.
          </p>
          <h2>8. Données personnelles</h2>
          <p>
            Le traitement des données personnelles est régi par notre{' '}
            <a href="/confidentialite" className="text-primary hover:underline">politique de confidentialité</a>.
          </p>
          <h2>9. Résiliation</h2>
          <p>
            L'utilisateur peut résilier son abonnement à tout moment depuis les paramètres
            de son compte. La résiliation prend effet à la fin de la période en cours.
          </p>
          <p>
            ShiftPilot peut résilier l'accès en cas de violation des présentes CGU,
            avec un préavis de 15 jours sauf cas de violation grave.
          </p>
          <h2>10. Modification des CGU</h2>
          <p>
            ShiftPilot peut modifier les présentes CGU. Les modifications seront notifiées
            par email et prendront effet 30 jours après notification.
          </p>
          <h2>11. Droit applicable</h2>
          <p>
            Les présentes CGU sont soumises au droit français. Tout litige sera soumis
            aux tribunaux compétents de Paris.
          </p>
          <h2>12. Contact</h2>
          <p>
            Pour toute question relative aux présentes CGU :{' '}
            <a href="mailto:legal@shiftpilot.fr" className="text-primary hover:underline">legal@shiftpilot.fr</a>
          </p>
          <p className="text-foreground-muted text-sm mt-8">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>
      </div>
    </div>
  )
}

