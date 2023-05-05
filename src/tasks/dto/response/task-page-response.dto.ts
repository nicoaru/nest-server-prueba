import { IPageResponse } from "src/interfaces/pageResponse.interface";
import { TaskResponseDto } from "./task-response.dto";


export class TaskPageResponseDto implements IPageResponse<TaskResponseDto> {
    docs: TaskResponseDto[];
    totalDocs: number;
    page: number;
    prevPage: number;
    nextPage: number;
    limit: number;
}