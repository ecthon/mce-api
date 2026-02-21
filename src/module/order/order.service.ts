import { id } from "zod/locales";

const orders = [
    { id: 1, status: "OPEN", total: 100.50, createdAt: new Date(), closedAt: null, cashRegisterId: 1 },
    { id: 2, status: "CLOSED", total: 250.00, createdAt: new Date(), closedAt: new Date(), cashRegisterId: 2 },
    { id: 3, status: "CANCELED", total: 0.00, createdAt: new Date(), closedAt: new Date(), cashRegisterId: 1 }
]

export class OrderService {
    async getOrders() {
        return orders
    }

    async getOrderById(id: number) {
        return orders.find(o => o.id === id)
    }

    async createOrder(order: { status: string, total: number, cashRegisterId: number }) {
        const newOrder = { id: orders.length + 1, createdAt: new Date(), closedAt: null, ...order }
        orders.push(newOrder)
        return newOrder
    }

    async updateOrder(id: number, order: { status?: string, total?: number, cashRegisterId?: number }) {
        const existingOrder = orders.find(o => o.id === id)
        if (!existingOrder) return null
        Object.assign(existingOrder, order)
        if (order.status === "CLOSED") {
            existingOrder.closedAt = new Date()
        } else if (order.status === "OPEN") {
            existingOrder.closedAt = null
        }
        return existingOrder
    }

    async deleteOrder(id: number) {
        const index = orders.findIndex(o => o.id === id)
        if (index === -1) return false
        orders.splice(index, 1)
        return true
    }
}