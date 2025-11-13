import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ConsertoList from '../components/ConsertoList'

describe('ConsertoList Component - Unit Tests', () => {
  const mockConsertos = [
    {
      id: 1,
      dataEntrada: '10/11/2024',
      dataSaida: '15/11/2024',
      mecanicoNome: 'João Silva',
      mecanicoAnosExperiencia: 5,
      veiculoMarca: 'Toyota',
      veiculoModelo: 'Corolla',
      veiculoAno: '2020',
      veiculoCor: 'Preto',
    },
    {
      id: 2,
      dataEntrada: '11/11/2024',
      dataSaida: null,
      mecanicoNome: 'Maria Santos',
      mecanicoAnosExperiencia: 3,
      veiculoMarca: 'Honda',
      veiculoModelo: 'Civic',
      veiculoAno: '2019',
      veiculoCor: 'Branco',
    },
  ]

  const mockOnEdit = vi.fn()
  const mockOnDelete = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering States', () => {
    it('should show loading state when loading is true', () => {
      render(<ConsertoList consertos={[]} loading={true} />)

      expect(screen.getByText('Carregando...')).toBeInTheDocument()
    })

    it('should show empty state when no consertos', () => {
      render(<ConsertoList consertos={[]} loading={false} />)

      expect(screen.getByText(/nenhum conserto encontrado/i)).toBeInTheDocument()
    })

    it('should render table with consertos data', () => {
      render(<ConsertoList consertos={mockConsertos} loading={false} />)

      expect(screen.getByText('João Silva')).toBeInTheDocument()
      expect(screen.getByText('Maria Santos')).toBeInTheDocument()
      expect(screen.getByText('Toyota')).toBeInTheDocument()
      expect(screen.getByText('Honda')).toBeInTheDocument()
    })
  })

  describe('Table Structure', () => {
    it('should render table headers correctly', () => {
      render(<ConsertoList consertos={mockConsertos} loading={false} />)

      expect(screen.getByText('ID')).toBeInTheDocument()
      expect(screen.getByText('Data Entrada')).toBeInTheDocument()
      expect(screen.getByText('Data Saída')).toBeInTheDocument()
      expect(screen.getByText('Mecânico')).toBeInTheDocument()
      expect(screen.getByText('Experiência')).toBeInTheDocument()
      expect(screen.getByText('Veículo')).toBeInTheDocument()
      expect(screen.getByText('Ano')).toBeInTheDocument()
      expect(screen.getByText('Cor')).toBeInTheDocument()
    })

    it('should render all conserto fields correctly', () => {
      render(<ConsertoList consertos={mockConsertos} loading={false} />)

      // Check first conserto
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('10/11/2024')).toBeInTheDocument()
      expect(screen.getByText('15/11/2024')).toBeInTheDocument()
      expect(screen.getByText('João Silva')).toBeInTheDocument()
      expect(screen.getByText('5 anos')).toBeInTheDocument()
      expect(screen.getByText('Toyota Corolla')).toBeInTheDocument()
      expect(screen.getByText('2020')).toBeInTheDocument()
      expect(screen.getByText('Preto')).toBeInTheDocument()
    })

    it('should show "-" for null dataSaida', () => {
      render(<ConsertoList consertos={mockConsertos} loading={false} />)

      const rows = screen.getAllByRole('row')
      const secondRow = rows[2] // Header is row 0, first data row is 1, second is 2
      expect(secondRow).toHaveTextContent('-')
    })

    it('should show "-" for null veiculoCor', () => {
      const consertoSemCor = [{
        ...mockConsertos[0],
        veiculoCor: null
      }]
      render(<ConsertoList consertos={consertoSemCor} loading={false} />)

      expect(screen.getAllByText('-').length).toBeGreaterThan(0)
    })
  })

  describe('Admin Actions', () => {
    it('should show action buttons when onEdit and onDelete are provided', () => {
      render(
        <ConsertoList
          consertos={mockConsertos}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          loading={false}
        />
      )

      expect(screen.getByText('Ações')).toBeInTheDocument()
      const editButtons = screen.getAllByTitle('Editar')
      const deleteButtons = screen.getAllByTitle('Excluir')

      expect(editButtons).toHaveLength(2)
      expect(deleteButtons).toHaveLength(2)
    })

    it('should not show action column when onEdit and onDelete are null', () => {
      render(
        <ConsertoList
          consertos={mockConsertos}
          onEdit={null}
          onDelete={null}
          loading={false}
        />
      )

      expect(screen.queryByText('Ações')).not.toBeInTheDocument()
    })

    it('should call onEdit with correct conserto when edit button clicked', async () => {
      const user = userEvent.setup()
      render(
        <ConsertoList
          consertos={mockConsertos}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          loading={false}
        />
      )

      const editButtons = screen.getAllByTitle('Editar')
      await user.click(editButtons[0])

      expect(mockOnEdit).toHaveBeenCalledWith(mockConsertos[0])
      expect(mockOnEdit).toHaveBeenCalledTimes(1)
    })

    it('should call onDelete with correct id when delete button clicked', async () => {
      const user = userEvent.setup()
      render(
        <ConsertoList
          consertos={mockConsertos}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          loading={false}
        />
      )

      const deleteButtons = screen.getAllByTitle('Excluir')
      await user.click(deleteButtons[1])

      expect(mockOnDelete).toHaveBeenCalledWith(2)
      expect(mockOnDelete).toHaveBeenCalledTimes(1)
    })

    it('should only show edit button when only onEdit is provided', () => {
      render(
        <ConsertoList
          consertos={mockConsertos}
          onEdit={mockOnEdit}
          onDelete={null}
          loading={false}
        />
      )

      expect(screen.getByText('Ações')).toBeInTheDocument()
      expect(screen.getAllByTitle('Editar')).toHaveLength(2)
      expect(screen.queryByTitle('Excluir')).not.toBeInTheDocument()
    })

    it('should only show delete button when only onDelete is provided', () => {
      render(
        <ConsertoList
          consertos={mockConsertos}
          onEdit={null}
          onDelete={mockOnDelete}
          loading={false}
        />
      )

      expect(screen.getByText('Ações')).toBeInTheDocument()
      expect(screen.queryByTitle('Editar')).not.toBeInTheDocument()
      expect(screen.getAllByTitle('Excluir')).toHaveLength(2)
    })
  })

  describe('User View (Read-Only)', () => {
    it('should render table without action buttons for regular user', () => {
      render(
        <ConsertoList
          consertos={mockConsertos}
          onEdit={null}
          onDelete={null}
          loading={false}
        />
      )

      expect(screen.getByText('João Silva')).toBeInTheDocument()
      expect(screen.queryByText('Ações')).not.toBeInTheDocument()
      expect(screen.queryByTitle('Editar')).not.toBeInTheDocument()
      expect(screen.queryByTitle('Excluir')).not.toBeInTheDocument()
    })

    it('should display all data correctly for user view', () => {
      render(<ConsertoList consertos={mockConsertos} loading={false} />)

      mockConsertos.forEach(conserto => {
        expect(screen.getByText(conserto.mecanicoNome)).toBeInTheDocument()
        expect(screen.getByText(conserto.veiculoMarca)).toBeInTheDocument()
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle undefined consertos array', () => {
      render(<ConsertoList consertos={undefined} loading={false} />)

      expect(screen.getByText(/nenhum conserto encontrado/i)).toBeInTheDocument()
    })

    it('should handle null consertos array', () => {
      render(<ConsertoList consertos={null} loading={false} />)

      expect(screen.getByText(/nenhum conserto encontrado/i)).toBeInTheDocument()
    })

    it('should render correctly with large dataset', () => {
      const largeDataset = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        dataEntrada: '10/11/2024',
        dataSaida: '15/11/2024',
        mecanicoNome: `Mecânico ${i + 1}`,
        mecanicoAnosExperiencia: i,
        veiculoMarca: `Marca ${i + 1}`,
        veiculoModelo: `Modelo ${i + 1}`,
        veiculoAno: '2020',
        veiculoCor: 'Preto',
      }))

      render(<ConsertoList consertos={largeDataset} loading={false} />)

      expect(screen.getByText('Mecânico 1')).toBeInTheDocument()
      expect(screen.getByText('Mecânico 50')).toBeInTheDocument()
    })
  })
})
