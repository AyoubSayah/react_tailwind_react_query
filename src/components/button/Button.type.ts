export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'destructive'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'
export type ColorScheme =
  'primary' | 'secondary'
  | 'blue'
  | 'green'
  | 'red'
  | 'yellow'
  | 'purple'
  | 'pink'
  | 'indigo'
  | 'gray'
  | 'slate'
  | 'zinc'
  | 'neutral'
  | 'stone'

  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
    colorScheme?: ColorScheme
    children: React.ReactNode
    isLoading?: boolean
    disabled?: boolean
    fullWidth?: boolean
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
  }
  
  