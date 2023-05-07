import { ITask } from "src/interfaces/task.interface";

export class TaskResponseDto implements ITask {
    _id: string|number;
    userId: string|number;
    title: string;
    content?: string;
    completed: boolean   
}
