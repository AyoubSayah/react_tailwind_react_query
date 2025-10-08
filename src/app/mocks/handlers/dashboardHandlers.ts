import { delay, http, HttpResponse } from 'msw'

export const dashboardHandlers = [
  http.get('/api/dashboard', async () => {
    await delay(2000)
    return HttpResponse.json({ users: 1234, revenue: 98765 }, { status: 200 })
  }),
]
