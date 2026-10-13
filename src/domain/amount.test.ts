import { describe, expect, it } from 'vitest'
import { AmountMinorUnitsSchema } from '@domain/amount'

describe('AmountMinorUnitsSchema', () => {
  it('acepta enteros', () => {
    expect(AmountMinorUnitsSchema.parse(1250)).toBe(1250)
  })

  it('rechaza decimales', () => {
    expect(AmountMinorUnitsSchema.safeParse(12.5).success).toBe(false)
  })
})
