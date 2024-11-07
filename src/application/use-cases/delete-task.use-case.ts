import {TasksRepository} from "../../domain/repositories/tasks.repository";

export class DeleteTaskUseCase {
    static async execute(input: DeleteTaskUseCaseInput, ): Promise<DeleteTaskUseCaseOutput> {

        return TasksRepository.deleteTask(input.id);
    }
}

export type DeleteTaskUseCaseInput = {
    id: string;
};

export type DeleteTaskUseCaseOutput = void;