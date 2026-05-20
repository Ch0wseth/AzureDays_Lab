---
description: "Créer un nouveau service CRUD avec in-memory store"
---
# Génération de Service

Crée un nouveau service dans `src/services/` avec :

## Structure obligatoire
- Fonctions exportées individuellement (named exports)
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
- Même patterns que `src/services/taskService.js`
