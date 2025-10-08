import React from 'react'
import { Link } from 'react-router'

export default function WelcomeHero() {
  return (
    <section className="mb-6 rounded-2xl bg-gradient-to-br from-primary-100 via-secondary-100 to-white p-6 ring-1 ring-primary-200/40">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Welcome back</h2>
          <p className="mt-1 text-sm text-gray-600">Here’s a quick overview of what’s happening today.</p>
        </div>
        <div className="flex gap-2">
          <Link to="/private/clients" className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
            View clients
          </Link>
          <Link to="/private/dashboard" className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500">
            Refresh
          </Link>
        </div>
      </div>
    </section>
  )
}
