import { test, expect } from '@playwright/test'

test.describe('Admin Dashboard - E2E', () => {
  test.beforeEach(async ({ page, context }) => {
    // Clear storage
    await context.clearCookies()
    await page.goto('/')
    
    // Login as admin
    await page.getByText('Admin (CRUD Completo)').click()
    await page.getByRole('button', { name: 'Entrar' }).click()
    
    // Wait for dashboard
    await expect(page.getByText('Admin')).toBeVisible()
  })

  test('should display admin dashboard elements', async ({ page }) => {
    await expect(page.getByText('🔧 Sistema de Consertos')).toBeVisible()
    await expect(page.getByText('admin')).toBeVisible()
    await expect(page.getByText('Admin')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Sair' })).toBeVisible()
    await expect(page.getByRole('button', { name: /novo conserto/i })).toBeVisible()
  })

  test('should display consertos list', async ({ page }) => {
    // Wait for table to load
    await expect(page.getByText(/total de consertos/i)).toBeVisible({ timeout: 10000 })
  })

  test('should show search bar', async ({ page }) => {
    await expect(page.getByPlaceholder(/marca do veículo/i)).toBeVisible()
    await expect(page.getByPlaceholder(/modelo do veículo/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /buscar/i })).toBeVisible()
  })

  test('should create new conserto', async ({ page }) => {
    // Click new conserto button
    await page.getByRole('button', { name: /novo conserto/i }).click()
    
    // Wait for form
    await expect(page.getByText('➕ Novo Conserto')).toBeVisible()
    
    // Fill form
    await page.getByLabel(/data entrada/i).fill('14/11/2024')
    await page.getByLabel(/data saída/i).fill('20/11/2024')
    await page.getByLabel(/nome do mecânico/i).fill('Roberto Silva')
    await page.getByLabel(/anos de experiência/i).fill('8')
    await page.getByLabel(/marca do veículo/i).fill('Volkswagen')
    await page.getByLabel(/modelo do veículo/i).fill('Golf')
    await page.getByLabel(/ano do veículo/i).fill('2021')
    await page.getByLabel(/cor do veículo/i).fill('Cinza')
    
    // Submit
    await page.getByRole('button', { name: /criar/i }).click()
    
    // Verify success message
    await expect(page.getByText(/conserto criado com sucesso/i)).toBeVisible({ timeout: 5000 })
  })

  test('should validate required fields on create', async ({ page }) => {
    await page.getByRole('button', { name: /novo conserto/i }).click()
    await expect(page.getByText('➕ Novo Conserto')).toBeVisible()
    
    // Try to submit empty form
    await page.getByRole('button', { name: /criar/i }).click()
    
    // Should show validation errors
    await expect(page.getByText(/data de entrada é obrigatória/i)).toBeVisible()
  })

  test('should validate date format', async ({ page }) => {
    await page.getByRole('button', { name: /novo conserto/i }).click()
    await expect(page.getByText('➕ Novo Conserto')).toBeVisible()
    
    // Fill with wrong date format
    await page.getByLabel(/data entrada/i).fill('2024-11-14')
    await page.getByLabel(/nome do mecânico/i).fill('Test')
    await page.getByLabel(/marca do veículo/i).fill('Test')
    await page.getByLabel(/modelo do veículo/i).fill('Test')
    await page.getByLabel(/ano do veículo/i).fill('2020')
    
    await page.getByRole('button', { name: /criar/i }).click()
    
    await expect(page.getByText(/formato deve ser dd\/mm\/aaaa/i)).toBeVisible()
  })

  test('should cancel form creation', async ({ page }) => {
    await page.getByRole('button', { name: /novo conserto/i }).click()
    await expect(page.getByText('➕ Novo Conserto')).toBeVisible()
    
    // Fill some data
    await page.getByLabel(/data entrada/i).fill('14/11/2024')
    
    // Cancel
    await page.getByRole('button', { name: /cancelar/i }).click()
    
    // Should go back to list
    await expect(page.getByText('➕ Novo Conserto')).not.toBeVisible()
  })

  test('should search by marca', async ({ page }) => {
    // Wait for data to load
    await page.waitForTimeout(1000)
    
    // Search
    await page.getByPlaceholder(/marca do veículo/i).fill('Toyota')
    await page.getByRole('button', { name: /buscar/i }).click()
    
    // Wait for results
    await page.waitForTimeout(1000)
  })

  test('should clear search filters', async ({ page }) => {
    await page.waitForTimeout(1000)
    
    // Fill search
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

  test('should logout successfully', async ({ page }) => {
    await page.getByRole('button', { name: 'Sair' }).click()
    
    // Should go back to login page
    await expect(page.getByText('🔧 Sistema de Consertos')).toBeVisible()
    await expect(page.getByPlaceholder('Digite seu usuário')).toBeVisible()
  })

  test('should toggle between list and form view', async ({ page }) => {
    // Open form
    await page.getByRole('button', { name: /novo conserto/i }).click()
    await expect(page.getByText('➕ Novo Conserto')).toBeVisible()
    
    // Close form (button changes to "Ver Lista")
    const toggleButton = page.getByRole('button', { name: /ver lista/i })
    if (await toggleButton.isVisible()) {
      await toggleButton.click()
      await expect(page.getByText('➕ Novo Conserto')).not.toBeVisible()
    }
  })
})
