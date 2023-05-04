import { User } from "../models/user.schema.mongo";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { UpdateUserRequestDto } from "src/users/dto/request/update-user-request.dto";
import { CreateUserRequestDto } from "src/users/dto/request/create-user-request.dto";
import { UserEntity } from "src/database/entities/user.entity";
import { IRepositoryUser } from "src/interfaces/repositoryUser.interface";



@Injectable()
export class UserRepositoryMongo implements IRepositoryUser<UserEntity> {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) { }

    

    
    create(entityToCreate: CreateUserRequestDto): Promise<UserEntity> {
        return this.userModel.create(entityToCreate);
    }

    findAll(): Promise<UserEntity[]> {
        return this.userModel.find();
    }

    findById(id: string | number): Promise<UserEntity> {
        return this.userModel.findById(id);
    }

    updateById(id: string | number, updatedEntity: UpdateUserRequestDto): Promise<UserEntity> {
        return this.userModel.findByIdAndUpdate(id, updatedEntity, {returnDocument: 'after'});
    }

    removeById(id: string | number): Promise<UserEntity> {
        return this.userModel.findByIdAndRemove(id);
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

}