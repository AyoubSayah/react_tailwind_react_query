import type { Meta, StoryObj } from '@storybook/react'
import Filter, { type InputProps, type Option } from './Filter'

const meta: Meta<typeof Filter> = {
  title: 'Components/Filter',
  component: Filter,
}
export default meta

type Story = StoryObj<typeof Filter>

const options: Option[] = [
  { label: 'Open', value: 'open' },
  { label: 'Closed', value: 'closed' },
  { label: 'Pending', value: 'pending' },
]

const inputs: InputProps[] = [
  { inputName: 'query', inputLabel: 'Search', inputType: 'text' },
  { inputName: 'status', inputLabel: 'Status', inputType: 'select', options },
  { sectionTitle: 'Primary range', inputName: 'startDate', inputLabel: 'Start date', inputType: 'date' },
  { inputName: 'endDate', inputLabel: 'End date', inputType: 'date' },
]

export const Basic: Story = {
  args: {
    inputs,
    allowVariables: true,
  }
}
