export interface ITask {
    _id: number|string;
    userId: number|string;    
    title: string;
    content?: string;
    completed: boolean;
}