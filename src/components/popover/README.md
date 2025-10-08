# Popover Component

A flexible popover component that displays content over other elements with customizable positioning and behavior.

## Features

- ✅ Multiple positioning options (top, bottom, left, right)
- ✅ Controlled and uncontrolled state management
- ✅ Customizable styling and triggers
- ✅ Keyboard navigation support
- ✅ Click outside to close
- ✅ Escape key to close
- ✅ Accessibility compliant
- ✅ TypeScript support

## Basic Usage

```tsx
import { Popover } from '../components/popover'
import { Button } from '../components/button'

function MyComponent() {
  return (
    <Popover
      trigger={<Button>Open Popover</Button>}
      position="bottom"
    >
      <div className="p-4">
        <h3>Popover Title</h3>
        <p>This is the popover content</p>
      </div>
    </Popover>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Content to display inside the popover |
| `trigger` | `React.ReactNode` | - | Trigger element that opens the popover |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Position of the popover relative to trigger |
| `className` | `string` | - | Custom className for the popover content |
| `triggerClassName` | `string` | - | Custom className for the trigger wrapper |
| `defaultOpen` | `boolean` | `false` | Whether the popover is open by default |
| `open` | `boolean` | - | Whether the popover is controlled externally |
| `onOpenChange` | `(open: boolean) => void` | - | Callback when popover open state changes |
| `closeOnClickOutside` | `boolean` | `true` | Whether to close popover when clicking outside |
| `closeOnEscape` | `boolean` | `true` | Whether to close popover when pressing escape |

## Examples

### Different Positions

```tsx
<Popover position="top" trigger={<Button>Top</Button>}>
  <div className="p-4">Content at top</div>
</Popover>

<Popover position="bottom" trigger={<Button>Bottom</Button>}>
  <div className="p-4">Content at bottom</div>
</Popover>

<Popover position="left" trigger={<Button>Left</Button>}>
  <div className="p-4">Content to the left</div>
</Popover>

<Popover position="right" trigger={<Button>Right</Button>}>
  <div className="p-4">Content to the right</div>
</Popover>
```

### Controlled State

```tsx
function ControlledExample() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={<Button>Controlled</Button>}
    >
      <div className="p-4">
        <p>This popover is controlled externally</p>
        <Button onClick={() => setIsOpen(false)}>Close</Button>
      </div>
    </Popover>
  )
}
```

### Custom Styling

```tsx
<Popover
  className="bg-gray-900 text-white border-gray-700"
  trigger={<Button>Dark Theme</Button>}
>
  <div className="p-4">
    <h3>Dark Popover</h3>
    <p>Custom dark styling</p>
  </div>
</Popover>
```

## Accessibility

The Popover component includes:

- Proper ARIA attributes (`role="tooltip"`, `aria-expanded`)
- Keyboard navigation (Enter/Space to toggle, Escape to close)
- Focus management
- Screen reader support

## Integration with Other Components

The Popover can be used with any trigger element:

```tsx
// With Button component
<Popover trigger={<Button variant="primary">Click me</Button>}>
  <div>Content</div>
</Popover>

// With custom trigger
<Popover trigger={<span className="cursor-pointer">Custom trigger</span>}>
  <div>Content</div>
</Popover>

// With icon trigger
<Popover trigger={<Icon name="settings" />}>
  <div>Settings menu</div>
</Popover>
```
