import fastify from "fastify";
import productRoutes from "./module/product/product.routes.js";

export const server = fastify()

server.register(productRoutes)