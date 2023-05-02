export class CreateTaskRequestDto {
    userId: string | number;    
    title: string;
    content: string;
    completed: boolean;    


    constructor(userId?: string, title?: string, content?: string, completed?: boolean) {
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.completed = completed
    }
}
