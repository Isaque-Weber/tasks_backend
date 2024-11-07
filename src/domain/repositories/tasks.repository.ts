import {TaskEntity} from "../entities/task.entity";
import db from "../../infra/database/database.connection";

export class TasksRepository {
    static async createTask(task: TaskEntity) {
        const query = `
            INSERT INTO tasks (id, name, cost, date, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?);
        `;
        const values = [task.id, task.name, task.cost, task.date, task.createdAt, task.updatedAt];
        await db.execute(query, values);

        return this.getTaskById(task.id);
    }

    static async getTasks(): Promise<TaskEntity[]> {
        const query = 'SELECT * FROM tasks';
        const [rows] = await db.query(query);
        return rows as TaskEntity[];
    }

    static async getTaskById(id: string): Promise<TaskEntity> {
        const query = 'SELECT * FROM tasks WHERE id = ?';
        const [rows] = await db.query(query, [id]);
        const tasks = rows as TaskEntity[];
        return tasks.length ? tasks[0] : null;
    }

    static async deleteTask(id: string): Promise<void> {
        const query = 'DELETE FROM tasks WHERE id = ?';
        await db.execute(query, [id]);
    }

    static async updateTask(task: TaskEntity): Promise<TaskEntity | null> {
        const query = `
            UPDATE tasks
            SET name = ?, cost = ?, date = ?, \`order\` = ?, updatedAt = NOW()
            WHERE id = ?;
        `;
        const values = [task.name, task.cost, task.date, task.order, task.id];

        await db.execute(query, values);

        return this.getTaskById(task.id);
    }

    static async updateTaskOrder(id: string, novoOrder: number): Promise<void> {
        const taskToMove = await this.getTaskById(id);
        if (!taskToMove) {
            throw new Error(`Tarefa com ID ${id} não encontrada.`);
        }

        const currentOrder = taskToMove.order;

        try {
            const setTempOrderQuery = `
                UPDATE tasks
                SET \`order\` = 9999
                WHERE id = ?
            `;
            await db.execute(setTempOrderQuery, [id]);

            if (currentOrder < novoOrder) {
                const shiftDownQuery = `
                    UPDATE tasks
                    SET \`order\` = \`order\` - 1
                    WHERE \`order\` > ? AND \`order\` <= ?
                    ORDER BY \`order\` ASC
                `;
                await db.execute(shiftDownQuery, [currentOrder, novoOrder]);
            } else if (currentOrder > novoOrder) {
                const shiftUpQuery = `
                    UPDATE tasks
                    SET \`order\` = \`order\` + 1
                    WHERE \`order\` >= ? AND \`order\` < ?
                    ORDER BY \`order\` DESC
                `;
                await db.execute(shiftUpQuery, [novoOrder, currentOrder]);
            }

            const updateOrderQuery = `
                UPDATE tasks
                SET \`order\` = ?
                WHERE id = ?
            `;
            await db.execute(updateOrderQuery, [novoOrder, id]);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}