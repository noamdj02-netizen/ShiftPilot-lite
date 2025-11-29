export const metadata = {
  title: 'Mentions légales | ShiftPilot',
  description: 'Mentions légales de ShiftPilot',
}

export default function MentionsLegalesPage() {
  return (
    <div className="section">
      <div className="container-tight">
        <h1 className="text-display-md text-foreground mb-8">Mentions légales</h1>
        <div className="prose prose-lg max-w-none">
          <h2>Éditeur du site</h2>
          <p>
            <strong>ShiftPilot SAS</strong><br />
            Société par Actions Simplifiée au capital de 10 000 €<br />
            RCS Paris XXX XXX XXX<br />
            Siège social : [Adresse complète]<br />
            N° TVA intracommunautaire : FR XX XXX XXX XXX
          </p>
          <p>
            Directeur de la publication : [Nom du dirigeant]<br />
            Email : contact@shiftpilot.fr<br />
            Téléphone : 01 23 45 67 89
          </p>
          <h2>Hébergement</h2>
          <p>
            Ce site est hébergé par :<br />
            <strong>Vercel Inc.</strong><br />
            440 N Barranca Ave #4133<br />
            Covina, CA 91723, USA<br />
            https://vercel.com
          </p>
          <h2>Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu de ce site (textes, images, vidéos, logos, marques) est
            la propriété exclusive de ShiftPilot SAS ou de ses partenaires. Toute reproduction,
            représentation, modification, publication, adaptation de tout ou partie des éléments
            du site est interdite sans autorisation écrite préalable.
          </p>
          <h2>Protection des données personnelles</h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
            Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, de
            suppression et d'opposition aux données vous concernant.
          </p>
          <p>
            Délégué à la Protection des Données : dpo@shiftpilot.fr<br />
            Pour plus d'informations, consultez notre{' '}
            <a href="/confidentialite" className="text-primary hover:underline">politique de confidentialité</a>.
          </p>
          <h2>Cookies</h2>
          <p>
            Ce site utilise des cookies pour améliorer votre expérience. Pour plus d'informations,
            consultez notre <a href="/cookies" className="text-primary hover:underline">politique de cookies</a>.
          </p>
          <h2>Litiges</h2>
          <p>
            En cas de litige, une solution amiable sera recherchée avant toute action judiciaire.
            À défaut d'accord amiable, les tribunaux français seront seuls compétents.
          </p>
          <p className="text-foreground-muted text-sm mt-8">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>
      </div>
    </div>
  )
}

