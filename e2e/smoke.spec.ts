import { expect, test } from '@playwright/test'

test('carga la ruta placeholder', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Kuenty' })).toBeVisible()
})
