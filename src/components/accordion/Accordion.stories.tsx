import type { Meta, StoryObj } from '@storybook/react'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from './Accordion'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
}
export default meta

type Story = StoryObj<typeof Accordion>

export const Basic: Story = {
  render: () => (
    <Accordion defaultIndex={[0]} allowToggle>
      <AccordionItem index={0}>
        <AccordionButton index={0}>Section 1</AccordionButton>
        <AccordionPanel index={0}>Content for section 1</AccordionPanel>
      </AccordionItem>
      <AccordionItem index={1}>
        <AccordionButton index={1}>Section 2</AccordionButton>
        <AccordionPanel index={1}>Content for section 2</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
