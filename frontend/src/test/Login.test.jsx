import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../components/Login'
import { authService } from '../services/api'

vi.mock('../services/api', () => ({
  authService: {
    login: vi.fn(),
  },
}))

describe('Login Component - Unit Tests', () => {
  const mockOnLogin = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  describe('Rendering', () => {
    it('should render login form with all elements', () => {
      render(<Login onLogin={mockOnLogin} />)

      expect(screen.getByText('🔧 Sistema de Consertos')).toBeInTheDocument()
      expect(screen.getByText('IFSP - Spring REST API')).toBeInTheDocument()
      expect(screen.getByLabelText(/usuário/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/senha/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
    })

    it('should render quick login buttons', () => {
      render(<Login onLogin={mockOnLogin} />)

      expect(screen.getByText(/admin \(crud completo\)/i)).toBeInTheDocument()
      expect(screen.getByText(/usuário \(somente leitura\)/i)).toBeInTheDocument()
    })

    it('should have proper input placeholders', () => {
      render(<Login onLogin={mockOnLogin} />)

      expect(screen.getByPlaceholderText('Digite seu usuário')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Digite sua senha')).toBeInTheDocument()
    })
  })

  describe('User Interaction', () => {
    it('should allow user to type in username field', async () => {
      const user = userEvent.setup()
      render(<Login onLogin={mockOnLogin} />)

      const usernameInput = screen.getByLabelText(/usuário/i)
      await user.type(usernameInput, 'testuser')

      expect(usernameInput).toHaveValue('testuser')
    })

    it('should allow user to type in password field', async () => {
      const user = userEvent.setup()
      render(<Login onLogin={mockOnLogin} />)

      const passwordInput = screen.getByLabelText(/senha/i)
      await user.type(passwordInput, 'testpass')

      expect(passwordInput).toHaveValue('testpass')
    })

    it('should update fields when quick login admin button is clicked', async () => {
      const user = userEvent.setup()
      render(<Login onLogin={mockOnLogin} />)

      const quickAdminButton = screen.getByText(/admin \(crud completo\)/i)
      await user.click(quickAdminButton)

      expect(screen.getByLabelText(/usuário/i)).toHaveValue('admin')
      expect(screen.getByLabelText(/senha/i)).toHaveValue('admin123')
    })

    it('should update fields when quick login user button is clicked', async () => {
      const user = userEvent.setup()
      render(<Login onLogin={mockOnLogin} />)

      const quickUserButton = screen.getByText(/usuário \(somente leitura\)/i)
      await user.click(quickUserButton)

      expect(screen.getByLabelText(/usuário/i)).toHaveValue('user')
      expect(screen.getByLabelText(/senha/i)).toHaveValue('user123')
    })
  })

  describe('Form Validation', () => {
    it('should show error when submitting empty form', async () => {
      const user = userEvent.setup()
      render(<Login onLogin={mockOnLogin} />)

      const submitButton = screen.getByRole('button', { name: /entrar/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/por favor, preencha usuário e senha/i)).toBeInTheDocument()
      })
      expect(mockOnLogin).not.toHaveBeenCalled()
    })

    it('should show error when username is empty', async () => {
      const user = userEvent.setup()
      render(<Login onLogin={mockOnLogin} />)

      const passwordInput = screen.getByLabelText(/senha/i)
      await user.type(passwordInput, 'password123')

      const submitButton = screen.getByRole('button', { name: /entrar/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/por favor, preencha usuário e senha/i)).toBeInTheDocument()
      })
    })

    it('should show error when password is empty', async () => {
      const user = userEvent.setup()
      render(<Login onLogin={mockOnLogin} />)

      const usernameInput = screen.getByLabelText(/usuário/i)
      await user.type(usernameInput, 'admin')

      const submitButton = screen.getByRole('button', { name: /entrar/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/por favor, preencha usuário e senha/i)).toBeInTheDocument()
      })
    })
  })

  describe('Authentication', () => {
    it('should call authService.login with correct credentials', async () => {
      const user = userEvent.setup()
      authService.login.mockReturnValue({ success: true, username: 'admin' })

      render(<Login onLogin={mockOnLogin} />)

      await user.type(screen.getByLabelText(/usuário/i), 'admin')
      await user.type(screen.getByLabelText(/senha/i), 'admin123')
      await user.click(screen.getByRole('button', { name: /entrar/i }))

      await waitFor(() => {
        expect(authService.login).toHaveBeenCalledWith('admin', 'admin123')
        expect(mockOnLogin).toHaveBeenCalledWith('admin')
      })
    })

    it('should handle login success and call onLogin callback', async () => {
      const user = userEvent.setup()
      authService.login.mockReturnValue({ success: true, username: 'user' })

      render(<Login onLogin={mockOnLogin} />)

      await user.type(screen.getByLabelText(/usuário/i), 'user')
      await user.type(screen.getByLabelText(/senha/i), 'user123')
      await user.click(screen.getByRole('button', { name: /entrar/i }))

      await waitFor(() => {
        expect(mockOnLogin).toHaveBeenCalledWith('user')
      })
    })

    it('should handle login error gracefully', async () => {
      const user = userEvent.setup()
      authService.login.mockImplementation(() => {
        throw new Error('Login failed')
      })

      render(<Login onLogin={mockOnLogin} />)

      await user.type(screen.getByLabelText(/usuário/i), 'wronguser')
      await user.type(screen.getByLabelText(/senha/i), 'wrongpass')
      await user.click(screen.getByRole('button', { name: /entrar/i }))

      await waitFor(() => {
        expect(screen.getByText(/erro ao fazer login/i)).toBeInTheDocument()
      })
      expect(mockOnLogin).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('should have proper form structure with submit handler', () => {
      render(<Login onLogin={mockOnLogin} />)

      const form = screen.getByLabelText(/usuário/i).closest('form')
      expect(form).toBeInTheDocument()
    })

    it('should have password input type', () => {
      render(<Login onLogin={mockOnLogin} />)

      const passwordInput = screen.getByLabelText(/senha/i)
      expect(passwordInput).toHaveAttribute('type', 'password')
    })

    it('should have text input type for username', () => {
      render(<Login onLogin={mockOnLogin} />)

      const usernameInput = screen.getByLabelText(/usuário/i)
      expect(usernameInput).toHaveAttribute('type', 'text')
    })
  })
})
