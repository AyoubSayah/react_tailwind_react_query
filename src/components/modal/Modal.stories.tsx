import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Modal } from '.'
import { Button } from '../button'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
}
export default meta

type Story = StoryObj<typeof Modal>

export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Example modal">
          <div className="space-y-3">
            <p className="text-sm text-slate-700">Use this modal for confirmations, forms, and more.</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
