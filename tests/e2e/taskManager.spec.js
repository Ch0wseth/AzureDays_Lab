import { test, expect } from '@playwright/test';

/**
 * E2E tests for the Task Manager UI.
 * These tests can be run via Playwright MCP server in Copilot.
 */
test.describe('Task Manager - Orange Boosted UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main page with Orange branding', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('GitHub Copilot Demo');
    await expect(page.locator('.navbar-brand')).toBeVisible();
  });

  test('should show empty state initially', async ({ page }) => {
    await expect(page.locator('#taskList')).toContainText('Aucune tâche');
  });

  test('should open the add task modal', async ({ page }) => {
    await page.click('button:has-text("Nouvelle Tâche")');
    await expect(page.locator('.modal-title')).toContainText('Nouvelle Tâche');
    await expect(page.locator('#taskTitle')).toBeVisible();
  });

  test('should create a new task', async ({ page }) => {
    await page.click('button:has-text("Nouvelle Tâche")');
    await page.fill('#taskTitle', 'Ma première tâche');
    await page.fill('#taskDesc', 'Description de test');
    await page.selectOption('#taskPriority', 'high');
    await page.click('#btnSaveTask');

    await expect(page.locator('#taskList')).toContainText('Ma première tâche');
    await expect(page.locator('#statTotal')).toContainText('1');
  });

  test('should filter tasks by status', async ({ page }) => {
    await page.click('button:has-text("Nouvelle Tâche")');
    await page.fill('#taskTitle', 'Task to filter');
    await page.click('#btnSaveTask');

    await page.selectOption('#filterStatus', 'done');
    await expect(page.locator('#taskList')).toContainText('Aucune tâche');
  });

  test('should display analytics cards', async ({ page }) => {
    await expect(page.locator('#statsCards')).toBeVisible();
    await expect(page.locator('#statTotal')).toBeVisible();
  });

  test('should show Copilot features accordion', async ({ page }) => {
    await expect(page.locator('#copilotAccordion')).toBeVisible();
    await page.click('button:has-text("Modes Copilot")');
    await expect(page.locator('#collapseModes')).toBeVisible();
  });
});
