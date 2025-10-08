import React from 'react'
import { cn } from '../../utils/utilties'

export type LoaderProps = {
  label?: string
  fullscreen?: boolean
  className?: string
}

export const Loader: React.FC<LoaderProps> = ({ label = 'Loading…', fullscreen = false, className }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'w-full flex items-center justify-center',
        fullscreen ? 'min-h-screen' : 'py-10',
        className
      )}
    >
      <div className="flex flex-col items-center space-y-3">
        <svg
          className="h-8 w-8 animate-spin text-indigo-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span className="text-sm text-slate-600">{label}</span>
      </div>
    </div>
  )
}

export default Loader
