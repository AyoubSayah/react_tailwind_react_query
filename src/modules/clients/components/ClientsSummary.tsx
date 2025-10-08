import Card from '../../../components/card/Card'

export default function ClientsSummary({ total, filtered }: { total: number; filtered: number }) {
  return (
    <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 px-4 mt-4">
      <Card className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 text-white" padding="p-5" border={false}>
        <div className="text-sm/5 opacity-90">Total clients</div>
        <div className="mt-1 text-3xl font-semibold">{total}</div>
      </Card>
      <Card className="bg-gradient-to-br from-secondary-600 via-secondary-500 to-primary-600 text-white" padding="p-5" border={false}>
        <div className="text-sm/5 opacity-90">Currently visible</div>
        <div className="mt-1 text-3xl font-semibold">{filtered}</div>
      </Card>
      <Card className="bg-white" padding="p-5">
        <div className="text-sm text-slate-600">Tips</div>
        <div className="mt-1 text-sm text-slate-700">Use filters to narrow down your list or add a new client.</div>
      </Card>
    </div>
  )
}
