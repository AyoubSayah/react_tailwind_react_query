import type { Meta, StoryObj } from '@storybook/react-vite'
import HandleColumns from './HandleColumns'
import DataTable from './DataTable'

const meta: Meta<typeof HandleColumns> = {
  title: 'Components/HandleColumns',
  component: HandleColumns,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A component for managing column visibility in data tables. Allows users to show/hide columns dynamically with a clean Tailwind-based interface.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    initialVisibleColumns: {
      control: {
        type: 'object',
      },
      description: 'Initial state of column visibility'
    },
    labelColumns: {
      control: {
        type: 'object',
      },
      description: 'Custom labels for columns'
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Button variant style'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size'
    },
    children: {
      description: 'Callback function that receives visibleColumns as props',
      control: false
    },
  },
}

export default meta
type Story = StoryObj<typeof HandleColumns>

export const Default: Story = {
  args: {
    initialVisibleColumns: {
      name: true,
      lastName: true,
      birthDate: false,
      email: true,
      address: true,
      iban: true,
      password: false,
      customComponent: false,
    },
    labelColumns: {
      customComponent: 'Custom Component',
      lastName: 'Last Name',
      birthDate: 'Birth Date',
    },
    children: ({ visibleColumns }: { visibleColumns: Record<string, boolean> }) => (
      <div className="p-4 bg-gray-50 rounded-md">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Visible Columns:</h3>
        <div className="text-xs text-gray-600">
          {Object.entries(visibleColumns)
            .filter(([, visible]) => visible)
            .map(([column]) => column)
            .join(', ')}
        </div>
      </div>
    ),
  },
}

export const WithDataTable: Story = {
  render: () => {
    const sampleData = [
      { id: 1, name: 'John', lastName: 'Doe', email: 'john@example.com', birthDate: '1990-01-01', address: '123 Main St', iban: 'GB123456789' },
      { id: 2, name: 'Jane', lastName: 'Smith', email: 'jane@example.com', birthDate: '1985-05-15', address: '456 Oak Ave', iban: 'GB987654321' },
      { id: 3, name: 'Bob', lastName: 'Johnson', email: 'bob@example.com', birthDate: '1992-12-10', address: '789 Pine Rd', iban: 'GB456789123' },
    ]

    const columns = [
      { header: 'Name', accessor: 'name' },
      { header: 'Last Name', accessor: 'lastName' },
      { header: 'Email', accessor: 'email' },
      { header: 'Birth Date', accessor: 'birthDate' },
      { header: 'Address', accessor: 'address' },
      { header: 'IBAN', accessor: 'iban' },
    ]

    return (
      <div className="space-y-4">
        <HandleColumns
          initialVisibleColumns={{
            name: true,
            lastName: true,
            email: true,
            birthDate: false,
            address: false,
            iban: true,
          }}
          labelColumns={{
            lastName: 'Last Name',
            birthDate: 'Birth Date',
          }}
          className='ml-auto'
          size="md"
        >
          {({ visibleColumns }: { visibleColumns: Record<string, boolean> }) => (
            <DataTable
              data={sampleData}
              columns={columns.filter(col => visibleColumns[col.accessor])}
              title="Sample Data Table"
              allowColumnVisibility={false}
            />
          )}
        </HandleColumns>
      </div>
    )
  },
  parameters: {
    layout: 'padded',
  },
}
