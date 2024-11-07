import {Controller, DELETE, GET, PATCH, POST, PUT} from "fastify-decorators";
import {FastifyReply, FastifyRequest} from "fastify";
import {CreateTaskUseCase, CreateTaskUseCaseInput} from "../../application/use-cases/create-task.use-case";
import {GetTaskUseCase} from "../../application/use-cases/get-task.use-case";
import {
    GetTaskByIdUseCase,
    GetTaskByIdUseCaseInput,
} from "../../application/use-cases/get-task-by-id.use-case";
import {DeleteTaskUseCase, DeleteTaskUseCaseInput} from "../../application/use-cases/delete-task.use-case";
import {UpdateTaskUseCase, UpdateTaskUseCaseInput} from "../../application/use-cases/update-task.use-case";
import {
    UpdateTaskOrderUseCase,
    UpdateTaskOrderUseCaseInput
} from "../../application/use-cases/update-task-order.use-case";

@Controller("/tasks")
export class TasksController {
    @POST()
    async create(request: FastifyRequest, reply: FastifyReply) {
        const data = await CreateTaskUseCase.execute(request.body as CreateTaskUseCaseInput);
        reply.send(data);
    }

    @GET()
    async list(request: FastifyRequest, reply: FastifyReply) {
        const data = await GetTaskUseCase.execute();
        reply.send(data);
    }

    @GET("/:id")
    async get(request: FastifyRequest, reply: FastifyReply) {
        const data = await GetTaskByIdUseCase.execute(request.params as GetTaskByIdUseCaseInput);
        reply.send(data);
    }

    @DELETE("/:id")
    async delete(request: FastifyRequest, reply: FastifyReply) {
        const data = await DeleteTaskUseCase.execute(request.params as DeleteTaskUseCaseInput);
        reply.send(data);
    }

    @PUT("/:id")
    async update(request: FastifyRequest, reply: FastifyReply) {
        const params = {
            ...request.body as object,
            ...request.params as object
        };
        const data = await UpdateTaskUseCase.execute(params as UpdateTaskUseCaseInput);

        reply.send(data);
    }

    @PATCH("/:taskId/order/:newOrder")
    async updateOrder(request: FastifyRequest, reply: FastifyReply) {
        const params = {
            ...request.params as object
        };
        await UpdateTaskOrderUseCase.execute(params as UpdateTaskOrderUseCaseInput);

        reply.status(204).send();
    }
}


