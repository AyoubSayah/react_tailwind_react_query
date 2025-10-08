import React from 'react'
import StatCard from './StatCard'
import { Icon } from '../../../components/icon'

export default function KpiGrid({ users, revenue, signups, loading }: { users?: number; revenue?: number; signups?: number; loading?: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-6 px-4 mt-4">
      <StatCard
        title="Active users"
        value={loading ? '—' : users ?? '—'}
        trend={{ value: '+4.5% vs last week', tone: 'up' }}
        gradient="from-primary-600 via-primary-500 to-primary-700"
        icon={<Icon displayName="eye" className="h-8 w-8" />}
      />
      <StatCard
        title="Revenue"
        value={loading ? '—' : revenue ? `$${revenue}` : '—'}
        trend={{ value: '+2.1% vs last week', tone: 'up' }}
        gradient="from-secondary-600 via-secondary-500 to-primary-600"
        icon={<Icon displayName="setting-2" className="h-8 w-8" />}
      />
      <StatCard
        title="New signups"
        value={loading ? '—' : signups ?? 42}
        trend={{ value: '-1.2% vs last week', tone: 'down' }}
        gradient="from-primary-700 via-secondary-500 to-secondary-700"
        icon={<Icon displayName="plus" className="h-8 w-8" />}
      />
    </div>
  )
}
