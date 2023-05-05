import { IPageResponse } from "src/interfaces/pageResponse.interface";
import { TaskResponseDto } from "./task-response.dto";


export class TaskPageResponseDto implements IPageResponse<TaskResponseDto> {
    docs: TaskResponseDto[];
    totalDocs: number;
    page: number;
    prevPage: number;
    nextPage: number;
    limit: number;
    

    constructor(docs:TaskResponseDto[], totalDocs:number, page:number, prevPage:number, nextPage:number, limit:number) {
        this.docs = docs;
        this.totalDocs = totalDocs;
        this.page = page;
        this.prevPage = prevPage;
        this.nextPage = nextPage;
        this.limit = limit;
    }
}