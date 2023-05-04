import { Injectable } from "@nestjs/common";
import { IRepository } from "src/interfaces/repository.interface";
import { TaskEntity } from "src/database/entities/task.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Task } from "../models/task.schema.mongo";
import { Model } from "mongoose";
import { CreateTaskRequestDto } from "src/tasks/dto/request/create-task-request.dto";
import { UpdateTaskRequestDto } from "src/tasks/dto/request/update-task-request.dto";


@Injectable()
export class TaskRepositoryMongo implements IRepository<TaskEntity> {
    constructor(
        @InjectModel(Task.name) private readonly taskModel:Model<Task>
    ) { }
    
    
    
    create(entityToCreate: CreateTaskRequestDto): Promise<TaskEntity> {
        return this.taskModel.create(entityToCreate);
    }

    findAll(): Promise<TaskEntity[]> {
        return this.taskModel.find();
    }

    findById(id: string | number): Promise<TaskEntity> {
        return this.taskModel.findById(id);
        //** ::POPULATE::
        //** return this.taskModel.findById(id).populate('userId', 'username email').exec();
    }

    updateById(id: string | number, updatedEntity: UpdateTaskRequestDto): Promise<TaskEntity> {
        return this.taskModel.findByIdAndUpdate(id, updatedEntity, {returnDocument: 'after'});
    }

    removeById(id: string | number): Promise<TaskEntity> {
        return this.taskModel.findByIdAndRemove(id);
    }

    async existsById(id: string | number): Promise<boolean> {
        if(await this.taskModel.exists({_id:id})) return true;
        else return false;
    }

}