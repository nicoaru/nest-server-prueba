import { DeleteUserResponseDto } from "src/users/dto/response/delete-user-response.dto";
import { IRepository } from "./repository.interface";

export interface IRepositoryUser<T> extends IRepository<T> {

    existsByUsername(username:string):Promise<boolean>;

    existsByEmail(email:string):Promise<boolean>;

    removeByIdWithTasks(id: string | number): Promise<DeleteUserResponseDto>;

}