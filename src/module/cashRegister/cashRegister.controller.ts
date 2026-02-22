import { FastifyReply, FastifyRequest } from "fastify";
import { CashRegisterService } from "./cashRegister.service.ts";

export class CashRegisterController {
    private cashRegisterService: CashRegisterService

    constructor() {
        this.cashRegisterService = new CashRegisterService()
    }

    getCashRegisters = async (request: FastifyRequest, reply: FastifyReply) => {
        const cashRegisters = await this.cashRegisterService.getCashRegisters()
        reply.send(cashRegisters)
    }

    getCashRegisterById = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = parseInt((request.params as { id: string }).id)
        const cashRegister = await this.cashRegisterService.getCashRegisterById(id)
        if (!cashRegister) {
            reply.status(404).send({ error: "Cash register not found" })
            return
        }
        reply.send(cashRegister)
    }

    createCashRegister = async (request: FastifyRequest, reply: FastifyReply) => {
        const { openedAt, initialAmount } = request.body as { openedAt: string; initialAmount: number }
        if (!openedAt || initialAmount === undefined) {
            reply.status(400).send({ error: "openedAt and initialAmount are required" })
            return
        }
        const payload = { openedAt, initialAmount }
        const newCashRegister = await this.cashRegisterService.createCashRegister(payload)
        reply.status(201).send(newCashRegister)
    }

    updateCashRegister = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = parseInt((request.params as { id: string }).id)
        const { closedAt, finalAmount, status } = request.body as { closedAt?: string; finalAmount?: number; status?: 'OPEN' | 'CLOSED' }
        const payload = Object.fromEntries(Object.entries({ closedAt, finalAmount, status }).filter(([, v]) => v !== undefined))
        const updatedCashRegister = await this.cashRegisterService.updateCashRegister(id, payload as { closedAt?: string; finalAmount?: number; status?: 'OPEN' | 'CLOSED' })
        if (!updatedCashRegister) {
            reply.status(404).send({ error: "Cash register not found" })
            return
        }
        reply.send(updatedCashRegister)
    }

    deleteCashRegister = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = parseInt((request.params as { id: string }).id)
        const deleted = await this.cashRegisterService.deleteCashRegister(id)
        if (!deleted) {
            reply.status(404).send({ error: "Cash register not found" })
            return
        }
        reply.status(204).send()
    }
}