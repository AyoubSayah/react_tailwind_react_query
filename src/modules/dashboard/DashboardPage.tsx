import { useQuery } from '@tanstack/react-query'
import { getDashboardStats, type Stats } from '../../app/api/dashboardApi'
import KpiGrid from './components/KpiGrid'
import RecentActivityCard from './components/RecentActivityCard'
import RecentSignupsCard from './components/RecentSignupsCard'
import WelcomeHero from './components/WelcomeHero'

export default function DashboardPage() {
  const { data, isLoading } = useQuery({ queryKey: ['dashboardStats'], queryFn: getDashboardStats })
  const stats = data as Stats | undefined

  const metrics = [
    { metric: 'Total users', value: stats?.users ?? '—' },
    { metric: 'Monthly revenue', value: stats?.revenue ? `$${stats.revenue}` : '—' },
    { metric: 'Avg. session length', value: '6m 12s' },
    { metric: 'Support tickets (7d)', value: 18 },
  ]

  const recentSignups = [
    { name: 'Ava Martin', email: 'ava.martin@example.com', plan: 'Pro' },
    { name: 'Jon Park', email: 'jon.park@example.com', plan: 'Free' },
    { name: 'Leila Chen', email: 'leila.chen@example.com', plan: 'Team' },
  ]

  return (
    <div>
      <WelcomeHero />
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="mb-2 text-2xl font-semibold">Dashboard</h1>
        <div className="text-sm text-slate-500">Overview of key metrics</div>
      </div>

      <KpiGrid users={stats?.users} revenue={stats?.revenue} signups={42} loading={isLoading} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RecentActivityCard metrics={metrics} loading={!!isLoading} />
        <RecentSignupsCard data={recentSignups} />
      </div>
    </div>
  )
}
