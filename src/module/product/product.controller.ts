import type { FastifyReply, FastifyRequest } from "fastify"
import { ProductService } from "./product.service.ts"

export class ProductController {

    private service: ProductService

    constructor() {
        this.service = new ProductService()
    }

    getProducts = async (request: FastifyRequest, reply: FastifyReply) => {
        const products = await this.service.getProducts()
        reply.send(products)
    }

    getProductById = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = parseInt((request.params as { id: string }).id)
        const product = await this.service.getProductById(id)
        if (!product) {
            reply.status(404).send({ error: "Product not found" })
            return
        }
        reply.send(product)
    }

    createProduct = async (request: FastifyRequest, reply: FastifyReply) => {
        const { name, price, categoryId, active } = request.body as { name: string; price: number, categoryId: number, active: boolean }
        if (!name || !price) {
            reply.status(400).send({ error: "Name and price are required" })
            return
        }
        const payload = { name, price, categoryId, active }
        const newProduct = await this.service.createProduct(payload)
        reply.status(201).send(newProduct)
    }

    updateProduct = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = parseInt((request.params as { id: string }).id)
        const { name, price, categoryId, active } = request.body as { name?: string; price?: number, categoryId?: number, active?: boolean }
        const payload = Object.fromEntries(Object.entries({ name, price, categoryId, active }).filter(([, v]) => v !== undefined))
        const updatedProduct = await this.service.updateProduct(id, payload as { name?: string; price?: number, categoryId?: number, active?: boolean })
        if (!updatedProduct) {
            reply.status(404).send({ error: "Product not found" })
            return
        }
        reply.send(updatedProduct)
    }

    deleteProduct = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = parseInt((request.params as { id: string }).id)
        const success = await this.service.deleteProduct(id)
        if (!success) {
            reply.status(404).send({ error: "Product not found" })
            return
        }
        reply.status(204).send()
    }
}