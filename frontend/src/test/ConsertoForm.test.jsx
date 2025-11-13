import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ConsertoForm from '../components/ConsertoForm'

describe('ConsertoForm Component - Unit Tests', () => {
  const mockOnSubmit = vi.fn()
  const mockOnCancel = vi.fn()

  const mockConserto = {
    id: 1,
    dataEntrada: '10/11/2024',
    dataSaida: '15/11/2024',
    mecanicoNome: 'João Silva',
    mecanicoAnosExperiencia: 5,
    veiculoMarca: 'Toyota',
    veiculoModelo: 'Corolla',
    veiculoAno: '2020',
    veiculoCor: 'Preto',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering - Create Mode', () => {
    it('should render form with create title when no conserto provided', () => {
      render(
        <ConsertoForm
          conserto={null}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          loading={false}
        />
      )

      expect(screen.getByText('➕ Novo Conserto')).toBeInTheDocument()
    })

    it('should render all form fields', () => {
      render(
        <ConsertoForm
          conserto={null}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          loading={false}
        />
      )

      expect(screen.getByLabelText(/data entrada/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/data saída/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/nome do mecânico/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/anos de experiência/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/marca do veículo/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/modelo do veículo/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/ano do veículo/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/cor do veículo/i)).toBeInTheDocument()
    })

    it('should render create and cancel buttons', () => {
      render(
        <ConsertoForm
          conserto={null}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          loading={false}
        />
      )

      expect(screen.getByRole('button', { name: /criar/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument()
    })

    it('should show required field indicator', () => {
      render(
        <ConsertoForm
          conserto={null}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          loading={false}
        />
      )

      expect(screen.getByText(/\* campos obrigatórios/i)).toBeInTheDocument()
    })
  })

  describe('Rendering - Edit Mode', () => {
    it('should render form with edit title when conserto provided', () => {
      render(
        <ConsertoForm
          conserto={mockConserto}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          loading={false}
        />
      )

      expect(screen.getByText('✏️ Editar Conserto')).toBeInTheDocument()
    })

    it('should pre-fill form fields with conserto data', () => {
      render(
        <ConsertoForm
          conserto={mockConserto}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          loading={false}
        />
      )

      expect(screen.getByLabelText(/data entrada/i)).toHaveValue('10/11/2024')
      expect(screen.getByLabelText(/data saída/i)).toHaveValue('15/11/2024')
      expect(screen.getByLabelText(/nome do mecânico/i)).toHaveValue('João Silva')
      expect(screen.getByLabelText(/anos de experiência/i)).toHaveValue(5)
      expect(screen.getByLabelText(/marca do veículo/i)).toHaveValue('Toyota')
      expect(screen.getByLabelText(/modelo do veículo/i)).toHaveValue('Corolla')
      expect(screen.getByLabelText(/ano do veículo/i)).toHaveValue('2020')
      expect(screen.getByLabelText(/cor do veículo/i)).toHaveValue('Preto')
    })

    it('should render update button in edit mode', () => {
      render(
        <ConsertoForm
          conserto={mockConserto}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          loading={false}
        />
      )

      expect(screen.getByRole('button', { name: /atualizar/i })).toBeInTheDocument()
    })
  })

  describe('Form Validation - Required Fields', () => {
    it('should show error for empty dataEntrada', async () => {
      const user = userEvent.setup()
      render(
        <ConsertoForm
          conserto={null}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          loading={false}
        />
      )

      await user.click(screen.getByRole('button', { name: /criar/i }))

      await waitFor(() => {
        expect(screen.getByText(/data de entrada é obrigatória/i)).toBeInTheDocument()
      })
      expect(mockOnSubmit).not.toHaveBeenCalled()
    })

    it('should show error for invalid dataEntrada format', async () => {
      const user = userEvent.setup()
      render(
        <ConsertoForm
          conserto={null}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          loading={false}
        />
      )

      await user.type(screen.getByLabelText(/data entrada/i), '2024-11-10')
      await user.click(screen.getByRole('button', { name: /criar/i }))

      await waitFor(() => {
        expect(screen.getByText(/formato deve ser dd\/mm\/aaaa/i)).toBeInTheDocument()
      })
    })

    it('should show error for empty mecanicoNome', async () => {
      const user = userEvent.setup()
      render(
        <ConsertoForm
          conserto={null}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          loading={false}
        />
      )

      await user.type(screen.getByLabelText(/data entrada/i), '10/11/2024')
      await user.click(screen.getByRole('button', { name: /criar/i }))

      await waitFor(() => {
        expect(screen.getByText(/nome do mecânico é obrigatório/i)).toBeInTheDocument()
      })
    })

    it('should show error for empty veiculoMarca', async () => {
      const user = userEvent.setup()
      render(
        <ConsertoForm
          conserto={null}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          loading={false}
        />
      )

      await user.type(screen.getByLabelText(/data entrada/i), '10/11/2024')
      await user.type(screen.getByLabelText(/nome do mecânico/i), 'João')
      await user.click(screen.getByRole('button', { name: /criar/i }))

      await waitFor(() => {
        expect(screen.getByText(/marca do veículo é obrigatória/i)).toBeInTheDocument()
      })
    })

    it('should show error for empty veiculoModelo', async () => {
      const user = userEvent.setup()
      render(
        <ConsertoForm
          conserto={null}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          loading={false}
        />
      )

      await user.type(screen.getByLabelText(/data entrada/i), '10/11/2024')
      await user.type(screen.getByLabelText(/nome do mecânico/i), 'João')
      await user.type(screen.getByLabelText(/marca do veículo/i), 'Toyota')
      await user.click(screen.getByRole('button', { name: /criar/i }))

      await waitFor(() => {
        expect(screen.getByText(/modelo do veículo é obrigatório/i)).toBeInTheDocument()
      })
    })

    it('should show error for empty veiculoAno', async () => {
      const user = userEvent.setup()
      render(
        <ConsertoForm
          conserto={null}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          loading={false}
        />
      )

      await user.type(screen.getByLabelText(/data entrada/i), '10/11/2024')
      await user.type(screen.getByLabelText(/nome do mecânico/i), 'João')
      await user.type(screen.getByLabelText(/marca do veículo/i), 'Toyota')
      await user.type(screen.getByLabelText(/modelo do veículo/i), 'Corolla')
      await user.click(screen.getByRole('button', { name: /criar/i }))

      await waitFor(() => {
        expect(screen.getByText(/ano do veículo é obrigatório/i)).toBeInTheDocument()
      })
    })
  })

  describe('Form Validation - Format', () => {
    it('should validate date format dd/mm/aaaa', async () => {
      const user = userEvent.setup()
      render(
        <ConsertoForm
          conserto={null}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          loading={false}
        />
      )

      await user.type(screen.getByLabelText(/data entrada/i), '10-11-2024')
      await user.click(screen.getByRole('button', { name: /criar/i }))

      await waitFor(() => {
        expect(screen.getByText(/formato deve ser dd\/mm\/aaaa/i)).toBeInTheDocument()
      })
    })

    it('should validate year format aaaa', async () => {
      const user = userEvent.setup()
      render(
        <ConsertoForm
          conserto={null}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          loading={false}
        />
      )

      await user.type(screen.getByLabelText(/data entrada/i), '10/11/2024')
      await user.type(screen.getByLabelText(/nome do mecânico/i), 'João')
      await user.type(screen.getByLabelText(/marca do veículo/i), 'Toyota')
      await user.type(screen.getByLabelText(/modelo do veículo/i), 'Corolla')
      await user.type(screen.getByLabelText(/ano do veículo/i), '20')
      await user.click(screen.getByRole('button', { name: /criar/i }))

      await waitFor(() => {
        expect(screen.getByText(/formato deve ser aaaa/i)).toBeInTheDocument()
      })
    })

    it('should validate mecanicoNome max length', async () => {
      const user = userEvent.setup()
      render(
        <ConsertoForm
          conserto={null}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          loading={false}
        />
      )

      const longName = 'a'.repeat(121)
      await user.type(screen.getByLabelText(/nome do mecânico/i), longName)
      await user.click(screen.getByRole('button', { name: /criar/i }))

      await waitFor(() => {
        expect(screen.getByText(/máximo 120 caracteres/i)).toBeInTheDocument()
      })
    })
  })

  describe('Form Submission - Create', () => {
    it('should submit valid form data in create mode', async () => {
      const user = userEvent.setup()
      render(
        <ConsertoForm
          conserto={null}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          loading={false}
        />
      )

      await user.type(screen.getByLabelText(/data entrada/i), '10/11/2024')
      await user.type(screen.getByLabelText(/data saída/i), '15/11/2024')
      await user.type(screen.getByLabelText(/nome do mecânico/i), 'João Silva')
      await user.type(screen.getByLabelText(/anos de experiência/i), '5')
      await user.type(screen.getByLabelText(/marca do veículo/i), 'Toyota')
      await user.type(screen.getByLabelText(/modelo do veículo/i), 'Corolla')
      await user.type(screen.getByLabelText(/ano do veículo/i), '2020')
      await user.type(screen.getByLabelText(/cor do veículo/i), 'Preto')

      await user.click(screen.getByRole('button', { name: /criar/i }))

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          dataEntrada: '10/11/2024',
          dataSaida: '15/11/2024',
          mecanicoNome: 'João Silva',
          mecanicoAnosExperiencia: 5,
          veiculoMarca: 'Toyota',
          veiculoModelo: 'Corolla',
          veiculoAno: '2020',
          veiculoCor: 'Preto',
        })
      })
    })

    it('should convert mecanicoAnosExperiencia to number', async () => {
      const user = userEvent.setup()
      render(
        <ConsertoForm
          conserto={null}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          loading={false}
        />
      )

      await user.type(screen.getByLabelText(/data entrada/i), '10/11/2024')
      await user.type(screen.getByLabelText(/nome do mecânico/i), 'João')
      await user.type(screen.getByLabelText(/anos de experiência/i), '10')
      await user.type(screen.getByLabelText(/marca do veículo/i), 'Toyota')
      await user.type(screen.getByLabelText(/modelo do veículo/i), 'Corolla')
      await user.type(screen.getByLabelText(/ano do veículo/i), '2020')

      await user.click(screen.getByRole('button', { name: /criar/i }))

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled()
        const callArgs = mockOnSubmit.mock.calls[0][0]
        expect(typeof callArgs.mecanicoAnosExperiencia).toBe('number')
        expect(callArgs.mecanicoAnosExperiencia).toBe(10)
      })
    })

    it('should handle null mecanicoAnosExperiencia when empty', async () => {
      const user = userEvent.setup()
      render(
        <ConsertoForm
          conserto={null}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          loading={false}
        />
      )

      await user.type(screen.getByLabelText(/data entrada/i), '10/11/2024')
      await user.type(screen.getByLabelText(/nome do mecânico/i), 'João')
      await user.type(screen.getByLabelText(/marca do veículo/i), 'Toyota')
      await user.type(screen.getByLabelText(/modelo do veículo/i), 'Corolla')
      await user.type(screen.getByLabelText(/ano do veículo/i), '2020')

      await user.click(screen.getByRole('button', { name: /criar/i }))

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled()
        const callArgs = mockOnSubmit.mock.calls[0][0]
        expect(callArgs.mecanicoAnosExperiencia).toBe(null)
      })
    })
  })

  describe('Form Submission - Edit', () => {
    it('should submit with conserto id in edit mode', async () => {
      const user = userEvent.setup()
      render(
        <ConsertoForm
          conserto={mockConserto}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          loading={false}
        />
      )

      await user.clear(screen.getByLabelText(/nome do mecânico/i))
      await user.type(screen.getByLabelText(/nome do mecânico/i), 'Maria Santos')
      await user.click(screen.getByRole('button', { name: /atualizar/i }))

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          1,
          expect.objectContaining({
            mecanicoNome: 'Maria Santos',
          })
        )
      })
    })
  })

  describe('Cancel Action', () => {
    it('should call onCancel when cancel button clicked', async () => {
      const user = userEvent.setup()
      render(
        <ConsertoForm
          conserto={null}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          loading={false}
        />
      )

      await user.click(screen.getByRole('button', { name: /cancelar/i }))

      expect(mockOnCancel).toHaveBeenCalledTimes(1)
      expect(mockOnSubmit).not.toHaveBeenCalled()
    })
  })

  describe('Loading State', () => {
    it('should disable inputs when loading', () => {
      render(
        <ConsertoForm
          conserto={null}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          loading={true}
        />
      )

      expect(screen.getByLabelText(/data entrada/i)).toBeDisabled()
      expect(screen.getByLabelText(/nome do mecânico/i)).toBeDisabled()
    })

    it('should disable buttons when loading', () => {
      render(
        <ConsertoForm
          conserto={null}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          loading={true}
        />
      )

      expect(screen.getByRole('button', { name: /salvando/i })).toBeDisabled()
      expect(screen.getByRole('button', { name: /cancelar/i })).toBeDisabled()
    })

    it('should show loading text on submit button', () => {
      render(
        <ConsertoForm
          conserto={null}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          loading={true}
        />
      )

      expect(screen.getByText(/salvando/i)).toBeInTheDocument()
    })
  })

  describe('Error Clearing', () => {
    it('should clear error when user starts typing in field', async () => {
      const user = userEvent.setup()
      render(
        <ConsertoForm
          conserto={null}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          loading={false}
        />
      )

      // Trigger validation error
      await user.click(screen.getByRole('button', { name: /criar/i }))

      await waitFor(() => {
        expect(screen.getByText(/data de entrada é obrigatória/i)).toBeInTheDocument()
      })

      // Start typing
      await user.type(screen.getByLabelText(/data entrada/i), '10/11/2024')

      await waitFor(() => {
        expect(screen.queryByText(/data de entrada é obrigatória/i)).not.toBeInTheDocument()
      })
    })
  })
})
