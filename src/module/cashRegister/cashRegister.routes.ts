import { FastifyInstance } from "fastify";
import { CashRegisterController } from "./cashRegister.controller.ts";

export default function cashRegisterRoutes(app: FastifyInstance) {
    const controller = new CashRegisterController();
    app.get("/cash-registers", controller.getCashRegisters);
    app.get("/cash-registers/:id", controller.getCashRegisterById);
    app.post("/cash-registers", controller.createCashRegister);
    app.put("/cash-registers/:id", controller.updateCashRegister);
    app.delete("/cash-registers/:id", controller.deleteCashRegister);
}
