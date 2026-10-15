# Kuenty

A local-first personal expense tracker. It records money movements across the user's accounts, by hand or from imported bank statements.

## Language

Each term lists its code identifier first and its es-MX UI label in parentheses.

**Transaction** (_Movimiento_):
A ledger entry on one Account, with an amount, currency, date and kind.
_Avoid_: Entry, record, movement

**Expense** (_Gasto_):
A Transaction of kind outflow. The only kind exposed in v1.
_Avoid_: Spending, charge

**Account** (_Cuenta_):
A place that holds money: cash, debit, credit or wallet. Has its own currency.
_Avoid_: Wallet, source

**Conversion status** (_Estado de conversión_):
Whether the MXN amount of a foreign-currency Transaction is **Estimated** (_estimado_, computed from the Banxico FIX rate) or **Confirmed** (_confirmado_, taken from the amount actually charged on an imported statement). Does not exist on MXN Transactions, whose amount is always exact.
_Avoid_: Reconciled, verified

**Pairing** (_Emparejamiento_):
The link between a manually captured Transaction and the imported statement line that represents the same charge. The system proposes it; the user confirms it. Confirming a Pairing sets the Conversion status to Confirmed.
_Avoid_: Match (reserved for text rules), reconciliation (reserved for balance checks), merge (reserved for categories)

**Category** (_Categoría_):
The single, permanent type a Transaction belongs to, such as Restaurants or Transport. Each Transaction has exactly one. Summaries and budgets are built from it.
_Avoid_: Group, folder, label

**Tag** (_Etiqueta_):
An optional label that marks the context of a Transaction, such as a trip or a tax-deductible expense. A Transaction has zero or more, and they cut across Categories.
_Avoid_: Category, label, hashtag

**Categorization rule** (_Regla de categorización_):
An instruction that assigns a Category to any Transaction whose description contains given text. Applied automatically, mainly to imported statement lines.
_Avoid_: Rule (too generic), mapping, auto-category

**Pending review** (_Por revisar_):
The state of an imported Transaction that the user has not yet checked. It is excluded from totals and summaries until reviewed; totals show the sum of Pending review Transactions as a separate figure.
_Avoid_: Inbox, draft, staging, unconfirmed (reserved for Conversion status)
