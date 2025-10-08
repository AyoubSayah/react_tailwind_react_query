import React from 'react'
import { DEFAULT_MIN_HEIGHT } from '../constants/constants'
import { tableClasses } from '../styles'

interface LoaderProps {
  customLoader?: React.ReactNode
  minH?: string
}

export const Loader: React.FC<LoaderProps> = ({ customLoader, minH }) => {
  if (customLoader) {
    return <>{customLoader}</>
  }

  return (
    <div 
      className={tableClasses.loader}
      style={{ minHeight: minH ?? DEFAULT_MIN_HEIGHT }}
      aria-label="Loading data"
    >
      <div className="flex flex-col items-center space-y-2">
        <svg
          className="animate-spin h-8 w-8 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
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
        <span className="text-sm text-gray-600">Loading...</span>
      </div>
    </div>
  )
}