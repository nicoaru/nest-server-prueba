import { Injectable } from "@nestjs/common";
import { IRepository } from "src/interfaces/repository.interface";
import { TaskEntity } from "src/database/entities/task.entity";

@Injectable()
export class TaskRepositoryMongo implements IRepository<TaskEntity> {
    create(createDTO: any): Promise<TaskEntity> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<TaskEntity[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string | number): Promise<TaskEntity> {
        throw new Error("Method not implemented.");
    }
    updateById(id: string | number, updateDTO: any): Promise<TaskEntity> {
        throw new Error("Method not implemented.");
    }
    removeById(id: string | number): Promise<TaskEntity> {
        throw new Error("Method not implemented.");
    }
}