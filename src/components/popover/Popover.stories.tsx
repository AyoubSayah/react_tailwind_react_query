import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Popover } from './Popover'
import { Button } from '../button'

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible popover component that can display content over other elements. Supports multiple positions, controlled/uncontrolled state, and customizable triggers.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of the popover relative to trigger'
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Whether the popover is open by default'
    },
    closeOnClickOutside: {
      control: 'boolean',
      description: 'Whether to close popover when clicking outside'
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether to close popover when pressing escape'
    },
    trigger: {
      control: false,
      description: 'Trigger element that opens the popover'
    },
    children: {
      control: false,
      description: 'Content to display inside the popover'
    }
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Basic example
export const Default: Story = {
  args: {
    trigger: (
      <Button variant="solid" size="md">
        Open Popover
      </Button>
    ),
    children: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Popover Title</h3>
        <p className="text-sm text-gray-600">
          This is the content of the popover. It can contain any React elements.
        </p>
      </div>
    ),
  },
}

// Different positions
export const Positions: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 items-center justify-center p-8">
      <Popover
        position="top"
        trigger={
          <Button variant="outline" size="md">
            Top
          </Button>
        }
      >
        <div className="p-4">
          <p className="text-sm text-gray-600">Popover positioned at the top</p>
        </div>
      </Popover>

      <Popover
        position="bottom"
        trigger={
          <Button variant="outline" size="md">
            Bottom
          </Button>
        }
      >
        <div className="p-4">
          <p className="text-sm text-gray-600">Popover positioned at the bottom</p>
        </div>
      </Popover>

      <Popover
        position="left"
        trigger={
          <Button variant="outline" size="md">
            Left
          </Button>
        }
      >
        <div className="p-4">
          <p className="text-sm text-gray-600">Popover positioned to the left</p>
        </div>
      </Popover>

      <Popover
        position="right"
        trigger={
          <Button variant="outline" size="md">
            Right
          </Button>
        }
      >
        <div className="p-4">
          <p className="text-sm text-gray-600">Popover positioned to the right</p>
        </div>
      </Popover>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

// With different content types
export const ContentTypes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center justify-center p-8">
      <Popover
        trigger={
          <Button variant="solid" size="md">
            Form Content
          </Button>
        }
      >
        <div className="p-4 w-64">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Login Form</h3>
          <form className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button variant="solid" size="sm" fullWidth>
              Login
            </Button>
          </form>
        </div>
      </Popover>

      <Popover
        trigger={
          <Button variant="secondary" size="md">
            List Content
          </Button>
        }
      >
        <div className="w-48">
          <div className="px-4 py-2 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-900">Actions</h3>
          </div>
          <div className="py-1">
            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
              Edit
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
              Delete
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
              Share
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
              Archive
            </button>
          </div>
        </div>
      </Popover>

      <Popover
        trigger={
          <Button variant="outline" size="md">
            Rich Content
          </Button>
        }
      >
        <div className="p-4 w-72">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-sm font-semibold">U</span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">User Name</h4>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            This is a rich content popover with user information and actions.
          </p>
          <div className="flex gap-2">
            <Button variant="solid" size="sm">
              Reply
            </Button>
            <Button variant="ghost" size="sm">
              Like
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

// Controlled vs Uncontrolled
export const ControlledState: Story = {
  render: function ControlledStateRender() {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <div className="flex gap-4">
          <Popover
            trigger={
              <Button variant="solid" size="md">
                Uncontrolled
              </Button>
            }
          >
            <div className="p-4">
              <p className="text-sm text-gray-600">This popover manages its own state</p>
            </div>
          </Popover>

          <Popover
            open={isOpen}
            onOpenChange={setIsOpen}
            trigger={
              <Button variant="secondary" size="md">
                Controlled
              </Button>
            }
          >
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-3">This popover is controlled externally</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
            </div>
          </Popover>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Controlled popover state:</p>
          <p className="text-sm font-medium text-gray-900">
            {isOpen ? 'Open' : 'Closed'}
          </p>
        </div>
      </div>
    )
  },
  parameters: {
    layout: 'padded',
  },
}

// Custom styling
export const CustomStyling: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center justify-center p-8">
      <Popover
        className="bg-gray-900 text-white border-gray-700"
        trigger={
          <Button variant="primary" size="md">
            Dark Theme
          </Button>
        }
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Dark Popover</h3>
          <p className="text-sm text-gray-300">
            This popover has custom dark styling
          </p>
        </div>
      </Popover>

      <Popover
        className="bg-blue-50 border-blue-200"
        trigger={
          <Button variant="outline" size="md">
            Blue Theme
          </Button>
        }
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Blue Popover</h3>
          <p className="text-sm text-blue-700">
            This popover has custom blue styling
          </p>
        </div>
      </Popover>

      <Popover
        className="bg-green-50 border-green-200"
        trigger={
          <Button variant="outline" size="md">
            Green Theme
          </Button>
        }
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold text-green-900 mb-2">Green Popover</h3>
          <p className="text-sm text-green-700">
            This popover has custom green styling
          </p>
        </div>
      </Popover>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

// Accessibility features
export const Accessibility: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-6 p-8">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Accessibility Features</h3>
        <p className="text-sm text-gray-600">
          This popover includes proper ARIA attributes and keyboard navigation
        </p>
      </div>

      <div className="flex gap-4">
        <Popover
          trigger={
            <Button variant="primary" size="md">
              Keyboard Accessible
            </Button>
          }
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Accessible Popover</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Press Escape to close</li>
              <li>• Click outside to close</li>
              <li>• Proper ARIA attributes</li>
              <li>• Focus management</li>
            </ul>
          </div>
        </Popover>

        <Popover
          closeOnEscape={false}
          closeOnClickOutside={false}
          trigger={
            <Button variant="outline" size="md">
              Custom Behavior
            </Button>
          }
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Behavior</h3>
            <p className="text-sm text-gray-600 mb-3">
              This popover doesn't close on escape or outside click
            </p>
            <Button variant="primary" size="sm">
              Close Manually
            </Button>
          </div>
        </Popover>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

// Default open
export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
    trigger: (
      <Button variant="primary" size="md">
        Always Open
      </Button>
    ),
    children: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Default Open</h3>
        <p className="text-sm text-gray-600">
          This popover is open by default and can still be closed.
        </p>
      </div>
    ),
  },
}
