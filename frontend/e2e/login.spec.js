import { test, expect } from '@playwright/test'

test.describe('Login Flow - E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display login page correctly', async ({ page }) => {
    await expect(page.getByText('🔧 Sistema de Consertos')).toBeVisible()
    await expect(page.getByText('IFSP - Spring REST API')).toBeVisible()
    await expect(page.getByPlaceholder('Digite seu usuário')).toBeVisible()
    await expect(page.getByPlaceholder('Digite sua senha')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible()
  })

  test('should show quick login buttons', async ({ page }) => {
    await expect(page.getByText('Admin (CRUD Completo)')).toBeVisible()
    await expect(page.getByText('Usuário (Somente Leitura)')).toBeVisible()
  })

  test('should login as admin using quick button', async ({ page }) => {
    await page.getByText('Admin (CRUD Completo)').click()
    
    // Verify fields are filled
    await expect(page.getByPlaceholder('Digite seu usuário')).toHaveValue('admin')
    await expect(page.getByPlaceholder('Digite sua senha')).toHaveValue('admin123')
    
    // Click login
    await page.getByRole('button', { name: 'Entrar' }).click()
    
    // Should redirect to dashboard
    await expect(page.getByText('admin')).toBeVisible()
    await expect(page.getByText('Admin')).toBeVisible()
  })

  test('should login as regular user using quick button', async ({ page }) => {
    await page.getByText('Usuário (Somente Leitura)').click()
    
    await expect(page.getByPlaceholder('Digite seu usuário')).toHaveValue('user')
    await expect(page.getByPlaceholder('Digite sua senha')).toHaveValue('user123')
    
    await page.getByRole('button', { name: 'Entrar' }).click()
    
    await expect(page.getByText('user')).toBeVisible()
    await expect(page.getByText('Usuário')).toBeVisible()
  })

  test('should login manually with credentials', async ({ page }) => {
    await page.getByPlaceholder('Digite seu usuário').fill('admin')
    await page.getByPlaceholder('Digite sua senha').fill('admin123')
    await page.getByRole('button', { name: 'Entrar' }).click()
    
    await expect(page.getByText('admin')).toBeVisible()
  })

  test('should show error for empty credentials', async ({ page }) => {
    await page.getByRole('button', { name: 'Entrar' }).click()
    
    await expect(page.getByText(/por favor, preencha usuário e senha/i)).toBeVisible()
  })

  test('should show error for empty username', async ({ page }) => {
    await page.getByPlaceholder('Digite sua senha').fill('password')
    await page.getByRole('button', { name: 'Entrar' }).click()
    
    await expect(page.getByText(/por favor, preencha usuário e senha/i)).toBeVisible()
  })

  test('should show error for empty password', async ({ page }) => {
    await page.getByPlaceholder('Digite seu usuário').fill('admin')
    await page.getByRole('button', { name: 'Entrar' }).click()
    
    await expect(page.getByText(/por favor, preencha usuário e senha/i)).toBeVisible()
  })

  test('should persist login in localStorage', async ({ page }) => {
    await page.getByText('Admin (CRUD Completo)').click()
    await page.getByRole('button', { name: 'Entrar' }).click()
    
    await expect(page.getByText('admin')).toBeVisible()
    
    // Reload page
    await page.reload()
    
    // Should still be logged in
    await expect(page.getByText('admin')).toBeVisible()
    await expect(page.getByText('Admin')).toBeVisible()
  })
})
