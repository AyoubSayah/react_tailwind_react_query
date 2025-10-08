import { test, expect } from '@playwright/test'

const successfulLogin = (email: string) => ({ user: { id: '1', email } })

test.describe('Auth', () => {
  test('shows validation messages', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/login`)

    await page.getByRole('button', { name: 'Sign in' }).click()
    await expect(page.getByText('Email is required')).toBeVisible()
    await expect(page.getByText('Password is required')).toBeVisible()

    await page.getByLabel('Email').fill('invalid-email')
    await page.getByLabel('Password').fill('123')
    await page.getByRole('button', { name: 'Sign in' }).click()
    await expect(page.getByText('Enter a valid email')).toBeVisible()
    await expect(page.getByText('Must be at least 6 characters')).toBeVisible()
  })

  test('logs in and redirects to dashboard', async ({ page, baseURL }) => {
    await page.route('**/api/login', async (route) => {
      const post = await route.request().postDataJSON()
      route.fulfill({ status: 200, body: JSON.stringify(successfulLogin(post.email)), headers: { 'content-type': 'application/json' } })
    })

    await page.goto(`${baseURL}/login`)
    await page.getByLabel('Email').fill('demo@example.com')
    await page.getByLabel('Password').fill('password123')
    await page.getByRole('button', { name: 'Sign in' }).click()

    await page.waitForURL('**/private/dashboard')
    await expect(page.getByText('Overview of key metrics')).toBeVisible()
    await expect(page.getByText('demo@example.com')).toBeVisible()
  })

  test('logout updates header', async ({ page, baseURL }) => {
    await page.route('**/api/login', (route) => route.fulfill({ status: 200, body: JSON.stringify(successfulLogin('demo@example.com')), headers: { 'content-type': 'application/json' } }))
    await page.route('**/api/logout', (route) => route.fulfill({ status: 200, body: '' }))

    await page.goto(`${baseURL}/login`)
    await page.getByLabel('Email').fill('demo@example.com')
    await page.getByLabel('Password').fill('password123')
    await page.getByRole('button', { name: 'Sign in' }).click()
    await page.waitForURL('**/private/dashboard')

    await page.getByRole('button', { name: 'Logout' }).click()
    await expect(page.getByText('Guest')).toBeVisible()
  })
})
