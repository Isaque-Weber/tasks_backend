import {TaskEntity} from "../../domain/entities/task.entity";
import {TasksRepository} from "../../domain/repositories/tasks.repository";

export class GetTaskByIdUseCase {
    static async execute(input: GetTaskByIdUseCaseInput): Promise<GetTaskByIdUseCaseOutput> {

        return TasksRepository.getTaskById(input.id);
    }
}

export type GetTaskByIdUseCaseInput = {
    id: string;
};

export type GetTaskByIdUseCaseOutput = TaskEntity;