import { FastifyInstance } from "fastify";
import { PaymentController } from "./payment.controller.ts";

export default async function paymentRoutes(app: FastifyInstance) {
    const controller = new PaymentController();
    app.get("/payments", controller.getPayments);
    app.get("/payments/:id", controller.getPaymentById);
    app.post("/payments", controller.createPayment);
    app.put("/payments/:id", controller.updatePayment);
    app.delete("/payments/:id", controller.deletePayment);
}