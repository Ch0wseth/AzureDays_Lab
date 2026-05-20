# 🤖 Copilot Demo - Orange Boosted

Application de démonstration pour présenter les fonctionnalités de **GitHub Copilot dans VS Code** avec l'interface **Orange Boosted Design System**.

## 🚀 Quick Start

```bash
npm install
npm run dev          # Serveur avec hot-reload
npm test             # Tests unitaires Jest
npm run test:e2e     # Tests E2E Playwright
```

## 📁 Structure du Projet

```
copilot-demo-orange/
├── .github/
│   ├── copilot-instructions.md    # ⚡ Instructions custom Copilot
│   ├── prompts/                   # 📝 Prompt files réutilisables
│   │   ├── generate-route.prompt.md
│   │   ├── generate-tests.prompt.md
│   │   └── generate-boosted-component.prompt.md
│   └── MCP_PLAYWRIGHT.md
├── .vscode/
│   └── mcp.json                   # 🔌 Config MCP Playwright
├── .copilotignore                 # ⚡ Optimisation tokens
├── src/
│   ├── app.js                     # Express app principale
│   ├── routes/                    # API REST endpoints
│   ├── services/                  # Logique métier
│   └── utils/                     # Utilitaires
├── public/                        # Frontend Orange Boosted
│   ├── index.html
│   ├── css/app.css
│   └── js/app.js
├── tests/
│   ├── taskService.test.js        # Tests unitaires
│   ├── validators.test.js
│   └── e2e/                       # Tests Playwright
├── playwright.config.js
└── package.json
```

## 🎯 Fonctionnalités Copilot Démontrées

### 1. Génération de Code (Ask/Edit/Agent modes)
- **Ask** : Expliquer le code, poser des questions
- **Edit** : Refactoring inline, ajout de fonctionnalités
- **Agent** : Génération multi-fichiers avec plan

### 2. Custom Instructions & Prompts
- `.github/copilot-instructions.md` - Contexte projet persistant
- `.github/prompts/*.prompt.md` - Prompts réutilisables via `#`

### 3. MCP Playwright Server
Le serveur MCP Playwright permet à Copilot d'interagir avec le navigateur :
```
// Dans Copilot Chat (Agent mode) :
"Navigue vers localhost:3000 et crée une nouvelle tâche"
"Prends un screenshot de la page d'accueil"
"Vérifie que le formulaire valide correctement"
```

### 4. Optimisation des Tokens
- `.copilotignore` - Exclure node_modules, dist, etc.
- Prompt files ciblés pour réduire les allers-retours
- Fonctions petites et bien documentées (JSDoc)
- Utilisation de `#file:src/services/taskService.js` pour focus

## 🎨 Orange Boosted

Interface utilisant [Orange Boosted 5.3](https://boosted.orange.com/) :
- Design system conforme à la charte Orange
- Mode sombre activé
- Composants accessibles (WCAG AA)
- CDN : pas de build CSS nécessaire

## 🧪 Tests

```bash
# Unitaires (Jest)
npm test

# E2E (Playwright) - nécessite le serveur lancé
npm run test:e2e
```

## 📋 Scénarios de Démo

1. **Générer du code** : Ouvrir `src/services/` et demander à Copilot de créer un nouveau service
2. **Générer des tests** : Utiliser le prompt `#generate-tests` sur un fichier
3. **Mode Agent** : Demander "Ajoute un système de catégories aux tâches"
4. **MCP Playwright** : Demander à Copilot de naviguer sur l'app et vérifier le UI
5. **Optimisation** : Montrer `.copilotignore` et l'usage de `#file` pour limiter le contexte
