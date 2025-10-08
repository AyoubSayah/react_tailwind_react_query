import { delay, http, HttpResponse } from 'msw'

export const clientsHandlers = [
  http.get('/api/clients', async() => {
   await delay(2000)
    return  HttpResponse.json([
      { id: '1', name: 'Acme Corp', email: 'contact@acme.test', status: 'Active', phone: '123-456-7890', company: 'Acme Corp' },
      { id: '2', name: 'Globex', email: 'hello@globex.test', status: 'Prospect', phone: '987-654-3210', company: 'Globex Inc.' },
      { id: '3', name: 'Initech', email: 'info@initech.test', status: 'Inactive', phone: '555-555-5555', company: 'Initech LLC' },
      { id: '4', name: 'Umbrella Corp', email: 'contact@umbrella.test', status: 'Active', phone: '123-123-1234', company: 'Umbrella Corp' },
      { id: '5', name: 'Hooli', email: 'info@hooli.test', status: 'Inactive', phone: '555-555-5555', company: 'Hooli Inc.' },
      { id: '6', name: 'Stark Industries', email: 'info@starkindustries.test', status: 'Active', phone: '555-555-5555', company: 'Stark Industries' },
      { id: '7', name: 'Wayne Enterprises', email: 'info@wayneenterprises.test', status: 'Inactive', phone: '555-555-5555', company: 'Wayne Enterprises' }
    ], { status: 200 })
  }),
]
