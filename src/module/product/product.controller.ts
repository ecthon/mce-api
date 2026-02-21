import type { FastifyReply, FastifyRequest } from "fastify"
import { ProductService } from "./product.service.js"

export class ProductController {

    private service: ProductService

    constructor() {
        this.service = new ProductService()
    }

    async getProducts(request: FastifyRequest, reply: FastifyReply) {
        const products = await this.service.getProducts()
        reply.send(products)
    }

    async getProductById(request: FastifyRequest, reply: FastifyReply) {
        const id = parseInt((request.params as { id: string }).id)
        const product = await this.service.getProductById(id)
        if (!product) {
            reply.status(404).send({ error: "Product not found" })
            return
        }
        reply.send(product)
    }
    async createProduct(request: FastifyRequest, reply: FastifyReply) {
        const { name, price, categoryId, active } = request.body as { name: string; price: number, categoryId: number, active: boolean }
        if (!name || !price) {
            reply.status(400).send({ error: "Name and price are required" })
            return
        }
        const payload = { name, price, categoryId, active }
        const newProduct = await this.service.createProduct(payload)
        reply.status(201).send(newProduct)
    }

    async updateProduct(request: FastifyRequest, reply: FastifyReply) {
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
    async deleteProduct(request: FastifyRequest, reply: FastifyReply) {
        const id = parseInt((request.params as { id: string }).id)
        const success = await this.service.deleteProduct(id)
        if (!success) {
            reply.status(404).send({ error: "Product not found" })
            return
        }
        reply.status(204).send()
    }
}