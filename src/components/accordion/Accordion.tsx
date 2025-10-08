import React, { createContext, useContext, useMemo, useState } from 'react'
import { cn } from '../../utils/utilties'

type AccordionContextType = {
  openItems: Set<number>
  toggleItem: (idx: number) => void
  allowToggle: boolean
}

const AccordionContext = createContext<AccordionContextType | null>(null)

export type AccordionProps = {
  defaultIndex?: number[]
  allowToggle?: boolean
  className?: string
  children: React.ReactNode
}

export function Accordion({ defaultIndex = [0], allowToggle = true, className, children }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set(defaultIndex))

  const toggleItem = (idx: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      const isOpen = next.has(idx)
      if (allowToggle) {
        if (isOpen) next.delete(idx)
        else next.add(idx)
      } else {
        next.clear()
        if (!isOpen) next.add(idx)
      }
      return next
    })
  }

  const value = useMemo(() => ({ openItems, toggleItem, allowToggle }), [openItems, allowToggle])

  return (
    <AccordionContext.Provider value={value}>
      <div className={cn('w-full', className)}>{children}</div>
    </AccordionContext.Provider>
  )
}

export type AccordionItemProps = {
  index: number
  className?: string
  children: React.ReactNode
}

export function AccordionItem({ index, className, children }: AccordionItemProps) {
  return <div className={cn('border-b border-gray-200', className)} data-acc-item={index}>{children}</div>
}

export type AccordionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  index: number
}

export function AccordionButton({ index, className, children, ...props }: AccordionButtonProps) {
  const ctx = useContext(AccordionContext)!
  const isOpen = ctx.openItems.has(index)
  return (
    <button
      type="button"
      aria-expanded={isOpen}
      onClick={() => ctx.toggleItem(index)}
      className={cn(
        'w-full flex items-center justify-between px-4 py-3 text-left',
        'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500',
        className
      )}
      {...props}
    >
      <span className="font-medium text-gray-800">{children}</span>
      <svg className={cn('h-5 w-5 text-gray-500 transition-transform', isOpen ? 'rotate-180' : 'rotate-0')} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.065l3.71-3.834a.75.75 0 111.08 1.04l-4.24 4.38a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z" clipRule="evenodd"/></svg>
    </button>
  )
}

export type AccordionPanelProps = {
  index: number
  className?: string
  children: React.ReactNode
}

export function AccordionPanel({ index, className, children }: AccordionPanelProps) {
  const ctx = useContext(AccordionContext)!
  const isOpen = ctx.openItems.has(index)
  return (
    <div className={cn('px-4 pb-4', isOpen ? 'block' : 'hidden', className)} role="region">
      {children}
    </div>
  )
}

export default Accordion
