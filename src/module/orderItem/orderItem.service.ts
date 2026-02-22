const orderItems = [
    { id: 1, orderId: 1, productId: 1, quantity: 2, unitPrice: 10.00, total: 20.00 },
    { id: 2, orderId: 1, productId: 2, quantity: 1, unitPrice: 5.50, total: 5.50 },
    { id: 3, orderId: 2, productId: 3, quantity: 3, unitPrice: 7.25, total: 21.75 }
]

export class OrderItemService {
    getOrderItems() {
        return orderItems
    }

    getOrderItemById(id: number) {
        return orderItems.find(item => item.id === id)
    }

    createOrderItem(payload: { orderId: number; productId: number; quantity: number; unitPrice: number; total: number }) {
        const newItem = { id: orderItems.length + 1, ...payload }
        orderItems.push(newItem)
        return newItem
    }

    updateOrderItem(id: number, payload: { orderId?: number; productId?: number; quantity?: number; unitPrice?: number; total?: number }) {
        const item = orderItems.find(item => item.id === id)
        if (!item) return null
        Object.assign(item, payload)
        return item
    }

    deleteOrderItem(id: number) {
        const index = orderItems.findIndex(item => item.id === id)
        if (index === -1) return false
        orderItems.splice(index, 1)
        return true
    }
}