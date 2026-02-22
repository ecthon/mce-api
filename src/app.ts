import fastify from "fastify";
import productRoutes from "./module/product/product.routes.js";
import orderRoutes from "./module/order/order.routes.ts";
import orderItemRoutes from "./module/orderItem/orderItem.routes.ts";
import paymentRoutes from "./module/payment/payment.routes.ts";
import cashRegisterRoutes from "./module/cashRegister/cashRegister.routes.ts";

export const server = fastify()

server.register(productRoutes)
server.register(orderRoutes)
server.register(orderItemRoutes)
server.register(paymentRoutes)
server.register(cashRegisterRoutes)