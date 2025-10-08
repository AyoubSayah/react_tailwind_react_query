import { setupWorker } from 'msw/browser'
import { authHandlers } from './handlers/authHandlers'
import { clientsHandlers } from './handlers/clientsHandlers'
import { dashboardHandlers } from './handlers/dashboardHandlers'

export const worker = setupWorker(...authHandlers, ...clientsHandlers, ...dashboardHandlers)
