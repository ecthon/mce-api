const cashregisters = [
    { id: 1, openedAt: '2024-06-01T08:00:00Z', closedAt: null, initialAmount: 100.00, finalAmount: null, status: 'OPEN' },
    { id: 2, openedAt: '2024-06-01T08:00:00Z', closedAt: '2024-06-01T16:00:00Z', initialAmount: 150.00, finalAmount: 200.00, status: 'CLOSED' },
    { id: 3, openedAt: '2024-06-02T08:00:00Z', closedAt: null, initialAmount: 120.00, finalAmount: null, status: 'OPEN' }
]

export class CashRegisterService {
    getCashRegisters() {
        return cashregisters
    }

    getCashRegisterById(id: number) {
        return cashregisters.find(c => c.id === id)
    }

    createCashRegister(payload: { openedAt: string; initialAmount: number }) {
        const newCashRegister = { id: cashregisters.length + 1, ...payload, closedAt: null, finalAmount: null, status: 'OPEN' }
        cashregisters.push(newCashRegister)
        return newCashRegister
    }

    updateCashRegister(id: number, payload: { closedAt?: string; finalAmount?: number; status?: 'OPEN' | 'CLOSED' }) {
        const cashRegister = cashregisters.find(c => c.id === id)
        if (!cashRegister) return null
        Object.assign(cashRegister, payload)
        return cashRegister
    }

    deleteCashRegister(id: number) {
        const index = cashregisters.findIndex(c => c.id === id)
        if (index === -1) return false
        cashregisters.splice(index, 1)
        return true
    }
}