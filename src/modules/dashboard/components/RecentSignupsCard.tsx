import React from 'react'
import Card from '../../../components/card/Card'
import DataTable from '../../../components/table/DataTable'
import type { Column } from '../../../components/table/types'

export type Signup = { name: string; email: string; plan: string }

export default function RecentSignupsCard({ data }: { data: Signup[] }) {
  const signupColumns: Column[] = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Plan', accessor: 'plan' },
  ]
  return (
    <Card header={<span>Recent signups</span>} footer={<span className="text-xs">Latest users joined this week.</span>}>
      <DataTable data={data} columns={signupColumns} isLoading={false} title="New users" paginationOptions={{ paginationFront: true }} />
    </Card>
  )
}
