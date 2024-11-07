import {TasksRepository} from "../../domain/repositories/tasks.repository";

export class UpdateTaskOrderUseCase {
    static async execute(input: UpdateTaskOrderUseCaseInput): Promise<UpdateTaskOrderUseCaseOutput> {
        await TasksRepository.updateTaskOrder(input.taskId, Number(input.newOrder));
    }
}

export type UpdateTaskOrderUseCaseInput = {
    taskId: string;
    newOrder: string;
};

export type UpdateTaskOrderUseCaseOutput = void;