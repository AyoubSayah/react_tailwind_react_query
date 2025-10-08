import type { Column } from '../../../components/table/types'
import { useMemo, useState } from 'react'
import { getClients, type Client } from '../../../app/api/clientsApi'
import { useQuery } from '@tanstack/react-query'
import { MdViewInAr } from 'react-icons/md'
import { BsEye } from 'react-icons/bs'

const useClient = () => {
    const [clientName, setClientName] = useState('')
    const { data, isLoading } = useQuery({ queryKey: ['clients'], queryFn: getClients })
    const clients = data as Client[] | undefined
    const filtered = useMemo(() => {
        if (!clients) return []
        return clients.filter((client) => client.name.toLowerCase().includes(clientName.toLowerCase()) || (client.email ?? '').toLowerCase().includes(clientName.toLowerCase()))
    }, [clients, clientName])

    const columns: Column[] = [
        {
            header: 'ID',
            accessor: 'id',

        },
        {
            header: 'Email',
            accessor: 'email'
        },
        {
            header: 'Client',
            accessor: 'name',
            customArg: (row) => (
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 text-white flex items-center justify-center text-sm font-semibold">
                        {row?.name?.[0] ?? 'C'}
                    </div>
                    <div>
                        <div className="font-medium text-gray-900">{row?.name}</div>
                        <div className="text-xs text-gray-500">{row?.email}</div>
                    </div>
                </div>
            )
        },
        {
            header: 'Status',
            accessor: 'status',
            cell: (value) => (
                <span className={
                    value === 'Active' ? 'inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700' :
                        value === 'Prospect' ? 'inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700' :
                            'inline-flex items-center rounded-full bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-700'
                }>{value}</span>
            )
        },
        {
            header: 'Phone',
            accessor: 'phone',
            cell: (value) => (
                <span className="text-sm text-gray-500">{value}</span>
            )
        },
        {
            header: 'Company',
            accessor: 'company',
            cell: (value) => (
                <span className="text-sm text-gray-500">{value}</span>
            )
        },

        {
            header: 'Actions',
            accessor: 'actions',
            actions: [
                {
                    name: 'Edit',
                    handleClick: (data: unknown) => console.log('Edit:', data),
                    colorScheme: 'secondary',
                    icon: (
                        <div className="w-4 h-4" >
                            <BsEye/>
                        </div>
                    ),
                },
                {
                    name: 'Delete',
                    colorScheme: 'red',
                    handleClick: (data: unknown) => console.log('Delete:', data),
                    icon: (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    ),
                },
            ],

        }
    ]

    return { columns, filtered, clients, setClientName, isLoading }
}

export default useClient