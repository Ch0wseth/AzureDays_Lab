# 🤖 GitHub Copilot Demo — Orange Boosted

> **Guide 100% reproductible** — Suivez ce README pas à pas pour réaliser la lab complète.
> Chaque étape indique **exactement** ce qu'il faut faire, taper, et observer.

---

## Table des matières

1. [Pré-requis](#-pré-requis)
2. [Installation pas à pas](#-installation-pas-à-pas)
3. [Configuration VS Code](#-configuration-vs-code)
4. [Suivi des tokens](#-suivi-des-tokens-tout-au-long-de-la-lab)
5. [LAB 1 — Génération de code](#-lab-1--génération-de-code)
6. [LAB 2 — Génération de tests](#-lab-2--génération-de-tests)
7. [LAB 3 — Génération de documentation](#-lab-3--génération-de-documentation)
8. [LAB 4 — Modes Copilot (Ask, Edit, Agent)](#-lab-4--modes-copilot-ask-edit-agent)
9. [LAB 5 — Custom Agents, Prompts, Instructions, Skills & MCP](#-lab-5--custom-agents-prompts-instructions-skills--mcp)
10. [LAB 6 — Gestion du Contexte](#-lab-6--gestion-du-contexte-influence-directe-sur-la-qualité-et-les-tokens)
11. [LAB 7 — Bonnes Pratiques de Prompting](#-lab-7--bonnes-pratiques-de-prompting-avantaprès-mesurable)
12. [LAB 8 — Optimisation tokens (Caveman Mode)](#-lab-8--optimisation-des-tokens-caveman-mode)
13. [Structure du projet](#-structure-du-projet)
14. [Checklist Jour-J](#-checklist-jour-j)
15. [Ressources](#-ressources)
16. [FAQ / Troubleshooting](#-faq--troubleshooting)
17. [Reproduire la lab — Guide express](#-reproduire-la-lab--guide-express-5-min)

---

## 📋 Pré-requis

> **💻 Note OS** — Les commandes terminal de ce README utilisent **PowerShell** (défaut Windows). Si vous êtes sur **macOS/Linux**, remplacez `Rename-Item A B` par `mv A B` et `Remove-Item A` par `rm A`. Les commandes `npm`, `git`, `node` et `npx` sont identiques sur tous les OS.

### Outils à installer AVANT la lab

| Outil | Version min. | Pourquoi | Comment vérifier |
|-------|:---:|---------|---------|
| Node.js | 20+ | Runtime de l'app | `node --version` |
| npm | 10+ | Gestionnaire de paquets | `npm --version` |
| VS Code | 1.100+ | IDE de la lab | `code --version` |
| Git | 2.40+ | Cloner le repo | `git --version` |
| Docker | 24+ | MCP awesome-copilot (optionnel) | `docker --version` |

### Extensions VS Code à installer

Ouvrir VS Code → `Ctrl+Shift+X` (Extensions) → Installer :

| Extension | ID | Obligatoire |
|-----------|-----|:---:|
| GitHub Copilot | `github.copilot` | ✅ |
| GitHub Copilot Chat | `github.copilot-chat` | ✅ |
| Playwright Test | `ms-playwright.playwright` | ✅ |

**Ou via le terminal** :
```bash
code --install-extension github.copilot
code --install-extension github.copilot-chat
code --install-extension ms-playwright.playwright
```

### Licence GitHub Copilot

Une licence active est nécessaire : Individual, Business, ou Enterprise.
Vérifier : https://github.com/settings/copilot

---

## 🚀 Installation pas à pas

### Étape 1 — Cloner le repository

```bash
git clone https://github.com/Ch0wseth/AzureDays_Demo.git
cd AzureDays_Demo
```

### Étape 2 — Installer les dépendances Node.js

```bash
npm install
```

> ✅ **Vérification** : Le dossier `node_modules/` est créé, pas d'erreur dans le terminal.

### Étape 3 — Installer les navigateurs Playwright

```bash
npx playwright install chromium
```

> ✅ **Vérification** : Le message "Downloading Chromium..." apparaît puis "chromium installed".

### Étape 4 — Vérifier que tout fonctionne

```bash
# Lancer les tests unitaires
npm test
```

> ✅ **Résultat attendu** : `Test Suites: 2 passed, 2 total` et `Tests: 29 passed, 29 total`

```bash
# Lancer le serveur
npm run dev
```

> ✅ **Résultat attendu** : `🚀 Copilot Demo running at http://localhost:3000`

### Étape 5 — Ouvrir dans VS Code

```bash
code .
```

### Étape 6 — Vérifier l'app dans le navigateur

Ouvrir http://localhost:3000 dans Chrome/Firefox.

> ✅ **Résultat attendu** : Page avec fond sombre (Orange Boosted dark mode), navbar Orange, titre "GitHub Copilot Demo", sections Tâches/Analytiques/Copilot.

---

## ⚙️ Configuration VS Code

### Settings pour le suivi des tokens

Ouvrir les settings (`Ctrl+,`) → cliquer sur l'icône `{}` en haut à droite (Open Settings JSON) → ajouter :

```json
{
  "github.copilot.advanced.debug.showTokenCount": true,
  "chat.experimental.showTokenCount": true
}
```

> ⚠️ **Note** : Ces settings sont **expérimentaux** et peuvent être renommés ou supprimés selon les versions de l'extension Copilot. Si l'un d'eux n'est pas reconnu (souligné en jaune dans settings.json), supprimez-le — le compteur de tokens reste visible dans le panneau Output (`Ctrl+Shift+U` → `GitHub Copilot Chat`).

### Vérifier que les MCP servers sont détectés

1. Ouvrir la palette de commandes : `Ctrl+Shift+P`
2. Taper : `MCP: List Servers`
3. Vous devez voir :
   - ✅ `playwright` — Status: Ready (ou "Not Started" → il démarrera au premier usage)
   - ✅ `awesome-copilot` — Status: Ready (nécessite Docker) ou erreur si Docker n'est pas lancé

> **Si le MCP Playwright n'apparaît pas** : vérifier que `.vscode/mcp.json` existe et recharger VS Code (`Ctrl+Shift+P` → `Developer: Reload Window`).

### Vérifier que les Custom Instructions sont chargées

1. Ouvrir `.github/copilot-instructions.md`
2. Ouvrir Copilot Chat (`Ctrl+Alt+I`)
3. Taper : `Quel framework CSS utilise ce projet ?`
4. Copilot doit répondre "Orange Boosted" (preuve qu'il a lu les instructions)

---

## 📊 Suivi des Tokens (tout au long de la lab)

### Où voir les tokens

| Méthode | Comment | Ce qu'on voit |
|---------|---------|---------------|
| Output Panel | `Ctrl+Shift+U` → dropdown → `GitHub Copilot Chat` | Logs détaillés avec token counts |
| Chat Header | En haut de chaque réponse dans Copilot Chat | Nombre de tokens (si setting activé) |
| Dashboard GitHub | https://github.com/settings/copilot → Usage | Consommation globale par jour |

### Tableau de suivi — À IMPRIMER ou ouvrir à côté

Remplir ce tableau **à chaque étape** de la lab :

| # | Étape | Prompt exact | Tokens In | Tokens Out | Total | Observation |
|---|-------|-------------|:---------:|:----------:|:-----:|-------------|
| 1 | Génération code | _(commentaire JSDoc)_ | | | | Baseline |
| 2 | Génération tests | `/tests #file:src/services/taskService.js` | | | | |
| 3 | Génération docs | `/doc` sur sanitizeInput | | | | |
| 4 | Mode Ask | `Explique le filtrage dans getTasks()...` | | | | **Référence pour comparer** |
| 5 | Mode Edit | `Ajoute validation description max 500...` | | | | |
| 6 | Mode Agent | `Ajoute un système de catégories...` | | | | Agent = plus de tokens |
| 7 | Custom Prompt | `/generate-route` | | | | Prompt pré-défini |
| 8 | MCP Playwright | `Navigue vers localhost:3000...` | | | | |
| 9 | Caveman Mode | **Même prompt que #4** | | | | **Comparer OUT avec #4** |
| 10 | Sans .copilotignore | **Même prompt que #4** | | | | **Comparer IN avec #4** |

---

## 🎬 LAB 1 — Génération de Code

### 🎯 Objectif
Montrer que Copilot génère du code JS complet et de qualité à partir d'un simple commentaire.

### 📝 Modus Operandi

**Ce que vous faites** :

1. Dans VS Code, **créer un nouveau fichier** :
   - Clic droit sur `src/services/` → New File → nommer `categoryService.js`

2. **Taper exactement ce contenu** (ne PAS copier-coller, taper pour que Copilot propose) :

```javascript
/**
 * @fileoverview Category management service.
 * Provides CRUD operations for task categories.
 * Uses in-memory storage like taskService.
 * @module services/categoryService
 */

// Available categories
const DEFAULT_CATEGORIES = ['bug', 'feature', 'documentation', 'test'];

```

3. **Placer le curseur** à la ligne vide après `DEFAULT_CATEGORIES`

4. **Taper** : `export function` → **ATTENDRE** que le ghost text (gris) apparaisse

5. **Accepter** avec `Tab`

6. **Continuer** : placer le curseur après la fonction générée, appuyer `Enter` 2 fois → Copilot propose la fonction suivante

7. **Répéter** jusqu'à avoir 3-4 fonctions

### ✅ Résultat attendu

Copilot génère un service complet avec :
- `createCategory(name)` — Ajoute une catégorie avec validation
- `getCategories()` — Liste toutes les catégories
- `deleteCategory(name)` — Supprime une catégorie
- `isValidCategory(name)` — Vérifie si une catégorie existe

Chaque fonction a :
- Du JSDoc automatique (parce qu'on a mis un `@fileoverview`)
- De la validation d'entrée (cohérent avec `taskService.js`)
- Le même style ES Module que le reste du projet

### 📊 TOKENS — Noter dans le tableau (ligne 1)

---

## 🎬 LAB 2 — Génération de Tests

### 🎯 Objectif
Montrer que Copilot génère des tests unitaires complets et pertinents.

### 📝 Modus Operandi

**Méthode 1 — Commande /tests** :

1. **Ouvrir** Copilot Chat : `Ctrl+Alt+I`
2. **Taper exactement** :

```
/tests #file:src/services/taskService.js
```

3. **Attendre** la génération (5-10 secondes)
4. **Montrer** le résultat : suite Jest complète

**Méthode 2 — Prompt File personnalisé** :

1. **Ouvrir** Copilot Chat : `Ctrl+Alt+I`
2. **Taper** `/` (slash) → une liste de prompts apparaît
3. **Sélectionner** `generate-tests`
4. **Compléter** avec : `pour le fichier src/utils/validators.js`
5. **Montrer** : Copilot utilise le template du prompt file pour structurer les tests

### ✅ Résultat attendu

Pour `taskService.js`, Copilot génère ~15-20 tests couvrant :
- ✅ Création avec données valides
- ✅ Erreurs sur titre trop court/long
- ✅ Priorité invalide
- ✅ Filtrage par status et priority
- ✅ Mise à jour partielle
- ✅ Suppression existante/inexistante
- ✅ Statistiques

### 📊 TOKENS — Noter dans le tableau (ligne 2)

---

## 🎬 LAB 3 — Génération de Documentation

### 🎯 Objectif
Montrer que Copilot génère de la documentation JSDoc riche et précise.

### 📝 Modus Operandi

**Méthode 1 — Commande /doc dans le chat** :

1. **Ouvrir** `src/utils/validators.js`
2. **Sélectionner** la fonction `sanitizeInput` (lignes 19-27 environ)
3. **Ouvrir** Copilot Chat : `Ctrl+Alt+I`
4. **Taper exactement** :

```
/doc Génère la documentation JSDoc complète avec des exemples d'usage pour cette fonction
```

5. **Montrer** : Copilot génère un JSDoc enrichi avec `@example`

**Méthode 2 — Inline (autocomplétion)** :

1. **Ouvrir** `src/services/taskService.js`
2. **Aller** à la ligne juste au-dessus de `function generateId()` (ligne ~107)
3. **Supprimer** le commentaire existant `/** Generates a simple unique ID. */`
4. **Taper** `/**` puis appuyer `Enter`
5. **Observer** : Copilot complète automatiquement le bloc JSDoc

### ✅ Résultat attendu

```javascript
/**
 * Sanitizes a string to prevent XSS attacks by escaping HTML entities.
 * @param {string} input - Raw user input string to sanitize.
 * @returns {string} Sanitized string safe for HTML rendering.
 * @example
 * sanitizeInput('<script>alert("xss")</script>')
 * // Returns: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
 * @example
 * sanitizeInput('Hello World')
 * // Returns: 'Hello World'
 */
```

### 📊 TOKENS — Noter dans le tableau (ligne 3)

---

## 🎬 LAB 4 — Modes Copilot (Ask, Edit, Agent)

### 🎯 Objectif
Montrer les 3 modes d'interaction avec Copilot et leurs cas d'usage.

---

### 4a. Mode Ask — Comprendre du code

**Quand l'utiliser** : Questions sur le code, explications, revue, audit sécurité.

**Modus Operandi** :

1. **Ouvrir** Copilot Chat : `Ctrl+Alt+I`
2. **S'assurer** que le mode est "Ask" (dropdown en haut du chat)
3. **Taper exactement** :

```
Explique-moi comment fonctionne le filtrage dans la fonction getTasks() du fichier src/services/taskService.js et quels sont les risques de performance si on a 10000 tâches
```

4. **Attendre** la réponse complète

**✅ Résultat attendu** :

Copilot explique :
- Le spread `[...tasks]` crée une copie
- Les `.filter()` chaînés font des passes O(n) multiples
- Le `.sort()` fait O(n log n) en plus
- **Suggestion** : combiner les filtres en une seule passe, utiliser un index/Map


### 📊 TOKENS — Noter dans le tableau (ligne 4) ⚠️ GARDER CE CHIFFRE, on le compare à l'étape 9

---

### 4b. Mode Edit — Modifier du code inline

**Quand l'utiliser** : Modifications chirurgicales sans quitter l'éditeur.

**Modus Operandi** :

1. **Ouvrir** `src/services/taskService.js`
2. **Sélectionner** toute la fonction `createTask` (de `export function createTask` jusqu'à l'accolade fermante, ~lignes 20-42)
3. **Appuyer** `Ctrl+I` → La barre d'édition inline apparaît
4. **Taper exactement** :

```
Ajoute la validation de la description : maximum 500 caractères. Si elle dépasse 200 caractères, log un console.warn avec le nombre de caractères.
```

5. **Appuyer** Entrée
6. **Observer** le diff inline :
   - Lignes en **rouge** = code supprimé/modifié
   - Lignes en **vert** = code ajouté
7. **Cliquer** "Accept" (✓) ou "Reject" (✗)

**✅ Résultat attendu** :

Copilot ajoute dans le corps de `createTask`, après la validation du titre :
```javascript
if (description.length > 500) {
  throw new Error('Description must not exceed 500 characters');
}
if (description.length > 200) {
  console.warn(`Description is ${description.length} characters (recommended: < 200)`);
}
```


### 📊 TOKENS — Noter dans le tableau (ligne 5)

---

### 4c. Mode Agent — Tâches multi-fichiers

**Quand l'utiliser** : Nouvelles fonctionnalités complètes, refactoring cross-files.

**Modus Operandi** :

1. **Ouvrir** Copilot Chat : `Ctrl+Alt+I`
2. **Changer le mode** : cliquer sur le dropdown en haut → sélectionner **"Agent"**
3. **Taper exactement** :

```
Ajoute un système de catégories aux tâches. Voici ce que je veux :

1. Dans src/services/taskService.js :
   - Ajouter un champ "category" aux tâches (valeurs: "bug", "feature", "documentation", "test")
   - Valider la catégorie à la création (optionnelle, défaut: null)
   - Permettre le filtrage par catégorie dans getTasks()

2. Dans src/routes/tasks.js :
   - Accepter le query param ?category= dans GET /api/tasks
   - Accepter "category" dans le body de POST /api/tasks

3. Dans public/index.html :
   - Ajouter un <select> de catégorie dans le modal de création
   - Ajouter un <select> de filtre par catégorie (à côté des filtres existants)

4. Dans public/js/app.js :
   - Envoyer la catégorie lors de la création
   - Appliquer le filtre catégorie dans loadTasks()
   - Afficher la catégorie sous forme de badge sur chaque tâche

5. Créer tests/categoryFeature.test.js :
   - Tester la création avec/sans catégorie
   - Tester le filtrage par catégorie
   - Tester la validation des catégories invalides
```

4. **Observer** :
   - Copilot affiche un **plan d'exécution** (liste des fichiers à modifier)
   - Il commence à modifier chaque fichier un par un
   - Il peut demander confirmation pour continuer
5. **Accepter** les modifications proposées (bouton "Apply" ou "Accept All")
6. **Tester** :

```bash
npm test
```

**✅ Résultat attendu** :
- 5-6 fichiers modifiés/créés
- L'app affiche les catégories dans le formulaire et les filtres
- Les tests passent


### 📊 TOKENS — Noter dans le tableau (ligne 6) — Comparer avec les modes Ask/Edit

---

## 🎬 LAB 5 — Custom Agents, Prompts, Instructions, Skills & MCP

### 🎯 Objectif
Créer from scratch chaque type de personnalisation Copilot et observer son effet immédiat.

---

### 📖 Vue d'ensemble — Les 6 mécanismes de personnalisation

Avant de commencer, voici ce que chaque mécanisme fait et comment il se matérialise dans VS Code :

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    PERSONNALISATION COPILOT                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  📋 INSTRUCTIONS                    🤖 AGENTS                           │
│  ┌──────────────────────┐           ┌──────────────────────┐            │
│  │ .github/              │           │ .github/agents/       │           │
│  │   copilot-instructions│           │   code-reviewer.md   │            │
│  │   .md                 │           │   qa-tester.md       │            │
│  │                       │           │   caveman-mode.md    │            │
│  │ Effet : injecté       │           │                       │           │
│  │ automatiquement à     │           │ Effet : sélectionnable│           │
│  │ CHAQUE requête        │           │ dans le dropdown      │           │
│  └──────────────────────┘           └──────────────────────┘            │
│                                                                          │
│  📋 INSTRUCTIONS COND.              📝 PROMPT FILES                     │
│  ┌──────────────────────┐           ┌──────────────────────┐            │
│  │ .github/instructions/ │           │ .github/prompts/      │           │
│  │   tests.instructions  │           │   generate-route.md  │            │
│  │   .md (applyTo:       │           │   generate-tests.md  │            │
│  │   "tests/**")         │           │                       │           │
│  │                       │           │ Effet : invocable     │           │
│  │ Effet : injecté       │           │ avec /nom dans chat   │           │
│  │ seulement pour les    │           │                       │           │
│  │ fichiers qui matchent │           └──────────────────────┘            │
│  └──────────────────────┘                                                │
│                                                                          │
│  🔧 MCP SERVERS                     🎯 SKILLS                           │
│  ┌──────────────────────┐           ┌──────────────────────┐            │
│  │ .vscode/mcp.json      │           │ Agent + MCP + Prompt  │           │
│  │   playwright          │           │ combinés ensemble     │           │
│  │   awesome-copilot     │           │                       │           │
│  │                       │           │ Effet : workflow       │           │
│  │ Effet : donne des     │           │ complet automatisé    │           │
│  │ CAPACITÉS (naviguer,  │           │ (ex: audit a11y =     │           │
│  │ cliquer, DB, API)     │           │ prompt + navigateur)  │           │
│  └──────────────────────┘           └──────────────────────┘            │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

| Mécanisme | Fichier | Activation | Portée |
|-----------|---------|-----------|--------|
| Instructions projet | `.github/copilot-instructions.md` | Automatique | Toutes les requêtes |
| Instructions conditionnelles | `.github/instructions/*.md` | Automatique si glob matche | Fichiers spécifiques |
| Prompt Files | `.github/prompts/*.prompt.md` | Manuelle (`/nom`) | 1 requête |
| Custom Agents | `.github/agents/*.agent.md` | Manuelle (dropdown ou `@nom`) | Toute la conversation |
| MCP Servers | `.vscode/mcp.json` | Automatique (mode Agent) | Ajoute des outils |
| Skills | Agent + MCP + Prompt combinés | Manuelle | Workflow complet |

---

### 5a. Instructions — Le contexte permanent automatique

#### 📖 Concept

Les **Instructions** sont du texte injecté automatiquement dans CHAQUE requête à Copilot. Vous n'avez rien à faire — dès que le fichier existe, Copilot le lit.

**2 types d'instructions** :

| Type | Fichier | Quand c'est injecté |
|------|---------|-------------------|
| **Projet** (global) | `.github/copilot-instructions.md` | TOUJOURS, à chaque requête |
| **Conditionnel** | `.github/instructions/nom.instructions.md` | Seulement quand le fichier actif matche le glob `applyTo` |

**Où ça apparaît dans VS Code** :
- Vous ne voyez RIEN dans l'UI — c'est invisible. Les instructions sont envoyées en coulisse.
- Pour prouver qu'elles sont actives : observer le comportement de Copilot (langue, style, classes CSS).
- Pour voir l'impact tokens : regarder `request token count` dans Output (il inclut les instructions).

**Format du fichier** :

```markdown
# .github/copilot-instructions.md (instructions globales — PAS de frontmatter)

## Contexte Projet
Description du projet, stack, architecture...

## Conventions
- Style de code
- Langue
- Frameworks/librairies à utiliser
```

```markdown
# .github/instructions/nom.instructions.md (conditionnel — AVEC frontmatter)
---
applyTo: "src/routes/**"
---
Instructions spécifiques aux routes...
```

**Ce que c'est** : Un fichier `.github/copilot-instructions.md` qui injecte du contexte permanent à Copilot à chaque requête.

#### 🔬 Manipulation — Observer l'effet ON/OFF

**Étape 1** — Ouvrir Copilot Chat, taper :
```
Crée un composant HTML pour un message de succès quand une tâche est créée
```
Observer le résultat : classes utilisées, langue du texte, style.

**Étape 2** — Ouvrir `.github/copilot-instructions.md` (`Ctrl+P` → `copilot-instructions`). Observer le contenu :
```markdown
## Project Context
This is a JavaScript demo application using **Orange Boosted 5.3**...

## Code Style
- Use ES Modules (`import/export`)
- Use JSDoc for all exported functions
- All UI text in French

## Orange Boosted Guidelines
- Always use Boosted classes instead of custom CSS
- Follow Orange Design System color palette (primary: #ff7900)
```

**Étape 3** — Renommer temporairement le fichier pour le désactiver :
```powershell
# Windows (PowerShell)
Rename-Item .github/copilot-instructions.md copilot-instructions.md.bak

# macOS / Linux (bash)
# mv .github/copilot-instructions.md .github/copilot-instructions.md.bak
```

**Étape 4** — Nouvelle conversation (`+`), même prompt :
```
Crée un composant HTML pour un message de succès quand une tâche est créée
```

**Étape 5** — Comparer les résultats :

| Aspect | Avec instructions | Sans instructions |
|--------|------------------|-------------------|
| Classes CSS | ✅ Orange Boosted (`alert-success`, `bg-dark`) | ❌ Bootstrap vanilla ou Tailwind |
| Langue texte | ✅ Français | ❌ Anglais (probable) |
| Dark mode | ✅ Respecté | ❌ Non mentionné |
| Couleur primaire | ✅ `#ff7900` | ❌ Bleu Bootstrap |

**Étape 6** — Remettre le fichier :
```powershell
# Windows (PowerShell)
Rename-Item .github/copilot-instructions.md.bak copilot-instructions.md

# macOS / Linux (bash)
# mv .github/copilot-instructions.md.bak .github/copilot-instructions.md
```

#### 🔬 Manipulation — Créer une instruction conditionnelle from scratch

**Étape 1** — Créer un nouveau fichier `.github/instructions/api-routes.instructions.md` :
```
Ctrl+Shift+P → File: New File → .github/instructions/api-routes.instructions.md
```

**Étape 2** — Copier ce contenu :
```markdown
---
applyTo: "src/routes/**"
---
Conventions pour les routes API :
- Toujours valider les entrées en début de handler
- Format réponse succès : { data: ... }
- Format réponse erreur : { error: "message explicite" }
- Status codes : 200 (ok), 201 (created), 400 (bad input), 404 (not found), 500 (server error)
- Toujours wrapper dans try/catch
- Logger les erreurs avec console.error avant de les retourner
```

**Étape 3** — Ouvrir `src/routes/tasks.js` et taper dans Copilot Chat :
```
#file:src/routes/tasks.js Ajoute un endpoint DELETE /api/tasks/:id
```
Observer : Copilot suit automatiquement les conventions (try/catch, format { data }, validation, logs).

**Étape 4** — Ouvrir `src/services/taskService.js` et taper :
```
#file:src/services/taskService.js Ajoute une méthode pour archiver une tâche
```
Observer : les conventions de routes NE S'APPLIQUENT PAS (le fichier est hors du glob `src/routes/**`).

#### 📊 Comment voir l'effet
- **Output panel** : les tokens IN sont légèrement plus élevés quand l'instruction est active (~+100-200 tokens)
- **Qualité** : le code suit les conventions sans qu'on les re-demande à chaque fois

---

### 5b. Prompt Files — Les templates réutilisables

#### 📖 Concept

Les **Prompt Files** sont des templates de prompts stockés dans `.github/prompts/`. Ils sont invocables à la demande avec `/nom-du-fichier` dans Copilot Chat.

**Différence avec les Instructions** :
- Instructions = injectées automatiquement (vous ne les appelez jamais)
- Prompt Files = appelés manuellement quand VOUS décidez (`/nom`)

**Où ça apparaît dans VS Code** :
- Taper `/` dans Copilot Chat → la liste de vos prompt files apparaît
- Sélectionner un prompt file → son contenu est envoyé comme base du prompt
- Vous ajoutez la partie variable (ce qui change à chaque utilisation)

**Format du fichier** :
```markdown
# .github/prompts/mon-template.prompt.md

---
description: "Texte affiché dans le menu de sélection quand on tape /"
---
# Instructions fixes (envoyées à chaque utilisation du template)

Les conventions, le format attendu, les contraintes...
L'utilisateur ajoutera la partie variable après.
```

**Cas d'usage** :
- Créer un endpoint (toujours le même pattern) → `/generate-route`
- Créer un test (toujours le même format) → `/generate-tests`
- Créer un composant UI (toujours les mêmes conventions) → `/generate-boosted-component`

#### 🔬 Manipulation — Créer un Prompt File from scratch

**Étape 1** — Créer un nouveau fichier `.github/prompts/generate-service.prompt.md` :
```
Ctrl+Shift+P → File: New File → .github/prompts/generate-service.prompt.md
```

**Étape 2** — Écrire le template :
```markdown
---
description: "Créer un nouveau service CRUD avec in-memory store"
---
# Génération de Service

Crée un nouveau service dans `src/services/` avec :

## Structure obligatoire
- Export default d'une classe avec méthodes CRUD
- Store in-memory avec `new Map()`
- ID auto-généré avec `crypto.randomUUID()`

## Méthodes à inclure
- `getAll(filters)` — avec support pagination {page, limit}
- `getById(id)` — retourne null si non trouvé
- `create(data)` — valide les champs requis, ajoute createdAt
- `update(id, data)` — merge avec existant, ajoute updatedAt
- `delete(id)` — retourne le deleted ou null

## Style
- ES Modules (import/export)
- JSDoc sur chaque méthode
- Validation en début de méthode (early return pattern)
```

**Étape 3** — Ouvrir Copilot Chat. Taper `/` pour voir la liste des prompts disponibles :
- `generate-route` (existant)
- `generate-tests` (existant)
- `generate-boosted-component` (existant)
- `generate-service` ← **le nouveau apparaît !**

**Étape 4** — Sélectionner `generate-service` et compléter :
```
pour des catégories de tâches (id, name, color, icon, createdAt)
```

**Étape 5** — Observer le résultat : un service complet et cohérent, généré en 1 tour.

#### 📊 Comment voir l'effet

| Sans Prompt File | Avec Prompt File |
|------------------|-----------------|
| Taper 10-15 lignes de prompt à chaque service | Taper `/generate-service` + 1 ligne |
| Style variable d'un service à l'autre | Style identique à chaque fois |
| ~80 tokens IN de prompt utilisateur | ~15 tokens IN de prompt utilisateur |

---

### 5c. Custom Agents — Les personas spécialisés

#### 📖 Concept

Un **Custom Agent** est un persona Copilot avec des instructions spécialisées et des outils dédiés. Contrairement aux instructions (automatiques), un agent est **sélectionné manuellement** dans le dropdown de Copilot Chat.

**Différence avec Instructions et Prompt Files** :
- Instructions = toujours actives, pas de choix
- Prompt Files = 1 seul prompt avec `/nom`, puis c'est fini
- Agent = TOUTE la conversation utilise ce persona (chaque réponse suit ses règles)

**Où ça apparaît dans VS Code** :
```
┌─────────────────────────────────────────────┐
│  Copilot Chat                                │
│  ┌───────────────────────────────────┐      │
│  │ Mode: [Agent ▾]  Agent: [▾ ...]   │      │  ← Dropdown agent ICI
│  └───────────────────────────────────┘      │
│                                              │
│  En cliquant sur le dropdown agent :         │
│  ┌─────────────────────┐                    │
│  │ ● Copilot (défaut)  │                    │
│  │ ○ code-reviewer     │ ← vos agents       │
│  │ ○ full-review       │                    │
│  │ ○ qa-tester         │                    │
│  │ ○ caveman-mode      │                    │
│  └─────────────────────┘                    │
└─────────────────────────────────────────────┘
```

**Format du fichier** :
```markdown
# .github/agents/nom-agent.agent.md

---
description: "Description affichée dans le dropdown"
tools: ["editFiles", "runTerminalCommand", "codebase", "fetch", "useBrowser"]
---
# Nom de l'Agent

Instructions système : qui est l'agent, comment il se comporte,
quel format de réponse il utilise, sur quoi il se focalise.
```

**Le champ `tools`** contrôle ce que l'agent PEUT FAIRE :

| Tool | Capacité | Exemple |
|------|----------|---------|
| `editFiles` | Créer/modifier des fichiers | Générer du code, corriger un bug |
| `runTerminalCommand` | Exécuter des commandes shell | `npm test`, `git status` |
| `codebase` | Chercher dans le code du projet | Trouver les usages d'une fonction |
| `changes` | Voir le git diff | Analyser les modifications récentes |
| `fetch` | Faire des requêtes HTTP | Vérifier qu'une API répond |
| `useBrowser` | Piloter Playwright (si MCP configuré) | Naviguer, cliquer, screenshot |

**Sans `tools`** : l'agent ne peut QUE répondre avec du texte (pas d'actions).
**Avec `tools`** : l'agent peut AGIR (modifier fichiers, lancer commandes, naviguer).

**Ce que c'est** : Un "persona" Copilot sélectionnable dans le dropdown du Chat avec des instructions spécialisées.

#### 🔬 Manipulation — Créer un agent from scratch

> ℹ️ **Note** : Le fichier `code-reviewer.agent.md` existe déjà dans le repo. Pour cette manipulation, vous pouvez l'**ouvrir et observer** son contenu, ou le supprimer d'abord pour le recréer vous-même.

**Étape 1** — Ouvrir (ou créer) `.github/agents/code-reviewer.agent.md` :
```
Ctrl+Shift+P → File: New File → .github/agents/code-reviewer.agent.md
```

**Étape 2** — Écrire la définition de l'agent :
```markdown
---
description: "Agent de revue de code focalisé sécurité et performance"
tools: ["changes", "editFiles"]
---
# Code Reviewer Agent

Tu es un expert en revue de code. Tu analyses le code avec un focus sur :

## Sécurité
- Injections (SQL, XSS, Command)
- Données utilisateur non validées
- Secrets en dur dans le code
- CORS mal configuré

## Performance
- Boucles O(n²) évitables
- Fuites mémoire (listeners non nettoyés, closures)
- Requêtes N+1
- Absence de cache pour les opérations coûteuses

## Format de réponse
Pour chaque problème trouvé :
- 🔴 CRITIQUE / 🟡 ATTENTION / 🟢 SUGGESTION
- Fichier et ligne
- Problème en 1 phrase
- Fix proposé (code)

Si rien à signaler : "✅ RAS — code propre"
```

**Étape 3** — Ouvrir Copilot Chat. Cliquer sur le **dropdown en haut** (là où il y a "Ask" / "Edit" / "Agent") → vous voyez maintenant :
- `code-reviewer` ← **le nouveau agent !**
- `caveman-mode` (déjà existant)

**Étape 4** — Sélectionner `code-reviewer`, puis taper :
```
Analyse src/routes/tasks.js
```

**Étape 5** — Observer : l'agent répond avec le format défini (🔴/🟡/🟢) et est focalisé sécurité/perf.

**Étape 6** — Changer d'agent → sélectionner `caveman-mode`, même prompt :
```
Analyse src/routes/tasks.js
```
Observer : réponse ultra-courte, style "caveman" (pas de phrases complètes).

#### 📊 Comment voir l'effet

| Agent | Style de réponse | Focus |
|-------|-----------------|-------|
| (aucun — Chat normal) | Généraliste, verbose | Tout |
| `code-reviewer` | Structuré 🔴🟡🟢, actionnable | Sécurité + Perf |
| `caveman-mode` | Ultra-compact, mots-clés | Économie tokens |

**Différence avec Instructions** :
- Instructions = toujours actives (injectées automatiquement)
- Agent = activé à la demande (on le choisit dans le dropdown)

---

### 5d. Skills — Les workflows complets automatisés

#### 📖 Concept

Un **Skill** est la combinaison de plusieurs mécanismes pour créer un workflow complet. Ce n'est pas un fichier unique — c'est un **pattern d'assemblage** :

```
┌─────────────────────────────────────────────────────────┐
│                      SKILL                                │
│                                                           │
│  ┌─────────────┐  +  ┌──────────────┐  +  ┌──────────┐ │
│  │ Prompt File │     │ MCP Server   │     │ Agent    │  │
│  │ (quoi faire)│     │ (avec quoi)  │     │ (comment)│  │
│  └─────────────┘     └──────────────┘     └──────────┘  │
│                                                           │
│  Exemple : Audit Accessibilité                            │
│  ┌─────────────┐  +  ┌──────────────┐  +  ┌──────────┐ │
│  │ audit-      │     │ Playwright   │     │ qa-tester│  │
│  │ accessibility│     │ (naviguer,   │     │ (format  │  │
│  │ .prompt.md  │     │  cliquer,    │     │  rapport)│  │
│  │             │     │  screenshot) │     │          │  │
│  └─────────────┘     └──────────────┘     └──────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Différence avec les autres mécanismes** :
- Instructions = "comment parler" (style, conventions)
- Prompt Files = "quoi demander" (template réutilisable)
- Agents = "qui répond" (persona avec format)
- MCP = "quels outils" (capacités)
- **Skills = tout ça assemblé** pour un workflow de bout en bout

**3 façons de créer un Skill** :

| Méthode | Fichiers | Complexité | Puissance |
|---------|----------|-----------|-----------|
| Prompt File seul | `.github/prompts/skill.prompt.md` | ⭐ Simple | Workflow basique |
| Prompt File + MCP | Prompt + `.vscode/mcp.json` | ⭐⭐ Moyen | Workflow avec actions réelles |
| Agent + MCP + Instructions | `.agent.md` + MCP + `.instructions.md` | ⭐⭐⭐ Avancé | Workflow multi-passes intelligent |

#### 🔬 Manipulation 1 — Skill basique (Prompt File seul)

Un skill simple = un Prompt File qui décrit un workflow complet.

**Étape 1** — Créer `.github/prompts/generate-crud.prompt.md` :
```
Ctrl+Shift+P → File: New File → .github/prompts/generate-crud.prompt.md
```

**Étape 2** — Écrire :
```markdown
---
description: "Générer un CRUD complet (service + route + tests)"
---
# Skill : Génération CRUD Complète

Génère les 3 fichiers pour un nouveau module CRUD :

## 1. Service (src/services/{nom}Service.js)
- Classe avec Map() in-memory
- Méthodes : getAll, getById, create, update, delete
- JSDoc, validation, createdAt/updatedAt

## 2. Route (src/routes/{nom}.js)
- Express Router
- Endpoints : GET /, GET /:id, POST /, PUT /:id, DELETE /:id
- Format réponse { data } / { error }
- Try/catch + status codes

## 3. Tests (tests/{nom}Service.test.js)
- Test chaque méthode du service
- Cas nominaux + cas d'erreur (not found, validation)
- describe/it, assertions expect()

## Conventions
- ES Modules (import/export)
- Même style que les fichiers existants dans src/
```

**Étape 3** — En mode Agent, taper :
```
/generate-crud pour des catégories (id, name, color, icon)
```

**Étape 4** — Observer : Copilot génère LES 3 FICHIERS d'un coup (service + route + tests), tous cohérents entre eux.

#### 📊 Comment voir l'effet

| Sans skill | Avec skill `/generate-crud` |
|-----------|----------------------------|
| 3 prompts séparés (service, route, tests) | 1 seul prompt |
| Incohérences entre les fichiers | Tout est cohérent |
| ~3 min, ~2000 tokens total | ~30s, ~800 tokens |

---

#### 🔬 Manipulation 2 — Skill avec MCP (Prompt File + outil externe)

Un skill moyen = un Prompt File qui UTILISE un MCP pour agir dans le monde réel.

**Étape 1** — Le prompt file `audit-accessibility.prompt.md` existe déjà. Ouvrir :
```
Ctrl+P → audit-accessibility
```

**Étape 2** — Observer la structure :
```markdown
---
description: "Auditer l'accessibilité d'une page avec Playwright"
---
# Audit Accessibilité

Utilise le navigateur Playwright pour auditer l'accessibilité :
1. Naviguer vers http://localhost:3000
2. Prendre un screenshot
3. Vérifier : aria-labels, alt, contraste, tabindex, labels
4. Retourner rapport ✅/❌ par critère
```

**Étape 3** — S'assurer que le MCP Playwright est actif :
```
Ctrl+Shift+P → MCP: List Servers → playwright = Ready
```

**Étape 4** — En mode Agent, taper :
```
/audit-accessibility
```

**Étape 5** — Observer Copilot :
1. Lit le prompt file (instructions du workflow)
2. Utilise le MCP Playwright (outil) pour naviguer
3. Prend des screenshots
4. Vérifie les critères sur la page réelle
5. Retourne un rapport avec résultats réels

**Ce qui se passe VS Code** :
- Un navigateur Chromium s'ouvre (visible)
- Copilot affiche "Using tool: browser_navigate", "Using tool: browser_screenshot"
- Les screenshots apparaissent inline dans le chat
- Le rapport final liste ✅/❌ basés sur la page RÉELLE

---

#### 🔬 Manipulation 3 — Skill avancé (Agent + MCP + Instructions)

Le skill le plus puissant = un Agent dédié qui combine persona + outils + contexte.

**Étape 1** — On a déjà l'agent `qa-tester.agent.md` (créé plus tôt). Il combine :
- **Persona** : testeur QA avec format de rapport
- **Tools** : `useBrowser` (Playwright), `runTerminalCommand` (terminal)
- **Contexte** : les instructions projet s'appliquent aussi (conventions Orange Boosted)

**Étape 2** — Sélectionner `qa-tester` dans le dropdown agent.

**Étape 3** — Taper un scénario complexe :
```
Teste le workflow complet :
1. Crée 3 tâches avec des priorités différentes (basse, moyenne, haute)
2. Vérifie que les badges de priorité ont les bonnes couleurs
3. Filtre par priorité "haute" — vérifie qu'on ne voit qu'une tâche
4. Supprime une tâche — vérifie qu'elle disparaît
5. Vérifie que le compteur de tâches est à jour
```

**Étape 4** — Observer le skill en action :
1. Copilot vérifie que le serveur tourne (`runTerminalCommand: npm run dev`)
2. Ouvre le navigateur (`useBrowser: navigate`)
3. Crée les 3 tâches (`useBrowser: fill, click`)
4. Screenshots à chaque étape
5. Vérifie les couleurs, filtre, supprime
6. Produit un rapport structuré (persona qa-tester)

**Ce qui fait de cela un SKILL et pas juste un agent** :
- L'agent seul ne pourrait pas naviguer (il lui faut le MCP)
- Le MCP seul ne sait pas quoi faire (il lui faut le prompt)
- Le prompt seul ne peut pas exécuter (il lui faut le mode Agent + tools)
- **Les 3 ensemble = un skill complet**

---

#### 🔬 Manipulation 4 — Voir les outils disponibles

**Étape 1** — En mode Agent, taper :
```
Quels outils as-tu à disposition ? Liste-les avec une description.
```

**Étape 2** — Copilot listera :
- Outils built-in : `editFiles`, `runTerminalCommand`, `codebase`, `changes`, `fetch`
- Outils MCP Playwright : `browser_navigate`, `browser_click`, `browser_fill`, `browser_screenshot`, `browser_hover`, `browser_select`
- Outils MCP awesome-copilot (si Docker actif) : `search`, `install`

**Étape 3** — Vérifier via la palette :
```
Ctrl+Shift+P → MCP: List Servers
```
Cliquer sur un serveur → voir la liste de ses outils.

#### 📊 Résumé — Les 3 niveaux de skills

| Niveau | Composants | Exemple | Ce que ça fait |
|--------|-----------|---------|----------------|
| Basique | Prompt File | `/generate-crud` | Génère du code structuré |
| Moyen | Prompt + MCP | `/audit-accessibility` | Exécute dans le monde réel |
| Avancé | Agent + MCP + Tools | `qa-tester` + Playwright | Workflow multi-étapes intelligent |

---

### 5e. MCP (Model Context Protocol) — Donner des capacités à Copilot

#### 📖 Concept

**MCP** (Model Context Protocol) est un standard qui permet de connecter des **serveurs d'outils** à Copilot. Chaque serveur donne à Copilot de nouvelles CAPACITÉS qu'il n'a pas nativement.

**Analogie** : 
- Sans MCP → Copilot est un cerveau qui ne peut que parler
- Avec MCP → Copilot a des bras (Playwright = naviguer), des yeux (screenshot), des mains (cliquer)

**Comment ça fonctionne** :
```
┌──────────────────────┐         ┌─────────────────────┐
│   Copilot Chat       │◀──────▶│  MCP Server          │
│   (mode Agent)       │  JSON   │  (Playwright)        │
│                      │  RPC    │                      │
│   "Navigue vers..."  │────────▶│  Démarre Chromium    │
│                      │         │  Navigue             │
│   Résultat + image   │◀────────│  Retourne screenshot │
└──────────────────────┘         └─────────────────────┘
```

**Où ça se configure** : `.vscode/mcp.json` (par projet) ou settings utilisateur (global)

**Où ça apparaît dans VS Code** :
- `Ctrl+Shift+P` → `MCP: List Servers` → liste des serveurs et leur statut
- En mode Agent, Copilot affiche "Using tool: browser_navigate" quand il appelle un outil MCP
- Les résultats (screenshots, données) apparaissent inline dans le chat

**Types de MCP servers disponibles** :

| Serveur | Ce qu'il donne à Copilot | Cas d'usage |
|---------|--------------------------|-------------|
| **Playwright** | Naviguer, cliquer, remplir, screenshot | Tester l'UI, débugger visuellement |
| **awesome-copilot** | Chercher/installer des ressources communautaires | Découvrir des instructions/agents |
| **PostgreSQL/MySQL** | Requêter une base de données | Analyser les données, générer des queries |
| **GitHub** | Créer issues, PRs, chercher du code | Automatiser le workflow Git |
| **File System** | Lire/écrire des fichiers hors workspace | Accéder à des fichiers distants |
| **Docker** | Gérer des containers | DevOps, déploiement |

**Ce que c'est** : Un serveur MCP qui donne à Copilot la capacité de piloter un navigateur web réel.

#### 🔬 Manipulation — Configurer un MCP server pas à pas

**Étape 1** — Ouvrir ou créer `.vscode/mcp.json` :
```
Ctrl+Shift+P → MCP: Open User Configuration
```
Ou manuellement : `Ctrl+P` → `mcp.json`

**Étape 2** — Si le fichier n'existait pas, écrire la structure de base :
```json
{
  "mcp": {
    "servers": {

    }
  }
}
```

**Étape 3** — Ajouter le serveur Playwright :
```json
{
  "mcp": {
    "servers": {
      "playwright": {
        "command": "npx",
        "args": ["@playwright/mcp@latest"]
      }
    }
  }
}
```

**Étape 4** — Sauvegarder (`Ctrl+S`). VS Code détecte automatiquement le nouveau serveur.

**Étape 5** — Vérifier l'activation :
```
Ctrl+Shift+P → MCP: List Servers
```
Vous devez voir :
```
✅ playwright — Ready
   Tools: navigate, click, fill, screenshot, hover, select, ...
```

**Étape 6** — Si le statut est "Not Started", cliquer sur "Start" ou :
```
Ctrl+Shift+P → MCP: Start Server → playwright
```

**⚠️ Pré-requis** : Playwright doit être installé :
```powershell
# Terminal VS Code (Ctrl+`)
npx playwright install chromium
```

#### 🔬 Manipulation — Voir Copilot utiliser le MCP

**Pré-requis** : Le serveur de l'app doit tourner (`npm run dev`).

**Étape 1** — Vérifier que l'app tourne :
```powershell
# Terminal VS Code (Ctrl+`)
npm run dev
```
Ouvrir http://localhost:3000 pour confirmer.

**Étape 2** — Ouvrir Copilot Chat en mode **Agent** (dropdown → Agent)

**Étape 3** — Taper exactement :
```
Utilise le navigateur Playwright pour :
1. Aller sur http://localhost:3000
2. Prendre un screenshot de la page d'accueil
3. Cliquer sur le bouton "Nouvelle Tâche"
4. Remplir le titre avec "Tâche créée par Copilot MCP"
5. Sélectionner la priorité "Haute"
6. Cliquer sur "Créer"
7. Vérifier que la tâche apparaît dans la liste
8. Prendre un screenshot final
```

**Étape 4** — Observer :
- Copilot démarre un navigateur Chromium (visible à l'écran)
- Il navigue, clique, remplit des champs automatiquement
- Il prend des screenshots (affichés inline dans le chat)
- Il vérifie le résultat et confirme

**✅ Résultat attendu** :
- 2 screenshots dans le chat (avant/après)
- La tâche "Tâche créée par Copilot MCP" visible dans l'app
- Message de confirmation de Copilot

#### 🔬 Manipulation — Désactiver le MCP et voir la différence

**Étape 1** — Désactiver le MCP :
```
Ctrl+Shift+P → MCP: Stop Server → playwright
```

**Étape 2** — Même prompt dans Copilot Chat (mode Agent) :
```
Utilise le navigateur Playwright pour aller sur http://localhost:3000 et prendre un screenshot
```

**Étape 3** — Observer : Copilot ne peut PAS exécuter l'action. Il va :
- Soit dire qu'il n'a pas accès au navigateur
- Soit proposer du CODE Playwright à exécuter manuellement

**Étape 4** — Réactiver :
```
Ctrl+Shift+P → MCP: Start Server → playwright
```

#### 📊 Comment voir l'effet

| MCP Status | Comportement Copilot | Résultat |
|-----------|---------------------|----------|
| ✅ Started | EXÉCUTE les actions (navigate, click, screenshot) | Screenshots + résultats réels |
| ❌ Stopped | Génère du CODE à copier/coller | Pas d'exécution, théorique |

**Si ça ne marche pas** :
- Vérifier : `Ctrl+Shift+P` → `MCP: List Servers` → Playwright = "Ready"
- Vérifier : `npm run dev` tourne dans un terminal
- Recharger VS Code si nécessaire (`Ctrl+Shift+P` → `Developer: Reload Window`)

---

### 5f. Intégration MCP — Awesome Copilot (catalogue communautaire)

**Ce que c'est** : Un MCP server qui connecte Copilot au repo communautaire [github/awesome-copilot](https://github.com/github/awesome-copilot) contenant des centaines d'agents, instructions et prompts.

**Pré-requis** : Docker doit tourner.

#### 🔬 Manipulation — Ajouter un 2ème MCP server pas à pas

**Étape 1** — Vérifier Docker :
```powershell
# Terminal VS Code (Ctrl+`)
docker ps
```
Si Docker n'est pas installé, passer à l'alternative sans Docker (étape 7).

**Étape 2** — Ouvrir `.vscode/mcp.json` (`Ctrl+P` → `mcp.json`)

**Étape 3** — Ajouter le serveur `awesome-copilot` à côté de `playwright` :
```json
{
  "mcp": {
    "servers": {
      "playwright": {
        "command": "npx",
        "args": ["@playwright/mcp@latest"]
      },
      "awesome-copilot": {
        "type": "stdio",
        "command": "docker",
        "args": ["run", "-i", "--rm", "ghcr.io/microsoft/mcp-dotnet-samples/awesome-copilot:latest"]
      }
    }
  }
}
```

**Étape 4** — Sauvegarder (`Ctrl+S`). VS Code détecte le nouveau serveur.

> ⚠️ **Attention** : L'image Docker `ghcr.io/microsoft/mcp-dotnet-samples/awesome-copilot:latest` est un sample communautaire qui peut ne plus être maintenu ou disponible. Si le `docker pull` échoue, passez directement à l'[alternative sans Docker](#-alternative-sans-docker--installation-manuelle-depuis-github) ci-dessous.

**Étape 5** — Vérifier :
```
Ctrl+Shift+P → MCP: List Servers
```
Vous devez voir :
```
✅ playwright — Ready
✅ awesome-copilot — Ready (ou Starting...)
```

**Étape 6** — Utiliser le MCP. Ouvrir Copilot Chat en mode **Agent**, taper :
```
Utilise awesome-copilot pour rechercher des instructions disponibles pour Node.js et Express
```
Observer : Copilot interroge le MCP Docker, affiche les résultats de la communauté.

**Étape 7** — Demander à installer un résultat :
```
Installe l'instruction "nodejs" depuis awesome-copilot dans mon projet
```
Observer : Copilot crée automatiquement le fichier dans `.github/instructions/`.

#### 🔬 Alternative sans Docker — Installation manuelle depuis GitHub

**Étape 1** — Aller sur https://github.com/github/awesome-copilot

**Étape 2** — Naviguer dans les dossiers `instructions/` ou `agents/`

**Étape 3** — Trouver un fichier intéressant (ex: `instructions/nodejs.instructions.md`)

**Étape 4** — Cliquer "Raw" → copier le contenu

**Étape 5** — Dans VS Code, créer le fichier : `.github/instructions/nodejs.instructions.md` et coller

**Étape 6** — Copilot l'utilise immédiatement (pas besoin de redémarrer)

#### 📊 Comment voir l'effet

| Méthode | Effort | Résultat |
|---------|--------|----------|
| MCP awesome-copilot | Taper une question → Copilot installe | Automatique, découverte facile |
| GitHub manuellement | Copier/coller depuis le navigateur | Manuel mais pas de Docker requis |
| Sans rien | Écrire ses propres instructions | Long mais sur mesure |

---

### 5g. Sub-Agents — Orchestrer plusieurs agents ensemble

---

#### 🧩 Concept : Comment fonctionnent les agents et sub-agents dans VS Code

```
┌─────────────────────────────────────────────────────────────────┐
│                    COPILOT CHAT (VS Code)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Mode "Ask"    → Copilot seul, pas d'outils, pas de sub-agents  │
│  Mode "Edit"   → Copilot + édition fichiers, pas de sub-agents  │
│  Mode "Agent"  → Copilot + TOUS les outils + sub-agents         │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  En mode Agent, Copilot a accès à :                              │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │ @workspace   │  │ @terminal    │  │ @vscode              │   │
│  │ Recherche    │  │ Exécute cmds │  │ Contrôle l'éditeur   │   │
│  │ sémantique   │  │ npm test     │  │ settings, thèmes     │   │
│  │ dans TOUT    │  │ npm run dev  │  │ extensions           │   │
│  │ le projet    │  │ git status   │  │                      │   │
│  └──────────────┘  └──────────────┘  └──────────────────────┘   │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │ MCP Tools    │  │ Custom       │  │ Built-in Tools       │   │
│  │ (Playwright) │  │ Agents       │  │ (editFiles, changes  │   │
│  │ navigate     │  │ @code-review │  │  codebase, fetch)    │   │
│  │ click, fill  │  │ @full-review │  │                      │   │
│  │ screenshot   │  │ @caveman     │  │                      │   │
│  └──────────────┘  └──────────────┘  └──────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

**Principe clé** : En mode Agent, Copilot est un **orchestrateur**. Il décide quels outils/sub-agents appeler, dans quel ordre, et combine leurs résultats. Vous ne faites qu'un seul prompt — Copilot gère le reste.

---

#### 📍 Où ça se passe dans VS Code

**Le dropdown de mode** (en haut de Copilot Chat) :
```
┌─────────────────────────────────────┐
│  [Ask ▾]  [Edit ▾]  [Agent ▾]      │  ← Cliquer ici pour changer
│                                      │
│  Quand "Agent" est sélectionné :     │
│  - Copilot peut EXÉCUTER des actions │
│  - Les MCP tools sont disponibles    │
│  - Les @participants fonctionnent    │
│  - Les custom agents apparaissent    │
└─────────────────────────────────────┘
```

**Le sélecteur d'agent** (à côté du dropdown de mode) :
```
┌─────────────────────────────────────┐
│  Agent: [Copilot ▾]                  │  ← Cliquer pour changer d'agent
│                                      │
│  Options :                           │
│  • Copilot (défaut)                  │
│  • code-reviewer                     │  ← vos .agent.md
│  • full-review                       │
│  • caveman-mode                      │
└─────────────────────────────────────┘
```

**Les @mentions dans le chat** :
```
┌─────────────────────────────────────┐
│  Taper "@" dans le champ de saisie  │
│                                      │
│  Liste qui apparaît :                │
│  @workspace   — recherche projet     │
│  @terminal    — exécute commandes    │
│  @vscode      — contrôle éditeur     │
│  @code-reviewer — votre agent        │
│  @full-review   — votre agent        │
└─────────────────────────────────────┘
```

---

#### 🔑 Différence entre sélectionner un agent et @mentionner

| Action | Comment | Ce qui se passe |
|--------|---------|-----------------|
| **Sélectionner** un agent dans le dropdown | Cliquer le sélecteur d'agent | TOUTE la conversation utilise ce persona. Chaque réponse suit ses instructions. |
| **@mentionner** un participant | Taper `@workspace` dans le prompt | UN SEUL tour utilise ce participant. Le tour suivant revient au mode normal. |

**Exemple concret** :
- Sélectionner `code-reviewer` → tout ce que vous tapez est analysé sous l'angle sécurité/perf
- Taper `@workspace où est la validation ?` → Copilot cherche dans le projet, puis revient en mode normal

---

#### Les participants intégrés (built-in) — Détail

##### `@workspace` — Recherche sémantique dans tout le projet

**Ce qu'il fait** :
- Indexe TOUS les fichiers du workspace (sauf `.copilotignore`)
- Comprend le code (pas juste du texte) : il sait ce qu'est une fonction, une classe, un import
- Trouve les fichiers pertinents même s'ils sont fermés

**Quand l'utiliser** :
- "Où est défini X ?"
- "Quels fichiers utilisent la fonction Y ?"
- "Explique l'architecture du projet"
- "Trouve tous les TODO dans le code"

**Ce qu'il ne fait PAS** :
- Il ne modifie pas les fichiers
- Il n'exécute pas de commandes
- Il ne navigue pas sur le web

##### `@terminal` — Exécution de commandes

**Ce qu'il fait** :
- Exécute des commandes dans le terminal intégré VS Code
- Lit la sortie et l'interprète
- Peut enchaîner plusieurs commandes

**Quand l'utiliser** :
- "Lance les tests et dis-moi si ça passe"
- "Installe ce package"
- "Montre le git log des 5 derniers commits"
- "Vérifie que le serveur tourne"

##### `@vscode` — Contrôle de l'éditeur

**Ce qu'il fait** :
- Modifie les settings (`settings.json`)
- Installe/désinstalle des extensions
- Change le thème, la police, le layout
- Ouvre des fichiers, crée des snippets

**Quand l'utiliser** :
- "Configure l'éditeur pour ce projet"
- "Installe l'extension ESLint"
- "Change le thème en One Dark Pro"

---

#### 🔬 Manipulation 1 — Voir les sub-agents en action (pas à pas)

**Pré-requis** : Être en mode **Agent** (pas Ask ni Edit).

**Étape 1** — Ouvrir Copilot Chat : `Ctrl+Alt+I`

**Étape 2** — Vérifier le mode : cliquer sur le dropdown en haut → sélectionner **"Agent"**

**Étape 3** — Taper `@` dans le champ de saisie. Observer la liste qui apparaît :
```
@workspace
@terminal  
@vscode
@code-reviewer   (si vous avez créé l'agent en 5c)
@full-review     (si vous avez créé l'agent plus haut)
@caveman-mode    (déjà dans le repo)
```

**Étape 4** — Tester `@workspace`. Taper exactement :
```
@workspace Quels fichiers contiennent de la logique de validation ? Liste-les avec une description de ce qu'ils valident.
```

**Étape 5** — Observer dans le chat :
- Copilot affiche un indicateur "Searching workspace..." 
- Il trouve `src/utils/validators.js`, `src/services/taskService.js`
- Il résume ce que chaque fichier valide
- **Important** : il a trouvé ça SANS que ces fichiers soient ouverts

**Étape 6** — Tester `@terminal`. Taper :
```
@terminal Lance npm test et résume les résultats. Combien de tests passent ? Y en a-t-il qui échouent ?
```

**Étape 7** — Observer dans le chat :
- Copilot ouvre un terminal (ou utilise celui existant)
- Il exécute `npm test`
- Il attend la fin
- Il résume : "29 tests passent, 0 échecs, 2 suites de tests"
- **Important** : vous pouvez voir la commande s'exécuter dans le terminal VS Code

**Étape 8** — Tester `@vscode`. Taper :
```
@vscode Montre-moi les settings actuels liés à Copilot dans ce workspace
```

**Étape 9** — Observer : Copilot liste vos settings Copilot (debug tokens, etc.)

---

#### 🔬 Manipulation 2 — Combiner plusieurs @participants dans une conversation

**Scénario** : Vous voulez comprendre un bug puis le corriger.

**Étape 1** — Trouver le problème avec `@workspace` :
```
@workspace Est-ce que la fonction deleteTask() gère le cas où l'ID n'existe pas ? Si oui, dans quel fichier ?
```
Copilot cherche et répond (ex: "Dans taskService.js, ligne 45, elle retourne null si non trouvé").

**Étape 2** — Dans la MÊME conversation, vérifier avec `@terminal` :
```
@terminal Lance les tests qui concernent deleteTask pour vérifier si ce cas edge est testé
```
Copilot exécute un test filtré et rapporte le résultat.

**Étape 3** — Toujours dans la MÊME conversation, demander un fix :
```
Ajoute un test pour le cas où deleteTask est appelé avec un ID inexistant, puis lance les tests pour vérifier que ça passe.
```
Copilot (en mode Agent) :
1. Crée le test dans le fichier approprié
2. Exécute `npm test` 
3. Confirme que le nouveau test passe

**Ce qui s'est passé** : 3 prompts dans UNE conversation, Copilot a utilisé @workspace (recherche) → @terminal (vérification) → outils Agent (édition + exécution) de manière fluide.

---

#### 🔬 Manipulation 3 — Custom Agent comme sub-agent (@mention)

**Étape 1** — S'assurer que `code-reviewer.agent.md` existe (créé en 5c).

**Étape 2** — En mode Agent, taper :
```
@code-reviewer Analyse #file:src/routes/tasks.js — focus sur les failles de sécurité
```

**Étape 3** — Observer la différence avec un prompt normal :
- **Sans @code-reviewer** : Copilot donne une réponse généraliste
- **Avec @code-reviewer** : Copilot utilise le persona défini (format 🔴🟡🟢, focus sécurité/perf)

**Étape 4** — Enchaîner avec un autre agent :
```
@full-review Maintenant fais une revue complète du même fichier (code + tests + a11y)
```
Observer : le format change (3 passes structurées).

---

#### 🔬 Manipulation 4 — Agent orchestrateur avec `tools`

**Concept** : Le champ `tools` dans l'en-tête d'un `.agent.md` détermine ce que l'agent PEUT FAIRE.

**Étape 1** — Ouvrir `.github/agents/full-review.agent.md`. Observer l'en-tête :
```yaml
---
description: "Revue complète : code + tests + accessibilité"
tools: ["changes", "editFiles", "runTerminalCommand"]
---
```

Les tools disponibles :

| Tool | Ce qu'il permet à l'agent | Exemple d'usage |
|------|--------------------------|-----------------|
| `changes` | Voir les fichiers modifiés (git diff) | "Analyse les changements récents" |
| `editFiles` | Créer et modifier des fichiers | "Crée un test manquant" |
| `runTerminalCommand` | Exécuter des commandes shell | "Lance npm test" |
| `codebase` | Chercher dans le code (comme @workspace) | "Trouve les usages de X" |
| `fetch` | Faire des requêtes HTTP | "Vérifie que l'API répond" |
| `useBrowser` | Utiliser le MCP Playwright | "Teste la page dans un navigateur" |

**Étape 2** — Sélectionner `full-review` dans le **dropdown d'agent** (pas @mention) :
```
Dropdown agent → full-review
```

**Étape 3** — Taper :
```
Fais une revue complète de src/services/taskService.js
```

**Étape 4** — Observer Copilot orchestrer :
1. **Passe 1 (code)** : Il lit le fichier, vérifie les conventions, cherche les bugs
2. **Passe 2 (tests)** : Il exécute `npm test` via `runTerminalCommand`, vérifie la couverture
3. **Passe 3 (a11y)** : Il vérifie si des fichiers HTML sont liés (skip si non)
4. **Verdict** : Il produit le rapport structuré

**Ce qui se passe visuellement dans VS Code** :
- Vous voyez les "thinking..." et "Using tool: runTerminalCommand" apparaître
- Le terminal s'active quand Copilot lance les tests
- Le rapport final apparaît formaté dans le chat

---

#### 🔬 Manipulation 5 — Créer un agent qui utilise le navigateur (MCP + Agent)

**Étape 1** — Créer `.github/agents/qa-tester.agent.md` :
```markdown
---
description: "Agent QA qui teste l'app dans un vrai navigateur"
tools: ["useBrowser", "runTerminalCommand", "editFiles"]
---
# QA Tester Agent

Tu es un testeur QA automatisé. Quand on te demande de tester :

1. Vérifie que le serveur tourne (sinon lance `npm run dev`)
2. Ouvre le navigateur sur http://localhost:3000
3. Exécute le scénario de test demandé
4. Prends des screenshots à chaque étape clé
5. Rapporte les résultats avec screenshots

## Format de rapport
- ✅ PASS : étape réussie (+ screenshot)
- ❌ FAIL : étape échouée (+ screenshot + description du problème)

## Fin du test
Résumé : X/Y étapes passées
```

**Étape 2** — Sélectionner `qa-tester` dans le dropdown agent.

**Étape 3** — Taper :
```
Teste le scénario suivant :
1. Ouvre la page d'accueil
2. Crée une tâche "Test QA" avec priorité haute
3. Vérifie qu'elle apparaît dans la liste
4. Supprime-la
5. Vérifie qu'elle a disparu
```

**Étape 4** — Observer :
- Copilot vérifie le serveur (terminal)
- Lance Playwright (MCP)
- Navigue, clique, remplit
- Prend des screenshots à chaque étape
- Produit un rapport avec les images inline

---

#### 📊 Tableau récapitulatif — Quand utiliser quoi

| Besoin | Solution | Comment dans VS Code |
|--------|----------|---------------------|
| Recherche dans le projet | `@workspace` | Taper `@workspace` + question |
| Exécuter une commande | `@terminal` | Taper `@terminal` + commande |
| Configurer VS Code | `@vscode` | Taper `@vscode` + ce qu'on veut |
| Persona spécialisé (1 tour) | `@mon-agent` | Taper `@nom` + prompt |
| Persona spécialisé (toute la conv.) | Dropdown agent | Sélectionner dans le dropdown |
| Workflow multi-étapes | Agent orchestrateur + `tools` | Créer `.agent.md` avec tools |
| Actions dans un navigateur | Agent + MCP Playwright | tools: ["useBrowser"] |
| Combinaison recherche + action | Mode Agent normal | Copilot orchestre tout seul |

---

#### ⚠️ Pièges courants

| Piège | Symptôme | Solution |
|-------|----------|----------|
| Être en mode "Ask" au lieu de "Agent" | `@terminal` ne marche pas | Changer le dropdown en "Agent" |
| Agent sans le bon `tools` | "Je ne peux pas exécuter de commandes" | Ajouter `runTerminalCommand` dans tools |
| Trop de @mentions dans un prompt | Réponse confuse | 1 seul @participant par prompt |
| Conversation trop longue | Tokens élevés, réponses lentes | Nouvelle conversation pour un nouveau sujet |
| MCP non démarré | "Tool not available" | `Ctrl+Shift+P` → `MCP: Start Server` |

---

### 🏆 Labs Avancées — Comparatifs Poussés

Ces labs sont conçues pour prouver de manière irréfutable l'impact de chaque mécanisme. Chaque lab utilise le MÊME prompt de base et compare les résultats selon la configuration active.

> **Conseil** : Pour chaque comparatif, ouvrir le panneau Output (`Ctrl+Shift+U` → "GitHub Copilot Chat") et noter les `request token count` / `response token count` pour chaque variante.

---

#### 🔬 COMPARATIF 1 — Instructions : même prompt, 4 configurations différentes

**Le prompt** (identique dans les 4 cas) :
```
Crée un composant card pour afficher une tâche avec son titre, sa priorité et sa date de création
```

---

##### Config A — Aucune instruction

**Étape 1** — Ouvrir le terminal VS Code (`` Ctrl+` `` ou `Ctrl+ù` sur clavier AZERTY) et désactiver les instructions :
```powershell
# Windows (PowerShell)
Rename-Item .github/copilot-instructions.md copilot-instructions.md.bak

# macOS / Linux (bash)
# mv .github/copilot-instructions.md .github/copilot-instructions.md.bak
```

**Étape 2** — Ouvrir Copilot Chat (`Ctrl+Alt+I`)

**Étape 3** — Cliquer sur le `+` (nouvelle conversation) pour repartir de zéro

**Étape 4** — Taper exactement :
```
Crée un composant card pour afficher une tâche avec son titre, sa priorité et sa date de création
```

**Étape 5** — Attendre la réponse complète. Observer le résultat :

**Exemple typique de ce que Copilot génère sans instructions** :
```html
<!-- Copilot génère probablement ceci : -->
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Task Title</h5>
    <span class="badge badge-primary">High</span>
    <p class="text-muted">Created: 2024-01-15</p>
  </div>
</div>
```
→ Bootstrap vanilla, anglais, pas de dark mode, pas d'accessibilité

**Étape 6** — Faire un screenshot de la réponse : `Win+Shift+S` (Windows) / `Cmd+Shift+4` (macOS) → sélectionner la zone → coller dans un document

**Étape 7** — Dans le panneau Output, noter :
- `request token count: ____` (tokens IN)
- `response token count: ____` (tokens OUT)

---

##### Config B — Instructions globales uniquement

**Étape 1** — Remettre les instructions :
```powershell
# Windows (PowerShell)
Rename-Item .github/copilot-instructions.md.bak copilot-instructions.md

# macOS / Linux (bash)
# mv .github/copilot-instructions.md.bak .github/copilot-instructions.md
```

**Étape 2** — Dans Copilot Chat, cliquer `+` (NOUVELLE conversation — important sinon le cache peut interférer)

**Étape 3** — Taper le MÊME prompt exactement :
```
Crée un composant card pour afficher une tâche avec son titre, sa priorité et sa date de création
```

**Étape 4** — Observer les différences :

**Exemple typique avec instructions globales actives** :
```html
<!-- Copilot génère maintenant ceci : -->
<div class="card bg-dark text-white border-light">
  <div class="card-body">
    <h5 class="card-title">Titre de la tâche</h5>
    <span class="badge bg-danger">Haute</span>
    <small class="text-body-secondary">Créé le : 15/01/2024</small>
  </div>
</div>
```
→ Orange Boosted, français, dark mode, couleurs Orange (#ff7900)

**Étape 5** — Screenshot + noter les tokens dans Output

**Ce qui a changé (grâce aux instructions)** :
- `card` → `card bg-dark text-white` (dark mode)
- "Task Title" → "Titre de la tâche" (français)
- `badge-primary` → `badge bg-danger` (Orange Boosted)
- "Created" → "Créé le" (français)

---

##### Config C — Instructions globales + instruction conditionnelle HTML

**Étape 1** — Créer le fichier d'instruction conditionnelle :
```
Ctrl+Shift+P → File: New File
```
Nom : `.github/instructions/html-components.instructions.md`

**Étape 2** — Coller ce contenu et sauvegarder (`Ctrl+S`) :
```markdown
---
applyTo: "public/**"
---
Pour les composants HTML dans ce projet :
- Utiliser exclusivement les composants Orange Boosted 5.3
- Toujours inclure les attributs d'accessibilité :
  - aria-label sur les éléments interactifs
  - role quand le sémantique HTML ne suffit pas
  - aria-live="polite" pour les mises à jour dynamiques
- Responsive obligatoire : utiliser col-sm-12 col-md-6 col-lg-4
- Dark mode : toutes les classes bg-dark, text-white, border-light
- Priorité haute = badge bg-danger, moyenne = bg-warning, basse = bg-success
- Date au format français : JJ/MM/AAAA
- Inclure un bouton "Supprimer" avec icône et confirmation aria
```

**Étape 3** — **IMPORTANT** : Ouvrir `public/index.html` dans l'éditeur (cliquer sur l'onglet ou `Ctrl+P` → `index.html`). C'est le fichier actif qui déclenche l'instruction conditionnelle (grâce au glob `public/**`).

**Étape 4** — Nouvelle conversation (`+`), même prompt :
```
Crée un composant card pour afficher une tâche avec son titre, sa priorité et sa date de création
```

**Étape 5** — Observer la réponse enrichie :

**Exemple typique avec instructions conditionnelles** :
```html
<div class="col-sm-12 col-md-6 col-lg-4">
  <div class="card bg-dark text-white border-light h-100" role="article" aria-label="Tâche : Titre">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title" id="task-title-1">Titre de la tâche</h5>
      <div class="d-flex align-items-center gap-2 mb-2">
        <span class="badge bg-danger" aria-label="Priorité haute">Haute</span>
      </div>
      <small class="text-body-secondary mt-auto">
        <time datetime="2024-01-15">15/01/2024</time>
      </small>
      <button class="btn btn-outline-danger btn-sm mt-2" 
              aria-label="Supprimer la tâche Titre de la tâche"
              onclick="confirmDelete(this)">
        🗑️ Supprimer
      </button>
    </div>
  </div>
</div>
```
→ Responsive (col-*), accessible (aria-*, role), date française, bouton supprimer, TOUT ce que l'instruction conditionnelle demandait.

**Étape 6** — Screenshot + noter les tokens

---

##### Config D — Tout + Caveman Mode activé

**Étape 1** — Activer le caveman mode :
```powershell
# Windows (PowerShell)
Rename-Item ".github/instructions/caveman-mode.instructions.md.disabled" ".github/instructions/caveman-mode.instructions.md"

# macOS / Linux (bash)
# mv .github/instructions/caveman-mode.instructions.md.disabled .github/instructions/caveman-mode.instructions.md
```

**Étape 2** — Nouvelle conversation (`+`), même prompt :
```
Crée un composant card pour afficher une tâche avec son titre, sa priorité et sa date de création
```

**Étape 3** — Observer la réponse ULTRA-COMPACTE :

**Exemple typique avec caveman mode** :
```html
<div class="col-sm-12 col-md-6 col-lg-4">
 <div class="card bg-dark text-white border-light" role="article">
  <div class="card-body">
   <h5 class="card-title">Titre</h5>
   <span class="badge bg-danger">Haute</span>
   <small class="text-body-secondary"><time>15/01/2024</time></small>
   <button class="btn btn-outline-danger btn-sm" aria-label="Supprimer">🗑️</button>
  </div>
 </div>
</div>
```
→ MÊME qualité (Boosted, accessible, responsive) mais 60% plus court (pas de commentaires, pas d'explications, noms courts).

**Étape 4** — Screenshot + noter les tokens

**Étape 5** — **IMPORTANT : Remettre la config normale** :
```powershell
# Windows (PowerShell)
Rename-Item ".github/instructions/caveman-mode.instructions.md" ".github/instructions/caveman-mode.instructions.md.disabled"

# macOS / Linux (bash)
# mv .github/instructions/caveman-mode.instructions.md .github/instructions/caveman-mode.instructions.md.disabled
```

---

##### 📊 Mettre les 4 screenshots côte à côte

Ouvrir les 4 screenshots dans VS Code (drag & drop) et faire un split :
```
Clic droit sur le 1er screenshot → Split Right
Clic droit sur le 2ème → Split Right
etc.
```

**Grille de comparaison à remplir avec vos résultats réels** :

| Critère | A (rien) | B (global) | C (global + HTML) | D (+ caveman) |
|---------|----------|-----------|-------------------|---------------|
| **Framework CSS** | _________ | _________ | _________ | _________ |
| **Langue texte** | _________ | _________ | _________ | _________ |
| **Dark mode** | _________ | _________ | _________ | _________ |
| **Accessibilité** | _________ | _________ | _________ | _________ |
| **Responsive** | _________ | _________ | _________ | _________ |
| **Lignes de code** | _________ | _________ | _________ | _________ |
| **Tokens IN** | _________ | _________ | _________ | _________ |
| **Tokens OUT** | _________ | _________ | _________ | _________ |
| **Utilisable tel quel** | _________ | _________ | _________ | _________ |

**Résultats attendus** :

| Critère | A (rien) | B (global) | C (global + HTML) | D (+ caveman) |
|---------|----------|-----------|-------------------|---------------|
| **Framework CSS** | Bootstrap/Tailwind | Orange Boosted | Orange Boosted | Orange Boosted |
| **Langue texte** | Anglais | Français | Français | Français |
| **Dark mode** | ❌ | ✅ | ✅✅ (classes explicites) | ✅ |
| **Accessibilité** | ❌ | ❌ | ✅ (aria-*, role) | ✅ |
| **Responsive** | ❌ | Aléatoire | ✅ (col-sm/md/lg) | ✅ |
| **Lignes de code** | ~8-10 | ~12-15 | ~18-22 | ~8-10 |
| **Tokens IN** | ~200 | ~500 | ~700 | ~900 |
| **Tokens OUT** | ~300 | ~400 | ~500 | ~150-200 |
| **Utilisable tel quel** | ❌ Refaire | ⚠️ Ajuster | ✅ Directement | ✅ Compact mais complet |

---

#### 🔬 COMPARATIF 2 — Prompt Files : avec vs sans template, sur 3 créations successives

**Objectif** : Prouver que les Prompt Files garantissent la cohérence quand on crée plusieurs éléments similaires.

**Scénario** : Créer 3 routes API (users, categories, comments) et vérifier la cohérence entre les 3.

---

##### SANS Prompt File — 3 prompts manuels

**Étape 1** — Ouvrir Copilot Chat (`Ctrl+Alt+I`). Nouvelle conversation (`+`).

**Étape 2** — Tour 1 — Taper :
```
Crée une route Express pour /api/users avec CRUD complet. ES Modules, JSDoc, try/catch, format { data } ou { error }.
```

**Étape 3** — Quand Copilot répond, **copier le code généré** dans un nouveau fichier :
```
Ctrl+Shift+P → File: New File → temp-users.js
```
Coller le code (`Ctrl+V`), sauvegarder.

**Étape 4** — Nouvelle conversation (`+`). Tour 2 — Taper :
```
Crée une route Express pour /api/categories. Mêmes conventions que pour users.
```

**Étape 5** — Copier dans `temp-categories.js`.

**Étape 6** — Nouvelle conversation (`+`). Tour 3 — Taper :
```
Crée une route Express pour /api/comments avec CRUD.
```
(Notez : on oublie volontairement de re-préciser les conventions)

**Étape 7** — Copier dans `temp-comments.js`.

**Étape 8** — **ANALYSE CÔTE À CÔTE** — Ouvrir les 3 fichiers en split :
```
Clic droit temp-users.js → Split Right
Clic droit temp-categories.js → Split Right
```

**Étape 9** — Chercher les incohérences. Exemples typiques que vous allez trouver :

| Aspect | users.js (tour 1) | categories.js (tour 2) | comments.js (tour 3) |
|--------|-------------------|------------------------|---------------------|
| Import | `import { Router } from 'express'` | `import express from 'express'` | `const express = require('express')` 😱 |
| Réponse succès | `res.status(200).json({ data: users })` | `res.json({ data: categories })` | `res.send(comments)` |
| Réponse erreur | `res.status(400).json({ error: msg })` | `res.status(400).json({ message: msg })` | `res.status(500).send(err)` |
| JSDoc | ✅ Présent | ✅ Présent | ❌ Absent |
| Création | `res.status(201)` | `res.status(200)` | `res.status(201)` |

**Étape 10** — Noter les tokens totaux pour les 3 tours (Output panel) :
- Tour 1 : IN _____ + OUT _____
- Tour 2 : IN _____ + OUT _____
- Tour 3 : IN _____ + OUT _____
- **Total** : _____

---

##### AVEC Prompt File `/generate-route` — 3 invocations

**Étape 1** — Nouvelle conversation (`+`).

**Étape 2** — Taper `/` dans le champ de saisie. Observer la liste qui apparaît :
```
┌─────────────────────────────────────┐
│ /generate-route                      │
│ /generate-tests                      │
│ /generate-boosted-component          │
│ /generate-service                    │
│ /generate-crud                       │
│ /audit-accessibility                 │
└─────────────────────────────────────┘
```

**Étape 3** — Sélectionner `generate-route` (cliquer ou appuyer Enter). Compléter :
```
pour /api/users — CRUD utilisateurs (id, email, name, role, createdAt)
```

**Étape 4** — Copier dans `temp2-users.js`.

**Étape 5** — Nouvelle conversation (`+`). Taper `/generate-route` + :
```
pour /api/categories — CRUD catégories (id, name, color, icon, createdAt)
```
Copier dans `temp2-categories.js`.

**Étape 6** — Nouvelle conversation (`+`). Taper `/generate-route` + :
```
pour /api/comments — CRUD commentaires (id, taskId, author, text, createdAt)
```
Copier dans `temp2-comments.js`.

**Étape 7** — **ANALYSE CÔTE À CÔTE** — Ouvrir les 3 fichiers en split.

**Étape 8** — Constater la cohérence PARFAITE :

| Aspect | users.js | categories.js | comments.js |
|--------|----------|---------------|-------------|
| Import | `import { Router } from 'express'` | `import { Router } from 'express'` | `import { Router } from 'express'` |
| Réponse succès | `res.status(200).json({ data })` | `res.status(200).json({ data })` | `res.status(200).json({ data })` |
| Réponse erreur | `res.status(400).json({ error })` | `res.status(400).json({ error })` | `res.status(400).json({ error })` |
| JSDoc | ✅ | ✅ | ✅ |
| Création | `res.status(201)` | `res.status(201)` | `res.status(201)` |

**Étape 9** — Noter les tokens. Comparer avec la version sans template.

**Étape 10** — Supprimer les fichiers temporaires :
```powershell
Remove-Item temp-*.js, temp2-*.js
```

---

##### 📊 Grille de comparaison

| Critère | Sans Prompt File | Avec /generate-route |
|---------|-----------------|---------------------|
| **Prompts tapés** | ~80 mots × 3 = 240 mots | ~15 mots × 3 = 45 mots |
| **Tokens IN utilisateur** | ~240 tokens | ~45 tokens (-81%) |
| **Format import** | 3 styles différents | 1 style unique |
| **Format réponse** | 3 patterns différents | 1 pattern unique |
| **JSDoc** | Absent au tour 3 | Toujours présent |
| **Status code POST** | 200 ou 201 selon l'humeur | Toujours 201 |
| **Error handling** | try/catch, .catch(), ou rien | Toujours try/catch |
| **Temps total** | ~3 min (taper + vérifier + corriger) | ~1 min (taper + vérifier) |
| **Cohérence inter-fichiers** | ⚠️ 60-70% | ✅ 100% |
| **Refactoring nécessaire** | Oui (harmoniser les 3) | Non |

---

#### 🔬 COMPARATIF 3 — Agents : même question, 4 personas différents

**Le fichier cible** : `src/routes/tasks.js`

**Le prompt** (identique dans les 4 cas) :
```
Analyse #file:src/routes/tasks.js et donne-moi ton avis
```

**Préparation** : Ouvrir `src/routes/tasks.js` dans l'éditeur (`Ctrl+P` → `tasks.js` → choisir routes).

---

##### Test A — Agent par défaut (Copilot)

**Étape 1** — Copilot Chat (`Ctrl+Alt+I`). Vérifier le dropdown agent = **"Copilot"** (défaut).

**Étape 2** — Nouvelle conversation (`+`). Taper :
```
Analyse #file:src/routes/tasks.js et donne-moi ton avis
```

**Étape 3** — Observer le style de réponse. **Exemple typique** :

```
Ce fichier implémente les routes CRUD pour les tâches. Voici mon analyse :

**Points positifs :**
- Utilisation correcte d'Express Router
- Gestion d'erreur avec try/catch
- Format de réponse cohérent

**Suggestions d'amélioration :**
- Vous pourriez ajouter de la validation des entrées
- Un middleware d'erreur centralisé serait bénéfique
- Considérer l'ajout de pagination pour GET /api/tasks

**Structure générale :** Le code est bien organisé et suit les 
conventions Express standard...
```
→ Généraliste, long, explications, pas forcément actionnable.

**Étape 4** — Screenshot + noter tokens OUT dans Output.

---

##### Test B — Agent `code-reviewer`

**Étape 1** — Cliquer sur le **dropdown d'agent** en haut du chat. Sélectionner **`code-reviewer`**.

**Étape 2** — Nouvelle conversation (`+`). Même prompt :
```
Analyse #file:src/routes/tasks.js et donne-moi ton avis
```

**Étape 3** — Observer le format structuré. **Exemple typique** :

```
🔴 CRITIQUE — Ligne 15 — Injection potentielle
Le paramètre `req.params.id` est passé directement à `getById()` 
sans sanitization. Si le store change vers une DB, c'est une 
injection potentielle.
Fix : const id = sanitizeId(req.params.id);

🟡 ATTENTION — Ligne 8 — Pas de rate limiting
Le endpoint POST /api/tasks n'a pas de rate limit.
Un attaquant pourrait spammer la création de tâches.
Fix : Ajouter express-rate-limit sur cette route.

🟡 ATTENTION — Ligne 22 — Données non validées
Le body de la requête POST est passé directement à create().
Fix : Valider avec un schéma (Joi, Zod, ou validation manuelle).

🟢 SUGGESTION — Ligne 1 — Imports inutilisés
Vérifier si tous les imports sont utilisés.

✅ Pas de fuite mémoire détectée.
✅ Pas de secret en dur.
```
→ Structuré, actionnable, focus sécurité/perf, avec numéros de ligne.

**Étape 4** — Screenshot + noter tokens OUT.

---

##### Test C — Agent `caveman-mode`

**Étape 1** — Dropdown agent → **`caveman-mode`**.

**Étape 2** — Nouvelle conversation (`+`). Même prompt :
```
Analyse #file:src/routes/tasks.js et donne-moi ton avis
```

**Étape 3** — Observer la réponse ULTRA-COMPACTE. **Exemple typique** :

```
routes/tasks.js:
- no input validation → add
- no rate limit POST → add
- id param unsanitized → fix
- error msgs leak internals → generic msgs
- rest: ok
```
→ 5 lignes. Mots-clés. Pas de phrases. MÊME informations essentielles que code-reviewer mais 80% plus court.

**Étape 4** — Screenshot + noter tokens OUT.

---

##### Test D — Agent `full-review`

**Étape 1** — Dropdown agent → **`full-review`**.

**Étape 2** — Nouvelle conversation (`+`). Même prompt :
```
Analyse #file:src/routes/tasks.js et donne-moi ton avis
```

**Étape 3** — Observer l'exécution multi-passes. **Exemple typique** :

```
### 📋 Revue complète de src/routes/tasks.js

#### Code (3 issues)
- 🔴 CRITIQUE : Pas de validation d'entrée sur POST/PUT
- 🟡 ATTENTION : Pas de rate limiting
- 🟡 ATTENTION : Erreurs non loguées côté serveur

#### Tests (1 manquant)
Using tool: runTerminalCommand → npm test
✅ 29 tests passent, 0 échecs.
⚠️ Manquant : test pour le cas PUT avec body vide

#### Accessibilité
N/A — fichier backend (pas de HTML)

### ⚠️ Verdict : À CORRIGER
3 issues à résoudre avant merge. Tests quasi-complets (1 à ajouter).
```
→ 3 passes, lance les tests EN VRAI, rapport structuré avec verdict.

**Étape 4** — Screenshot + noter tokens OUT.

---

##### 📊 Mettre les 4 réponses côte à côte

| Critère | Copilot (défaut) | code-reviewer | caveman-mode | full-review |
|---------|-----------------|---------------|--------------|-------------|
| **Longueur réponse** | ~25-35 lignes | ~15-20 lignes | ~5-8 lignes | ~25-30 lignes |
| **Tokens OUT** | ~400-600 | ~300-400 | ~50-100 | ~600-900 |
| **Format** | Paragraphes libres | 🔴🟡🟢 + fix | Mots-clés bullet | 3 sections + verdict |
| **Actionnable** | ⚠️ "Vous pourriez..." | ✅ Ligne + fix exact | ⚠️ Mots-clés | ✅ Plan d'action |
| **Exécute des actions** | ❌ Non | ❌ Non | ❌ Non | ✅ Oui (npm test) |
| **Temps de réponse** | ~3s | ~3s | ~2s | ~10-15s (lance tests) |
| **Idéal pour** | Comprendre le code | Pré-commit review | Audit rapide/cheap | Review complète avant PR |

---

#### 🔬 COMPARATIF 4 — MCP : avec vs sans, le même scénario de test

**Le prompt** (identique) :
```
Vérifie que quand on crée une tâche avec priorité "haute", le badge s'affiche en rouge dans l'interface.
```

**Pré-requis** : L'app doit tourner (`npm run dev` dans un terminal).

---

##### Test A — Sans MCP (Playwright désactivé)

**Étape 1** — Désactiver le MCP Playwright :
```
Ctrl+Shift+P → taper "MCP" → sélectionner "MCP: Stop Server" → sélectionner "playwright"
```
Vérifier : `Ctrl+Shift+P` → `MCP: List Servers` → playwright = **Stopped** (ou absent)

**Étape 2** — Ouvrir Copilot Chat. Vérifier : mode **Agent** (dropdown en haut).

**Étape 3** — Nouvelle conversation (`+`). Taper :
```
Vérifie que quand on crée une tâche avec priorité "haute", le badge s'affiche en rouge dans l'interface.
```

**Étape 4** — Observer la réponse. **Ce que Copilot fait SANS MCP** :

```
Pour vérifier cela, vous pouvez écrire un test Playwright :

```javascript
import { test, expect } from '@playwright/test';

test('badge rouge pour priorité haute', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Créer une tâche
  await page.click('button:has-text("Nouvelle Tâche")');
  await page.fill('#taskTitle', 'Test priorité');
  await page.selectOption('#taskPriority', 'high');
  await page.click('button:has-text("Créer")');
  
  // Vérifier le badge
  const badge = page.locator('.badge:has-text("Haute")');
  await expect(badge).toHaveClass(/bg-danger/);
});
```

Vous pouvez exécuter ce test avec `npx playwright test`.
```

→ Copilot GÉNÈRE du code. Il ne l'EXÉCUTE pas. Vous devez :
1. Copier le code
2. Le mettre dans un fichier
3. Lancer `npx playwright test`
4. Lire la sortie
5. Interpréter le résultat
= **5 étapes manuelles**, ~3-5 minutes

**Étape 5** — Screenshot + noter tokens OUT.

---

##### Test B — Avec MCP (Playwright activé)

**Étape 1** — Réactiver le MCP Playwright :
```
Ctrl+Shift+P → "MCP: Start Server" → "playwright"
```
Vérifier : `MCP: List Servers` → playwright = **Ready** ✅

**Étape 2** — Nouvelle conversation (`+`). Mode Agent. MÊME prompt :
```
Vérifie que quand on crée une tâche avec priorité "haute", le badge s'affiche en rouge dans l'interface.
```

**Étape 3** — Observer Copilot AGIR en temps réel. **Ce qui se passe** :

```
🔄 Using tool: browser_navigate
   → Navigating to http://localhost:3000

🔄 Using tool: browser_screenshot  
   → [📷 Screenshot de la page d'accueil affiché inline]

🔄 Using tool: browser_click
   → Clicking "Nouvelle Tâche" button

🔄 Using tool: browser_fill
   → Filling #taskTitle with "Test vérification badge"

🔄 Using tool: browser_select
   → Selecting "high" in #taskPriority

🔄 Using tool: browser_click
   → Clicking "Créer"

🔄 Using tool: browser_screenshot
   → [📷 Screenshot avec la nouvelle tâche et son badge]

✅ Vérifié : La tâche "Test vérification badge" a été créée avec 
succès. Le badge de priorité affiche "Haute" avec la classe CSS 
"badge bg-danger" qui correspond bien à la couleur rouge.

Voici le screenshot comme preuve :
[📷 Image inline montrant le badge rouge]
```

→ Copilot a FAIT le test. Vous voyez :
- Un navigateur Chromium s'ouvrir à l'écran
- Les clics se faire automatiquement
- Les screenshots apparaître dans le chat
= **0 étape manuelle**, ~30 secondes

**Étape 4** — Screenshot de la conversation + noter tokens OUT.

---

##### 📊 Grille de comparaison

| Critère | Sans MCP (Playwright arrêté) | Avec MCP (Playwright actif) |
|---------|-------------------------------|------------------------------|
| **Ce que Copilot produit** | Du code de test à copier | Un TEST EXÉCUTÉ avec preuves |
| **Screenshot/preuve visuelle** | ❌ Aucune | ✅ 2-3 screenshots inline |
| **Navigateur visible à l'écran** | ❌ Non | ✅ Oui (Chromium s'ouvre) |
| **Effort humain après** | Copier → fichier → exécuter → lire | Rien (tout est fait) |
| **Temps total** | 3-5 min | 30 secondes |
| **Tokens OUT** | ~300-400 (code) | ~200-300 (résultat + outil) |
| **Fiabilité** | ⚠️ Code peut avoir des erreurs | ✅ Copilot retry si ça échoue |
| **Effet "WOW" en lab** | 😐 "Ah ok du code" | 🤯 "Il fait le test tout seul !" |

---

#### 🔬 COMPARATIF 5 — Skills : 3 niveaux de complexité pour la même tâche

**La tâche** : "Ajouter un module 'tags' à l'application (service + route + tests + vérification que ça marche)"

---

##### Niveau 0 — Aucun skill (tout à la main, tour par tour)

**Étape 1** — Copilot Chat, mode Agent. Tour 1 :
```
Crée un service de tags dans src/services/tagService.js avec :
- Store in-memory (Map)
- CRUD : getAll, getById, create, update, delete
- Chaque tag a : id, name, color
```
Attendre → Copilot génère le fichier. Vérifier qu'il est correct. Accepter.

**Étape 2** — Tour 2 :
```
Crée les routes pour les tags dans src/routes/tags.js (GET, POST, PUT, DELETE)
```
Attendre → Vérifier que le format de réponse est cohérent avec tasks.js. Si ce n'est pas le cas → Tour 2bis pour corriger.

**Étape 3** — Tour 3 :
```
Crée les tests dans tests/tagService.test.js
```
Attendre → Vérifier les imports, les mocks.

**Étape 4** — Tour 4 :
```
Ajoute la route tags dans src/app.js (import + app.use('/api/tags', tagsRouter))
```

**Étape 5** — Tour 5 :
```
@terminal Lance npm test et dis-moi si tout passe
```
Si ça échoue (probable — imports cassés, chemins incorrects) :
- Tour 6 : "Corrige l'erreur X"
- Tour 7 : "Relance les tests"
- Potentiellement tour 8...

**Bilan** : 5-8 tours, ~15 min, beaucoup de vérification manuelle entre chaque tour.

---

##### Niveau 1 — Skill basique (`/generate-crud`)

**Étape 1** — Copilot Chat, mode Agent. Taper `/` → sélectionner `generate-crud` :
```
/generate-crud pour des tags (id, name, color, createdAt)
```

**Étape 2** — Observer : Copilot génère les 3 fichiers D'UN COUP :
- `src/services/tagService.js` (service)
- `src/routes/tags.js` (routes)
- `tests/tagService.test.js` (tests)
Tous cohérents entre eux (même style, mêmes imports).

**Étape 3** — Tour 2 :
```
Intègre la route tags dans src/app.js et lance les tests pour vérifier
```

**Bilan** : 2 tours, ~3 min, cohérence garantie par le template.

---

##### Niveau 2 — Skill avancé (Agent orchestrateur + MCP)

**Étape 1** — Dropdown agent → sélectionner **`full-review`** (ou `qa-tester`).

**Étape 2** — UN SEUL prompt :
```
Ajoute un module complet de gestion des tags à l'application :
1. Crée le service (src/services/tagService.js) — CRUD, in-memory, même style que taskService
2. Crée les routes (src/routes/tags.js) — même format que tasks.js
3. Crée les tests (tests/tagService.test.js) — couvrir tous les cas
4. Intègre dans app.js
5. Lance les tests pour confirmer zéro régression
6. Ouvre le navigateur et vérifie que l'app démarre sans erreur sur http://localhost:3000
```

**Étape 3** — Observer Copilot TOUT faire :

```
Creating src/services/tagService.js...
✅ Service créé (6 méthodes, JSDoc, validation)

Creating src/routes/tags.js...  
✅ Routes créées (5 endpoints, try/catch, format {data})

Creating tests/tagService.test.js...
✅ Tests créés (12 tests)

Modifying src/app.js...
✅ Route tags intégrée

Using tool: runTerminalCommand → npm test
✅ 41 tests passent (29 existants + 12 nouveaux), 0 échecs

Using tool: browser_navigate → http://localhost:3000
Using tool: browser_screenshot
✅ App démarre sans erreur. Screenshot :
[📷 Image de l'app fonctionnelle]

### Résumé
- 3 fichiers créés
- 1 fichier modifié  
- 41/41 tests passent
- App vérifié en navigateur ✅
```

**Bilan** : 1 tour, ~1-2 min, ZÉRO intervention humaine, preuve visuelle incluse.

---

##### 📊 Grille de comparaison détaillée

| Critère | Niveau 0 (manuel) | Niveau 1 (/generate-crud) | Niveau 2 (Agent + MCP) |
|---------|-------------------|---------------------------|------------------------|
| **Nombre de tours** | 5-8 | 2 | **1** |
| **Temps humain** | 15 min | 3 min | **1 min** |
| **Tokens totaux** | 4000-6000 | 1500-2000 | 2500 |
| **Vérification manuelle** | À chaque tour | Au 2ème tour | **Aucune** |
| **Cohérence inter-fichiers** | ⚠️ Risque élevé | ✅ Template | ✅ Tout d'un bloc |
| **Tests lancés** | Manuellement | Manuellement | **Automatiquement** |
| **Preuve navigateur** | ❌ Non | ❌ Non | ✅ Screenshot |
| **Si un test échoue** | Debug manuel (2-3 tours) | Debug manuel (1 tour) | **Copilot corrige et relance** |
| **Réutilisable** | ❌ (refaire à chaque fois) | ✅ (même template) | ✅ (même agent) |
| **Effet lab** | 😐 Normal | 🙂 Efficace | 🤯 Impressionnant |

---

#### 🔬 COMPARATIF 6 — La labnstration "WOW" — Tout assemblé

**Scénario final** : Montrer un workflow complet qui utilise TOUS les mécanismes en 1 seul prompt.

---

##### Préparation (vérifier que tout est actif)

**Checklist** (30 secondes) :
```
✅ App qui tourne :              npm run dev (terminal VS Code)
✅ Instructions actives :        .github/copilot-instructions.md existe
✅ Instruction tests :           .github/instructions/tests.instructions.md existe
✅ MCP Playwright :              Ctrl+Shift+P → MCP: List Servers → Ready
✅ Agent qa-tester :             Dropdown agent → qa-tester visible
✅ Panneau Output ouvert :       Ctrl+Shift+U → "GitHub Copilot Chat"
```

---

##### Exécution — 1 seul prompt

**Étape 1** — Ouvrir Copilot Chat (`Ctrl+Alt+I`).

**Étape 2** — Dropdown agent → sélectionner **`qa-tester`**.

**Étape 3** — Taper ce prompt :
```
Ajoute un système de tags aux tâches :

1. Modifie taskService.js : ajouter un champ tags (array de strings) aux tâches, 
   ajouter les méthodes addTag(taskId, tag) et removeTag(taskId, tag)
2. Ajoute les endpoints POST /api/tasks/:id/tags et DELETE /api/tasks/:id/tags/:tag
3. Modifie public/index.html : afficher les tags comme des badges Boosted sous le titre
4. Crée les tests pour les nouvelles méthodes dans tests/taskService.test.js
5. Lance tous les tests (npm test) pour vérifier la non-régression
6. Teste dans le navigateur :
   - Crée une tâche "Lab Tags"
   - Appelle POST /api/tasks/{id}/tags avec tag "urgent"
   - Vérifie que le badge "urgent" s'affiche
   - Screenshot final de preuve
```

**Étape 4** — Observer l'orchestration en temps réel.

**Ce qui se passe dans VS Code** (ce que l'audience VOIT) :

| Temps | Ce qui se passe à l'écran | Mécanisme utilisé |
|-------|--------------------------|-------------------|
| 0-5s | Copilot réfléchit ("Thinking...") | Agent qa-tester persona |
| 5-15s | Fichier `taskService.js` s'ouvre et se modifie | Tool: editFiles + Instructions projet (ESM, JSDoc) |
| 15-25s | Fichier `src/routes/tasks.js` se modifie | Tool: editFiles + Instruction conditionnelle routes |
| 25-35s | `public/index.html` se modifie | Tool: editFiles + Instructions Boosted (badges) |
| 35-45s | Fichier de tests créé/modifié | Tool: editFiles + Instruction tests (describe/it) |
| 45-55s | Terminal s'active : `npm test` s'exécute | Tool: runTerminalCommand |
| 55-65s | Output "41 tests, 0 failures" | Résultat du terminal |
| 65-75s | Navigateur Chromium s'ouvre sur localhost:3000 | Tool: useBrowser (MCP Playwright) |
| 75-85s | Actions automatiques dans le navigateur | browser_navigate, browser_click |
| 85-95s | Screenshot pris | browser_screenshot |
| 95-100s | Rapport final avec screenshot inline | Agent qa-tester format |

**Résultat dans le chat** :
```
### 🧪 Test QA — Système de tags

✅ PASS — taskService.js modifié (addTag, removeTag ajoutés avec JSDoc)
✅ PASS — Endpoints POST/DELETE /api/tasks/:id/tags créés
✅ PASS — Frontend : badges Boosted ajoutés dans index.html
✅ PASS — Tests : 5 nouveaux tests ajoutés
✅ PASS — npm test : 34/34 passent (0 échecs)
✅ PASS — Navigateur : badge "urgent" visible

📷 Screenshot final :
[Image montrant la tâche "Lab Tags" avec le badge "urgent" en orange]

Résumé : 6/6 étapes passées ✅
```

---

##### Ce qui a été utilisé simultanément :

| Mécanisme | Rôle dans cette lab | Preuve visible |
|-----------|---------------------|----------------|
| **Instructions projet** | Code en ES Modules, JSDoc, français | Voir le code généré |
| **Instruction conditionnelle routes** | Format { data }, try/catch | Voir tasks.js modifié |
| **Instruction conditionnelle tests** | describe/it, cas limites | Voir le fichier test |
| **Custom Agent (qa-tester)** | Format rapport ✅/❌, workflow multi-étapes | Format de la réponse |
| **Tool: editFiles** | Modifier les fichiers | Fichiers qui changent dans l'éditeur |
| **Tool: runTerminalCommand** | Lancer npm test | Terminal actif avec output |
| **MCP Playwright** | Ouvrir navigateur, cliquer, vérifier | Chromium visible + screenshots |
| **Prompt bien structuré** | Instructions claires en liste | 1 seul prompt = tout |

**Ce qui aurait pris 20-30 min manuellement est fait en ~2 min par un seul prompt.**

---

##### 📊 Tableau final — Impact cumulé de tous les mécanismes

| Configuration | Tokens/prompt (moyenne) | Qualité 1er coup | Cohérence projet | Actions auto |
|--------------|------------------------|-------------------|------------------|-------------|
| Copilot nu (rien configuré) | ~800 IN + 500 OUT | ⭐⭐ | ❌ | ❌ |
| + Instructions projet | ~1000 IN + 500 OUT | ⭐⭐⭐ | ✅ | ❌ |
| + Instructions cond. | ~1100 IN + 500 OUT | ⭐⭐⭐⭐ | ✅✅ | ❌ |
| + Prompt Files | ~300 IN + 500 OUT | ⭐⭐⭐⭐ | ✅✅ | ❌ |
| + Custom Agent | ~1100 IN + 300 OUT | ⭐⭐⭐⭐⭐ | ✅✅ | ❌ |
| + MCP | ~1100 IN + 600 OUT | ⭐⭐⭐⭐⭐ | ✅✅ | ✅ |
| **TOUT combiné** | ~1200 IN + 400 OUT | ⭐⭐⭐⭐⭐ | ✅✅✅ | ✅✅ |
| **+ Caveman Mode** | ~1200 IN + **150 OUT** | ⭐⭐⭐⭐⭐ | ✅✅✅ | ✅✅ |

---

### 5h. Résumé — Quoi utiliser quand

| Outil | Fichier | Quand l'utiliser | Effet |
|-------|---------|-----------------|-------|
| **Instructions projet** | `.github/copilot-instructions.md` | Conventions qui s'appliquent TOUJOURS | Auto-injecté à chaque requête |
| **Instructions conditionnelles** | `.github/instructions/*.md` | Conventions pour un TYPE de fichier | Injecté seulement quand le glob matche |
| **Prompt Files** | `.github/prompts/*.prompt.md` | Patterns récurrents (créer route, service, test) | Invocable avec `/nom` |
| **Custom Agents** | `.github/agents/*.agent.md` | Personas spécialisés (reviewer, caveman) | Sélectionnable dans le dropdown |
| **Sub-Agents / Participants** | Built-in (`@workspace`, `@terminal`, `@vscode`) | Recherche projet, exécution, contrôle éditeur | Invocable avec `@nom` dans le chat |
| **Agent orchestrateur** | `.github/agents/*.agent.md` + `tools` | Workflows multi-passes automatisés | 1 prompt → plusieurs étapes enchaînées |
| **MCP Servers** | `.vscode/mcp.json` | Donner des CAPACITÉS à Copilot (naviguer, DB, API) | Outils supplémentaires en mode Agent |
| **Skills** | Prompt File + MCP combinés | Workflows complets automatisés | Enchaîne instructions + actions |

### 📊 TOKENS — Noter dans le tableau



---

## 🎬 LAB 6 — Gestion du Contexte (Influence directe sur la qualité et les tokens)

### 🎯 Objectif
Labntrer visuellement que le contexte envoyé à Copilot change radicalement la qualité des réponses ET la consommation de tokens. Chaque sous-lab montre un avant/après mesurable.

> ⚠️ **Tout se fait dans VS Code.** Le contexte est ce que Copilot "voit" quand il répond. Plus vous le maîtrisez, plus les réponses sont pertinentes et moins vous consommez de tokens.

---

### Comment Copilot construit son contexte

Copilot n'envoie **PAS** tout votre projet. Voici ce qui est envoyé, par ordre de priorité :

| Source de contexte | Quand c'est envoyé | Comment le contrôler |
|-------------------|--------------------|--------------------|
| Le prompt que vous tapez | Toujours | Vous décidez |
| Les fichiers référencés avec `#file:` | Quand vous les citez | Vous décidez |
| Le fichier actif (onglet courant) | Toujours en inline / souvent en Chat | Changer d'onglet |
| Les fichiers ouverts (onglets) | Souvent (comme contexte additionnel) | Fermer les onglets inutiles |
| L'historique de la conversation | Toujours (dans la même session Chat) | Nouvelle conversation = reset |
| Les instructions projet `.github/copilot-instructions.md` | Toujours (si le fichier existe) | Éditer le fichier |
| Les fichiers d'instructions `.github/instructions/*.md` | Selon le `applyTo` glob pattern | Créer/modifier les fichiers |
| Le workspace indexé | En mode Agent / @workspace | `.copilotignore` pour exclure |

---

### 🔬 Manipulation 1 — Voir le contexte envoyé en temps réel

**Étape 1** — Ouvrir le panneau Output : `Ctrl+Shift+U`

**Étape 2** — Dans le dropdown, sélectionner **"GitHub Copilot Chat"**

**Étape 3** — Ouvrir 5-6 fichiers dans VS Code (app.js, taskService.js, validators.js, index.html, app.css, package.json)

**Étape 4** — Taper un prompt dans Copilot Chat :
```
Explique l'architecture de cette app
```

**Étape 5** — Dans le panneau Output, observer :
- `request token count: XXXX` — c'est le TOTAL envoyé (prompt + contexte)
- Vous verrez un chiffre élevé car tous les fichiers ouverts sont potentiellement inclus

**Étape 6** — Fermer TOUS les onglets sauf `taskService.js`. Nouvelle conversation (`+`), même prompt.

**Étape 7** — Comparer le `request token count` : il sera nettement plus bas.

#### 📊 Résultat attendu

| Situation | Tokens IN estimés |
|-----------|-------------------|
| 6 fichiers ouverts | ~4000-6000 |
| 1 seul fichier ouvert | ~1000-1500 |
| Avec `#file:` explicite | ~800-1200 (le plus précis) |

---

### 🔬 Manipulation 2 — Contrôler le contexte avec `#file:` et `#selection`

#### Variables de contexte disponibles dans Copilot Chat

Taper `#` dans Copilot Chat pour voir la liste complète :

| Variable | Ce qu'elle fait | Exemple |
|----------|----------------|---------|
| `#file:chemin` | Ajoute un fichier spécifique au contexte | `#file:src/services/taskService.js` |
| `#selection` | Ajoute le code sélectionné dans l'éditeur | Sélectionner une fonction → `#selection` |
| `#editor` | Ajoute le contenu visible dans l'éditeur | `#editor explique ce que je vois` |
| `#terminalLastCommand` | Ajoute la dernière sortie du terminal | `#terminalLastCommand pourquoi cette erreur ?` |
| `#terminalSelection` | Ajoute le texte sélectionné dans le terminal | Sélectionner l'erreur → `#terminalSelection` |

#### Étapes à reproduire

**Étape 1** — Taper sans contexte explicite :
```
Comment fonctionne la validation ?
```
Copilot doit deviner de quelle validation vous parlez → réponse vague ou fausse.

**Étape 2** — Taper avec contexte explicite :
```
#file:src/utils/validators.js Comment fonctionne validateEmail() ?
```
Copilot a exactement le fichier → réponse précise.

**Étape 3** — Combiner plusieurs fichiers :
```
#file:src/services/taskService.js #file:src/routes/tasks.js
Le endpoint POST /api/tasks valide-t-il correctement les données avant de les passer au service ?
```

#### 📊 Résultat attendu

| Approche | Pertinence | Tokens IN |
|----------|-----------|-----------|
| Sans `#file:` | ⚠️ Variable (dépend des onglets ouverts) | Imprévisible |
| Avec `#file:` | ✅ Toujours pertinent | Prévisible et minimal |

---

### 🔬 Manipulation 3 — `.copilotignore` pour exclure du contexte

Le fichier `.copilotignore` empêche Copilot d'indexer/envoyer certains fichiers (syntaxe identique à `.gitignore`).

**Étape 1** — Ouvrir `.copilotignore` à la racine du projet (déjà présent) :
```
Ctrl+P → .copilotignore → Enter
```

**Étape 2** — Observer le contenu actuel :
```
node_modules/
dist/
coverage/
*.lock
*.log
.git/
```

**Étape 3** — Tester l'impact. En mode Agent, taper :
```
@workspace Combien de fichiers JavaScript contient ce projet ?
```
Copilot ne comptera PAS les fichiers dans node_modules/ (des milliers de fichiers exclus).

**Étape 4** — Pour labntrer l'impact, commenter temporairement `.copilotignore` (ajouter `#` devant chaque ligne) et relancer la même question. Le temps de réponse sera plus long et les tokens IN bien plus élevés.

**Étape 5** — Remettre `.copilotignore` en place.

#### 📊 Résultat attendu

| Situation | Fichiers indexés | Impact |
|-----------|-----------------|--------|
| Avec `.copilotignore` | ~15-20 fichiers projet | Réponses rapides, pertinentes |
| Sans `.copilotignore` | ~500+ (node_modules inclus) | Lent, bruit, tokens gaspillés |

---

### 🔬 Manipulation 4 — L'historique de conversation comme contexte

Chaque message dans une conversation s'accumule comme contexte pour les suivants.

**Étape 1** — Ouvrir une nouvelle conversation (`+`). Taper 5 prompts successifs :
```
Tour 1 : Explique taskService.js
Tour 2 : Quelles sont les fonctions exportées ?
Tour 3 : Comment fonctionne la pagination ?
Tour 4 : Y a-t-il des bugs potentiels ?
Tour 5 : Ajoute une fonction de recherche par titre
```

**Étape 2** — Observer dans le panneau Output que le `request token count` **augmente à chaque tour** (l'historique complet est renvoyé).

**Étape 3** — Ouvrir une NOUVELLE conversation (`+`). Taper directement :
```
#file:src/services/taskService.js Ajoute une fonction searchByTitle(query) qui filtre les tâches dont le titre contient query (case insensitive). Même style JSDoc que les autres fonctions. Code uniquement.
```

#### 📊 Résultat attendu

| Approche | Tokens IN au tour 5 | Qualité réponse |
|----------|---------------------|-----------------|
| Conversation longue (5 tours) | ~5000-8000 (historique cumulé) | ✅ Bonne (mais coûteuse) |
| Nouveau chat direct | ~1000-1500 | ✅ Bonne (et économique) |

**Règle** : Si votre prochaine question n'a pas besoin du contexte des questions précédentes → **nouvelle conversation**.

---

### 🔬 Manipulation 5 — Instructions projet automatiques

Les fichiers dans `.github/` injectent du contexte automatiquement à CHAQUE requête.

**Étape 1** — Ouvrir `.github/copilot-instructions.md` :
```
Ctrl+P → copilot-instructions → Enter
```

**Étape 2** — Observer ce qui est écrit : conventions de code, stack technique, style… Ce texte est envoyé en contexte à CHAQUE prompt Copilot.

**Étape 3** — Taper dans Copilot Chat :
```
Crée une fonction pour calculer la moyenne d'un tableau de nombres
```
Observer : Copilot génère en **ES Module**, avec **JSDoc**, en suivant les conventions du projet — même sans le lui demander dans le prompt.

**Étape 4** — Pour prouver que c'est grâce aux instructions : renommer temporairement le fichier :
```powershell
# Windows (PowerShell) :
Rename-Item .github/copilot-instructions.md copilot-instructions.md.bak

# Mac/Linux :
# mv .github/copilot-instructions.md .github/copilot-instructions.md.bak
```

**Étape 5** — Nouvelle conversation, même prompt. Observer : le style sera générique (peut-être CommonJS, pas de JSDoc…).

**Étape 6** — Remettre le fichier :
```powershell
# Windows (PowerShell) :
Rename-Item .github/copilot-instructions.md.bak copilot-instructions.md

# Mac/Linux :
# mv .github/copilot-instructions.md.bak .github/copilot-instructions.md
```

#### 📊 Résultat attendu

| Situation | ES Modules ? | JSDoc ? | Style Orange Boosted ? |
|-----------|-------------|---------|----------------------|
| Avec `copilot-instructions.md` | ✅ Oui | ✅ Oui | ✅ Mentionné |
| Sans `copilot-instructions.md` | ❌ Aléatoire | ❌ Souvent absent | ❌ Non |

**Coût** : Le fichier d'instructions ajoute ~200-400 tokens IN à chaque requête. Gardez-le concis !

---

### 🔬 Manipulation 6 — Instructions conditionnelles avec `applyTo`

Les fichiers dans `.github/instructions/` peuvent s'appliquer uniquement à certains types de fichiers.

**Étape 1** — Créer un fichier `.github/instructions/tests.instructions.md` :
```markdown
---
applyTo: "tests/**"
---
Conventions de tests :
- Utiliser describe/it (pas test())
- Noms de tests en français
- Tester les cas limites : null, undefined, tableau vide, string vide
- Ajouter un test d'intégration si le service appelle un autre service
```

**Étape 2** — Ouvrir un fichier de test (`tests/taskService.test.js`) et taper dans Copilot Chat :
```
Ajoute des tests pour le cas où on supprime une tâche inexistante
```
Observer : Copilot suit les conventions définies (describe/it, français, cas limites).

**Étape 3** — Ouvrir `src/services/taskService.js` et taper le même genre de prompt :
```
Ajoute une gestion d'erreur pour la suppression d'une tâche inexistante
```
Observer : les instructions de test ne s'appliquent PAS ici (fichier hors du glob `tests/**`).

#### 📊 Résultat attendu

| Fichier ouvert | Instructions tests appliquées ? | Tokens ajoutés |
|---------------|-------------------------------|----------------|
| `tests/taskService.test.js` | ✅ Oui | +100 tokens |
| `src/services/taskService.js` | ❌ Non | 0 tokens |

**Avantage** : Le contexte est injecté SEULEMENT quand c'est pertinent → pas de gaspillage.

---

### 🔬 Manipulation 7 — Utiliser des images comme contexte (Vision)

Copilot Chat accepte les images (screenshots, maquettes, diagrammes) comme contexte. Très utile pour reproduire un design ou debugger un problème visuel.

#### Cas 1 — Reproduire un design à partir d'un screenshot

**Étape 1** — Prendre un screenshot d'un composant UI que vous voulez reproduire :
- `Win+Shift+S` → sélectionner une zone (ex: un formulaire sur un autre site, une maquette Figma)
- Ou utiliser une image existante (ex: capture d'un design Orange)

**Étape 2** — Dans Copilot Chat, **coller l'image** directement :
- `Ctrl+V` dans le champ de saisie du chat
- L'image apparaît en miniature

**Étape 3** — Taper le prompt avec l'image :
```
Reproduis ce composant en HTML/CSS en utilisant Orange Boosted 5.3. 
Utilise les classes Boosted existantes autant que possible.
Donne-moi le code HTML intégrable dans public/index.html.
```

**Étape 4** — Observer : Copilot analyse l'image et génère du code qui reproduit le design.

#### Cas 2 — Debugger un problème visuel

**Étape 1** — Ouvrir l'app dans le navigateur (`http://localhost:3000`)

**Étape 2** — Identifier un problème visuel (ou en créer un temporairement : ajouter `style="margin-left: -50px"` sur un élément)

**Étape 3** — Prendre un screenshot du bug : `Win+Shift+S`

**Étape 4** — Coller dans Copilot Chat (`Ctrl+V`) + prompt :
```
#file:public/index.html
Voici un screenshot de la page. Le bouton "Créer" est décalé vers la gauche et sort de son conteneur. Trouve la cause dans le HTML/CSS et corrige.
```

**Étape 5** — Observer : Copilot voit le problème visuel ET a le code source → propose un fix précis.

#### Cas 3 — Implémenter depuis une maquette/wireframe

**Étape 1** — Utiliser une image de maquette (dessiner rapidement sur papier et prendre en photo, ou utiliser un outil comme Excalidraw)

**Étape 2** — Coller dans Copilot Chat + prompt :
```
Voici une maquette pour une page de statistiques. Implémente-la avec :
- Orange Boosted 5.3 (classes existantes)
- Chart.js pour les graphiques
- Données depuis GET /api/analytics/stats
- Layout responsive (grille Boosted)
```

#### 📊 Comment voir l'effet

| Sans image | Avec image |
|-----------|-----------|
| "Fais un formulaire de login" → design générique | Image d'une maquette → reproduit fidèlement le design |
| Decrire un bug en mots → Copilot peut mal comprendre | Screenshot du bug → Copilot voit exactement le problème |
| Plusieurs allers-retours pour ajuster | Résultat correct au 1er tour |

**Formats acceptés** : PNG, JPG, GIF, WebP. Taille max ~20MB.

**Comment attacher** :
- `Ctrl+V` (coller depuis presse-papier)
- Drag & drop d'un fichier image dans le chat
- Cliquer l'icône 📎 (trombone) dans le chat

---

### 🔬 Manipulation 8 — Choisir le bon modèle

Copilot propose plusieurs modèles IA. Chaque modèle a des forces différentes.

#### Comment changer de modèle dans VS Code

**Étape 1** — Ouvrir Copilot Chat (`Ctrl+Alt+I`)

**Étape 2** — En bas du champ de saisie, cliquer sur le **nom du modèle** affiché (ex: "GPT-4o")

**Étape 3** — La liste des modèles disponibles apparaît :

| Modèle | Forces | Quand l'utiliser |
|--------|--------|-----------------|
| **GPT-4o** | Rapide, bon en code, vision | Usage général, itérations rapides |
| **GPT-4o mini** | Ultra-rapide, peu de tokens | Questions simples, complétion inline |
| **Claude 3.5 Sonnet** | Excellent en raisonnement, code complexe | Architecture, refactoring complexe, longues analyses |
| **Claude 4 Sonnet** | Meilleur raisonnement, instruction following | Tâches complexes, respect strict des consignes |
| **o1** | Raisonnement étape par étape | Algorithmes complexes, debugging difficile |
| **o3-mini** | Raisonnement + rapidité | Bon compromis qualité/vitesse pour la logique |
| **Gemini 2.5 Pro** | Très grande fenêtre de contexte | Gros fichiers, analyse de projets entiers |

#### 🔬 Manipulation — Comparer les modèles sur le même prompt

**Étape 1** — Sélectionner **GPT-4o**, taper :
```
#file:src/services/taskService.js
Refactore cette classe pour utiliser le pattern Repository avec injection de dépendances, en gardant la compatibilité avec les tests existants. Explique tes choix.
```
Noter : tokens, temps de réponse, qualité de l'explication.

**Étape 2** — Nouvelle conversation, sélectionner **Claude 3.5 Sonnet**, même prompt exactement.

**Étape 3** — Nouvelle conversation, sélectionner **o3-mini**, même prompt.

**Étape 4** — Comparer :

#### 📊 Résultats attendus

| Métrique | GPT-4o | Claude 3.5 Sonnet | o3-mini |
|----------|--------|-------------------|---------|
| Temps de réponse | ~3-5s | ~5-8s | ~10-15s |
| Tokens OUT | ~500-700 | ~700-1000 (plus détaillé) | ~400-600 |
| Qualité explication | ✅ Bonne | ✅✅ Très détaillée | ✅ Concise mais précise |
| Code compilable | ✅ | ✅ | ✅ |
| Respect des contraintes | ✅ Bon | ✅✅ Excellent | ✅ Bon |

#### 🔬 Manipulation — Quand le modèle change tout

**Cas 1 — Tâche simple** (favoriser la vitesse) :
```
Modèle : GPT-4o mini
Prompt : Ajoute un champ "dueDate" au type Task dans taskService.js
```
→ Rapide, correct, pas besoin de plus.

**Cas 2 — Debug complexe** (favoriser le raisonnement) :
```
Modèle : o3-mini ou Claude Sonnet
Prompt : Les tests de pagination échouent quand limit=0. Analyse pourquoi et propose un fix qui gère aussi limit négatif et limit > total.
```
→ Le raisonnement étape par étape trouve le edge case.

**Cas 3 — Gros contexte** (favoriser la fenêtre) :
```
Modèle : Gemini 2.5 Pro
Prompt : #file:src/app.js #file:src/services/taskService.js #file:src/routes/tasks.js #file:src/routes/analytics.js #file:src/utils/validators.js #file:public/js/app.js
Fais un audit sécurité complet de toute l'application
```
→ Gère plus de fichiers en contexte sans troncature.

**Cas 4 — Vision/Image** (favoriser le multimodal) :
```
Modèle : GPT-4o (supporte la vision)
Prompt : [coller screenshot] + "Reproduis ce design"
```

#### Règles de choix rapide

| Situation | Modèle recommandé |
|-----------|------------------|
| Complétion rapide, petite modif | GPT-4o mini |
| Usage général, code + explications | GPT-4o |
| Architecture, refactoring, analyse | Claude Sonnet |
| Algorithmes, raisonnement mathématique | o1 / o3-mini |
| Très gros fichiers (>5000 lignes) | Gemini 2.5 Pro |
| Screenshots, maquettes, debug visuel | GPT-4o |

---

### Récapitulatif — Maîtrise du contexte

| Levier | Action | Impact tokens |
|--------|--------|---------------|
| Onglets ouverts | Fermer les fichiers non pertinents | -50-70% tokens IN |
| `#file:` explicite | Cibler les fichiers nécessaires | Contexte prévisible |
| `#selection` | Envoyer juste la sélection | Minimal |
| `.copilotignore` | Exclure node_modules, build, logs | -80% fichiers indexés |
| Nouvelle conversation | Reset quand le sujet change | Évite l'accumulation |
| `copilot-instructions.md` | Conventions auto-injectées | +200-400 tokens (utile) |
| `instructions/*.md` + `applyTo` | Contexte conditionnel par type de fichier | Minimal et ciblé |
| Images (Vision) | Screenshots, maquettes, diagrammes | Résultat visuel au 1er tour |
| Choix du modèle | Adapter le modèle à la tâche | Vitesse vs profondeur vs coût |
| Caveman Mode | Réponses ultra-compactes | -50-70% tokens OUT |

---

## 🎬 LAB 7 — Bonnes Pratiques de Prompting (Avant/Après mesurable)

### 🎯 Objectif
Prouver par A/B testing que la formulation du prompt impacte directement la qualité ET le coût en tokens. Chaque pratique se labntre en 2 min avec un mauvais prompt puis un bon prompt.

> ⚠️ **Tout se fait dans VS Code** — aucun outil externe requis.

### 🛠️ Préparation dans VS Code (une seule fois)

1. **Activer l'affichage des tokens** :
   - `Ctrl+Shift+P` → `Preferences: Open User Settings (JSON)`
   - Ajouter :
     ```json
     "github.copilot.advanced.debug.showTokenCount": true,
     "chat.experimental.showTokenCount": true
     ```

2. **Ouvrir le panneau Output pour voir les tokens** :
   - `Ctrl+Shift+U` (ouvre le panneau Output)
   - Dans le dropdown en haut à droite du panneau, sélectionner **"GitHub Copilot Chat"**
   - Vous verrez les lignes `request token count: XXXX` et `response token count: XXXX` après chaque prompt

3. **Ouvrir Copilot Chat** :
   - `Ctrl+Alt+I` (ou cliquer l'icône Copilot dans la barre latérale)

4. **Astuce** : Positionner le panneau Output en bas et Copilot Chat à droite pour voir les deux en simultané.

> **Comment mesurer l'efficacité** : Pour chaque manipulation, notez les tokens IN/OUT affichés dans le panneau Output → "GitHub Copilot Chat". Comparez les valeurs entre le ❌ mauvais prompt et le ✅ bon prompt.

---

### Pratique 1 — Être spécifique et contextuel

#### 🔬 Manipulation

**Étape 1** — Ouvrir Copilot Chat, taper le prompt vague :
```
Fais moi une fonction de validation
```

**Étape 2** — Observer la réponse : Copilot va demander des précisions ou générer quelque chose de générique. Noter les tokens.

**Étape 3** — Nouvelle conversation (icône `+`), taper le prompt précis :
```
Crée une fonction validateEmail(email) en JavaScript ES Module qui :
- Vérifie le format avec une regex
- Retourne false pour les domaines jetables (mailinator.com, yopmail.com, guerrillamail.com)
- Retourne { valid: boolean, reason: string }
```

**Étape 4** — Comparer.

#### 📊 Comment voir l'efficacité

| Métrique | Prompt vague | Prompt précis |
|----------|-------------|---------------|
| Tokens OUT | ~500-800 (code générique + questions) | ~200-350 (code ciblé) |
| Nombre de tours | 2-3 (Copilot demande des précisions) | 1 seul tour |
| Code utilisable | ❌ À refaire | ✅ Directement utilisable |

**Où regarder** : Panneau Output → "GitHub Copilot Chat" → lignes `[chat fetch] request token count: X` et `response token count: Y`

---

### Pratique 2 — Donner le format de sortie attendu

#### 🔬 Manipulation

**Étape 1** — Ouvrir `src/services/taskService.js`, taper dans Copilot Chat :
```
Ajoute de la validation dans createTask
```

**Étape 2** — Observer : Copilot va probablement générer une validation partielle ou dans un format différent de l'existant. Noter les tokens.

**Étape 3** — Nouvelle conversation, taper :
```
#file:src/services/taskService.js Ajoute la validation suivante dans createTask() :

Règles :
- title : string, 3-100 chars, obligatoire → Error("Title must be 3-100 characters")
- description : string, max 500 chars, optionnel
- priority : "low" | "medium" | "high" uniquement → Error("Invalid priority")

Format du code :
- Validation au début de la fonction (early return pattern)
- Utiliser les mêmes patterns que validatePagination dans validators.js
```

**Étape 4** — Comparer la qualité et le nombre de tokens.

#### 📊 Comment voir l'efficacité

| Métrique | Sans format | Avec format |
|----------|-------------|-------------|
| Tokens OUT | ~400 (code + explications non demandées) | ~250 (juste le code demandé) |
| Retouches nécessaires | 2-3 corrections manuelles | 0 retouche |
| Cohérence avec le projet | ❌ Style différent | ✅ Même patterns |

---

### Pratique 3 — Utiliser `#file:` pour limiter le contexte

#### 🔬 Manipulation

**Étape 1** — Ouvrir **5 fichiers** dans VS Code (app.js, taskService.js, validators.js, index.html, app.css). Taper dans Copilot Chat :
```
Explique la logique de filtrage des tâches
```

**Étape 2** — Observer les tokens IN dans le panneau Output. Copilot envoie le contenu de tous les fichiers ouverts comme contexte.

**Étape 3** — Nouvelle conversation, taper :
```
#file:src/services/taskService.js Explique uniquement la logique de filtrage dans getTasks()
```

**Étape 4** — Observer les tokens IN : seul taskService.js est envoyé.

#### 📊 Comment voir l'efficacité

| Métrique | Sans #file: (5 fichiers ouverts) | Avec #file: ciblé |
|----------|----------------------------------|-------------------|
| Tokens IN | ~3000-5000 (tous les fichiers ouverts) | ~800-1000 (1 seul fichier) |
| Réduction | — | **-70 à -80%** |
| Pertinence réponse | Mélange infos de plusieurs fichiers | Focalisé sur getTasks() |

**Astuce lab** : Ouvrir le panneau Output AVANT d'envoyer chaque prompt pour voir en temps réel les tokens envoyés.

---

### Pratique 4 — Structurer les demandes complexes en liste

#### 🔬 Manipulation

**Étape 1** — Taper en une seule phrase :
```
J'aimerais que tu crées un endpoint pour les utilisateurs qui gère la création avec validation et les erreurs et aussi les tests unitaires
```

**Étape 2** — Vérifier : est-ce que TOUT est là ? (validation, erreurs 400, tests pour chaque cas edge)

**Étape 3** — Nouvelle conversation, taper en structure :
```
Crée un endpoint POST /api/users dans un nouveau fichier src/routes/users.js :

1. Validation entrée :
   - email : format valide (regex), obligatoire
   - name : string 2-50 chars, obligatoire  
   - role : "admin" | "user", défaut "user"

2. Réponses HTTP :
   - 201 + { data: user } si succès
   - 400 + { error: "message explicite" } si validation échoue

3. Tests Jest dans tests/users.test.js :
   - POST valide → 201
   - Email invalide → 400
   - Name trop court → 400
   - Role invalide → 400
   - Email manquant → 400
```

**Étape 4** — Comparer la complétude.

#### 📊 Comment voir l'efficacité

| Métrique | Phrase continue | Liste structurée |
|----------|----------------|-----------------|
| Éléments oubliés | 1-2 cas edge manquants | 0 oubli |
| Tests générés | 2-3 tests basiques | 5 tests (tous les cas) |
| Tours nécessaires | 2+ ("tu as oublié...") | 1 seul tour |
| Tokens totaux (multi-tours) | ~1500 | ~900 |

---

### Pratique 5 — Référencer des exemples existants

#### 🔬 Manipulation

**Étape 1** — Taper sans référence :
```
Crée un service de gestion des utilisateurs
```

**Étape 2** — Observer le style du code généré (noms de fonctions, pattern de store, JSDoc ou pas...).

**Étape 3** — Nouvelle conversation, taper avec référence :
```
#file:src/services/taskService.js

Crée un service src/services/userService.js avec exactement la même structure :
- Même pattern de store in-memory avec Map
- Même nommage (getAll, getById, create, update, delete)
- Même style JSDoc
- Même pattern de validation en début de fonction
Mais pour des utilisateurs (id, email, name, role, createdAt)
```

**Étape 4** — Comparer les deux fichiers : le second sera cohérent avec taskService.js.

#### 📊 Comment voir l'efficacité

| Métrique | Sans référence | Avec #file: référence |
|----------|---------------|----------------------|
| Style cohérent avec le projet | ❌ Style générique | ✅ Même patterns |
| JSDoc présent | Aléatoire | ✅ Oui (copie le style) |
| Retouches pour conformité | 5-10 min d'adaptation | 0 retouche |
| Tokens OUT | Similaire | Similaire mais **0 retravail** |

**Ce qu'on mesure ici** : pas les tokens bruts mais le **temps gagné** et la **cohérence projet**.

---

### Pratique 6 — Demander un format de réponse minimal

#### 🔬 Manipulation

**Étape 1** — Dans VS Code, ouvrir `src/services/taskService.js` et modifier temporairement une ligne dans `deleteTask()` pour introduire un bug visible :
```javascript
// Trouver dans deleteTask() la ligne :
const index = this.tasks.findIndex(t => t.id === id);
// La remplacer par (bug : splice avec mauvais argument) :
const index = this.tasks.findIndex(t => t.id === id);
this.tasks.splice(index); // ← BUG : supprime tout à partir de l'index au lieu d'un seul élément
```

**Étape 2** — Taper dans Copilot Chat :
```
#file:src/services/taskService.js Il y a un bug dans deleteTask, comment le corriger ?
```

**Étape 3** — Observer : Copilot donne le fix + 10-15 lignes d'explications. Noter tokens OUT.

**Étape 4** — Nouvelle conversation, taper :
```
#file:src/services/taskService.js Corrige le bug dans deleteTask(). Code uniquement, pas d'explication.
```

**Étape 5** — Comparer les tokens OUT.

#### 📊 Comment voir l'efficacité

| Métrique | "Comment corriger ?" | "Code uniquement" |
|----------|---------------------|-------------------|
| Tokens OUT | ~300-500 (code + explications) | ~80-120 (code seul) |
| Réduction | — | **-60 à -75%** |
| Info utile perdue | Non (on sait déjà pourquoi) | Non |

**Quand utiliser** : quand on sait déjà ce qu'on veut et qu'on n'a pas besoin d'explications.

---

### Pratique 7 — Utiliser les commandes slash intégrées

#### 🔬 Manipulation

**Étape 1** — Sélectionner la fonction `createTask()` dans `taskService.js`. Taper :
```
Génère les tests unitaires pour cette fonction sélectionnée
```
Noter les tokens IN + OUT.

**Étape 2** — Même sélection, taper simplement :
```
/tests
```
Noter les tokens IN + OUT.

**Étape 3** — Comparer.

#### 📊 Comment voir l'efficacité

| Métrique | Prompt écrit | Commande /tests |
|----------|-------------|-----------------|
| Tokens IN (prompt) | ~20 tokens de prompt | ~5 tokens (commande optimisée) |
| Tokens OUT | Similaire | Similaire mais mieux structuré |
| Qualité | Variable | Constante (prompt interne testé) |

**Autres commandes à tester** :
- Sélectionner une fonction → `/doc` vs "Documente cette fonction"
- Sélectionner du code → `/explain` vs "Explique ce code"
- Sélectionner un bug → `/fix` vs "Corrige ce bug"

---

### Pratique 8 — Itérer plutôt que tout demander d'un coup

#### 🔬 Manipulation

**Étape 1** — Taper un prompt "monolithe" :
```
Crée un système complet de notifications avec : un service de notifications, les routes REST, les tests, l'intégration WebSocket, et la gestion des préférences utilisateur
```
Observer : code très long, probablement des erreurs, des incohérences.

**Étape 2** — Approche itérative (nouvelle conversation pour chaque étape) :

```
Tour 1 : Crée src/services/notificationService.js avec : create(userId, message, type), getByUser(userId), markAsRead(id). Store in-memory avec Map.
```
Valider → ça marche → tour suivant :
```
Tour 2 : #file:src/services/notificationService.js Crée les routes REST dans src/routes/notifications.js : GET /api/notifications/:userId, POST /api/notifications, PATCH /api/notifications/:id/read
```
Valider → ça marche → tour suivant :
```
Tour 3 : #file:src/services/notificationService.js #file:src/routes/notifications.js Crée les tests Jest dans tests/notifications.test.js
```

#### 📊 Comment voir l'efficacité

| Métrique | Tout d'un coup | Itératif (3 tours) |
|----------|---------------|-------------------|
| Tokens totaux | ~2000 IN + ~3000 OUT = 5000 | ~1500 IN + ~2000 OUT = 3500 |
| Bugs dans le code | 2-5 erreurs | 0-1 erreurs |
| Tests qui passent au 1er run | ~60% | ~95% |
| Temps de debug | 15-20 min | 2-3 min |

**Ce qu'on mesure** : tokens totaux INCLUANT les corrections et relances nécessaires.

---

### Pratique 9 — Préciser la technologie et les contraintes

#### 🔬 Manipulation

**Étape 1** — Taper un prompt ambigu :
```
Fais un cache pour les requêtes API
```
Observer : Copilot peut proposer Redis, un package npm, ou un objet simple. Peut être en CommonJS.

**Étape 2** — Nouvelle conversation, taper avec contraintes :
```
Crée src/utils/cache.js — un cache LRU in-memory en JavaScript ES Module :
- Pas de dépendance externe (pas de npm install)
- Capacité max configurable (défaut: 100 entrées)
- TTL par entrée en ms (défaut: 300000 = 5 min)
- API : get(key), set(key, value, ttl?), delete(key), clear(), size()
- Éviction automatique de la plus vieille entrée quand capacité atteinte
- Export default class Cache
```

#### 📊 Comment voir l'efficacité

| Métrique | Prompt ambigu | Prompt avec contraintes |
|----------|--------------|------------------------|
| Résultat utilisable tel quel | ❌ (mauvaise techno ou format) | ✅ |
| Nombre de relances | 2-3 ("non pas Redis", "en ESM pas CJS") | 0 |
| Tokens sur l'ensemble | ~2000 (multi-tours) | ~800 (1 tour) |
| Réduction totale | — | **-60%** |

---

### Pratique 10 — Utiliser les Prompt Files pour les patterns récurrents

#### 🔬 Manipulation

**Étape 1** — Taper manuellement le prompt complet pour créer une route :
```
Crée une route Express dans un nouveau fichier :
- ES Modules (import/export)
- JSDoc sur chaque fonction
- Try/catch avec gestion erreurs
- Réponse format { data } ou { error }
- Status codes appropriés 200/201/400/404/500
- Validation des inputs en début de handler
- Router Express exporté par défaut
Crée la route GET /api/categories qui retourne une liste de catégories
```
Ce prompt fait ~80 tokens IN à chaque utilisation.

**Étape 2** — Utiliser le prompt file. Taper dans le chat :
```
/generate-route Crée GET /api/categories qui retourne une liste de catégories
```
Le prompt file `.github/prompts/generate-route.prompt.md` contient déjà les conventions → 15 tokens IN de votre côté.

**Étape 3** — Comparer les tokens IN entre les deux approches.

#### 📊 Comment voir l'efficacité

| Métrique | Prompt manuel à chaque fois | Prompt File |
|----------|---------------------------|-------------|
| Tokens IN (prompt utilisateur) | ~80 tokens | ~15 tokens |
| Cohérence entre routes | ❌ On oublie des règles | ✅ Toujours les mêmes |
| Temps de frappe | 30 sec | 5 sec |
| Sur 10 routes créées | ~800 tokens de prompts | ~150 tokens de prompts |

**Comment créer vos propres Prompt Files** :
1. Créer un fichier `.github/prompts/mon-pattern.prompt.md`
2. Ajouter le frontmatter :
   ```markdown
   ---
   description: "Description affichée dans le menu de sélection"
   ---
   ```
3. Écrire le template de prompt avec les instructions fixes
4. Utiliser avec `/mon-pattern` suivi de la partie variable

---

### 🧪 Exercice Récapitulatif — Comparaison complète

Pour voir l'impact cumulé de toutes les pratiques, faire cette manipulation :

**Test A — Sans bonnes pratiques** :
1. Ouvrir 8+ fichiers dans VS Code
2. Taper dans Copilot Chat :
   ```
   Ajoute un système de tags aux tâches avec la possibilité d'ajouter et retirer des tags, de filtrer par tags, et fais les tests
   ```
3. Noter : tokens IN, tokens OUT, nombre de tours, temps total, bugs

**Test B — Avec toutes les bonnes pratiques** :
1. Fermer tous les fichiers sauf `taskService.js`
2. Taper :
   ```
   #file:src/services/taskService.js

   Ajoute la gestion des tags dans taskService.js :
   
   1. Modifier createTask() : accepter un champ tags (array de strings, défaut [])
   2. Ajouter addTag(taskId, tag) : ajoute un tag si pas déjà présent
   3. Ajouter removeTag(taskId, tag) : retire un tag
   4. Modifier getTasks() : accepter un filtre ?tag=xxx qui filtre les tâches ayant ce tag
   
   Même style JSDoc que les fonctions existantes.
   Code uniquement, pas d'explication.
   ```
3. Noter : tokens IN, tokens OUT, nombre de tours, temps total, bugs

#### 📊 Résultats attendus

| Métrique | Test A (sans pratiques) | Test B (avec pratiques) |
|----------|------------------------|------------------------|
| Tokens IN | ~4000-6000 | ~1000-1500 |
| Tokens OUT | ~2000-3000 | ~800-1200 |
| Total tokens | ~6000-9000 | ~1800-2700 |
| Tours nécessaires | 3-5 | 1 |
| Bugs | 2-4 | 0-1 |
| Temps total | 10-15 min | 2-3 min |
| **Réduction globale** | — | **-60 à -70%** |

---

### Récapitulatif — Tableau de référence rapide

| # | Pratique | Manipulation | Comment mesurer |
|---|----------|-------------|-----------------|
| 1 | Être spécifique | Prompt vague vs précis | Compter les tours nécessaires |
| 2 | Format de sortie | Avec/sans spécification du format | Retouches manuelles nécessaires |
| 3 | `#file:` ciblé | 5 fichiers ouverts vs #file: | Tokens IN dans Output panel |
| 4 | Listes structurées | Phrase vs liste numérotée | Éléments oubliés dans la réponse |
| 5 | Référencer l'existant | Sans vs avec #file: référence | Cohérence du code (diff visuel) |
| 6 | Réponse minimale | Avec vs sans "code uniquement" | Tokens OUT (-60-75%) |
| 7 | Commandes `/` | Prompt écrit vs /tests, /doc | Tokens IN + qualité constante |
| 8 | Itérer | Monolithe vs 3 petits tours | Bugs + tokens corrections |
| 9 | Préciser la techno | Ambigu vs contraint | Tours de clarification évités |
| 10 | Prompt Files | Manuel vs /generate-route | Tokens IN sur 10 utilisations |

---

## 🎬 LAB 8 — Optimisation des Tokens (Caveman Mode)

### 🎯 Objectif
Prouver concrètement qu'on peut réduire de 50-70% la consommation de tokens sans perdre en qualité.

---

### 6a. Caveman Mode — Réponses ultra-concises

**Ce que c'est** : Un agent + instruction issus de [github/awesome-copilot](https://github.com/github/awesome-copilot/blob/main/agents/caveman-mode.agent.md) qui force Copilot à répondre en mode "homme des cavernes" — minimal, direct, sans fioritures.

**Principes du Caveman Mode** :
- Phrases de 3-6 mots : "Me fix code" pas "I will fix the code for you"
- 1 phrase max par idée
- Pas de fillers : "Great question!", "Here's what I found", "Let me explain..."
- Pas d'émojis, pas de politesses
- Le **code** reste normal et propre (seul le chat est terse)
- Cible : **50-70% moins de tokens en sortie**

**Modus Operandi** :

**Étape 1 — Activer le Caveman Mode** :

Renommer le fichier pour l'activer :
```powershell
# Windows (PowerShell) :
Rename-Item ".github/instructions/caveman-mode.instructions.md.disabled" ".github/instructions/caveman-mode.instructions.md"

# Mac/Linux :
# mv .github/instructions/caveman-mode.instructions.md.disabled .github/instructions/caveman-mode.instructions.md
```

> **Note** : Ce fichier est livré désactivé (`.disabled`) par défaut pour ne pas affecter les labs 1-7.

**Étape 2 — Ouvrir une NOUVELLE conversation** (important pour reset le contexte) :
- Cliquer sur `+` dans Copilot Chat (nouvelle conversation)

**Étape 3 — Poser la MÊME question que l'étape 4a** :

```
Explique-moi comment fonctionne le filtrage dans la fonction getTasks() du fichier src/services/taskService.js et quels sont les risques de performance si on a 10000 tâches
```

**Étape 4 — Comparer les réponses** :

| | Mode Normal (étape 4a) | Caveman Mode (maintenant) |
|--|--|--|
| **Style** | Paragraphes, détails, alternatives | Bullets, 3-6 mots par point |
| **Longueur** | 200-400 mots | 50-100 mots |
| **Tokens OUT** | ≈ 300-500 | ≈ 100-200 |
| **Info utile** | ✅ Complète | ✅ Même info, condensée |

**Étape 5 — Montrer que le CODE reste propre** :

Demander dans la même conversation :
```
Refactore getTasks pour fusionner les filtres en une seule passe
```

→ Le code généré est propre, lisible, bien formaté (seule la RÉPONSE chat est terse).

**✅ Résultat attendu** :

Réponse Caveman typique :
```
- getTasks spreads array, chains two .filter() + sort
- 10k tasks: 3 passes O(n) each → O(3n + n log n)
- Fix: single pass, combined predicate
- No index → linear scan always
```

VS réponse normale :
```
La fonction getTasks() dans taskService.js commence par créer une copie du tableau
avec l'opérateur spread [...tasks]. Ensuite, elle applique successivement deux filtres
avec .filter() si les paramètres status et/ou priority sont définis. Enfin, elle trie
le résultat par date de création décroissante avec .sort().

Pour 10 000 tâches, cela pose plusieurs problèmes de performance :
1. La copie initiale crée un nouveau tableau de 10 000 éléments...
2. Chaque .filter() parcourt l'intégralité du tableau...
[etc., 300+ mots]
```


### 📊 TOKENS — Noter dans le tableau (ligne 9) — COMPARER avec ligne 4

---

### 6b. Impact du `.copilotignore`

**Ce que c'est** : Un fichier qui exclut certains fichiers/dossiers du contexte envoyé à Copilot → moins de tokens IN.

**Modus Operandi** :

**Étape 1 — Montrer le fichier actuel** :

Ouvrir `.copilotignore` :
```gitignore
# Fichiers exclus du contexte Copilot
node_modules/
dist/
coverage/
*.lock
*.log
.git/
```

**Étape 2 — Supprimer temporairement** :
```powershell
# Windows (PowerShell) :
Rename-Item .copilotignore .copilotignore.backup

# Mac/Linux :
# mv .copilotignore .copilotignore.backup
```

**Étape 3 — Nouvelle conversation + même question** :
```
Explique-moi comment fonctionne le filtrage dans la fonction getTasks() du fichier src/services/taskService.js et quels sont les risques de performance si on a 10000 tâches
```

### 📊 TOKENS — Noter les tokens IN (ligne 10)

**Étape 4 — Remettre le fichier** :
```powershell
# Windows (PowerShell) :
Rename-Item .copilotignore.backup .copilotignore

# Mac/Linux :
# mv .copilotignore.backup .copilotignore
```

**Étape 5 — Montrer la différence** :
- **Sans `.copilotignore`** : Copilot scanne `node_modules/`, `package-lock.json` etc. → tokens IN élevés
- **Avec** : seuls les fichiers pertinents du projet → tokens IN réduits


---

### 6c. Technique `#file:` — Cibler le contexte

**Ce que c'est** : En préfixant un prompt avec `#file:chemin`, on force Copilot à n'utiliser QUE ce fichier comme contexte.

**Modus Operandi** :

**Sans ciblage** (Copilot scanne tout le projet) :
```
Comment fonctionne la création de tâches ?
```

**Avec ciblage** (Copilot utilise uniquement le fichier spécifié) :
```
#file:src/services/taskService.js Comment fonctionne la création de tâches ?
```

**Labntrer** :
1. Poser la question SANS `#file:` → noter les tokens IN
2. Poser la question AVEC `#file:` → noter les tokens IN
3. Montrer la différence : **60-80% de tokens IN en moins**


---

### 6d. Récapitulatif — Tableau des techniques d'optimisation

**Tableau des techniques** :

| Technique | Réduit Tokens IN | Réduit Tokens OUT | Comment l'activer |
|-----------|:---:|:---:|---------|
| `.copilotignore` | **-30 à -50%** | — | Fichier à la racine du projet |
| `#file:` ciblé | **-60 à -80%** | — | Préfixer le prompt avec `#file:chemin` |
| Prompt Files | **-20 à -30%** | — | `.github/prompts/*.prompt.md` |
| Caveman Mode (agent) | — | **-50 à -70%** | Sélectionner agent "Caveman Mode" |
| Caveman Mode (instruction) | — | **-50 à -70%** | `.github/instructions/caveman-mode.instructions.md` |
| Fonctions courtes (<30 lignes) | **-15 à -25%** | — | Bonne pratique = fichiers plus petits |
| JSDoc précis | — | **Moins de re-prompts** | Documenter → Copilot comprend mieux du 1er coup |
| Modèle léger | **-50% coût** | — | `model: 'gpt-4o-mini'` dans prompt file |

---

### 6e. 💡 Tips pratiques pour gérer ses tokens au quotidien

**Réduire les tokens IN (ce que Copilot reçoit)** :

| Tip | Pourquoi | Comment |
|-----|----------|---------|
| **Nouvelle conversation fréquemment** | L'historique s'accumule à chaque tour (tokens IN explosent) | Cliquer `+` dès que le sujet change |
| **`#file:` plutôt que @workspace** | @workspace scanne tout le projet ; #file: envoie uniquement le fichier ciblé | `#file:src/services/taskService.js explique la création` |
| **Fichiers courts et focalisés** | Copilot envoie le fichier ouvert en contexte | Découper les gros fichiers (>200 lignes) en modules |
| **`.copilotignore` bien configuré** | Exclut le bruit (node_modules, lock, logs, dist) | Ajouter tout ce qui n'est pas du code source utile |
| **Fermer les onglets inutiles** | VS Code envoie parfois les onglets ouverts comme contexte | Ne garder que les fichiers pertinents à la tâche |

**Réduire les tokens OUT (ce que Copilot génère)** :

| Tip | Pourquoi | Comment |
|-----|----------|---------|
| **Demander "code uniquement"** | Évite les explications autour du code | Ajouter "Code uniquement, pas d'explication" au prompt |
| **Caveman Mode** | Réduit les réponses de 50-70% | Activer l'agent ou l'instruction |
| **Prompt Files structurés** | Le template guide Copilot → moins de hors-sujet | Créer des `/generate-*` pour les tâches répétitives |
| **Être spécifique** | Plus le prompt est précis, moins Copilot "hésite" et génère d'alternatives | "Ajoute validation email regex" > "Ajoute de la validation" |
| **Une chose à la fois** | Un prompt = une action → réponse courte et ciblée | Éviter les prompts qui demandent 5 choses |

**Réduire les re-prompts (tours gaspillés)** :

| Tip | Pourquoi | Comment |
|-----|----------|---------|
| **Instructions projet à jour** | Copilot génère correctement du 1er coup | Maintenir `.github/copilot-instructions.md` à jour |
| **Instructions conditionnelles** | Le bon contexte au bon moment, automatiquement | Utiliser `applyTo` dans `.github/instructions/` |
| **Prompt structuré en liste** | Copilot ne rate rien si c'est numéroté | `1. Crée... 2. Modifie... 3. Teste...` |
| **Donner un exemple** | Copilot reproduit le pattern donné | "Même style que getAll() dans taskService.js" |
| **Vérifier le modèle** | GPT-4o > GPT-4o-mini pour les tâches complexes | Cliquer sur le modèle en bas du chat pour changer |

**En résumé — La règle des 3C** :
- **Contexte** minimal et ciblé (tokens IN ↓)
- **Concision** dans les prompts (tokens OUT ↓)
- **Convention** via instructions/prompts (re-prompts ↓)

---

## ⏱️ Durée estimée de la lab

### Version complète (toutes les labs)

| Lab | Contenu | Durée estimée |
|------|---------|:---:|
| **LAB 1** | Génération de code | 5 min |
| **LAB 2** | Génération de tests | 5 min |
| **LAB 3** | Génération de docs | 3 min |
| **LAB 4** | Modes Ask / Edit / Agent | 10 min |
| **LAB 5** | Custom Agents, Prompts, Instructions, Skills, MCP | 25-35 min |
| **LAB 5 🏆** | Comparatifs avancés (6 comparatifs) | 20-30 min |
| **LAB 6** | Gestion du contexte | 10-15 min |
| **LAB 7** | Bonnes pratiques prompting | 10-15 min |
| **LAB 8** | Optimisation tokens (Caveman) | 5-10 min |
| | **TOTAL complet** | **~90-120 min** |

### Versions raccourcies (selon le temps disponible)

**Format 30 min — "L'essentiel"** :
- LAB 1 (code) — 3 min
- LAB 4c (Agent mode) — 5 min
- LAB 5 : Comparatif 6 "WOW" uniquement — 10 min
- LAB 8 (Caveman Mode) — 5 min
- Conclusion + tokens — 5 min

**Format 45 min — "Le convaincant"** :
- LAB 1 (code) — 3 min
- LAB 2 (tests) — 3 min
- LAB 4 (3 modes) — 7 min
- LAB 5 : Comparatifs 1 + 4 + 6 — 15 min
- LAB 8 (Caveman) — 5 min
- Tips tokens + conclusion — 7 min

**Format 60 min — "Le complet"** :
- LAB 1-3 (code/tests/docs) — 10 min
- LAB 4 (3 modes) — 8 min
- LAB 5 : Comparatifs 1 + 3 + 4 + 5 + 6 — 25 min
- LAB 7 (2-3 règles de prompting) — 7 min
- LAB 8 (Caveman) + tips — 10 min


---

## 📁 Structure du projet

```
copilot-demo-orange/
├── .github/
│   ├── copilot-instructions.md              # 📄 Instructions globales projet
│   ├── agents/
│   │   ├── caveman-mode.agent.md            # 🦴 Agent Caveman (github/awesome-copilot)
│   │   ├── code-reviewer.agent.md           # 🔍 Agent review sécurité/perf
│   │   ├── full-review.agent.md             # 📋 Agent orchestrateur 3-passes
│   │   └── qa-tester.agent.md               # 🧪 Agent QA navigateur
│   ├── instructions/
│   │   ├── caveman-mode.instructions.md.disabled  # 🦴 Instruction terse (activer pour lab 8)
│   │   ├── api-routes.instructions.md       # 📏 Conventions routes (applyTo: src/routes/**)
│   │   └── tests.instructions.md            # 📏 Conventions tests (applyTo: tests/**)
│   └── prompts/
│       ├── generate-route.prompt.md         # 📝 Template: nouveau endpoint
│       ├── generate-tests.prompt.md         # 📝 Template: tests unitaires
│       ├── generate-boosted-component.prompt.md  # 📝 Template: composant UI
│       ├── generate-service.prompt.md       # 📝 Template: service CRUD
│       ├── generate-crud.prompt.md          # 📝 Template: module complet (skill)
│       └── audit-accessibility.prompt.md    # 📝 Template: audit a11y
├── .vscode/
│   ├── mcp.json                             # 🔌 Serveurs MCP: Playwright + Awesome Copilot
│   └── extensions.json                      # 📦 Extensions recommandées
├── .copilotignore                           # 🚫 Exclure fichiers du contexte IA
├── .gitignore
├── src/
│   ├── app.js                               # 🚀 Express app (port 3000)
│   ├── routes/
│   │   ├── tasks.js                         # 🔀 API REST /api/tasks (CRUD)
│   │   └── analytics.js                     # 📊 API /api/analytics/stats
│   ├── services/
│   │   └── taskService.js                   # 💼 Logique métier (in-memory store)
│   └── utils/
│       └── validators.js                    # ✅ Validation, sanitisation, pagination
├── public/
│   ├── index.html                           # 🎨 UI Orange Boosted (dark mode, CDN)
│   ├── css/app.css                          # 🎨 Styles custom (minimal)
│   └── js/app.js                            # ⚡ Frontend vanilla JS (fetch API)
├── tests/
│   ├── taskService.test.js                  # 🧪 18 tests (service CRUD)
│   ├── validators.test.js                   # 🧪 11 tests (validateurs)
│   └── e2e/
│       └── taskManager.spec.js              # 🎭 7 tests Playwright E2E
├── scripts/
│   └── reset-demo.js                        # 🔄 Script de reset entre labs
├── playwright.config.js                     # ⚙️ Config Playwright
├── jest.config.js                           # ⚙️ Config Jest (exclut e2e/)
├── package.json
└── package-lock.json                        # 🔒 Versions exactes (reproductibilité)
```

---

## ✅ Checklist Jour-J

### AVANT la lab

```
[ ] Node.js 20+ installé                    → node --version
[ ] VS Code avec extensions Copilot         → code --list-extensions | grep copilot
[ ] Licence Copilot active                   → github.com/settings/copilot
[ ] npm install fait (pas d'erreur)          → ls node_modules/.package-lock.json
[ ] npm test passe (29 tests)                → npm test
[ ] npm run dev lancé                        → http://localhost:3000 visible
[ ] Docker lancé (si MCP awesome-copilot)    → docker ps
[ ] Playwright installé                      → npx playwright --version
[ ] Settings token count activés             → settings.json vérifié
[ ] caveman instructions = .disabled         → ls .github/instructions/
[ ] Tableau de suivi tokens prêt             → imprimé ou onglet ouvert
[ ] Output Panel ouvert sur "GitHub Copilot Chat"
```

### PENDANT la lab

```
[ ] À CHAQUE ÉTAPE : noter tokens IN + OUT dans le tableau
[ ] Lab 1 — Génération code        → categoryService.js créé
[ ] Lab 2 — Génération tests       → /tests + prompt file
[ ] Lab 3 — Génération docs        → /doc + /** inline
[ ] Lab 4 — Modes Ask/Edit/Agent   → 3 modes montrés
[ ] Lab 5 — Personnalisation       → instructions, prompts, MCP
[ ] Lab 6 — Gestion du contexte   → avant/après tokens IN mesurés
[ ] Lab 7 — Bonnes pratiques      → A/B testing prompts
[ ] Lab 8 — Optimisation tokens   → caveman activé, comparaison faite
```

### APRÈS la lab

```
[ ] Montrer le tableau de tokens rempli → conclusion chiffrée
[ ] Remettre caveman-mode.instructions.md en .disabled
[ ] Remettre .copilotignore si supprimé
[ ] git checkout . pour remettre le code d'origine (si Agent a modifié des fichiers)
```

---

## 🔗 Ressources

| Ressource | URL |
|-----------|-----|
| **Awesome Copilot** (repo GitHub) | https://github.com/github/awesome-copilot |
| **Awesome Copilot** (site web) | https://awesome-copilot.github.com |
| **Caveman Mode** (agent) | https://github.com/github/awesome-copilot/blob/main/agents/caveman-mode.agent.md |
| **Caveman Mode** (instructions) | https://github.com/github/awesome-copilot/blob/main/instructions/caveman-mode.instructions.md |
| **Orange Boosted 5.3** | https://boosted.orange.com/ |
| **Copilot Documentation** | https://docs.github.com/copilot |
| **Copilot Custom Instructions** | https://docs.github.com/copilot/customizing-copilot/adding-repository-custom-instructions |
| **Playwright MCP** | https://www.npmjs.com/package/@playwright/mcp |
| **MCP Protocol** | https://modelcontextprotocol.io |

---

## ❓ FAQ / Troubleshooting

### ⚠️ Commandes par OS

Toutes les commandes PowerShell de ce README fonctionnent sur **Windows** (VS Code utilise PowerShell par défaut). Voici les équivalents pour Mac/Linux :

| Action | Windows (PowerShell) | Mac/Linux (bash) |
|--------|---------------------|-----------------|
| Renommer | `Rename-Item fichier.md fichier.bak` | `mv fichier.md fichier.bak` |
| Supprimer | `Remove-Item fichier.js` | `rm fichier.js` |
| Lister | `Get-ChildItem .github/` | `ls .github/` |
| Vérifier | `Test-Path .github/copilot-instructions.md` | `test -f .github/copilot-instructions.md` |

---

### 🔄 Script de reset — Remettre tout en état entre les labs

Si vous avez fait des modifications pendant une lab et voulez repartir de zéro :

```bash
# Option 1 — Reset complet (annule TOUTES les modifications locales)
git checkout .
git clean -fd

# Option 2 — Reset sélectif (script fourni)
node scripts/reset-demo.js
```

Le script `reset-demo.js` remet spécifiquement :
- ✅ `caveman-mode.instructions.md` → `.disabled`
- ✅ Supprime les fichiers temporaires (`temp-*.js`, `categoryService.js`)
- ✅ Remet `.copilotignore` à son état d'origine
- ✅ Remet `copilot-instructions.md` s'il a été renommé

---

### "Copilot ne propose rien quand je tape"
- Vérifier que l'extension est activée (icône Copilot en bas à droite de VS Code)
- Vérifier la licence : https://github.com/settings/copilot
- Recharger VS Code : `Ctrl+Shift+P` → `Developer: Reload Window`

### "Le MCP Playwright ne démarre pas"
- Vérifier que `@playwright/mcp` est accessible : `npx @playwright/mcp@latest --help`
- Vérifier `.vscode/mcp.json` existe et est valide
- `Ctrl+Shift+P` → `MCP: List Servers` → vérifier le status

### "Le MCP awesome-copilot échoue"
- Docker doit tourner : `docker ps`
- Première utilisation = téléchargement de l'image (~200MB) : `docker pull ghcr.io/microsoft/mcp-dotnet-samples/awesome-copilot:latest`

### "Les tests E2E échouent"
- Le serveur doit tourner : `npm run dev` dans un autre terminal
- Playwright installé : `npx playwright install chromium`

### "Le Caveman Mode ne s'applique pas"
- Vérifier que le fichier est bien nommé `.instructions.md` (pas `.disabled`)
- Ouvrir une NOUVELLE conversation (le contexte est caché dans la conversation courante)
- Recharger VS Code après avoir renommé le fichier

### "Je ne vois pas les tokens"
- Setting à ajouter : `"github.copilot.advanced.debug.showTokenCount": true`
- Output Panel : `Ctrl+Shift+U` → sélectionner `GitHub Copilot Chat` dans le dropdown
- Les tokens ne sont pas toujours visibles selon la version de l'extension

### "Les Prompt Files (/generate-route) n'apparaissent pas"
- Vérifier que les fichiers `.github/prompts/*.prompt.md` existent
- Vérifier qu'ils commencent par un frontmatter YAML valide (`---` ... `---`)
- Recharger VS Code : `Ctrl+Shift+P` → `Developer: Reload Window`
- Dans le chat, taper `/` et attendre 1-2 secondes que la liste charge

### "Les Custom Agents n'apparaissent pas dans le dropdown"
- Vérifier que les fichiers sont dans `.github/agents/` (pas `.github/agent/`)
- Le nom de fichier = le nom dans le dropdown (ex: `code-reviewer.agent.md` → `code-reviewer`)
- Le frontmatter doit contenir `name` et `description`
- Recharger VS Code après création d'un agent

### "L'instruction conditionnelle ne s'applique pas"
- Vérifier que le fichier est dans `.github/instructions/` (pas `.github/`)
- Le `applyTo` dans le frontmatter doit matcher le fichier ouvert :
  - `"tests/**"` → s'applique quand un fichier dans `tests/` est ouvert
  - `"src/routes/**"` → s'applique quand un fichier dans `src/routes/` est ouvert
- Le fichier actif (onglet sélectionné) détermine quelles instructions s'appliquent
- Vérifier dans Output panel : chercher "Custom instructions" dans les logs

### "npm test échoue avec SyntaxError: Cannot use import statement"
- Le projet utilise ES Modules (`"type": "module"` dans package.json)
- Jest nécessite le flag : `node --experimental-vm-modules node_modules/jest/bin/jest.js`
- Le script `npm test` est déjà configuré correctement, ne pas appeler `jest` directement

### "Erreur EADDRINUSE: port 3000 déjà utilisé"
```powershell
# Windows — trouver et tuer le processus
netstat -ano | findstr :3000
# Noter le PID (dernière colonne), puis :
Stop-Process -Id <PID>

# Mac/Linux :
# lsof -i :3000
# kill <PID>
```

### "Le navigateur MCP Playwright ne s'ouvre pas"
- Playwright utilise Chromium headless par défaut dans MCP
- Si besoin de voir le navigateur, modifier `.vscode/mcp.json` :
```json
{
  "mcp": {
    "servers": {
      "playwright": {
        "command": "npx",
        "args": ["@playwright/mcp@latest", "--headless=false"]
      }
    }
  }
}
```
- Après modification : `Ctrl+Shift+P` → `MCP: Stop Server` → `playwright`, puis `MCP: Start Server` → `playwright`

---

## 🔄 Reproduire la lab — Guide express (5 min)

Pour quelqu'un qui clone le repo et veut tout lancer rapidement :

```bash
# 1. Cloner
git clone https://github.com/Ch0wseth/AzureDays_Demo.git
cd AzureDays_Demo

# 2. Installer
npm install
npx playwright install chromium

# 3. Vérifier
npm test                    # Doit afficher "29 passed"
npm run dev                 # Doit afficher "running at http://localhost:3000"
# (Ctrl+C pour arrêter)

# 4. Ouvrir dans VS Code
code .

# 5. Dans VS Code, vérifier :
#    - Ctrl+Shift+P → "MCP: List Servers" → playwright visible
#    - Ctrl+Alt+I → taper "Quel framework ?" → doit répondre "Orange Boosted"
#    - Ctrl+Shift+U → dropdown → "GitHub Copilot Chat" → logs visibles

# 6. Prêt ! Suivre le README à partir de "LAB 1"
```

### Configuration minimale requise

| Composant | Minimum | Recommandé |
|-----------|---------|------------|
| RAM | 8 Go | 16 Go |
| VS Code | 1.100+ | Dernière stable |
| Node.js | 20 LTS | 22 LTS |
| Connexion internet | Requise (Copilot = API cloud) | Rapide (< 200ms latence) |
| Écran | 1 écran | 2 écrans (code + navigateur) |
| Licence Copilot | Individual | Business/Enterprise (pour les agents) |

### Versions testées et validées

Ce repo a été testé avec :
- Node.js 22.x (LTS)
- VS Code 1.100+
- GitHub Copilot Extension 1.250+
- Windows 11, macOS Sonoma, Ubuntu 24.04
- Playwright 1.45+
