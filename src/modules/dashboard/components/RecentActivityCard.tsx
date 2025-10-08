import React from 'react'
import Card from '../../../components/card/Card'
import DataTable from '../../../components/table/DataTable'
import type { Column } from '../../../components/table/types'

export default function RecentActivityCard({ metrics, loading }: { metrics: { metric: string; value: React.ReactNode }[]; loading: boolean }) {
  const metricColumns: Column[] = [
    { header: 'Metric', accessor: 'metric' },
    { header: 'Value', accessor: 'value', cell: (v) => <span className="font-medium">{v}</span> },
  ]
  return (
    <Card header={<span>Recent activity</span>} footer={<span className="text-xs">Snapshot of current metrics.</span>}>
      <DataTable data={metrics} columns={metricColumns} isLoading={loading} title="Key metrics" paginationOptions={{ paginationFront: true }} />
    </Card>
  )
}
