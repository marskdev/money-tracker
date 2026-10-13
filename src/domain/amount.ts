import { z } from 'zod'

// Placeholder: valida que un importe sea entero en unidades menores (nunca float).
export const AmountMinorUnitsSchema = z.number().int()

export type AmountMinorUnits = z.infer<typeof AmountMinorUnitsSchema>
