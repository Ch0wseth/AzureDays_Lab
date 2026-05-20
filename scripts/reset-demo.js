#!/usr/bin/env node

/**
 * @fileoverview Reset script to restore demo state between demonstrations.
 * Run with: node scripts/reset-demo.js
 */

import { existsSync, renameSync, unlinkSync, readdirSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const ROOT = join(import.meta.dirname, '..');
const INSTRUCTIONS_DIR = join(ROOT, '.github', 'instructions');

const actions = [];

// 1. Disable caveman mode if active
const cavemanActive = join(INSTRUCTIONS_DIR, 'caveman-mode.instructions.md');
const cavemanDisabled = join(INSTRUCTIONS_DIR, 'caveman-mode.instructions.md.disabled');
if (existsSync(cavemanActive)) {
  renameSync(cavemanActive, cavemanDisabled);
  actions.push('✅ Caveman mode désactivé (.disabled)');
}

// 2. Restore .github/ tracked files (AGENTS.md, agents, skills, instructions)
try {
  execSync('git checkout -- .github/ AGENTS.md', { cwd: ROOT, stdio: 'pipe' });
  actions.push('✅ Fichiers Copilot CLI restaurés (git checkout .github/ AGENTS.md)');
} catch {
  actions.push('⚠️ git checkout .github/ échoué (pas grave si aucune modification)');
}

// 3. Remove temporary files
const tempPatterns = ['temp-', 'temp2-'];
const rootFiles = readdirSync(ROOT);
for (const file of rootFiles) {
  if (tempPatterns.some(p => file.startsWith(p)) && file.endsWith('.js')) {
    unlinkSync(join(ROOT, file));
    actions.push(`✅ Fichier temporaire supprimé : ${file}`);
  }
}

// 4. Remove categoryService.js if it was created during demo
const categoryService = join(ROOT, 'src', 'services', 'categoryService.js');
if (existsSync(categoryService)) {
  unlinkSync(categoryService);
  actions.push('✅ categoryService.js supprimé (créé pendant démo 1)');
}

// 5. Remove any html-components instruction created during comparatif 1
const htmlInstructions = join(INSTRUCTIONS_DIR, 'html-components.instructions.md');
if (existsSync(htmlInstructions)) {
  unlinkSync(htmlInstructions);
  actions.push('✅ html-components.instructions.md supprimé (créé pendant comparatif 1)');
}

// 6. Restore git state for tracked files (without losing untracked config)
try {
  execSync('git checkout -- src/ public/ tests/', { cwd: ROOT, stdio: 'pipe' });
  actions.push('✅ Code source restauré (git checkout src/ public/ tests/)');
} catch {
  actions.push('⚠️ git checkout échoué (pas grave si aucune modification)');
}

// Summary
console.log('\n🔄 Reset démo terminé :\n');
if (actions.length === 0) {
  console.log('   Rien à faire — tout est déjà en état initial.');
} else {
  actions.forEach(a => console.log(`   ${a}`));
}
console.log('\n💡 Pour un reset TOTAL : git checkout . && git clean -fd\n');
