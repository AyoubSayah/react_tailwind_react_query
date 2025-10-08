import { forwardRef } from 'react'
import { cn } from '../../utils/utilties'
import { buttonSizes, colorSchemes } from './Button.styles'
import type { ButtonProps } from './Button.type'






export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'solid',
      size = 'md',
      colorScheme = 'primary',
      children,
      isLoading = false,
      disabled = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading

    const getColorClasses = () => {
    
      return colorSchemes[colorScheme][variant]
    }

    const buttonClasses = cn(
      'flex items-center justify-center font-medium rounded-md transition-colors cursor-pointer',
      'focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
      'disabled:pointer-events-none',

      buttonSizes[size],

      getColorClasses(),

      fullWidth && 'w-full',

      isLoading && 'cursor-wait',

      className
    )

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={buttonClasses}
        aria-disabled={isDisabled}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {!isLoading && leftIcon && (
          <span className="mr-2" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {children}

        {!isLoading && rightIcon && (
          <span className="ml-2" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
