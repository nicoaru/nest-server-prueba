import { UserResponseDto } from "src/users/dto/response/user-response.dto";
import { User, UserDocument } from "../models/user.schema.mongo";
import { TaskResponseDto } from "src/tasks/dto/response/task-response.dto";
import { TaskDocument } from "../models/task.schema.mongo";

export class MapperMongo {

    userToResponseDto(doc:UserDocument):UserResponseDto {
        if(!doc) return null;

        let dto = new UserResponseDto();
        dto.id = doc._id.toHexString();
        dto.username = doc.username;
        dto.email = doc.email;
        return dto;
    }

    userArrayToResponseDto(docs:UserDocument[]):UserResponseDto[] {
        if(!docs) return null;

        let dtos:UserResponseDto[] = docs.map(doc => {
            let dto = new UserResponseDto();
            dto.id = doc._id.toHexString();
            dto.username = doc.username;
            dto.email = doc.email;
            return dto;
        })
        return dtos
    }

    taskToResponseDto(doc:TaskDocument):TaskResponseDto {
        if(!doc) return null;

        let dto = new TaskResponseDto();
        dto.id = doc._id.toHexString();
        dto.userId = doc.userId;
        dto.title = doc.title;
        dto.content = doc.content;
        dto.completed = doc.completed;
        return dto;
    }

    taskArrayToResponseDto(docs:TaskDocument[]):TaskResponseDto[] {
        if(!docs) return null;
                
        let dtos:TaskResponseDto[] = docs.map(doc => {
            let dto = new TaskResponseDto();
            dto.id = doc._id.toHexString();
            dto.userId = doc.userId;
            dto.title = doc.title;
            dto.content = doc.content;
            dto.completed = doc.completed;
            return dto;
        })
        return dtos
    }

}