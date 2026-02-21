import { FastifyReply, FastifyRequest } from "fastify"
import { OrderService } from "./order.service.ts"

export class OrderController {

    private service: OrderService

    constructor() {
        this.service = new OrderService()
    }

    getOrders = async (request: FastifyRequest, reply: FastifyReply) => {
        const orders = await this.service.getOrders()
        reply.send(orders)
    }

    getOrderById = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = parseInt((request.params as { id: string }).id)
        const order = await this.service.getOrderById(id)
        if (!order) {
            reply.status(404).send({ error: "Order not found" })
            return
        }
        reply.send(order)
    }

    createOrder = async (request: FastifyRequest, reply: FastifyReply) => {
        const { status, total, cashRegisterId } = request.body as { status: string; total: number, cashRegisterId: number }
        if (!status || total === undefined || !cashRegisterId) {
            reply.status(400).send({ error: "Status, total and cashRegisterId are required" })
            return
        }
        const payload = { status, total, cashRegisterId }
        const newOrder = await this.service.createOrder(payload)
        reply.status(201).send(newOrder)
    }

    updateOrder = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = parseInt((request.params as { id: string }).id)
        const { status, total, cashRegisterId } = request.body as { status?: string; total?: number, cashRegisterId?: number }
        const payload = Object.fromEntries(Object.entries({ status, total, cashRegisterId }).filter(([, v]) => v !== undefined))
        const updatedOrder = await this.service.updateOrder(id, payload as { status?: string; total?: number, cashRegisterId?: number })
        if (!updatedOrder) {
            reply.status(404).send({ error: "Order not found" })
            return
        }
        reply.send(updatedOrder)
    }

    deleteOrder = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = parseInt((request.params as { id: string }).id)
        const deleted = await this.service.deleteOrder(id)
        if (!deleted) {
            reply.status(404).send({ error: "Order not found" })
            return
        }
        reply.status(204).send()
    }
}