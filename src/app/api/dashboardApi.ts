export type Stats = { users: number; revenue: number }

export async function getDashboardStats(): Promise<Stats> {
  const res = await fetch('/api/dashboard')
  if (!res.ok) throw new Error('Failed to load dashboard')
  return res.json()
}
