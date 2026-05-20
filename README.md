# 🤖 GitHub Copilot CLI Demo — Orange Boosted

> **Guide 100 % reproductible** pour démontrer **GitHub Copilot CLI** (`@github/copilot`) dans un terminal — version Azure Days.
> Tout se passe dans le terminal : pas d'IDE requis, juste `copilot` et ce dépôt.

---

## Table des matières

1. [Pré-requis](#-pré-requis)
2. [Installation pas à pas](#-installation-pas-à-pas)
3. [Première session Copilot CLI](#-première-session-copilot-cli)
4. [Suivi des tokens](#-suivi-des-tokens-tout-au-long-de-la-démo)
5. [DÉMO 1 — Génération de code](#-démo-1--génération-de-code)
6. [DÉMO 2 — Génération de tests](#-démo-2--génération-de-tests)
7. [DÉMO 3 — Génération de documentation](#-démo-3--génération-de-documentation)
8. [DÉMO 4 — Modes Standard / Plan / Autopilot](#-démo-4--modes-standard--plan--autopilot)
9. [DÉMO 5 — Customisations : `AGENTS.md`, Instructions, Skills, Agents & MCP](#-démo-5--customisations--agentsmd-instructions-skills-agents--mcp)
10. [DÉMO 6 — Gestion du contexte](#-démo-6--gestion-du-contexte)
11. [DÉMO 7 — Bonnes pratiques de prompting](#-démo-7--bonnes-pratiques-de-prompting)
12. [DÉMO 8 — Optimisation des tokens (Caveman Mode)](#-démo-8--optimisation-des-tokens-caveman-mode)
13. [Structure du projet](#-structure-du-projet)
14. [Checklist Jour-J](#-checklist-jour-j)
15. [FAQ / Troubleshooting](#-faq--troubleshooting)
16. [Reproduire la démo — Guide express](#-reproduire-la-démo--guide-express)

---

## 📋 Pré-requis

### Outils à installer AVANT la démo

| Outil | Version min. | Pourquoi | Vérification |
|-------|:---:|---------|---------|
| Node.js | 22+ | Runtime de l'app + de `@github/copilot` | `node --version` |
| npm | 10+ | Installation globale du CLI | `npm --version` |
| Git | 2.40+ | Cloner le repo | `git --version` |
| Docker | 24+ | MCP `awesome-copilot` (optionnel) | `docker --version` |
| Un terminal moderne | — | Windows Terminal, iTerm2, Alacritty… | — |

### Installer GitHub Copilot CLI

```bash
npm install -g @github/copilot
copilot --version
```

> ✅ **Résultat attendu** : Une version affichée (ex. `0.x.y`). Si la commande n'existe pas, vérifiez votre `PATH` npm global.

### Licence GitHub Copilot

Une licence active (Individual, Business ou Enterprise) est nécessaire.
Vérifier : <https://github.com/settings/copilot>

> Au premier lancement, `copilot` ouvrira le flux d'authentification GitHub dans votre navigateur (Device Flow).

### Enregistrer les serveurs MCP dans le CLI

> ⚠️ Le CLI `copilot` **ne lit pas** `.github/mcp.json` (qui sert à VS Code). Sa config MCP est utilisateur : `~/.copilot/mcp-config.json`. Sans cette étape, `playwright` n'apparaît pas dans `/mcp` et la DÉMO 5e échoue.

**Option A — Interactif dans la REPL** :

```text
/mcp add
```

Pour **playwright** (requis pour la DÉMO 5e) :

| Champ | Valeur |
|-------|--------|
| Name | `playwright` |
| Type | `local` |
| Command | `npx` |
| Args | `@playwright/mcp@latest` |
| Tools | `*` |

Pour **awesome-copilot** (optionnel — uniquement si Docker Desktop est lancé) — relancer `/mcp add` :

| Champ | Valeur |
|-------|--------|
| Name | `awesome-copilot` |
| Type | `local` |
| Command | `docker` |
| Args | `run -i --rm ghcr.io/microsoft/mcp-dotnet-samples/awesome-copilot:latest` |
| Tools | `*` |

**Option B — Fusion automatique depuis `.github/mcp.json`** (PowerShell, depuis la racine du repo après clonage) :

```powershell
$src = Get-Content .github\mcp.json -Raw | ConvertFrom-Json
$dstPath = "$HOME\.copilot\mcp-config.json"
if (-not (Test-Path $dstPath)) { '{"mcpServers":{}}' | Set-Content $dstPath }
Copy-Item $dstPath "$dstPath.bak" -Force
$dst = Get-Content $dstPath -Raw | ConvertFrom-Json
foreach ($name in $src.mcpServers.PSObject.Properties.Name) {
  $dst.mcpServers | Add-Member -NotePropertyName $name -NotePropertyValue $src.mcpServers.$name -Force
}
$dst | ConvertTo-Json -Depth 10 | Set-Content $dstPath -Encoding utf8
```

**Option B — bash / macOS / Linux** (nécessite `jq`) :

```bash
mkdir -p ~/.copilot
[ -f ~/.copilot/mcp-config.json ] || echo '{"mcpServers":{}}' > ~/.copilot/mcp-config.json
cp ~/.copilot/mcp-config.json ~/.copilot/mcp-config.json.bak
jq -s '.[0].mcpServers = (.[0].mcpServers + .[1].mcpServers) | .[0]' \
  ~/.copilot/mcp-config.json .github/mcp.json > /tmp/mcp-config.json \
  && mv /tmp/mcp-config.json ~/.copilot/mcp-config.json
```

Relancer `copilot`, puis vérifier :

```text
/mcp
```

→ `playwright` (et `awesome-copilot` si Docker tourne) doivent apparaître.

---

## 🚀 Installation pas à pas

### Étape 1 — Cloner le repository

```bash
git clone https://github.com/Ch0wseth/AzureDays_Demo.git
cd AzureDays_Demo
```

### Étape 2 — Installer les dépendances de l'app

```bash
npm install
npx playwright install chromium
```

### Étape 3 — Vérifier que l'app fonctionne

```bash
npm test
```

> ✅ `Test Suites: 2 passed, 2 total` — `Tests: 29 passed, 29 total`

```bash
npm run dev
```

> ✅ `🚀 Copilot Demo running at http://localhost:3000`

Ouvrir <http://localhost:3000> → page Orange Boosted dark, navbar Orange, sections **Tâches** / **Analytiques**.

### Étape 4 — Vérifier Copilot CLI

Dans un **deuxième** terminal, à la racine du projet :

```bash
npm run copilot:check    # affiche la version
copilot                  # lance la session interactive
```

> Au premier démarrage, suivre les instructions pour s'authentifier sur GitHub.

---

## 🎬 Première session Copilot CLI

Une fois `copilot` lancé, vous êtes dans la **REPL interactive**. Les choses à connaître :

| Action | Commande / Raccourci |
|--------|----------------------|
| Poser une question | Taper du texte + Entrée |
| Joindre un fichier au prompt | `@chemin/relatif/fichier.js` dans la phrase |
| Changer de mode (Standard ↔ Plan ↔ Autopilot) | `Shift + Tab` |
| Choisir un agent custom | `/agent` puis sélectionner |
| Invoquer un skill | `/<nom-du-skill>` (autocomplétion avec `/`) |
| Voir l'usage tokens cumulé | `/usage` |
| Voir le contenu du contexte courant | `/context` |
| Compacter la conversation | `/compact` |
| Lister les MCP servers actifs | `/mcp show` |
| Nouvelle conversation | `/new` |
| Quitter | `/exit` ou `Ctrl+D` |
| Mode one-shot (sans REPL) | `copilot -p "votre prompt"` |
| Exécuter une commande shell sans quitter la REPL | Préfixer la ligne avec `!` (ex. `!npm test`) |

> 💡 **Astuce shell avec `!`** : depuis l'invite `copilot`, tout ce qui commence par `!` est exécuté tel quel dans votre shell (PowerShell / bash), et la sortie reste visible dans le contexte de la session. Quelques exemples utiles pendant la démo :
>
> ```text
> !npm test
> !git status
> !ls src/services
> !node --version
> ```
>
> Pratique pour enchaîner « je génère du code → je lance les tests → je commente le résultat » sans jamais sortir de Copilot CLI. La sortie de la commande peut ensuite être référencée directement dans le prompt suivant (« corrige l'erreur affichée ci-dessus »).

> **Modes** :
> - **Standard** : propose, demande confirmation avant d'exécuter shell / d'écrire.
> - **Plan** : raisonne et propose un plan, n'écrit rien tant qu'on ne l'autorise pas.
> - **Autopilot** : exécute sans confirmation (à utiliser uniquement dans un sandbox / repo jetable).

---

## 📊 Suivi des Tokens (tout au long de la démo)

### Où voir les tokens

| Méthode | Comment | Ce qu'on voit |
|---------|---------|---------------|
| `/usage` | Tapé dans la session `copilot` | Tokens cumulés in/out + coût session |
| `/context` | Tapé dans la session `copilot` | Détail des fichiers/instructions chargés |
| OpenTelemetry JSONL | Variables d'env (voir bloc ci-dessous) | Trace de **chaque** requête (in/out/durée/coût) |
| Dashboard GitHub | <https://github.com/settings/copilot> → Usage | Consommation globale par jour |

**Activer la télémétrie locale (recommandé pour la démo)** :

PowerShell :
```powershell
$env:COPILOT_OTEL_ENABLED = "true"
$env:COPILOT_OTEL_FILE_EXPORTER_PATH = "./copilot-otel.jsonl"
copilot
```

bash (macOS / Linux) :
```bash
export COPILOT_OTEL_ENABLED=true
export COPILOT_OTEL_FILE_EXPORTER_PATH="./copilot-otel.jsonl"
copilot
```

À la fin de la démo, filtrer les tokens :

PowerShell :
```powershell
Get-Content copilot-otel.jsonl | Select-String tokens
```

bash :
```bash
cat copilot-otel.jsonl | grep tokens
```

### Tableau de suivi — À garder ouvert pendant la démo

| # | Étape | Prompt exact | Tokens In | Tokens Out | Total | Observation |
|---|-------|-------------|:---------:|:----------:|:-----:|-------------|
| 1 | Génération code | `@src/services/taskService.js Crée un categoryService équivalent…` | | | | Baseline |
| 2 | Génération tests | `/generate-tests pour @src/services/taskService.js` | | | | |
| 3 | Génération docs | `Ajoute un JSDoc complet à @src/utils/validators.js sanitizeInput` | | | | |
| 4 | Mode Standard | `Explique le filtrage dans getTasks() de @src/services/taskService.js…` | | | | **Référence pour comparer** |
| 5 | Mode Plan | `Plan : ajouter validation description max 500 sur @src/services/taskService.js` | | | | |
| 6 | Mode Autopilot | `Ajoute un système de catégories aux tâches…` | | | | Plus de tokens |
| 7 | Skill custom | `/generate-route` | | | | Skill pré-défini |
| 8 | MCP Playwright | `Navigue vers http://localhost:3000 et audite…` | | | | |
| 9 | Caveman Mode | **Même prompt que #4** | | | | **Comparer OUT avec #4** |
| 10 | Sans `.copilotignore` | **Même prompt que #4** | | | | **Comparer IN avec #4** |

---

## 🎬 DÉMO 1 — Génération de Code

### 🎯 Objectif
Montrer que Copilot CLI génère un fichier JS complet à partir d'une consigne courte qui s'appuie sur un fichier existant.

### 📝 Modus Operandi

1. Lancer `copilot` à la racine du repo.
2. S'assurer d'être en mode **Standard** (par défaut au démarrage).
3. Taper :

   ```text
   En t'inspirant de @src/services/taskService.js, crée un nouveau fichier
   src/services/categoryService.js qui gère des catégories ("bug", "feature",
   "documentation", "test") avec getAll/getById/create/update/delete,
   stockage en Map(), IDs via crypto.randomUUID(), JSDoc sur chaque fonction,
   texte en français. Respecte AGENTS.md.
   ```
4. Copilot affiche un **diff proposé** → confirmer avec `y` (yes) à l'invite d'écriture.
5. Vérifier :
   ```bash
   ls src/services/
   ```
   → `categoryService.js` est bien créé.

### ✅ Résultat attendu

- Fichier ES Modules avec named exports
- JSDoc partout, validation des champs requis
- Conventions Orange (français, style du `taskService.js`)

### 📊 TOKENS — Noter ligne 1 (`/usage`)

---

## 🎬 DÉMO 2 — Génération de Tests

### 🎯 Objectif
Montrer que Copilot CLI génère une suite Jest complète via un **skill** custom.

### 📝 Modus Operandi

1. Dans la session `copilot`, taper `/` → autocomplétion des skills.
2. Choisir `generate-tests` (ou taper directement) :

   ```text
   /generate-tests pour @src/utils/validators.js — crée tests/validators.cli.test.js
   ```
3. Accepter le diff.
4. Lancer :
   ```bash
   npm test
   ```

### ✅ Résultat attendu

- Nouveau fichier `tests/validators.cli.test.js`
- `describe` / `it` en français (cf. `.github/instructions/tests.instructions.md`)
- Couverture des cas nominaux + cas limites (null, vide, types invalides)
- 100 % des tests passent

### 📊 TOKENS — Noter ligne 2

---

## 🎬 DÉMO 3 — Génération de Documentation

### 🎯 Objectif
Montrer que Copilot CLI génère du JSDoc enrichi avec exemples.

### 📝 Modus Operandi

1. Dans la session `copilot` :

   ```text
   Ajoute un JSDoc complet (avec deux @example) à la fonction sanitizeInput
   dans @src/utils/validators.js. Ne touche à rien d'autre.
   ```
2. Accepter le diff (mode Standard → confirmation).
3. Ouvrir le fichier (PowerShell : `Get-Content src/utils/validators.js` — bash : `cat src/utils/validators.js`).

### ✅ Résultat attendu

```javascript
/**
 * Sanitizes a string to prevent XSS by escaping HTML entities.
 * @param {string} input - Raw user input.
 * @returns {string} Sanitized string safe for HTML rendering.
 * @example
 * sanitizeInput('<script>alert("xss")</script>')
 * // → '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
 * @example
 * sanitizeInput('Hello World') // → 'Hello World'
 */
```

### 📊 TOKENS — Noter ligne 3

---

## 🎬 DÉMO 4 — Modes Standard / Plan / Autopilot

### 🎯 Objectif
Comparer les trois modes d'exécution du CLI. Le mode se change avec **`Shift+Tab`** et est affiché dans le footer de la REPL.

---

### 4a. Mode **Standard** — Comprendre du code (équivalent "Ask")

**Quand l'utiliser** : questions, explications, audits sans modification.

**Modus Operandi** :

1. Mode **Standard** (par défaut).
2. Taper :
   ```text
   Explique-moi comment fonctionne le filtrage dans la fonction getTasks()
   du fichier @src/services/taskService.js, et quels sont les risques de
   performance si on a 10 000 tâches.
   ```
3. Copilot répond en texte (aucun fichier modifié).

**✅ Résultat attendu** :
- Explication du spread `[...tasks]`, des `.filter()` chaînés, du `.sort()`
- Suggestion : combiner les filtres en une passe, indexer via `Map`

### 📊 TOKENS — Noter ligne 4 ⚠️ **GARDER CE CHIFFRE** — on le compare à l'étape 9

---

### 4b. Mode **Plan** — Modifier du code avec plan d'exécution (équivalent "Edit")

**Quand l'utiliser** : modifications ciblées où l'on veut **voir le plan avant d'écrire**.

**Modus Operandi** :

1. Passer en mode **Plan** : `Shift+Tab` jusqu'à voir `Plan` dans le footer.
2. Taper :
   ```text
   @src/services/taskService.js — Ajoute dans createTask la validation de
   la description : max 500 caractères (throw au-delà), et console.warn si
   > 200 caractères. Ne modifie rien d'autre.
   ```
3. Copilot affiche un **plan détaillé** + le diff exact proposé.
4. Confirmer l'application.

**✅ Résultat attendu** : Dans `createTask`, après la validation du titre :

```javascript
if (description.length > 500) {
  throw new Error('Description must not exceed 500 characters');
}
if (description.length > 200) {
  console.warn(`Description is ${description.length} characters (recommended: < 200)`);
}
```

### 📊 TOKENS — Noter ligne 5

---

### 4c. Mode **Autopilot** — Tâches multi-fichiers (équivalent "Agent")

**Quand l'utiliser** : grosse feature multi-fichiers dans un repo jetable / branche dédiée.

> ⚠️ Le mode Autopilot **exécute sans confirmation**. Toujours partir d'une branche propre :
> ```bash
> git checkout -b demo/categories
> ```

**Modus Operandi** :

1. Passer en mode **Autopilot** : `Shift+Tab`.
2. Taper :

   ```text
   Ajoute un système de catégories aux tâches.

   1. @src/services/taskService.js :
      - Champ "category" (valeurs: "bug" | "feature" | "documentation" | "test")
      - Optionnel, défaut null, validé à create
      - Filtrage via getTasks({ category })

   2. @src/routes/tasks.js :
      - GET /api/tasks accepte ?category=
      - POST /api/tasks accepte body.category

   3. @public/index.html :
      - <select> catégorie dans le modal de création
      - <select> de filtre catégorie à côté des filtres existants

   4. @public/js/app.js :
      - Envoyer la catégorie à la création
      - Appliquer le filtre dans loadTasks()
      - Afficher la catégorie comme badge sur chaque tâche

   5. Créer tests/categoryFeature.test.js :
      - Création avec / sans catégorie
      - Filtrage par catégorie
      - Validation catégorie invalide

   Lance `npm test` à la fin et corrige si quelque chose casse.
   ```
3. Observer Copilot enchaîner : lecture des fichiers, écritures, exécution de `npm test`.

**✅ Résultat attendu** :
- 5–6 fichiers modifiés/créés
- L'app affiche le filtre et le badge catégorie
- `npm test` finit vert

### 📊 TOKENS — Noter ligne 6 (comparer avec Standard / Plan)

> 💡 Reset pour repartir propre :
> ```bash
> npm run reset
> git checkout main
> ```

---

## 🎬 DÉMO 5 — Customisations : `AGENTS.md`, Instructions, Skills, Agents & MCP

### 🎯 Objectif
Voir, créer et activer chaque mécanisme de personnalisation de Copilot CLI, et observer son effet.

### 📖 Vue d'ensemble — Les 5 mécanismes

```
┌─────────────────────────────────────────────────────────────────────────┐
│                  PERSONNALISATION COPILOT CLI                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  📋 AGENTS.md (racine)              📋 INSTRUCTIONS CONDITIONNELLES     │
│  ┌──────────────────────┐           ┌──────────────────────┐            │
│  │ ./AGENTS.md           │           │ .github/instructions/ │           │
│  │                       │           │   nom.instructions.md │           │
│  │ Lu à CHAQUE session   │           │   (front-matter       │           │
│  │ par le CLI. Conv.,    │           │    applyTo: "glob")   │           │
│  │ stack, conventions    │           │                       │           │
│  └──────────────────────┘           │ Injecté quand le      │           │
│                                      │ fichier ciblé est     │           │
│                                      │ référencé.            │           │
│                                      └──────────────────────┘           │
│                                                                          │
│  🎯 SKILLS                          🤖 AGENTS CUSTOM                    │
│  ┌──────────────────────┐           ┌──────────────────────┐            │
│  │ .github/skills/       │           │ .github/agents/       │           │
│  │   <nom>/SKILL.md     │           │   <nom>.agent.md      │           │
│  │                       │           │                       │           │
│  │ Invoqué avec /<nom>   │           │ Choisi via /agent     │           │
│  │ dans la REPL.         │           │ — change persona pour │           │
│  └──────────────────────┘           │ toute la conversation │           │
│                                      └──────────────────────┘           │
│                                                                          │
│  🔧 MCP SERVERS                                                          │
│  ┌──────────────────────┐                                                │
│  │ .github/mcp.json      │                                               │
│  │   playwright          │   Donne au CLI des CAPACITÉS                  │
│  │   awesome-copilot     │   externes (navigateur, API, DB…)             │
│  └──────────────────────┘                                                │
└─────────────────────────────────────────────────────────────────────────┘
```

| Mécanisme | Fichier | Activation | Portée |
|-----------|---------|-----------|--------|
| `AGENTS.md` | `./AGENTS.md` (racine) | Automatique au démarrage | Toute la session |
| Instructions cond. | `.github/instructions/*.instructions.md` | Automatique si glob matche | Fichiers ciblés |
| Skills | `.github/skills/<nom>/SKILL.md` | `/nom` dans la REPL | 1 requête |
| Agents | `.github/agents/<nom>.agent.md` | `/agent` puis choix | Toute la conversation |
| MCP Servers | `.github/mcp.json` | Auto si déclaré | Outils dispo |

### 5a. `AGENTS.md` — Le contexte permanent

1. Dans `copilot`, taper :
   ```text
   Quel framework CSS utilise ce projet ?
   ```
   → Réponse : **Orange Boosted 5.3** (preuve que `AGENTS.md` est lu).

2. **Désactiver temporairement** dans un autre terminal :

   PowerShell :
   ```powershell
   Move-Item AGENTS.md AGENTS.md.bak
   ```
   bash :
   ```bash
   mv AGENTS.md AGENTS.md.bak
   ```
3. `/new` dans la session, reposer la même question → réponse beaucoup plus générique.
4. Restaurer :

   PowerShell :
   ```powershell
   Move-Item AGENTS.md.bak AGENTS.md
   ```
   bash :
   ```bash
   mv AGENTS.md.bak AGENTS.md
   ```

### 5b. Instructions conditionnelles

Fichier `.github/instructions/tests.instructions.md` (front-matter `applyTo: "tests/**"`) impose : `describe`/`it` en français, tester `null` / `undefined` / vides.

**Manipulation** :

```text
/generate-tests pour @src/utils/validators.js — fichier tests/validators.demo.test.js
```

→ Les noms de test sont en français parce que le glob matche `tests/**`.

Demander ensuite (sans matcher le glob) :

```text
Génère 3 tests Jest pour @src/utils/validators.js dans un fichier scripts/check.js
```

→ Les noms reviennent en anglais (instructions non injectées).

### 5c. Skills

Lister les skills disponibles : taper `/` dans la REPL.

Les skills livrés :

- `/generate-route` — nouvelle route Express
- `/generate-tests` — suite Jest complète
- `/generate-service` — service CRUD in-memory
- `/generate-crud` — service + route + tests d'un coup
- `/generate-boosted-component` — composant Orange Boosted
- `/audit-accessibility` — audit a11y via MCP Playwright

Démo :

```text
/generate-route nom: reports, endpoints CRUD complets
```

### 5d. Agents custom

```text
/agent
```

→ Liste les agents : `caveman-mode`, `code-reviewer`, `full-review`, `qa-tester`.

Activer **code-reviewer** :

```text
Revois @src/services/taskService.js sur les axes sécurité et performance.
```

→ Sortie structurée 🔴/🟡/🟢 par problème.

### 5e. MCP Servers

> Pré-requis : les serveurs MCP doivent avoir été enregistrés dans `~/.copilot/mcp-config.json` (voir la section [Enregistrer les serveurs MCP dans le CLI](#enregistrer-les-serveurs-mcp-dans-le-cli) des pré-requis).

```text
/mcp
```

→ `playwright` (et `awesome-copilot` si Docker tourne) doivent apparaître.

Démo MCP Playwright :

```text
/audit-accessibility
```

ou directement :

```text
Avec le serveur MCP playwright, ouvre http://localhost:3000, prends un
screenshot, vérifie que tous les boutons ont un aria-label ou un texte
visible et que les images ont un alt. Rends un rapport ✅/❌.
```

### 📊 TOKENS — Noter lignes 7 (skill) et 8 (MCP)

---

## 🎬 DÉMO 6 — Gestion du Contexte

### 🎯 Objectif
Montrer que **ce que voit Copilot** détermine la qualité ET la facture.

### 📝 Modus Operandi

#### 6a. Inspecter le contexte courant

```text
/context
```

→ Liste : `AGENTS.md`, instructions matchées, fichiers attachés via `@`, sortie shell récente.

#### 6b. Compacter la conversation

Faire 5–6 échanges, puis :

```text
/usage
/compact
/usage
```

→ La conso baisse fortement : `/compact` résume la conversation et conserve uniquement l'essentiel.

#### 6c. Attacher seulement ce qui compte

Mauvais :
```text
Refactor la fonction getTasks (le repo est ici)
```

Bon :
```text
@src/services/taskService.js — refactor uniquement getTasks pour ramener
les filtres à une seule passe O(n). Ne touche à rien d'autre.
```

#### 6d. `.copilotignore` — exclure le bruit

Le fichier `.copilotignore` à la racine empêche le CLI d'indexer `node_modules/`, `dist/`, `coverage/`, `.git/`, `*.log`.

**Démo A/B (étape 10 du tableau)** :

1. Avec `.copilotignore` en place, dans une **nouvelle** session, poser le prompt de l'étape 4 → noter `tokens in`.
2. Renommer le fichier :

   PowerShell :
   ```powershell
   Move-Item .copilotignore .copilotignore.bak
   ```
   bash :
   ```bash
   mv .copilotignore .copilotignore.bak
   ```
3. `/new` dans la session, **même prompt** → noter `tokens in`.
4. Restaurer :

   PowerShell :
   ```powershell
   Move-Item .copilotignore.bak .copilotignore
   ```
   bash :
   ```bash
   mv .copilotignore.bak .copilotignore
   ```

→ Sans `.copilotignore`, l'indexation balaye `node_modules/` et `tokens in` explose.

### 📊 TOKENS — Noter ligne 10

---

## 🎬 DÉMO 7 — Bonnes Pratiques de Prompting

### 🎯 Objectif
Mesurer l'écart **qualité + tokens** entre un prompt flou et un prompt structuré.

### Recette d'un bon prompt CLI

1. **Contexte** : un ou plusieurs `@fichier` plutôt que du texte décrit.
2. **Objectif** : 1 verbe d'action, 1 livrable.
3. **Contraintes** : style, langue, conventions, ce qu'il ne faut PAS faire.
4. **Critère d'acceptation** : tests, commande qui doit passer.

### Comparatif avant / après

#### ❌ Prompt flou

```text
Améliore les performances des tâches
```

→ Réponse générique, propose 10 refactors hors sujet, beaucoup de tokens out.

#### ✅ Prompt structuré

```text
@src/services/taskService.js — réécris UNIQUEMENT la fonction getTasks
pour combiner status + priority + sort en une seule passe O(n + n log n).
Conserve la signature publique et les tests existants. Pas de nouvelles
dépendances. Critère : `npm test` doit rester vert.
```

→ Diff ciblé, court, tests verts.

Faire les deux dans deux sessions distinctes (`/new`) et noter `/usage` après chaque.

---

## 🎬 DÉMO 8 — Optimisation des Tokens (Caveman Mode)

### 🎯 Objectif
Montrer qu'un **agent custom** peut diviser par 3–5 les tokens de sortie sans perdre l'info utile.

### 📝 Modus Operandi

1. Nouvelle session : `copilot` → `/new`.
2. **Sans caveman**, reposer le prompt de l'étape 4 :
   ```text
   Explique-moi comment fonctionne le filtrage dans la fonction getTasks()
   du fichier @src/services/taskService.js, et quels sont les risques de
   performance si on a 10 000 tâches.
   ```
   → `/usage` → noter `tokens out` (référence ligne 4).
3. `/new`, puis activer l'agent :
   ```text
   /agent
   ```
   → choisir **`caveman-mode`**.
4. **Reposer le MÊME prompt**.
5. `/usage` → noter `tokens out` (ligne 9).

### ✅ Résultat attendu

| | Standard | Caveman |
|---|:--:|:--:|
| Tokens out | ~600–900 | ~120–200 |
| Qualité de l'info | OK | OK, juste brut |

Caveman conserve **toutes les capacités** (lecture, écriture, shell, MCP) — il ne change que le **style** de réponse.

### 📊 TOKENS — Noter ligne 9 et comparer avec ligne 4

---

## 📁 Structure du projet

```
AzureDays_Demo/
├── AGENTS.md                          # Contexte projet lu par Copilot CLI
├── README.md                          # Ce guide
├── .copilotignore                     # Fichiers exclus du contexte CLI
├── package.json                       # Scripts : start, dev, test, copilot, reset
├── jest.config.js
├── playwright.config.js
├── .github/
│   ├── mcp.json                       # MCP servers : playwright + awesome-copilot
│   ├── agents/                        # Agents custom (persona + tools)
│   │   ├── caveman-mode.agent.md
│   │   ├── code-reviewer.agent.md
│   │   ├── full-review.agent.md
│   │   └── qa-tester.agent.md
│   ├── instructions/                  # Instructions conditionnelles (applyTo)
│   │   ├── api-routes.instructions.md
│   │   ├── tests.instructions.md
│   │   └── caveman-mode.instructions.md.disabled
│   └── skills/                        # Skills invocables via /<nom>
│       ├── audit-accessibility/SKILL.md
│       ├── generate-boosted-component/SKILL.md
│       ├── generate-crud/SKILL.md
│       ├── generate-route/SKILL.md
│       ├── generate-service/SKILL.md
│       └── generate-tests/SKILL.md
├── public/
│   ├── index.html
│   ├── css/app.css
│   └── js/app.js
├── scripts/
│   └── reset-demo.js                  # `npm run reset` — restaure l'état initial
├── src/
│   ├── app.js
│   ├── routes/{analytics,tasks}.js
│   ├── services/taskService.js
│   └── utils/validators.js
└── tests/
    ├── taskService.test.js
    ├── validators.test.js
    └── e2e/taskManager.spec.js
```

---

## ✅ Checklist Jour-J

À faire **30 min avant** la démo :

- [ ] `node --version` ≥ 22
- [ ] `npm --version` ≥ 10
- [ ] `copilot --version` retourne une version
- [ ] `docker ps` répond (sinon couper la démo MCP awesome-copilot)
- [ ] `git status` → working tree clean
- [ ] `npm install && npx playwright install chromium`
- [ ] `npm test` → 29 tests verts
- [ ] `npm run dev` → http://localhost:3000 OK
- [ ] Dans `copilot` : `/mcp show` → `playwright` au moins listé
- [ ] `/usage` répond
- [ ] Télémétrie OTel activée (`$env:COPILOT_OTEL_ENABLED = "true"`)
- [ ] Police de terminal lisible au vidéoprojecteur (≥ 18 pt)
- [ ] Tableau de suivi tokens ouvert / imprimé
- [ ] Branche `demo/categories` prête pour DÉMO 4c

À la fin :

```bash
npm run reset                          # restaure src/ public/ tests/ + .github/
git checkout main
git branch -D demo/categories 2>$null  # si créée
```

---

## ❓ FAQ / Troubleshooting

**`copilot: command not found`**
→ Réinstaller : `npm install -g @github/copilot`, vérifier que le dossier des binaires npm globaux est dans le `PATH` (`npm config get prefix`).

**Authentification échoue**
→ `copilot` redirige vers GitHub Device Flow. Si vous êtes derrière un proxy d'entreprise, configurer `HTTPS_PROXY` avant de lancer `copilot`.

**Aucun skill ne s'affiche dans `/`**
→ Vérifier la présence de `.github/skills/<nom>/SKILL.md` avec front-matter (`name`, `description`, `user-invocable: true`). Relancer `copilot`.

**MCP Playwright absent dans `/mcp show`**
→ Vérifier `.github/mcp.json`, que `npx` est dans le `PATH`, et relancer `copilot` dans le dossier du repo.

**MCP `awesome-copilot` en erreur**
→ Docker n'est pas lancé. Ouvrir Docker Desktop, attendre qu'il soit prêt, relancer `copilot`.

**`npm test` échoue après une démo Autopilot**
→ `npm run reset` puis `git checkout main`.

**Tokens explosent dès l'ouverture**
→ `cat .copilotignore` doit exister. Vérifier qu'aucun gros fichier (dump SQL, vidéo, logs) ne traîne à la racine.

**Mode Autopilot trop agressif**
→ Revenir à **Plan** ou **Standard** avec `Shift+Tab`. Vérifier le mode affiché en bas de la REPL.

---

## 🔄 Reproduire la démo — Guide express

```bash
# 1. Setup (identique PowerShell / bash)
git clone https://github.com/Ch0wseth/AzureDays_Demo.git
cd AzureDays_Demo
npm install
npx playwright install chromium
npm install -g @github/copilot

# 2. Sanity check
npm test                # 29 tests verts
npm run dev             # http://localhost:3000
```

3. Démarrer la démo (autre terminal) — activer la télémétrie :

PowerShell :
```powershell
$env:COPILOT_OTEL_ENABLED = "true"
$env:COPILOT_OTEL_FILE_EXPORTER_PATH = "./copilot-otel.jsonl"
copilot
```

bash (macOS / Linux) :
```bash
export COPILOT_OTEL_ENABLED=true
export COPILOT_OTEL_FILE_EXPORTER_PATH="./copilot-otel.jsonl"
copilot
```

```bash
# 4. Dérouler les 8 démos en notant /usage après chacune
#    (cf. tableau de suivi en début de README)

# 5. Reset
npm run reset
git checkout main
```

Bonne démo ! 🟠

---

## 📚 Pour aller plus loin

- [GitHub Copilot CLI for Beginners](https://github.com/github/copilot-cli-for-beginners) — guide officiel pour débuter avec Copilot CLI.
