import { IRepository } from "src/interfaces/repository.interface";
import { User } from "../models/user.schema.mongo";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UpdateUserRequestDto } from "src/users/dto/request/update-user-request.dto";
import { CreateUserRequestDto } from "src/users/dto/request/create-user-request.dto";
import { UserEntity } from "src/database/entities/user.entity";



@Injectable()
export class UserRepositoryMongo implements IRepository<UserEntity> {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) { }



    
    async create(entityToCreate: CreateUserRequestDto): Promise<UserEntity> {
        try {
            const userCreated = await this.userModel.create(entityToCreate);
            return userCreated;
        }
        catch(error) {
            console.log("HUBO UN ERROR")
        }


        // return createdUser;
    }

    async findAll(): Promise<UserEntity[]> {
        const users:User[] = await this.userModel.find();
        console.log("users: ", users)
        return users;
    }

    async findById(id: string | number): Promise<UserEntity> {
        let objectId:Types.ObjectId;
        try {
            const objectId = new Types.ObjectId(id);
        }
        catch(error) {
            throw new HttpException("Invalid Id", HttpStatus.BAD_REQUEST);
        }
        const user:User = await this.userModel.findById(objectId);
        console.log("user: ", user)
        return user;
    }

    async updateById(id: string | number, updatedEntity: UpdateUserRequestDto): Promise<UserEntity> {
        const objectId:Types.ObjectId = new Types.ObjectId(id);
        const modifiedUser:User = await this.userModel.findOneAndUpdate(objectId, updatedEntity, {returnDocument: 'after'});
        console.log("modified user: ", modifiedUser)
        return modifiedUser;
    }

    async removeById(id: string | number): Promise<UserEntity> {
        // let objectId:Types.ObjectId;
        // try {
        //     const objectId = new Types.ObjectId(id);
        // }
        // catch(error) {
        //     console.log(error)
        //     throw new HttpException("Invalid Id", HttpStatus.BAD_REQUEST, {cause:error.message});
        // }
        
        try {
        const deletedUser:User = await this.userModel.findByIdAndRemove(id);
        console.log("Deleted User: ", deletedUser)
        return deletedUser;            
        }
        catch(error) {
            console.log("HUBO un ERROR");
            console.log(error);
        }

    }

}



/*

    async removeById(id: string | number): Promise<User> {
        const objectId:Types.ObjectId = new Types.ObjectId(id);
        const deletedUser:User = await this.userModel.findByIdAndRemove(objectId);
        console.log("Deleted User: ", deletedUser)
        return deletedUser;
    }
    */