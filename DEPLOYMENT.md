# 🚀 Guide de déploiement Edgemy sur Vercel

## ✅ Prérequis
- [ ] Compte Vercel (vercel.com)
- [ ] Projet Git pushé sur GitHub/GitLab/Bitbucket
- [ ] Base de données Neon PostgreSQL configurée

## 📋 Étapes de déploiement

### 1. Préparation locale
```bash
# S'assurer que le build fonctionne
pnpm build

# Commit et push du code
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### 2. Création du projet Vercel

**Option A : Interface web**
1. Aller sur [vercel.com](https://vercel.com)
2. Connecter votre repository Git
3. Sélectionner le projet Edgemy
4. Framework preset: **Next.js**
5. Root Directory: **apps/web**

**Option B : CLI**
```bash
# Se connecter à Vercel
vercel login

# Déployer le projet
vercel

# Suivre les instructions :
# - Link to existing project? No
# - What's your project's name? edgemy
# - In which directory is your code located? apps/web
```

### 3. Configuration des variables d'environnement

Dans le dashboard Vercel > Settings > Environment Variables :

```
DATABASE_URL=postgresql://user:pass@ep-xxx.eu-central-1.aws.neon.tech:5432/edgemy?sslmode=require
JWT_SECRET=your-super-secure-jwt-secret-32-chars
ADMIN_EMAIL=admin@edgemy.fr
ADMIN_PASSWORD=your-secure-admin-password
NEXT_PUBLIC_API_URL=https://your-vercel-domain.vercel.app
NODE_ENV=production
```

### 4. Configuration du domaine edgemy.fr

1. Dans Vercel Dashboard > Settings > Domains
2. Ajouter `edgemy.fr` et `www.edgemy.fr`
3. Configurer les DNS chez votre registraire :
   ```
   Type: A
   Name: @
   Value: 76.76.19.61

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### 5. Configuration du build

Vercel détectera automatiquement la configuration grâce à `vercel.json` :
- Build Command: `cd apps/web && pnpm build`
- Output Directory: `apps/web/.next`
- Install Command: `pnpm install`

### 6. Déploiement en production

```bash
# Déployer en production
vercel --prod
```

## 🎯 URLs après déploiement

- **Landing page** : `https://edgemy.fr` → redirige vers `/early-access`
- **Early Access** : `https://edgemy.fr/early-access`
- **Admin** : `https://edgemy.fr/admin/login`
- **API Health** : `https://edgemy.fr/api/waitlist`

## 🔧 Configuration post-déploiement

### Tests de fonctionnement
- [ ] Accès à la landing page early-access
- [ ] Formulaire d'inscription fonctionne
- [ ] Login admin accessible
- [ ] Base de données connectée

### Optimisations SEO
- [ ] Configurer Google Analytics (NEXT_PUBLIC_GA_ID)
- [ ] Vérifier le sitemap : `https://edgemy.fr/sitemap.xml`
- [ ] Vérifier robots.txt : `https://edgemy.fr/robots.txt`

## 🔄 Déploiement automatique

Une fois configuré, chaque push sur la branche `main` déclenchera automatiquement un redéploiement !

## 🛠️ Dépannage

### Erreur de build
```bash
# Nettoyer et rebuilder localement
rm -rf apps/web/.next
pnpm build
```

### Variables d'environnement
- Vérifier que toutes les variables sont bien définies dans Vercel
- Redéployer après modification des variables

### Problème de domaine
- Vérifier les DNS avec `nslookup edgemy.fr`
- Attendre la propagation DNS (24-48h)

## 📞 Support

En cas de problème :
1. Vérifier les logs dans Vercel Dashboard > Functions
2. Tester localement avec `pnpm dev`
3. Vérifier la configuration `vercel.json` 