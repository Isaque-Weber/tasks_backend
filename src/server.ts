import fastify from "fastify";
import {bootstrap} from "fastify-decorators";
import {TasksController} from "./presentation/controllers/tasks.controller";
import fastifyCors from "@fastify/cors";

const server = fastify({logger: true});

server.register(fastifyCors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400
});

server.register(bootstrap, {
   controllers: [
       TasksController
   ]
});

(async function start() {
    try {
        await server.listen({
            port: 3000,
            host: '0.0.0.0'
        });
        console.log("Server is running on port 3000");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();