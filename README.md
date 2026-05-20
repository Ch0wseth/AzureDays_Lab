# 🤖 Copilot Demo - Orange Boosted

> **Guide reproductible** pour démontrer GitHub Copilot dans VS Code avec l'interface Orange Boosted.
> Chaque participant peut suivre ce README pas à pas pour reproduire la démo.

---

## 📋 Pré-requis

| Outil | Version min. | Installation |
|-------|-------------|-------------|
| Node.js | 20+ | https://nodejs.org |
| VS Code | 1.100+ | https://code.visualstudio.com |
| GitHub Copilot | Extension VS Code | Marketplace → `github.copilot` |
| GitHub Copilot Chat | Extension VS Code | Marketplace → `github.copilot-chat` |
| Docker (optionnel) | Pour MCP awesome-copilot | https://docker.com |

> **Licence Copilot** : Copilot Individual, Business ou Enterprise requise.

---

## 🚀 Installation & Lancement

```bash
# 1. Cloner le projet
git clone <url-du-repo> copilot-demo-orange
cd copilot-demo-orange

# 2. Installer les dépendances
npm install

# 3. Installer Playwright (navigateurs pour tests E2E)
npx playwright install chromium

# 4. Lancer le serveur de dev
npm run dev
# → http://localhost:3000

# 5. Ouvrir dans VS Code
code .
```

---

## 📊 Suivi de Consommation des Tokens

> **IMPORTANT** : Tout au long de la démo, gardez un œil sur la consommation de tokens.

### Comment suivre les tokens dans VS Code

1. **Panneau Copilot Chat** → icône `⚙️` en bas → "Show Token Usage" (si disponible)
2. **Output Panel** → sélectionner `GitHub Copilot Chat` dans le dropdown
3. **Settings** : `"github.copilot.advanced.debug.showTokenCount": true`
4. **Dashboard** : https://github.com/settings/copilot → Usage

### Tableau de suivi démo

Utilisez ce tableau pour noter la consommation à chaque étape :

| # | Étape Démo | Tokens Entrée | Tokens Sortie | Notes |
|---|-----------|---------------|---------------|-------|
| 1 | Génération code | ___ | ___ | |
| 2 | Génération tests | ___ | ___ | |
| 3 | Génération docs | ___ | ___ | |
| 4 | Mode Ask | ___ | ___ | |
| 5 | Mode Edit | ___ | ___ | |
| 6 | Mode Agent | ___ | ___ | |
| 7 | Custom Prompt | ___ | ___ | |
| 8 | MCP Playwright | ___ | ___ | |
| 9 | Avec .copilotignore | ___ | ___ | Comparer avant/après |
| 10 | Mode Caveman | ___ | ___ | Réduction attendue |

---

## 📁 Structure du Projet

```
copilot-demo-orange/
├── .github/
│   ├── copilot-instructions.md       # ⚡ Instructions custom Copilot
│   └── prompts/                      # 📝 Prompt files réutilisables
│       ├── generate-route.prompt.md
│       ├── generate-tests.prompt.md
│       └── generate-boosted-component.prompt.md
├── .vscode/
│   └── mcp.json                      # 🔌 Config MCP Playwright
├── .copilotignore                    # ⚡ Optimisation tokens
├── src/
│   ├── app.js                        # Express app principale
│   ├── routes/                       # API REST endpoints
│   ├── services/                     # Logique métier (CRUD tasks)
│   └── utils/                        # Utilitaires (validation, sanitisation)
├── public/                           # Frontend Orange Boosted 5.3
│   ├── index.html                    # UI dark mode
│   ├── css/app.css
│   └── js/app.js
├── tests/
│   ├── taskService.test.js           # Tests unitaires Jest
│   ├── validators.test.js
│   └── e2e/taskManager.spec.js       # Tests Playwright E2E
├── playwright.config.js
└── package.json
```

---

## 🎯 Scénarios de Démo

### Démo 1 — Génération de Code, Tests & Documentation

**Objectif** : Montrer Copilot qui génère du code JS, des tests et de la documentation.

#### 1.1 Générer un service (code)

1. Ouvrir `src/services/` dans VS Code
2. Créer un nouveau fichier `userService.js`
3. Taper le commentaire :
   ```javascript
   /**
    * @fileoverview User management service with CRUD operations.
    * Uses in-memory store, similar to taskService.
    */
   ```
4. **Observer** Copilot qui propose le code complet du service

> 📊 **Tokens** : Noter la consommation dans le tableau

#### 1.2 Générer des tests

1. Ouvrir Copilot Chat (`Ctrl+Shift+I`)
2. Taper :
   ```
   /tests #file:src/services/taskService.js
   ```
3. **Ou** utiliser le prompt file : taper `/` puis sélectionner `generate-tests`

#### 1.3 Générer de la documentation

1. Sélectionner une fonction dans `taskService.js`
2. Copilot Chat → Taper :
   ```
   /doc Génère la documentation JSDoc complète pour cette fonction
   ```

---

### Démo 2 — Modes Copilot (Ask, Edit, Agent)

#### 2.1 Mode Ask (Ctrl+Shift+I)

Poser des questions sur le code :
```
Explique-moi comment fonctionne le filtrage dans getTasks()
Quels sont les risques de sécurité dans ce code ?
Comment cette app utilise Orange Boosted ?
```

#### 2.2 Mode Edit (Ctrl+I dans l'éditeur)

Sélectionner du code et demander des modifications inline :
```
Ajoute la validation de la longueur de la description (max 500 chars)
Refactore cette fonction pour utiliser une Map au lieu d'un Array
```

#### 2.3 Mode Agent (le plus puissant)

Dans Copilot Chat, sélectionner le mode **Agent** puis demander :
```
Ajoute un système de catégories aux tâches :
- Nouveau champ "category" dans le service
- Endpoint API pour lister les catégories
- Filtre par catégorie dans le frontend
- Tests unitaires pour la nouvelle fonctionnalité
```

> ⚡ **L'Agent** va créer/modifier plusieurs fichiers automatiquement avec un plan.

---

### Démo 3 — Custom Agents, Prompts, Instructions & MCP

#### 3.1 Instructions personnalisées

Ouvrir `.github/copilot-instructions.md` et montrer comment elles affectent les réponses :
- Copilot sait qu'on utilise Orange Boosted
- Il génère du code en ES Modules
- Il met les textes UI en français

#### 3.2 Prompt Files (réutilisables)

Taper `/` dans Copilot Chat pour voir les prompts disponibles :
- `generate-route` — Nouveau endpoint Express
- `generate-tests` — Suite de tests pour un service
- `generate-boosted-component` — Composant UI Orange

#### 3.3 MCP Playwright Server

Le serveur MCP est configuré dans `.vscode/mcp.json`. En mode Agent :

```
Navigue vers http://localhost:3000 et prends un screenshot
Clique sur "Nouvelle Tâche", remplis le formulaire et vérifie que la tâche apparaît
Lance les tests E2E et montre-moi les résultats
```

> Le MCP Playwright permet à Copilot de **contrôler un vrai navigateur** !

#### 3.4 Awesome Copilot (ressource communautaire)

Ajouter le MCP Server awesome-copilot pour accéder à des centaines de prompts/instructions communautaires :

```json
// Ajouter dans .vscode/mcp.json → servers
"awesome-copilot": {
  "type": "stdio",
  "command": "docker",
  "args": ["run", "-i", "--rm", "ghcr.io/microsoft/mcp-dotnet-samples/awesome-copilot:latest"]
}
```

📦 **Repo** : https://github.com/microsoft/awesome-copilot

Exemples utiles de la collection :
- `taming-copilot.instructions.md` — Contrôler Copilot pour des réponses minimales
- `playwright-tester.chatmode.md` — Mode chat spécialisé tests E2E
- `principal-software-engineer.chatmode.md` — Mode architecte senior

---

### Démo 4 — Optimisation des Tokens (Mode "Caveman")

**Objectif** : Montrer comment réduire drastiquement la consommation de tokens.

#### 4.1 Le `.copilotignore`

```gitignore
# Fichiers exclus du contexte Copilot → moins de tokens envoyés
node_modules/
dist/
coverage/
*.lock
*.log
.git/
```

**Démo** : Supprimer temporairement le fichier, poser une question, noter les tokens.
Puis remettre le fichier et reposer la même question → **observer la différence**.

#### 4.2 Références ciblées avec `#file`

Au lieu de laisser Copilot scanner tout le projet :
```
#file:src/services/taskService.js Ajoute une méthode getTaskById
```

→ Copilot n'envoie que ce fichier en contexte = **beaucoup moins de tokens**

#### 4.3 Mode "Caveman" (inspiré de Awesome Copilot)

Ajouter ces instructions dans `.github/copilot-instructions.md` pour forcer Copilot à être minimaliste :

```markdown
## Mode Caveman — Optimisation Tokens

- Répondre de manière ULTRA concise (max 3 phrases pour les explications)
- Code UNIQUEMENT si demandé explicitement
- Pas de commentaires dans le code généré sauf si demandé
- Pas de disclaimers, pas d'alternatives, pas de "voici ce que je recommande"
- Réponse directe, sans reformulation de la question
- Utiliser le minimum de tokens possible pour transmettre l'information
```

> 💡 **Inspiré de** [`taming-copilot.instructions.md`](https://github.com/microsoft/awesome-copilot/blob/main/instructions/taming-copilot.instructions.md) — Instructions communautaires pour garder Copilot sous contrôle.

**Démo comparative** :
1. **Sans** mode caveman : demander "Explique la fonction createTask"
2. **Avec** mode caveman : même question → **observer la réduction de tokens**

#### 4.4 Prompt Files pour réutilisation

Les prompts dans `.github/prompts/` évitent de retaper les mêmes instructions :
- Moins de tokens en entrée à chaque utilisation
- Contexte pré-défini = réponses plus précises du premier coup
- Moins d'allers-retours = moins de tokens consommés au total

#### 4.5 Bonnes pratiques token-efficaces

| Technique | Impact Tokens | Exemple |
|-----------|:---:|---------|
| `.copilotignore` | -30-50% contexte | Exclure `node_modules`, `dist` |
| `#file:` ciblé | -60-80% contexte | Ne référencer que les fichiers utiles |
| Mode Caveman | -50-70% sortie | Réponses minimales |
| Prompt Files | -20-30% entrée | Éviter de retaper les instructions |
| Fonctions courtes | -15-25% | Fichiers < 100 lignes |
| JSDoc précis | +qualité | Meilleur contexte, moins de re-prompts |

---

## 🎨 Interface Orange Boosted

L'application utilise [Orange Boosted 5.3](https://boosted.orange.com/) :
- **Dark mode** activé (`data-bs-theme="dark"`)
- **CDN** : pas de build CSS nécessaire
- **Accessible** : WCAG AA (contraste, labels, ARIA)
- **Composants** : Navbar, Cards, Modal, Accordion, Badges, Forms

---

## 🧪 Commandes disponibles

```bash
npm run dev        # Serveur avec hot-reload (--watch)
npm test           # Tests unitaires Jest (29 tests)
npm run test:e2e   # Tests E2E Playwright
npm run lint       # ESLint
```

---

## 🔗 Ressources

| Ressource | Lien |
|-----------|------|
| Awesome Copilot | https://github.com/microsoft/awesome-copilot |
| Orange Boosted | https://boosted.orange.com/ |
| Copilot Docs | https://docs.github.com/copilot |
| Playwright MCP | https://github.com/anthropics/mcp-server-playwright |
| Copilot Custom Instructions | https://docs.github.com/copilot/customizing-copilot |

---

## 📝 Checklist Démo

- [ ] VS Code ouvert avec extensions Copilot installées
- [ ] `npm install` + `npm run dev` lancé
- [ ] Dashboard tokens ouvert (Output panel ou settings debug)
- [ ] Tableau de suivi tokens prêt (imprimer ou ouvrir dans un onglet)
- [ ] Docker lancé (si démo MCP awesome-copilot)
- [ ] Mode caveman : instructions prêtes à copier/retirer
- [ ] Navigateur ouvert sur http://localhost:3000
