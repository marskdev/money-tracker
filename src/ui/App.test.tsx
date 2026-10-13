import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { App } from '@ui/App'

afterEach(cleanup)

describe('App', () => {
  it('muestra la ruta placeholder', async () => {
    render(<App />)
    expect(await screen.findByRole('heading', { name: 'Money Tracker' })).toBeTruthy()
  })
})
