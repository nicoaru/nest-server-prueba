import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Task } from "../models/task.schema.mongo";
import { Model } from "mongoose";
import { CreateTaskRequestDto } from "src/tasks/dto/request/create-task-request.dto";
import { UpdateTaskRequestDto } from "src/tasks/dto/request/update-task-request.dto";
import { IRepositoryTask } from "src/interfaces/repositoryTask.interface";
import { MapperMongo } from "../mappers/mapperMongo";
import { TaskResponseDto } from "src/tasks/dto/response/task-response.dto";


@Injectable()
export class TaskRepositoryMongo implements IRepositoryTask<TaskResponseDto> {
    constructor(
        @InjectModel(Task.name) private readonly taskModel:Model<Task>,
        private readonly mapper:MapperMongo
    ) { }

    
    
    
    async create(createDto: CreateTaskRequestDto): Promise<TaskResponseDto> {
        const doc = await this.taskModel.create(createDto);
        const dto = this.mapper.taskToResponseDto(doc);
        return dto;
    }

    async findAll(sort:string): Promise<TaskResponseDto[]> {
        const docs = await this.taskModel.find().sort(sort);
        const dtos = this.mapper.taskArrayToResponseDto(docs);
        return dtos;
    }

    async findPaginated(skip:number, limit:number, sort:string): Promise<TaskResponseDto[]> {
        const docs = await this.taskModel.find().skip(skip).limit(limit).sort(sort);
        const dtos = this.mapper.taskArrayToResponseDto(docs);
        return dtos;
    }
    

    async findAllByUserId(userId:string|number, sort:string): Promise<TaskResponseDto[]> {
        const docs = await this.taskModel.find({userId: userId}).sort(sort);
        const dtos = this.mapper.taskArrayToResponseDto(docs);
        return dtos;
    }
    

    async findPaginatedByUserId(userId:string|number, skip:number, limit:number, sort:string): Promise<TaskResponseDto[]> {
        const docs = await this.taskModel.find({userId: userId}).skip(skip).limit(limit).sort(sort);
        const dtos = this.mapper.taskArrayToResponseDto(docs);
        return dtos;
    }


    async findById(id: string | number): Promise<TaskResponseDto> {
        const doc = await this.taskModel.findById(id);
        const dto = this.mapper.taskToResponseDto(doc);
        return dto;
        //** ::POPULATE::
        //** return this.taskModel.findById(id).populate('userId', 'username email').exec();
    }

    async updateById(id: string | number, updatedEntity: UpdateTaskRequestDto): Promise<TaskResponseDto> {
        const doc = await this.taskModel.findByIdAndUpdate(id, updatedEntity, {returnDocument: 'after'});
        const dto = this.mapper.taskToResponseDto(doc);
        return dto;
    }

    async removeById(id: string | number): Promise<TaskResponseDto> {
        const doc = await this.taskModel.findByIdAndRemove(id);
        const dto = this.mapper.taskToResponseDto(doc);
        return dto;
    }

    async removeByUserId(userId:string|number): Promise<Record<string, number>> {
        let result = await this.taskModel.deleteMany({userId: userId});
        
        return {deletedCount: result.deletedCount};
    }

    async existsById(id: string | number): Promise<boolean> {
        if(await this.taskModel.exists({_id:id})) return true;
        else return false;
    }

    async countDocs(): Promise<number> {
        return await this.taskModel.count();
    }

    async countDocsByUserId(userId:string|number): Promise<number> {
        return await this.taskModel.count({userId: userId});
    }
}