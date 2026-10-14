# AQDOULUM — Site web officiel

Site vitrine professionnel d'AQDOULUM, entreprise générale de travaux de construction.
Next.js 16 (App Router) · React 19 · TypeScript · CSS natif — prêt pour Vercel.

## Langues

Le site est bilingue : **anglais par défaut** (`/en/...`) et **français** (`/fr/...`), avec un bouton EN / FR dans l'en-tête.
Les adresses sans langue (`/`, `/contact`…) redirigent automatiquement vers la version anglaise (fichier `proxy.ts`).

## Pages

| Menu (EN / FR) | URL |
| --- | --- |
| Home / Accueil | `/en` · `/fr` |
| About / À propos | `/en/a-propos` · `/fr/a-propos` |
| Projects / Nos réalisations (filtres par type et pays) | `/en/realisations` + une page par projet |
| Capabilities / Capacités techniques | `/en/capacites-techniques` |
| Quality & safety / Qualité & sécurité | `/en/qualite-securite-conformite` |
| Contact & quote / Contact & devis | `/en/contact` (formulaire → `/api/contact`) |

## Lancer en local

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # vérification de production
```

Node.js 20 ou plus récent est requis.

## Déployer sur Vercel

1. Poussez ce dossier sur un dépôt GitHub.
2. Sur https://vercel.com → **Add New… → Project** → importez le dépôt (Vercel détecte Next.js automatiquement).
3. Dans **Settings → Environment Variables**, ajoutez au minimum :
   - `NEXT_PUBLIC_SITE_URL` = l'URL finale du site (ex. `https://www.aqdoulum.com`)
4. Cliquez sur **Deploy**. Pour un nom de domaine : **Settings → Domains**.

### Recevoir les demandes de devis par e-mail (optionnel)

Le formulaire fonctionne immédiatement : sans configuration, chaque demande est visible dans **Vercel → Logs**.
Pour la recevoir par e-mail, créez un compte gratuit sur https://resend.com, vérifiez votre domaine, puis ajoutez :

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL` (adresse qui reçoit les demandes)
- `CONTACT_FROM_EMAIL` (ex. `AQDOULUM <site@aqdoulum.com>`)

## Personnaliser le contenu

| Contenu | Fichier |
| --- | --- |
| **Tous les textes du site, en français et en anglais** | `lib/dict.ts` (objet `fr` puis objet `en`) |
| Coordonnées, téléphone, e-mail, réseaux sociaux, villes | `lib/site.ts` |
| Projets du portfolio (textes FR / EN, photos) | `lib/projects.ts` |
| Couleurs et typographies | `app/globals.css` (variables `:root`) |

Pour modifier un texte, changez-le **dans les deux langues** dans `lib/dict.ts`.

⚠️ La page Qualité & sécurité contient encore des certifications ISO et des indicateurs d'exemple, et le portfolio contient des projets d'exemple après les 4 projets réels : à adapter avant la mise en ligne.

**Photos de projets** : déposez-les dans `public/projets/` puis renseignez `image` et `gallery` du projet dans `lib/projects.ts`.

**Logo** : déclinaisons dans `public/brand/` ; le favicon est `app/icon.png`.
