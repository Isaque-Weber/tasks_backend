import {TaskEntity} from "../../domain/entities/task.entity";
import {TasksRepository} from "../../domain/repositories/tasks.repository";

export class UpdateTaskUseCase {
    static async execute(input: UpdateTaskUseCaseInput): Promise<UpdateTaskUseCaseOutput> {
        const taskExists = await TasksRepository.getTaskById(input.id);
        if (!taskExists) {
            throw new Error('Task not found');
        }

        taskExists.name = input.name;
        taskExists.cost = input.cost;
        taskExists.date = input.date;

        return TasksRepository.updateTask(taskExists);
    }
}

export type UpdateTaskUseCaseInput = {
    id: string;
    name: string;
    cost: number;
    date: string;
};

export type UpdateTaskUseCaseOutput = TaskEntity;