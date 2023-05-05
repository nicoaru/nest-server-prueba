import { UserResponseDto } from "./user-response.dto";

export class DeleteUserResponseDto {
    deletedUser:UserResponseDto;
    deletedRelatedTasks:number;
}