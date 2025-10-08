import type { Meta, StoryObj } from '@storybook/react-vite'
import Pagination from './Pagination'

const meta: Meta<typeof Pagination> = {
 title:'Components/Pagination',
  component: Pagination,
  argTypes: {
    lastPage: {
      control: {
        type: 'number',
        defaultValue: 5,
      },
    },
    firstPage: {
      control: {
        type: 'number',
        defaultValue: 1,
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Pagination>

export const PaginationDataTable: Story = {
  args: {
    lastPage: 4,
    firstPage: 1,
  },
}
