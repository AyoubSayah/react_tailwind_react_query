import React from 'react';
import { cn } from '../../utils/utilties';

export interface CardProps {
  children: React.ReactNode
  className?: string
  header?: React.ReactNode
  footer?: React.ReactNode
  padding?: string
  shadow?: boolean
  border?: boolean
}

const Card = ({
  children,
  className = '',
  header,
  footer,
  padding = 'p-6',
  shadow = true,
  border = true,
}: CardProps) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl',
        padding,
        shadow ? 'shadow-lg hover:shadow-xl transition-shadow' : '',
        border ? 'border border-slate-200' : '',
        className,
      )}
    >
      {header && (
        <div className="mb-3 pb-2 border-b border-slate-100 font-semibold text-lg flex items-center gap-2">
          {header}
        </div>
      )}
      <div>{children}</div>
      {footer && (
        <div className="mt-4 pt-2 border-t border-slate-100 text-sm text-slate-500">{footer}</div>
      )}
    </div>
  )
}

export default Card