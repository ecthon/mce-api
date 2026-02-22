import { FastifyReply, FastifyRequest } from "fastify"
import { OrderItemService } from "./orderItem.service.ts"

export class OrderItemController {
    private orderItemService: OrderItemService

    constructor() {
        this.orderItemService = new OrderItemService()
    }

    getOrderItems = async (request: FastifyRequest, reply: FastifyReply) => {
        const orderItems = await this.orderItemService.getOrderItems()
        reply.send(orderItems)
    }

    getOrderItemById = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = parseInt((request.params as { id: string }).id)
        const orderItem = await this.orderItemService.getOrderItemById(id)
        if (!orderItem) {
            reply.status(404).send({ error: "Order item not found" })
            return
        }
        reply.send(orderItem)
    }

    createOrderItem = async (request: FastifyRequest, reply: FastifyReply) => {
        const { orderId, productId, quantity, unitPrice, total } = request.body as { orderId: number; productId: number; quantity: number; unitPrice: number; total: number }
        if (!orderId || !productId || quantity === undefined || unitPrice === undefined || total === undefined) {
            reply.status(400).send({ error: "orderId, productId, quantity, unitPrice and total are required" })
            return
        }
        const payload = { orderId, productId, quantity, unitPrice, total }
        const newOrderItem = await this.orderItemService.createOrderItem(payload)
        reply.status(201).send(newOrderItem)
    }

    updateOrderItem = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = parseInt((request.params as { id: string }).id)
        const { orderId, productId, quantity, unitPrice, total } = request.body as { orderId?: number; productId?: number; quantity?: number; unitPrice?: number; total?: number }
        const payload = Object.fromEntries(Object.entries({ orderId, productId, quantity, unitPrice, total }).filter(([, v]) => v !== undefined))
        const updatedOrderItem = await this.orderItemService.updateOrderItem(id, payload as { orderId?: number; productId?: number; quantity?: number; unitPrice?: number; total?: number })
        if (!updatedOrderItem) {
            reply.status(404).send({ error: "Order item not found" })
            return
        }
        reply.send(updatedOrderItem)
    }

    deleteOrderItem = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = parseInt((request.params as { id: string }).id)
        const deleted = await this.orderItemService.deleteOrderItem(id)
        if (!deleted) {
            reply.status(404).send({ error: "Order item not found" })
            return
        }
        reply.status(204).send()
    }
}