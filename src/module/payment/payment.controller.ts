import { FastifyReply, FastifyRequest } from "fastify"
import { PaymentService } from "./payment.service.ts"

export class PaymentController {
    private paymentService: PaymentService

    constructor() {
        this.paymentService = new PaymentService()
    }

    getPayments = async (request: FastifyRequest, reply: FastifyReply) => {
        const payments = await this.paymentService.getPayments()
        reply.send(payments)
    }

    getPaymentById = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = parseInt((request.params as { id: string }).id)
        const payment = await this.paymentService.getPaymentById(id)
        if (!payment) {
            reply.status(404).send({ error: "Payment not found" })
            return
        }
        reply.send(payment)
    }

    createPayment = async (request: FastifyRequest, reply: FastifyReply) => {
        const { orderId, moneyAmount, pixAmount, total } = request.body as { orderId: number; moneyAmount: number; pixAmount: number; total: number }
        if (!orderId || moneyAmount === undefined || pixAmount === undefined || total === undefined) {
            reply.status(400).send({ error: "orderId, moneyAmount, pixAmount and total are required" })
            return
        }
        const payload = { orderId, moneyAmount, pixAmount, total }
        const newPayment = await this.paymentService.createPayment(payload)
        reply.status(201).send(newPayment)
    }

    updatePayment = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = parseInt((request.params as { id: string }).id)
        const { orderId, moneyAmount, pixAmount, total } = request.body as { orderId?: number; moneyAmount?: number; pixAmount?: number; total?: number }
        const payload = Object.fromEntries(Object.entries({ orderId, moneyAmount, pixAmount, total }).filter(([, v]) => v !== undefined))
        const updatedPayment = await this.paymentService.updatePayment(id, payload as { orderId?: number; moneyAmount?: number; pixAmount?: number; total?: number })
        if (!updatedPayment) {
            reply.status(404).send({ error: "Payment not found" })
            return
        }
        reply.send(updatedPayment)
    }

    deletePayment = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = parseInt((request.params as { id: string }).id)
        const deleted = await this.paymentService.deletePayment(id)
        if (!deleted) {
            reply.status(404).send({ error: "Payment not found" })
            return
        }
        reply.status(204).send()
    }
}
