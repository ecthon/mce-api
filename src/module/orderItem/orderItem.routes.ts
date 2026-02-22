import { FastifyInstance } from "fastify"
import { OrderItemController } from "./orderItem.controller.ts"

export default async function orderRoutes(app: FastifyInstance) {
    const controller = new OrderItemController()
    app.get("/order-items", controller.getOrderItems)
    app.get("/order-items/:id", controller.getOrderItemById)
    app.post("/order-items", controller.createOrderItem)
    app.put("/order-items/:id", controller.updateOrderItem)
    app.delete("/order-items/:id", controller.deleteOrderItem)
}