import { Injectable } from "@nestjs/common";
import { IRepository } from "src/interfaces/repository.interface";
import { TaskEntity } from "src/database/entities/task.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Task, TaskDocument } from "../models/task.schema.mongo";
import { Model, Types } from "mongoose";
import { CreateTaskRequestDto } from "src/tasks/dto/request/create-task-request.dto";
import { UpdateTaskRequestDto } from "src/tasks/dto/request/update-task-request.dto";
import { IPaginationOptions } from "src/interfaces/paginationOptions.interface";
import { getSkipAndLimitPagination } from "src/utils/utils";
import { IRepositoryTask } from "src/interfaces/repositoryTask.interface";
import { MapperMongo } from "../mappers/mapperMongo";
import { IPageResponse } from "src/interfaces/pageResponse.interface";
import { TaskResponseDto } from "src/tasks/dto/response/task-response.dto";
import { TaskPageResponseDto } from "src/tasks/dto/response/task-page-response.dto";


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

    async findAll(): Promise<TaskResponseDto[]> {
        const docs = await this.taskModel.find();
        const dtos = this.mapper.taskArrayToResponseDto(docs);
        return dtos;
    }

    async findPaginated(paginationOptions:IPaginationOptions): Promise<IPageResponse<TaskResponseDto>> {
        const {skip} = getSkipAndLimitPagination(paginationOptions);
        const {page, limit} = paginationOptions;

        let totalDocs:number = await this.taskModel.count();
        let docs:TaskDocument[] = await this.taskModel.find().skip(skip).limit(limit);
        let dtos:TaskResponseDto[] = this.mapper.taskArrayToResponseDto(docs);

        const pageResponse = new TaskPageResponseDto;
        pageResponse.docs = dtos;
        pageResponse.totalDocs = totalDocs;
        pageResponse.page = page;
        pageResponse.limit = limit;
        pageResponse.prevPage = page>1 ? page-1 : null;
        pageResponse.nextPage = (page*limit)>=totalDocs ? null : page+1;
        
        return pageResponse;
    }
    

    async findAllByUserId(userId:string|number): Promise<TaskResponseDto[]> {
        const docs = await this.taskModel.find({userId: userId});
        const dtos = this.mapper.taskArrayToResponseDto(docs);
        return dtos;
    }
    

    async findPaginatedByUserId(userId:string, paginationOptions:IPaginationOptions): Promise<IPageResponse<TaskResponseDto>> {
        const {skip} = getSkipAndLimitPagination(paginationOptions);
        const {page, limit} = paginationOptions;

        let totalDocs:number = await this.taskModel.count({userId: userId});
        let docs:TaskDocument[] = await this.taskModel.find({userId: userId}).skip(skip).limit(limit);
        let dtos:TaskResponseDto[] = this.mapper.taskArrayToResponseDto(docs);

        const pageResponse = new TaskPageResponseDto;
        pageResponse.docs = dtos;
        pageResponse.totalDocs = totalDocs;
        pageResponse.page = page;
        pageResponse.limit = limit;
        pageResponse.prevPage = page>1 ? page-1 : null;
        pageResponse.nextPage = (page*limit)>=totalDocs ? null : page+1;
        
        return pageResponse;
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

}