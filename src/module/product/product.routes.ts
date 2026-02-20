import type { FastifyInstance } from "fastify";
import { ProductController } from "./product.controller.js";

export default async function productRoutes(app: FastifyInstance) {
    const controller = new ProductController()

    app.get("/products", controller.getProducts)
    app.get("/products/:id", controller.getProductById)
    app.post("/products", controller.createProduct)
    app.put("/products/:id", controller.updateProduct)
    app.delete("/products/:id", controller.deleteProduct)
}