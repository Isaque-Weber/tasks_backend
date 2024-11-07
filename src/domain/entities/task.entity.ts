import {randomUUID} from "node:crypto";

export type Task = {
    id?: string;
    name: string;
    cost: number;
    date: string;
    order?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export class TaskEntity {
    id: string;
    name: string;
    cost: number;
    date: string;
    order: number;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(props: Task) {
        this.id = props.id ?? randomUUID();
        this.name = props.name;
        this.cost = props.cost;
        this.date = props.date;
        this.order = props.order;
        this.createdAt = props.createdAt ?? new Date();
        this.updatedAt = props.updatedAt ?? new Date();
    }
}
