import fastify from "fastify";
import productRoutes from "./module/product/product.routes.js";
import orderRoutes from "./module/order/order.routes.ts";

export const server = fastify()

server.register(productRoutes)
server.register(orderRoutes)