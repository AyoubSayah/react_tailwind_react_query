import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../utils/utilties'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

const sizeMap: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
}

export type ModalProps = {
  open: boolean
  onClose: () => void
  title?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  size?: ModalSize
  hideClose?: boolean
  className?: string
}

export default function Modal({ open, onClose, title, children, footer, size = 'md', hideClose = false, className }: ModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const content = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'relative w-full rounded-2xl bg-white shadow-xl ring-1 ring-black/5',
          sizeMap[size],
          className
        )}
      >
        <div className="flex items-center justify-between border-b px-5 py-3">
          <div className="text-base font-semibold text-gray-900">{title}</div>
          {!hideClose && (
            <button onClick={onClose} className="rounded-md p-1 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500" aria-label="Close">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          )}
        </div>
        <div className="px-5 py-4">{children}</div>
        {footer && <div className="border-t px-5 py-3">{footer}</div>}
      </div>
    </div>
  )

  const root = typeof document !== 'undefined' ? document.body : null
  return root ? createPortal(content, root) : content
}
