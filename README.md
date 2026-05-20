# 🤖 GitHub Copilot Demo — Orange Boosted

> **Guide 100% reproductible** — Suivez ce README pas à pas pour réaliser la démo complète.
> Chaque étape indique **exactement** ce qu'il faut faire, taper, et observer.

---

## Table des matières

1. [Pré-requis](#-pré-requis)
2. [Installation pas à pas](#-installation-pas-à-pas)
3. [Configuration VS Code](#-configuration-vs-code)
4. [Suivi des tokens](#-suivi-des-tokens-tout-au-long-de-la-démo)
5. [DÉMO 1 — Génération de code](#-démo-1--génération-de-code)
6. [DÉMO 2 — Génération de tests](#-démo-2--génération-de-tests)
7. [DÉMO 3 — Génération de documentation](#-démo-3--génération-de-documentation)
8. [DÉMO 4 — Modes Copilot (Ask, Edit, Agent)](#-démo-4--modes-copilot-ask-edit-agent)
9. [DÉMO 5 — Custom Agents, Prompts, Instructions & MCP](#-démo-5--custom-agents-prompts-instructions--mcp)
10. [Bonnes Pratiques de Prompting](#-bonnes-pratiques-de-prompting-pour-copilot)
11. [DÉMO 6 — Optimisation tokens (Caveman Mode)](#-démo-6--optimisation-des-tokens-caveman-mode)
12. [Structure du projet](#-structure-du-projet)
13. [Checklist Jour-J](#-checklist-jour-j)
14. [Ressources](#-ressources)

---

## 📋 Pré-requis

### Outils à installer AVANT la démo

| Outil | Version min. | Pourquoi | Comment vérifier |
|-------|:---:|---------|---------|
| Node.js | 20+ | Runtime de l'app | `node --version` |
| npm | 10+ | Gestionnaire de paquets | `npm --version` |
| VS Code | 1.100+ | IDE de la démo | `code --version` |
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

### Vérifier que les MCP servers sont détectés

1. Ouvrir la palette de commandes : `Ctrl+Shift+P`
2. Taper : `MCP: List Servers`
3. Vous devez voir :
   - ✅ `playwright` — Status: Ready (ou "Not Started" → il démarrera au premier usage)
   - ✅ `awesome-copilot` — Status: Ready (nécessite Docker) ou erreur si Docker n'est pas lancé

> **Si le MCP Playwright n'apparaît pas** : vérifier que `.vscode/mcp.json` existe et recharger VS Code (`Ctrl+Shift+P` → `Developer: Reload Window`).

### Vérifier que les Custom Instructions sont chargées

1. Ouvrir `.github/copilot-instructions.md`
2. Ouvrir Copilot Chat (`Ctrl+Shift+I`)
3. Taper : `Quel framework CSS utilise ce projet ?`
4. Copilot doit répondre "Orange Boosted" (preuve qu'il a lu les instructions)

---

## 📊 Suivi des Tokens (tout au long de la démo)

### Où voir les tokens

| Méthode | Comment | Ce qu'on voit |
|---------|---------|---------------|
| Output Panel | `Ctrl+Shift+U` → dropdown → `GitHub Copilot Chat` | Logs détaillés avec token counts |
| Chat Header | En haut de chaque réponse dans Copilot Chat | Nombre de tokens (si setting activé) |
| Dashboard GitHub | https://github.com/settings/copilot → Usage | Consommation globale par jour |

### Tableau de suivi — À IMPRIMER ou ouvrir à côté

Remplir ce tableau **à chaque étape** de la démo :

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

## 🎬 DÉMO 1 — Génération de Code

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

## 🎬 DÉMO 2 — Génération de Tests

### 🎯 Objectif
Montrer que Copilot génère des tests unitaires complets et pertinents.

### 📝 Modus Operandi

**Méthode 1 — Commande /tests** :

1. **Ouvrir** Copilot Chat : `Ctrl+Shift+I`
2. **Taper exactement** :

```
/tests #file:src/services/taskService.js
```

3. **Attendre** la génération (5-10 secondes)
4. **Montrer** le résultat : suite Jest complète

**Méthode 2 — Prompt File personnalisé** :

1. **Ouvrir** Copilot Chat : `Ctrl+Shift+I`
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

## 🎬 DÉMO 3 — Génération de Documentation

### 🎯 Objectif
Montrer que Copilot génère de la documentation JSDoc riche et précise.

### 📝 Modus Operandi

**Méthode 1 — Commande /doc dans le chat** :

1. **Ouvrir** `src/utils/validators.js`
2. **Sélectionner** la fonction `sanitizeInput` (lignes 19-27 environ)
3. **Ouvrir** Copilot Chat : `Ctrl+Shift+I`
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

## 🎬 DÉMO 4 — Modes Copilot (Ask, Edit, Agent)

### 🎯 Objectif
Montrer les 3 modes d'interaction avec Copilot et leurs cas d'usage.

---

### 4a. Mode Ask — Comprendre du code

**Quand l'utiliser** : Questions sur le code, explications, revue, audit sécurité.

**Modus Operandi** :

1. **Ouvrir** Copilot Chat : `Ctrl+Shift+I`
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

1. **Ouvrir** Copilot Chat : `Ctrl+Shift+I`
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

## 🎬 DÉMO 5 — Custom Agents, Prompts, Instructions & MCP

### 🎯 Objectif
Montrer la personnalisation de Copilot pour l'adapter à un projet/équipe.

---

### 5a. Instructions personnalisées

**Ce que c'est** : Un fichier `.github/copilot-instructions.md` qui donne du contexte permanent à Copilot.

**Modus Operandi** :

1. **Ouvrir** `.github/copilot-instructions.md` dans VS Code → **montrer le contenu** :

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

2. **Ouvrir** Copilot Chat
3. **Taper** :

```
Crée un nouveau composant HTML pour afficher un message de succès quand une tâche est créée
```

4. **Observer** que Copilot :
   - ✅ Utilise les classes Orange Boosted (`alert`, `alert-success`)
   - ✅ Met le texte en français
   - ✅ Respecte le dark mode
   - ✅ Pas de classes Tailwind ni Bootstrap "vanilla"

5. **Preuve** : supprimer temporairement le fichier d'instructions, reposer la même question → Copilot ne connaît plus Orange Boosted


---

### 5b. Prompt Files réutilisables

**Ce que c'est** : Des templates de prompts dans `.github/prompts/` utilisables avec `/`.

**Modus Operandi** :

1. **Ouvrir** `.github/prompts/generate-route.prompt.md` → montrer le contenu :

```markdown
---
description: "Generate a new Express route with Orange Boosted conventions"
---
# Generate Express Route
Create a new Express.js route module following project conventions:
- Use ES Module syntax
- Include JSDoc documentation
- Add proper error handling
- Return JSON with { data: ... } or { error: ... } format
```

2. **Ouvrir** Copilot Chat
3. **Taper** `/` → la liste des prompts custom apparaît :
   - `generate-route`
   - `generate-tests`
   - `generate-boosted-component`
4. **Sélectionner** `generate-route`
5. **Compléter** avec :

```
pour un endpoint /api/users qui gère des utilisateurs avec email, nom et rôle (admin/user)
```

6. **Montrer** le résultat : un fichier route complet suivant exactement le template


### 📊 TOKENS — Noter dans le tableau (ligne 7)

---

### 5c. MCP Playwright Server — Copilot contrôle un navigateur

**Ce que c'est** : Un serveur MCP (Model Context Protocol) qui donne à Copilot la capacité de piloter un navigateur web réel.

**Pré-requis** : Le serveur de l'app doit tourner (`npm run dev`).

**Modus Operandi** :

1. **Vérifier** que l'app tourne : http://localhost:3000 dans le navigateur
2. **Ouvrir** Copilot Chat en mode **Agent** (dropdown → Agent)
3. **Taper exactement** :

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

4. **Observer** :
   - Copilot démarre un navigateur Chromium (vous pouvez le voir apparaître)
   - Il navigue, clique, remplit des champs
   - Il prend des screenshots (affichés inline dans le chat)
   - Il vérifie le résultat

**✅ Résultat attendu** :
- 2 screenshots dans le chat (avant/après)
- La tâche "Tâche créée par Copilot MCP" visible dans l'app
- Message de confirmation de Copilot

**Si ça ne marche pas** :
- Vérifier que `npm run dev` tourne (port 3000)
- `Ctrl+Shift+P` → `MCP: List Servers` → vérifier que Playwright est "Ready"
- Recharger VS Code si nécessaire

**Configuration** (déjà en place dans `.vscode/mcp.json`) :
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


### 📊 TOKENS — Noter dans le tableau (ligne 8)

---

### 5d. MCP Awesome Copilot — Catalogue communautaire

**Ce que c'est** : Un MCP server qui connecte Copilot au repo communautaire [github/awesome-copilot](https://github.com/github/awesome-copilot) contenant des centaines d'agents, instructions et prompts.

**Pré-requis** : Docker doit tourner.

**Modus Operandi** :

1. **Vérifier** Docker : `docker ps` dans le terminal (pas d'erreur)
2. **Ouvrir** Copilot Chat en mode **Agent**
3. **Taper** :

```
Utilise awesome-copilot pour rechercher des instructions disponibles pour Node.js et Express
```

4. **Observer** : Copilot interroge le MCP, affiche les résultats disponibles
5. **Optionnel** — demander à installer :

```
Installe l'instruction "nodejs" depuis awesome-copilot
```

**Configuration** (déjà en place dans `.vscode/mcp.json`) :
```json
"awesome-copilot": {
  "type": "stdio",
  "command": "docker",
  "args": ["run", "-i", "--rm", "ghcr.io/microsoft/mcp-dotnet-samples/awesome-copilot:latest"]
}
```

**Alternative sans Docker** : Montrer le site https://awesome-copilot.github.com avec la recherche et les badges "Install in VS Code" en 1 clic.



---

## 📐 Bonnes Pratiques de Prompting pour Copilot

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

**Astuce démo** : Ouvrir le panneau Output AVANT d'envoyer chaque prompt pour voir en temps réel les tokens envoyés.

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

**Étape 1** — Introduire volontairement un bug dans `src/services/taskService.js` :
```javascript
// Changer cette ligne dans deleteTask() :
const index = this.tasks.findIndex(t => t.id === id);
// En :
const index = this.tasks.findIndex(t => t.id == id);
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

## 🎬 DÉMO 6 — Optimisation des Tokens (Caveman Mode)

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
```bash
# Dans le terminal VS Code
mv .github/instructions/caveman-mode.instructions.md.disabled .github/instructions/caveman-mode.instructions.md
```

> **Note** : Ce fichier est livré désactivé (`.disabled`) par défaut pour ne pas affecter les démos 1-5.

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
```bash
mv .copilotignore .copilotignore.backup
```

**Étape 3 — Nouvelle conversation + même question** :
```
Explique-moi comment fonctionne le filtrage dans la fonction getTasks() du fichier src/services/taskService.js et quels sont les risques de performance si on a 10000 tâches
```

### 📊 TOKENS — Noter les tokens IN (ligne 10)

**Étape 4 — Remettre le fichier** :
```bash
mv .copilotignore.backup .copilotignore
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

**Démontrer** :
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

## 📁 Structure du projet

```
copilot-demo-orange/
├── .github/
│   ├── copilot-instructions.md              # 📄 Instructions globales projet
│   ├── agents/
│   │   └── caveman-mode.agent.md            # 🦴 Agent Caveman (github/awesome-copilot)
│   ├── instructions/
│   │   └── caveman-mode.instructions.md.disabled  # 🦴 Instruction terse (activer pour démo 6)
│   └── prompts/
│       ├── generate-route.prompt.md         # 📝 Template: nouveau endpoint
│       ├── generate-tests.prompt.md         # 📝 Template: tests unitaires
│       └── generate-boosted-component.prompt.md  # 📝 Template: composant UI
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
├── playwright.config.js                     # ⚙️ Config Playwright
├── jest.config.js                           # ⚙️ Config Jest (exclut e2e/)
├── package.json
└── package-lock.json                        # 🔒 Versions exactes (reproductibilité)
```

---

## ✅ Checklist Jour-J

### AVANT la démo

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

### PENDANT la démo

```
[ ] À CHAQUE ÉTAPE : noter tokens IN + OUT dans le tableau
[ ] Démo 1 — Génération code        → categoryService.js créé
[ ] Démo 2 — Génération tests       → /tests + prompt file
[ ] Démo 3 — Génération docs        → /doc + /** inline
[ ] Démo 4 — Modes Ask/Edit/Agent   → 3 modes montrés
[ ] Démo 5 — Personnalisation       → instructions, prompts, MCP
[ ] Démo 6 — Optimisation tokens    → caveman activé, comparaison faite
```

### APRÈS la démo

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
