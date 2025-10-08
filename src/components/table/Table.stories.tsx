import type { Meta, StoryObj } from '@storybook/react-vite'
import DataTable from './DataTable'

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive data table component with sorting, pagination, and column visibility controls. Built with Tailwind CSS and fully accessible.'
      }
    }
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DataTable>

export const Basic: Story = {
  args: {
    title: 'Sample Data Table',
    columns: [
      {
        header: 'Name',
        accessor: 'name',
      },
      {
        header: 'Email',
        accessor: 'email',
      },
      {
        header: 'Age',
        accessor: 'age',
      },
      {
        header: 'Status',
        accessor: 'status',
      },
    ],
    data: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        age: 30,
        status: 'Active',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        age: 25,
        status: 'Inactive',
      },
      {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob@example.com',
        age: 35,
        status: 'Active',
      },
    ],
  },
}

export const WithCustomCells: Story = {
  args: {
    title: 'Table with Custom Cell Rendering',
    columns: [
      {
        header: 'Reference',
        accessor: 'applicationReference',
        cell: (value: any, row: any) => (
          <div className="flex flex-col gap-1">
            <a 
              href="#" 
              className="font-bold text-lg text-blue-700 hover:underline"
              onClick={(e) => e.preventDefault()}
            >
              {value}
            </a>
            <span className="text-sm text-gray-600">
              {row?.processName}
            </span>
          </div>
        ),
      },
      {
        header: 'Username',
        accessor: 'userName',
      },
      {
        header: 'Branch',
        accessor: 'translatedBranchName',
        cell: () => <span>Sample Branch</span>,
      },
      {
        header: 'Creation Date',
        accessor: 'startDate',
        cell: (createTime: string) => createTime ? '2024-01-15' : '-',
      },
      {
        header: 'Updated Date',
        accessor: 'updateDate',
        cell: (updateTime: string) => updateTime ? '2024-01-20' : '-',
      },
    ],
    data: [
      {
        id: 1,
        applicationReference: 'REF-001',
        userName: 'john.doe',
        translatedBranchName: 'Main Branch',
        processName: 'Application Process',
        startDate: '2024-01-15',
        updateDate: '2024-01-20',
        status: 'OPENED',
      },
      {
        id: 2,
        applicationReference: 'REF-002',
        userName: 'jane.smith',
        translatedBranchName: 'Secondary Branch',
        processName: 'Review Process',
        startDate: '2024-01-10',
        updateDate: '2024-01-18',
        status: 'FINISHED',
      },
      {
        id: 3,
        applicationReference: 'REF-003',
        userName: 'bob.johnson',
        translatedBranchName: 'Main Branch',
        processName: 'Approval Process',
        startDate: '2024-01-12',
        updateDate: '2024-01-19',
        status: 'FINISHED',
      },
    ],
    allowColumnVisibility: true,
  },
}

export const WithPagination: Story = {
  args: {
    title: 'Table with Pagination',
    columns: [
      {
        header: 'ID',
        accessor: 'id',
      },
      {
        header: 'Name',
        accessor: 'name',
      },
      {
        header: 'Email',
        accessor: 'email',
      },
      {
        header: 'Department',
        accessor: 'department',
      },
    ],
    data: Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      department: i % 3 === 0 ? 'Engineering' : i % 3 === 1 ? 'Marketing' : 'Sales',
    })),
    pageSize: 10,
    paginationOptions: {
      paginationFront: true,
      totalPages: 3,
    },
  },
}

export const LoadingState: Story = {
  args: {
    title: 'Loading State',
    columns: [
      {
        header: 'Name',
        accessor: 'name',
      },
      {
        header: 'Email',
        accessor: 'email',
      },
    ],
    data: [],
    isLoading: true,
  },
}

export const EmptyState: Story = {
  args: {
    title: 'Empty State',
    columns: [
      {
        header: 'Name',
        accessor: 'name',
      },
      {
        header: 'Email',
        accessor: 'email',
      },
    ],
    data: [],
    isLoading: false,
  },
}

export const WithActions: Story = {
  args: {
    title: 'Table with Action Buttons',
    columns: [
      {
        header: 'Name',
        accessor: 'name',
      },
      {
        header: 'Email',
        accessor: 'email',
      },
      {
        header: 'Actions',
        accessor: 'actions',
        actions: [
          {
            name: 'Edit',
            handleClick: (data: unknown) => console.log('Edit:', data),
            icon: (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            ),
          },
          {
            name: 'Delete',
            handleClick: (data: unknown) => console.log('Delete:', data),
            icon: (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            ),
          },
        ],
      },
    ],
    data: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
      },
    ],
  },
}