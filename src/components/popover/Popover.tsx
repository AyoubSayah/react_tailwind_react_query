import React, { useState, useRef, useEffect } from 'react'
import { cn } from '../../utils/utilties'

interface PopoverProps {
  children: React.ReactNode
  trigger: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
  triggerClassName?: string
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean
  containerClassName?: string
}

export const Popover: React.FC<PopoverProps> = ({
  children,
  trigger,
  position = 'bottom',
  className,
  triggerClassName,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  closeOnClickOutside = true,
  closeOnEscape = true,
  containerClassName="",
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const triggerRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen

  const setIsOpen = (open: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(open)
    }
    onOpenChange?.(open)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!closeOnClickOutside) return

      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (!closeOnEscape) return

      if (event.key === 'Escape') {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, closeOnClickOutside, closeOnEscape])

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  }

  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-t-white border-t-8 border-x-transparent border-x-8 border-b-0',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-b-white border-b-8 border-x-transparent border-x-8 border-t-0',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-l-white border-l-8 border-y-transparent border-y-8 border-r-0',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-r-white border-r-8 border-y-transparent border-y-8 border-l-0',
  }

  return (
    <div className={`${containerClassName} relative inline-block`}>
      <div
        ref={triggerRef}
        className={triggerClassName}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsOpen(!isOpen)
          }
        }}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          ref={popoverRef}
          className={cn(
            'absolute z-50 min-w-[200px] bg-white border border-gray-200 rounded-md shadow-lg',
            positionClasses[position],
            className
          )}
          role="tooltip"
        >
          {/* Arrow */}
          <div
            className={cn(
              'absolute w-0 h-0',
              arrowClasses[position]
            )}
          />
          
          {/* Content */}
          <div className="p-1">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}
