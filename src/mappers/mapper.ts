import { UserResponseDto } from "src/users/dto/response/user-response.dto";
import { User, UserDocument } from "../database/mongoDB/models/user.schema.mongo";
import { TaskResponseDto } from "src/tasks/dto/response/task-response.dto";
import { TaskDocument } from "../database/mongoDB/models/task.schema.mongo";
import { IUser } from "src/interfaces/user.interface";
import { ITask } from "src/interfaces/task.interface";

//TODO: CAMBIAR NOMBRE A 'MAPPER'
export class Mapper {

    userToResponseDto(doc:IUser):UserResponseDto {
        if(!doc) return null;

        let dto = new UserResponseDto();
        dto._id = doc._id.toString();
        dto.username = doc.username;
        dto.email = doc.email;
        return dto;
    }

    userArrayToResponseDto(docs:IUser[]):UserResponseDto[] {
        if(!docs) return null;

        let dtos:UserResponseDto[] = docs.map(doc => {
            let dto = new UserResponseDto();
            dto._id = doc._id.toString();
            dto.username = doc.username;
            dto.email = doc.email;
            return dto;
        })
        return dtos
    }

    taskToResponseDto(doc:ITask):TaskResponseDto {
        if(!doc) return null;

        let dto = new TaskResponseDto();
        dto._id = doc._id.toString();
        dto.userId = doc.userId;
        dto.title = doc.title;
        dto.content = doc.content;
        dto.completed = doc.completed;
        return dto;
    }

    taskArrayToResponseDto(docs:ITask[]):TaskResponseDto[] {
        if(!docs) return null;
                
        let dtos:TaskResponseDto[] = docs.map(doc => {
            let dto = new TaskResponseDto();
            dto._id = doc._id.toString();
            dto.userId = doc.userId;
            dto.title = doc.title;
            dto.content = doc.content;
            dto.completed = doc.completed;
            return dto;
        })
        return dtos
    }

}