import {TaskEntity} from "../../domain/entities/task.entity";
import {TasksRepository} from "../../domain/repositories/tasks.repository";

export class CreateTaskUseCase {
    static async execute(input: CreateTaskUseCaseInput): Promise<CreateTaskUseCaseOutput> {
        const task = new TaskEntity({
            name: input.name,
            cost: input.cost,
            date: input.date,
        });

        return TasksRepository.createTask(task);
    }
}

export type CreateTaskUseCaseInput = {
    name: string;
    cost: number;
    date: string;
}

export type CreateTaskUseCaseOutput = TaskEntity;