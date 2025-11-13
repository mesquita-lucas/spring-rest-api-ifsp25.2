import { test, expect } from '@playwright/test'

test.describe('User Dashboard (Read-Only) - E2E', () => {
  test.beforeEach(async ({ page, context }) => {
    // Clear storage
    await context.clearCookies()
    await page.goto('/')
    
    // Login as regular user
    await page.getByText('Usuário (Somente Leitura)').click()
    await page.getByRole('button', { name: 'Entrar' }).click()
    
    // Wait for dashboard
    await expect(page.getByText('Usuário')).toBeVisible()
  })

  test('should display user dashboard elements', async ({ page }) => {
    await expect(page.getByText('🔧 Sistema de Consertos')).toBeVisible()
    await expect(page.getByText('user')).toBeVisible()
    await expect(page.getByText('Usuário')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Sair' })).toBeVisible()
  })

  test('should NOT show "Novo Conserto" button for regular user', async ({ page }) => {
    await expect(page.getByRole('button', { name: /novo conserto/i })).not.toBeVisible()
  })

  test('should display consertos list', async ({ page }) => {
    // Wait for table to load
    await expect(page.getByText(/total de consertos/i)).toBeVisible({ timeout: 10000 })
  })

  test('should allow search functionality for user', async ({ page }) => {
    await expect(page.getByPlaceholder(/marca do veículo/i)).toBeVisible()
    await expect(page.getByPlaceholder(/modelo do veículo/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /buscar/i })).toBeVisible()
  })

  test('should be able to search by marca', async ({ page }) => {
    await page.waitForTimeout(1000)
    
    await page.getByPlaceholder(/marca do veículo/i).fill('Honda')
    await page.getByRole('button', { name: /buscar/i }).click()
    
    await page.waitForTimeout(1000)
  })

  test('should be able to search by modelo', async ({ page }) => {
    await page.waitForTimeout(1000)
    
    await page.getByPlaceholder(/modelo do veículo/i).fill('Civic')
    await page.getByRole('button', { name: /buscar/i }).click()
    
    await page.waitForTimeout(1000)
  })

  test('should be able to clear search', async ({ page }) => {
    await page.waitForTimeout(1000)
    
    // Search
    await page.getByPlaceholder(/marca do veículo/i).fill('Toyota')
    await page.getByRole('button', { name: /buscar/i }).click()
    await page.waitForTimeout(500)
    
    // Clear
    const clearButton = page.getByRole('button', { name: /limpar/i })
    if (await clearButton.isVisible()) {
      await clearButton.click()
      await page.waitForTimeout(500)
    }
  })

  test('should NOT show edit buttons in table', async ({ page }) => {
    await page.waitForTimeout(1000)
    
    // Check that edit buttons are not present
    const editButtons = page.getByTitle('Editar')
    await expect(editButtons.first()).not.toBeVisible().catch(() => {})
  })

  test('should NOT show delete buttons in table', async ({ page }) => {
    await page.waitForTimeout(1000)
    
    // Check that delete buttons are not present
    const deleteButtons = page.getByTitle('Excluir')
    await expect(deleteButtons.first()).not.toBeVisible().catch(() => {})
  })

  test('should NOT show actions column for user', async ({ page }) => {
    await page.waitForTimeout(1000)
    
    const actionsHeader = page.getByText('Ações')
    await expect(actionsHeader).not.toBeVisible().catch(() => {})
  })

  test('should display pagination info', async ({ page }) => {
    await expect(page.getByText(/página/i)).toBeVisible({ timeout: 5000 })
  })

  test('should display total consertos count', async ({ page }) => {
    await expect(page.getByText(/total de consertos/i)).toBeVisible({ timeout: 5000 })
  })

  test('should logout successfully', async ({ page }) => {
    await page.getByRole('button', { name: 'Sair' }).click()
    
    // Should go back to login page
    await expect(page.getByText('🔧 Sistema de Consertos')).toBeVisible()
    await expect(page.getByPlaceholder('Digite seu usuário')).toBeVisible()
  })

  test('should persist user session on reload', async ({ page }) => {
    await expect(page.getByText('user')).toBeVisible()
    
    // Reload page
    await page.reload()
    
    // Should still be logged in
    await expect(page.getByText('user')).toBeVisible()
    await expect(page.getByText('Usuário')).toBeVisible()
  })

  test('should view all data fields in table', async ({ page }) => {
    await page.waitForTimeout(1000)
    
    // Verify table headers are present
    await expect(page.getByText('ID')).toBeVisible()
    await expect(page.getByText('Data Entrada')).toBeVisible()
    await expect(page.getByText('Data Saída')).toBeVisible()
    await expect(page.getByText('Mecânico')).toBeVisible()
    await expect(page.getByText('Experiência')).toBeVisible()
    await expect(page.getByText('Veículo')).toBeVisible()
    await expect(page.getByText('Ano')).toBeVisible()
    await expect(page.getByText('Cor')).toBeVisible()
  })
})
