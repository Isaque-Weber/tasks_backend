import {TaskEntity} from "../../domain/entities/task.entity";
import {TasksRepository} from "../../domain/repositories/tasks.repository";

export class GetTaskUseCase {
    static async execute(input: GetTaskUseCaseInput): Promise<GetTaskUseCaseOutput> {

        return TasksRepository.getTasks();
    }
}

export type GetTaskUseCaseInput = void;

export type GetTaskUseCaseOutput = TaskEntity[];