import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Button } from './Button'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, and color schemes based on Tailwind CSS. Fully accessible and WCAG compliant.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid',  'outline', 'ghost', 'destructive'],
      description: 'The visual style variant of the button'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'The size of the button'
    },
    colorScheme: {
      control: 'select',
      options: ['primary','secondary','blue', 'green', 'red', 'yellow', 'purple', 'pink', 'indigo', 'gray', 'slate', 'zinc', 'neutral', 'stone'],
      description: 'The color scheme based on Tailwind colors'
    },

  },
  args: { 
    onClick: fn(),
    children: 'Button'
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    children: 'Default Button',
  },
}

export const Primary: Story = {
  args: {
    variant: 'solid',
    colorScheme: 'primary',
    children: 'Primary Button',
  },
}

export const PrimaryGreen: Story = {
  args: {
    variant: 'solid',
    colorScheme: 'secondary',
    children: 'Secondary Button',
  },
}




export const Outline: Story = {
  args: {
    variant: 'outline',
    colorScheme: 'primary',
    children: 'Outline Blue',
  },
}



// Ghost variants
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    colorScheme: 'primary',
    children: 'Ghost Blue',
  },
}



// Destructive variant
export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium Button',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
}

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    children: 'Extra Large Button',
  },
}

// State variants
export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Loading...',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'padded',
  },
}

// With icons
export const WithLeftIcon: Story = {
  args: {
    leftIcon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
    children: 'Add Item',
  },
}

export const WithRightIcon: Story = {
  args: {
    rightIcon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    ),
    children: 'Continue',
  },
}

export const WithBothIcons: Story = {
  args: {
    leftIcon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
    rightIcon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    ),
    children: 'Upload File',
  },
}

// Color scheme showcase
export const ColorSchemeShowcase: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Primary Variants</h3>
      <div className="flex flex-wrap gap-2">
        {['primary','secondary','blue', 'green', 'red', 'yellow', 'purple', 'pink', 'indigo', 'gray', 'slate', 'zinc', 'neutral', 'stone'].map((color) => (
          <Button
            key={color}
            variant="solid"
            colorScheme={color as any}
            onClick={fn()}
          >
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </Button>
        ))}
      </div>
      
      <h3 className="text-lg font-semibold">Outline Variants</h3>
      <div className="flex flex-wrap gap-2">
        {['primary','secondary','blue', 'green', 'red', 'yellow', 'purple', 'pink', 'indigo', 'gray', 'slate', 'zinc', 'neutral', 'stone'].map((color) => (
          <Button
            key={color}
            variant="outline"
            colorScheme={color as any}
            onClick={fn()}
          >
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}


