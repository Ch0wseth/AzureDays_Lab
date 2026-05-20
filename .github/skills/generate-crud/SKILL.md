---
name: generate-crud
description: "Generate a full CRUD module: service + route + tests, all consistent with project conventions."
user-invocable: true
---

# Skill : Génération CRUD Complète

Génère les 3 fichiers pour un nouveau module CRUD :

## 1. Service (src/services/{nom}Service.js)
- Fonctions exportées individuellement (named exports)
- Map() in-memory comme store
- Méthodes : getAll, getById, create, update, delete
- JSDoc, validation, createdAt/updatedAt
- ID auto-généré avec crypto.randomUUID()

## 2. Route (src/routes/{nom}.js)
- Express Router
- Endpoints : GET /, GET /:id, POST /, PUT /:id, DELETE /:id
- Format réponse { data } / { error }
- Try/catch + status codes (200, 201, 400, 404, 500)

## 3. Tests (tests/{nom}Service.test.js)
- Test chaque méthode du service
- Cas nominaux + cas d'erreur (not found, validation)
- describe/it, assertions expect()
- Au moins 10 tests

## Conventions
- ES Modules (import/export)
- Même style que les fichiers existants dans src/
- JSDoc sur chaque fonction exportée
- Texte UI en français
