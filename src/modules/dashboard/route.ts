import React, { lazy } from 'react'

const DashboardPage = lazy(() => import('./DashboardPage'))

const DASHBOARD_ROUTE = [
  {
    path: 'dashboard',
    element: React.createElement(DashboardPage),
  },
]



export default DASHBOARD_ROUTE
