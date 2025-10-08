import React, { lazy } from 'react'

const ClientsPage = lazy(() => import('./ClientsPage'))

const CLIENTS_ROUTE = [
  {
    path: 'clients',
    element: React.createElement(ClientsPage),
  },
]



export default CLIENTS_ROUTE
