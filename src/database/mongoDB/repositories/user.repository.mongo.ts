import { User, UserDocument } from "../models/user.schema.mongo";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateUserRequestDto } from "src/users/dto/request/update-user-request.dto";
import { CreateUserRequestDto } from "src/users/dto/request/create-user-request.dto";
import { IRepositoryUser } from "src/interfaces/repositoryUser.interface";
import { UserResponseDto } from "src/users/dto/response/user-response.dto";
import { MapperMongo } from "../mappers/mapperMongo";
import { DeleteUserResponseDto } from "src/users/dto/response/delete-user-response.dto";
import { Task } from "../models/task.schema.mongo";


@Injectable()
export class UserRepositoryMongo implements IRepositoryUser<UserResponseDto> {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(Task.name) private readonly taskModel: Model<Task>,
        private readonly mapper:MapperMongo,
        @InjectConnection() private readonly dbConnection: mongoose.Connection
    ) { }

    

    
    async create(createDto: CreateUserRequestDto): Promise<UserResponseDto> {
        const doc = await this.userModel.create(createDto);
        const dto = this.mapper.userToResponseDto(doc);
        return dto;
    }

    async findAll(sort:string): Promise<UserResponseDto[]> {
        const docs = await this.userModel.find().sort(sort);
        const dtos = this.mapper.userArrayToResponseDto(docs);
        return dtos;
    }

    async findPaginated(skip:number, limit:number, sort:string): Promise<UserResponseDto[]> {
        const docs = await this.userModel.find().skip(skip).limit(limit).sort(sort);
        const dtos = this.mapper.userArrayToResponseDto(docs);
        return dtos;
    }


    async findById(id: string | number): Promise<UserResponseDto> {
        const doc = await this.userModel.findById(id);
        const dto = this.mapper.userToResponseDto(doc);
        return dto;
    }

    async updateById(id: string | number, updatedEntity: UpdateUserRequestDto): Promise<UserResponseDto> {
        const doc = await this.userModel.findByIdAndUpdate(id, updatedEntity, {returnDocument: 'after'});
        const dto = this.mapper.userToResponseDto(doc);
        return dto;
    }

    async removeById(id: string | number): Promise<UserResponseDto> {
        const doc = await this.userModel.findByIdAndRemove(id);
        const dto = this.mapper.userToResponseDto(doc);
        return dto;  
    }
    
    async removeByIdWithTasks(id: string | number): Promise<DeleteUserResponseDto> {
        let deletedUser:UserDocument;
        let deletTasksResult:any;
        const session = await this.dbConnection.startSession();
        try {
            session.startTransaction();  

            deletedUser = await this.userModel.findByIdAndRemove(id, {session});
            if(!deletedUser) throw new NotFoundException();

            deletTasksResult = await this.taskModel.deleteMany({userId: id}, {session});
           
            await session.commitTransaction();

            
            console.log('success');
        } catch (error) {
            console.log('error - ', error.message);
            await session.abortTransaction();
            throw error;
        }
        session.endSession();

        const userDto = this.mapper.userToResponseDto(deletedUser);
        const responseDto = new DeleteUserResponseDto;
        responseDto.deletedUser = userDto;
        responseDto.deletedRelatedTasks = deletTasksResult.deletedCount;

        return responseDto;  
    }
    
    async existsById(id: string | number): Promise<boolean> {
        if(await this.userModel.exists({_id:id})) return true;
        else return false;
    }

    async existsByUsername(username: string): Promise<boolean> {
        if(await this.userModel.exists({username: username})) return true;
        else return false;
    }

    async existsByEmail(email: string): Promise<boolean> {
        if(await this.userModel.exists({email: email})) return true;
        else return false;
    }

    async countDocs(): Promise<number> {
        return await this.userModel.count();
    }

}

/*
    const {skip} = getSkipAndLimitPagination(paginationOptions);
    const {page, limit} = paginationOptions;

    let totalDocs:number = await this.userModel.count();
    let docs:UserDocument[] = await this.userModel.find().skip(skip).limit(limit);
    let dtos:UserResponseDto[] = this.mapper.userArrayToResponseDto(docs);

    const pageResponse = new UserPageResponseDto;
    pageResponse.docs = dtos;
    pageResponse.totalDocs = totalDocs;
    pageResponse.page = page;
    pageResponse.limit = limit;
    pageResponse.prevPage = page>1 ? page-1 : null;
    pageResponse.nextPage = (page*limit)>=totalDocs ? null : page+1;
    
    return pageResponse;
*/