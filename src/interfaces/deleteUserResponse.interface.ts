import { UserResponseDto } from "src/users/dto/response/user-response.dto";


export class DeleteUserResponseDto {
    deletedUser:UserResponseDto;
    deletedRelatedTasks:number;
}