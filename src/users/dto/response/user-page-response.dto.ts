import { IPageResponse } from "src/interfaces/pageResponse.interface";
import { UserResponseDto } from "./user-response.dto";

export class UserPageResponseDto implements IPageResponse<UserResponseDto> {
    docs: UserResponseDto[];
    totalDocs: number;
    page: number;
    prevPage: number;
    nextPage: number;
    limit: number;
}