import { FastifyInstance } from "fastify";
import { OrderController } from "./order.controller.ts";

export default async function orderRoutes(app: FastifyInstance) {
    const controller = new OrderController()
    app.get("/orders", controller.getOrders)
    app.get("/orders/:id", controller.getOrderById)
    app.post("/orders", controller.createOrder)
    app.put("/orders/:id", controller.updateOrder)
    app.delete("/orders/:id", controller.deleteOrder)
}