import { IPageResponse } from "src/interfaces/pageResponse.interface";
import { UserResponseDto } from "./user-response.dto";

export class UserPageResponseDto implements IPageResponse<UserResponseDto> {
    docs: UserResponseDto[];
    totalDocs: number;
    page: number;
    prevPage: number;
    nextPage: number;
    limit: number;

    constructor(docs:UserResponseDto[], totalDocs:number, page:number, prevPage:number, nextPage:number, limit:number) {
        this.docs = docs;
        this.totalDocs = totalDocs;
        this.page = page;
        this.prevPage = prevPage;
        this.nextPage = nextPage;
        this.limit = limit;
    }
}