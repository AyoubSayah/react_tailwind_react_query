import Card from '../../components/card/Card'
import { Button } from '../../components/button'
import DataTable from '../../components/table/DataTable'
import { Filter } from '../../components/filter'
import ClientsSummary from './components/ClientsSummary'
import { Modal } from '../../components/modal'
import useDiscloseure from '../../utils/hooks/useDiscloseure'
import useClient from './hooks/useClient'
import HandleColumns from '../../components/table/HandleColumns'

export default function ClientsPage() {
  const { isOpen, onOpen, onClose } = useDiscloseure()

  const { columns, filtered, clients, setClientName, isLoading } = useClient()



  return (
    <>
      <div className="rounded-2xl bg-gradient-to-br from-primary-100 via-secondary-100 to-white p-4 ring-1 ring-primary-200/40">
        <Filter
          inputs={[{ inputName: 'name', inputLabel: 'Search clients', inputType: 'text' }]}
          onSubmitData={(client) => setClientName(client?.name ?? '')}
          showClearButton
        />
      </div>

      <ClientsSummary total={clients?.length ?? 0} filtered={filtered.length} />

      <Card
        header={
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <span className="text-xl font-semibold">Clients</span>
            <div className="flex items-center gap-2">
              <Button variant="outline">Export CSV</Button>
              <Button colorScheme="primary" onClick={() => onOpen()}>New client</Button>
            </div>
          </div>
        }
        footer={<span className="text-xs text-slate-500">Manage your client list and view details.</span>}
        className="mt-2"
      >
        <HandleColumns className='ml-auto' initialVisibleColumns={{ name: true, email: true, status: true, phone: false, company: false, id: false, actions: true }} labelColumns={{ phone: 'Phone number', company: 'Company', id: 'ID', actions: 'Actions' }}>
          {({ visibleColumns }) => (
            <DataTable
              data={filtered}
              columns={columns.filter((col) => visibleColumns[col.accessor as string])}
              isLoading={isLoading}
              title="Client list"
              paginationOptions={{ paginationFront: true }}
            />
          )}


        </HandleColumns>
      </Card>

      <Modal open={isOpen} onClose={onClose} title="Create client">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose() }}>
          <div>
            <label className="mb-1 block text-xs text-slate-600" htmlFor="c-name">Name</label>
            <input id="c-name" className="h-10 w-full rounded-md border border-gray-300 px-3" placeholder="Acme Inc" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-600" htmlFor="c-email">Email</label>
            <input id="c-email" type="email" className="h-10 w-full rounded-md border border-gray-300 px-3" placeholder="team@acme.com" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={onClose} type="button">Cancel</Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
