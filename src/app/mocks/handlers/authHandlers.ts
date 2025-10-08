import { delay, http, HttpResponse } from 'msw'

export const authHandlers = [
  http.post('/api/login', async ({ request }) => {
       await delay(3000)

    const { email } = await request.json()
    return HttpResponse.json({ user: { id: '1', email } }, { status: 200 })
  }),
  http.post('/api/logout', async () => {
    return new HttpResponse(null, { status: 200 })
  }),
]
