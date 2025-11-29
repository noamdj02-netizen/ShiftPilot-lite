export const metadata = {
  title: 'Politique de confidentialité | ShiftPilot',
  description: 'Politique de confidentialité et protection des données de ShiftPilot',
}

export default function ConfidentialitePage() {
  return (
    <div className="section">
      <div className="container-tight">
        <h1 className="text-display-md text-foreground mb-8">Politique de confidentialité</h1>
        <div className="prose prose-lg max-w-none">
          <p className="lead">
            Chez ShiftPilot, la protection de vos données personnelles est une priorité.
            Cette politique explique comment nous collectons, utilisons et protégeons vos informations.
          </p>
          <h2>1. Responsable du traitement</h2>
          <p>
            ShiftPilot SAS, [Adresse], est responsable du traitement de vos données personnelles.
          </p>
          <h2>2. Données collectées</h2>
          <p>Nous collectons les données suivantes :</p>
          <ul>
            <li><strong>Données d'identification :</strong> nom, prénom, email, téléphone</li>
            <li><strong>Données professionnelles :</strong> nom du restaurant, poste, horaires</li>
            <li><strong>Données de connexion :</strong> adresse IP, logs de connexion</li>
            <li><strong>Données de paiement :</strong> traitées par notre prestataire Stripe</li>
          </ul>
          <h2>3. Finalités du traitement</h2>
          <p>Vos données sont utilisées pour :</p>
          <ul>
            <li>Fournir et gérer nos services de planification</li>
            <li>Envoyer des notifications (plannings, échanges de shifts)</li>
            <li>Traiter les paiements et la facturation</li>
            <li>Améliorer nos services et votre expérience</li>
            <li>Vous contacter pour le support client</li>
          </ul>
          <h2>4. Base légale</h2>
          <p>Le traitement de vos données repose sur :</p>
          <ul>
            <li>L'exécution du contrat (fourniture du service)</li>
            <li>Votre consentement (notifications marketing)</li>
            <li>Nos intérêts légitimes (amélioration du service)</li>
            <li>Nos obligations légales (facturation, conservation)</li>
          </ul>
          <h2>5. Partage des données</h2>
          <p>Vos données peuvent être partagées avec :</p>
          <ul>
            <li><strong>Stripe :</strong> pour le traitement des paiements</li>
            <li><strong>Twilio :</strong> pour l'envoi des SMS</li>
            <li><strong>Supabase :</strong> pour l'hébergement des données</li>
          </ul>
          <p>Nous ne vendons jamais vos données à des tiers.</p>
          <h2>6. Durée de conservation</h2>
          <ul>
            <li>Données de compte : durée de la relation contractuelle + 3 ans</li>
            <li>Données de facturation : 10 ans (obligation légale)</li>
            <li>Logs de connexion : 1 an</li>
          </ul>
          <h2>7. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul>
            <li><strong>Accès :</strong> obtenir une copie de vos données</li>
            <li><strong>Rectification :</strong> corriger des données inexactes</li>
            <li><strong>Suppression :</strong> demander l'effacement de vos données</li>
            <li><strong>Opposition :</strong> vous opposer au traitement</li>
            <li><strong>Portabilité :</strong> récupérer vos données</li>
            <li><strong>Limitation :</strong> limiter le traitement</li>
          </ul>
          <p>
            Pour exercer ces droits : <a href="mailto:dpo@shiftpilot.fr" className="text-primary hover:underline">dpo@shiftpilot.fr</a>
          </p>
          <h2>8. Sécurité</h2>
          <p>Nous mettons en œuvre des mesures de sécurité appropriées :</p>
          <ul>
            <li>Chiffrement des données en transit (TLS 1.3)</li>
            <li>Chiffrement des données au repos (AES-256)</li>
            <li>Hébergement en France (ISO 27001)</li>
            <li>Authentification sécurisée</li>
            <li>Sauvegardes régulières</li>
          </ul>
          <h2>9. Contact</h2>
          <p>
            Pour toute question relative à cette politique :<br />
            Email : <a href="mailto:dpo@shiftpilot.fr" className="text-primary hover:underline">dpo@shiftpilot.fr</a><br />
            Courrier : ShiftPilot SAS - DPO, [Adresse]
          </p>
          <p>
            Vous pouvez également déposer une réclamation auprès de la CNIL :{' '}
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              www.cnil.fr
            </a>
          </p>
          <p className="text-foreground-muted text-sm mt-8">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>
      </div>
    </div>
  )
}

