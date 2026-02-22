const payments = [
    { id: 1, orderId: 1, moneyAmount: 20.00, pixAmount: 0.00, total: 20.00 },
    { id: 2, orderId: 2, moneyAmount: 5.50, pixAmount: 0.00, total: 5.50 },
    { id: 3, orderId: 3, moneyAmount: 21.75, pixAmount: 21.75, total: 43.50 }
]

export class PaymentService {
    getPayments() {
        return payments
    }

    getPaymentById(id: number) {
        return payments.find(p => p.id === id)
    }

    createPayment(payload: { orderId: number; moneyAmount: number; pixAmount: number; total: number }) {
        const newPayment = { id: payments.length + 1, ...payload }
        payments.push(newPayment)
        return newPayment
    }

    updatePayment(id: number, payload: { orderId?: number; moneyAmount?: number; pixAmount?: number; total?: number }) {
        const payment = payments.find(p => p.id === id)
        if (!payment) return null
        Object.assign(payment, payload)
        return payment
    }

    deletePayment(id: number) {
        const index = payments.findIndex(p => p.id === id)
        if (index === -1) return false
        payments.splice(index, 1)
        return true
    }
}