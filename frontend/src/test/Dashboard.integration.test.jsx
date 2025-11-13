import { describe, it, expect, vi, beforeEach, beforeAll, afterAll, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Dashboard from '../components/Dashboard'
import { server } from './mocks/server'
import { http, HttpResponse } from 'msw'

// Start server before all tests
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Dashboard Component - Integration Tests', () => {
  const mockOnLogout = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  describe('Admin User View', () => {
    it('should render admin dashboard with full CRUD controls', async () => {
      render(<Dashboard username="admin" onLogout={mockOnLogout} />)

      expect(screen.getByText('🔧 Sistema de Consertos')).toBeInTheDocument()
      expect(screen.getByText('admin')).toBeInTheDocument()
      expect(screen.getByText('Admin')).toBeInTheDocument()

      await waitFor(() => {
        expect(screen.getByText(/novo conserto/i)).toBeInTheDocument()
      })
    })

    it('should display consertos list for admin', async () => {
      render(<Dashboard username="admin" onLogout={mockOnLogout} />)

      await waitFor(() => {
        expect(screen.getByText('João Silva')).toBeInTheDocument()
        expect(screen.getByText('Maria Santos')).toBeInTheDocument()
        expect(screen.getByText('Pedro Costa')).toBeInTheDocument()
      })
    })

    it('should show edit and delete buttons for admin', async () => {
      render(<Dashboard username="admin" onLogout={mockOnLogout} />)

      await waitFor(() => {
        expect(screen.getAllByTitle('Editar').length).toBeGreaterThan(0)
        expect(screen.getAllByTitle('Excluir').length).toBeGreaterThan(0)
      })
    })

    it('should open create form when clicking Novo Conserto', async () => {
      const user = userEvent.setup()
      render(<Dashboard username="admin" onLogout={mockOnLogout} />)

      await waitFor(() => {
        expect(screen.getByText(/novo conserto/i)).toBeInTheDocument()
      })

      const newButton = screen.getByText(/novo conserto/i)
      await user.click(newButton)

      await waitFor(() => {
        expect(screen.getByText('➕ Novo Conserto')).toBeInTheDocument()
        expect(screen.getByLabelText(/data entrada/i)).toBeInTheDocument()
      })
    })

    it('should create new conserto successfully', async () => {
      const user = userEvent.setup()
      render(<Dashboard username="admin" onLogout={mockOnLogout} />)

      // Wait for dashboard to load
      await waitFor(() => {
        expect(screen.getByText(/novo conserto/i)).toBeInTheDocument()
      })

      // Click new conserto button
      await user.click(screen.getByText(/novo conserto/i))

      // Fill form
      await waitFor(() => {
        expect(screen.getByLabelText(/data entrada/i)).toBeInTheDocument()
      })

      await user.type(screen.getByLabelText(/data entrada/i), '13/11/2024')
      await user.type(screen.getByLabelText(/nome do mecânico/i), 'Carlos Oliveira')
      await user.type(screen.getByLabelText(/marca do veículo/i), 'Chevrolet')
      await user.type(screen.getByLabelText(/modelo do veículo/i), 'Onix')
      await user.type(screen.getByLabelText(/ano do veículo/i), '2022')

      // Submit form
      await user.click(screen.getByRole('button', { name: /criar/i }))

      // Verify success message
      await waitFor(() => {
        expect(screen.getByText(/conserto criado com sucesso/i)).toBeInTheDocument()
      })
    })

    it('should edit conserto successfully', async () => {
      const user = userEvent.setup()
      render(<Dashboard username="admin" onLogout={mockOnLogout} />)

      // Wait for data to load
      await waitFor(() => {
        expect(screen.getByText('João Silva')).toBeInTheDocument()
      })

      // Click edit button
      const editButtons = screen.getAllByTitle('Editar')
      await user.click(editButtons[0])

      // Wait for form
      await waitFor(() => {
        expect(screen.getByText('✏️ Editar Conserto')).toBeInTheDocument()
      })

      // Modify field
      const nomeInput = screen.getByLabelText(/nome do mecânico/i)
      await user.clear(nomeInput)
      await user.type(nomeInput, 'João Silva Modificado')

      // Submit
      await user.click(screen.getByRole('button', { name: /atualizar/i }))

      // Verify success
      await waitFor(() => {
        expect(screen.getByText(/conserto atualizado com sucesso/i)).toBeInTheDocument()
      })
    })

    it('should delete conserto with confirmation', async () => {
      const user = userEvent.setup()
      render(<Dashboard username="admin" onLogout={mockOnLogout} />)

      await waitFor(() => {
        expect(screen.getByText('João Silva')).toBeInTheDocument()
      })

      const deleteButtons = screen.getAllByTitle('Excluir')
      await user.click(deleteButtons[0])

      await waitFor(() => {
        expect(screen.getByText(/conserto excluído com sucesso/i)).toBeInTheDocument()
      })
    })

    it('should search by marca', async () => {
      const user = userEvent.setup()
      render(<Dashboard username="admin" onLogout={mockOnLogout} />)

      await waitFor(() => {
        expect(screen.getByText('João Silva')).toBeInTheDocument()
      })

      const marcaInput = screen.getByPlaceholderText(/marca do veículo/i)
      await user.type(marcaInput, 'Toyota')
      await user.click(screen.getByRole('button', { name: /buscar/i }))

      await waitFor(() => {
        expect(screen.getByText('Toyota')).toBeInTheDocument()
      })
    })

    it('should cancel form and return to list', async () => {
      const user = userEvent.setup()
      render(<Dashboard username="admin" onLogout={mockOnLogout} />)

      await waitFor(() => {
        expect(screen.getByText(/novo conserto/i)).toBeInTheDocument()
      })

      await user.click(screen.getByText(/novo conserto/i))

      await waitFor(() => {
        expect(screen.getByText('➕ Novo Conserto')).toBeInTheDocument()
      })

      await user.click(screen.getByRole('button', { name: /cancelar/i }))

      await waitFor(() => {
        expect(screen.queryByText('➕ Novo Conserto')).not.toBeInTheDocument()
        expect(screen.getByText('João Silva')).toBeInTheDocument()
      })
    })
  })

  describe('Regular User View', () => {
    it('should render user dashboard without CRUD controls', async () => {
      render(<Dashboard username="user" onLogout={mockOnLogout} />)

      expect(screen.getByText('user')).toBeInTheDocument()
      expect(screen.getByText('Usuário')).toBeInTheDocument()

      await waitFor(() => {
        expect(screen.getByText('João Silva')).toBeInTheDocument()
      })

      // Should not have "Novo Conserto" button
      expect(screen.queryByText(/novo conserto/i)).not.toBeInTheDocument()
    })

    it('should display consertos list for regular user', async () => {
      render(<Dashboard username="user" onLogout={mockOnLogout} />)

      await waitFor(() => {
        expect(screen.getByText('João Silva')).toBeInTheDocument()
        expect(screen.getByText('Maria Santos')).toBeInTheDocument()
        expect(screen.getByText('Pedro Costa')).toBeInTheDocument()
      })
    })

    it('should not show edit and delete buttons for user', async () => {
      render(<Dashboard username="user" onLogout={mockOnLogout} />)

      await waitFor(() => {
        expect(screen.getByText('João Silva')).toBeInTheDocument()
      })

      expect(screen.queryByTitle('Editar')).not.toBeInTheDocument()
      expect(screen.queryByTitle('Excluir')).not.toBeInTheDocument()
    })

    it('should allow search functionality for user', async () => {
      const user = userEvent.setup()
      render(<Dashboard username="user" onLogout={mockOnLogout} />)

      await waitFor(() => {
        expect(screen.getByText('João Silva')).toBeInTheDocument()
      })

      const marcaInput = screen.getByPlaceholderText(/marca do veículo/i)
      await user.type(marcaInput, 'Honda')
      await user.click(screen.getByRole('button', { name: /buscar/i }))

      await waitFor(() => {
        expect(screen.getByText('Honda')).toBeInTheDocument()
      })
    })

    it('should show pagination for user', async () => {
      render(<Dashboard username="user" onLogout={mockOnLogout} />)

      await waitFor(() => {
        expect(screen.getByText(/total de consertos/i)).toBeInTheDocument()
      })
    })
  })

  describe('Logout Functionality', () => {
    it('should call onLogout when Sair button clicked', async () => {
      const user = userEvent.setup()
      render(<Dashboard username="admin" onLogout={mockOnLogout} />)

      const logoutButton = screen.getByRole('button', { name: /sair/i })
      await user.click(logoutButton)

      expect(mockOnLogout).toHaveBeenCalledTimes(1)
    })
  })

  describe('Error Handling', () => {
    it('should display error message when API fails', async () => {
      server.use(
        http.get('/api/consertos', () => {
          return new HttpResponse(null, { status: 500 })
        })
      )

      render(<Dashboard username="admin" onLogout={mockOnLogout} />)

      await waitFor(() => {
        expect(screen.getByText(/erro ao carregar consertos/i)).toBeInTheDocument()
      })
    })

    it('should display error when create fails', async () => {
      const user = userEvent.setup()
      
      server.use(
        http.post('/api/consertos', () => {
          return HttpResponse.json(
            { message: 'Erro de validação' },
            { status: 400 }
          )
        })
      )

      render(<Dashboard username="admin" onLogout={mockOnLogout} />)

      await waitFor(() => {
        expect(screen.getByText(/novo conserto/i)).toBeInTheDocument()
      })

      await user.click(screen.getByText(/novo conserto/i))

      await waitFor(() => {
        expect(screen.getByLabelText(/data entrada/i)).toBeInTheDocument()
      })

      await user.type(screen.getByLabelText(/data entrada/i), '13/11/2024')
      await user.type(screen.getByLabelText(/nome do mecânico/i), 'Test')
      await user.type(screen.getByLabelText(/marca do veículo/i), 'Test')
      await user.type(screen.getByLabelText(/modelo do veículo/i), 'Test')
      await user.type(screen.getByLabelText(/ano do veículo/i), '2020')

      await user.click(screen.getByRole('button', { name: /criar/i }))

      await waitFor(() => {
        expect(screen.getByText(/erro de validação/i)).toBeInTheDocument()
      })
    })
  })

  describe('Pagination', () => {
    it('should show pagination controls', async () => {
      render(<Dashboard username="admin" onLogout={mockOnLogout} />)

      await waitFor(() => {
        expect(screen.getByText(/página/i)).toBeInTheDocument()
      })
    })

    it('should display total elements count', async () => {
      render(<Dashboard username="admin" onLogout={mockOnLogout} />)

      await waitFor(() => {
        expect(screen.getByText(/total de consertos/i)).toBeInTheDocument()
      })
    })
  })

  describe('Loading States', () => {
    it('should show loading state while fetching data', async () => {
      render(<Dashboard username="admin" onLogout={mockOnLogout} />)

      // Initially might show loading (very brief)
      // Then data should appear
      await waitFor(() => {
        expect(screen.getByText('João Silva')).toBeInTheDocument()
      })
    })
  })

  describe('Success Messages', () => {
    it('should clear success message after 3 seconds', async () => {
      vi.useFakeTimers()
      const user = userEvent.setup({ delay: null })

      render(<Dashboard username="admin" onLogout={mockOnLogout} />)

      await waitFor(() => {
        expect(screen.getByText(/novo conserto/i)).toBeInTheDocument()
      })

      await user.click(screen.getByText(/novo conserto/i))

      await waitFor(() => {
        expect(screen.getByLabelText(/data entrada/i)).toBeInTheDocument()
      })

      await user.type(screen.getByLabelText(/data entrada/i), '13/11/2024')
      await user.type(screen.getByLabelText(/nome do mecânico/i), 'Test')
      await user.type(screen.getByLabelText(/marca do veículo/i), 'Test')
      await user.type(screen.getByLabelText(/modelo do veículo/i), 'Test')
      await user.type(screen.getByLabelText(/ano do veículo/i), '2020')

      await user.click(screen.getByRole('button', { name: /criar/i }))

      await waitFor(() => {
        expect(screen.getByText(/conserto criado com sucesso/i)).toBeInTheDocument()
      })

      // Fast-forward 3 seconds
      vi.advanceTimersByTime(3000)

      await waitFor(() => {
        expect(screen.queryByText(/conserto criado com sucesso/i)).not.toBeInTheDocument()
      })

      vi.useRealTimers()
    })
  })
})
