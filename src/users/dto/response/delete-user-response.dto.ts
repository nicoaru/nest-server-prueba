import { UserResponseDto } from "./user-response.dto";

export class DeleteUserResponseDto {
    deletedUser:UserResponseDto;
    deletedRelatedTasks:number;

    constructor(deletedUser:UserResponseDto, deletedRelatedTasks:number) {
        this.deletedUser = deletedUser;
        this.deletedRelatedTasks = deletedRelatedTasks;
    }
}