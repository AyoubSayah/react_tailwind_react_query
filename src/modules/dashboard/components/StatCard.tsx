import React from 'react'
import Card from '../../../components/card/Card'
import { cn } from '../../../utils/utilties'

export type StatCardProps = {
  title: string
  value: React.ReactNode
  trend?: { value: string; tone?: 'up' | 'down' | 'neutral' }
  gradient?: string
  icon?: React.ReactNode
}

export default function StatCard({ title, value, trend, gradient = 'from-primary-600 via-secondary-500 to-primary-700', icon }: StatCardProps) {
  return (
    <Card
      className={cn(
        'text-white relative overflow-hidden',
        'bg-gradient-to-r',
        gradient,
        'border-0'
      )}
      padding="p-5"
      shadow
      border={false}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm/5 opacity-90">{title}</div>
          <div className="mt-1 text-3xl font-semibold">{value}</div>
        </div>
        {icon && (
          <div className="opacity-70">{icon}</div>
        )}
      </div>
      {trend && (
        <div className={cn('mt-2 text-xs font-medium', trend.tone === 'up' ? 'text-emerald-200' : trend.tone === 'down' ? 'text-rose-200' : 'text-white/80')}>
          {trend.value}
        </div>
      )}
    </Card>
  )
}
