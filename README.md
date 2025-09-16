# Système de Gestion Scolaire Islamique

Système de gestion scolaire moderne adapté aux écoles coraniques et islamiques.

## Fonctionnalités

- 📖 **Suivi du Coran** : Mémorisation, révision et lecture par sourate et versets
- 🏫 **Gestion des classes** : Organisation par niveau (Hifdh, Tajwid, Arabe, matières générales)
- ⏰ **Emploi du temps** : Planification avec intégration des horaires de prières
- 📝 **Notes et évaluations** : Système adapté aux matières islamiques et générales
- 🌍 **Multilingue** : Interface en français, arabe et anglais avec support RTL
- 🏢 **Multi-tenant** : Espace isolé et sécurisé pour chaque mosquée
- 👨‍👩‍👧‍👦 **Espace parents** : Espace dédié aux parents pour le suivi et pour la communication avec l'administration
- 👶 **Espace enfants** : Espace dédié aux enfants pour le suivi pédagogique

## Technologies

- **Frontend** : Next.js 15, React 19, TypeScript
- **Styling** : Tailwind CSS v4
- **Déploiement** : Vercel
- **Base de données** : Neon (PostgreSQL)

## Installation locale

```bash
# Cloner le repository
git clone https://github.com/barousy/mosquee-app-clean.git
cd mosquee-app-clean

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

### Identifiants de connexion par défaut

Après avoir initialisé la base de données, vous pouvez vous connecter avec :
- **Email** : admin@ecole.com
- **Mot de passe** : admin123

## Scripts disponibles

- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run start` - Serveur de production
- `npm run lint` - Linting ESLint

## Déploiement

### Vercel
1. Connectez le repository GitHub à Vercel
2. Configurez les variables d'environnement
3. Le site sera automatiquement déployé

### Variables d'environnement
```env
DATABASE_URL=your_neon_database_url
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=https://your-domain.vercel.app
```

## Licence

Ce projet est sous licence MIT.
