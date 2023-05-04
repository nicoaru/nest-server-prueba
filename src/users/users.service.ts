import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/request/create-user-request.dto';
import { UpdateUserRequestDto } from './dto/request/update-user-request.dto';
import { DatabaseService } from 'src/database/database.service';
import { UserEntity } from 'src/database/entities/user.entity';
import { IRepositoryUser } from 'src/interfaces/repositoryUser.interface';


@Injectable()
export class UsersService {
  userRepository:IRepositoryUser<UserEntity>;
  
  constructor(private readonly databaseService:DatabaseService) {
    this.userRepository = this.databaseService.getUserRepository();
  }


  //** METODOS **//
  //** METODOS **//
  async create(createUserDto: CreateUserRequestDto) {
    //chequea si ya existe un usuario con ese username o email
    if(await this.userRepository.existsByUsername(createUserDto.username) || await this.userRepository.existsByEmail(createUserDto.email)) throw new ConflictException("Username not available or Email already registered");
    
    return await this.userRepository.create(createUserDto);
  }
  
  async findAll() {
    return await this.userRepository.findAll();
  }
  
  async findById(id: string|number) {
    const user = await this.userRepository.findById(id);
    if(!user) throw new NotFoundException("Not Found");
    return user
  }

  async updateById(id: string|number, updateUserDto: UpdateUserRequestDto) {
    //busca el user a actualizar y si no existe tira error 404
    const userToUpdate = await this.userRepository.findById(id);
    if(!userToUpdate) throw new NotFoundException("Not Found");

    //chequea si hay conflicto con los nuevos valores de username y password
    if(updateUserDto.email !== userToUpdate.email) {
      if(await this.userRepository.existsByEmail(updateUserDto.email)) 
        throw new ConflictException("Email already registered");      
    }
    if(updateUserDto.username !== userToUpdate.username) {
      if(await this.userRepository.existsByUsername(updateUserDto.username)) 
        throw new ConflictException("Username not available");      
    }

    return await this.userRepository.updateById(id, updateUserDto);
  }

  async removeById(id: string|number) {
    const deletedUser = await this.userRepository.removeById(id);
    if(!deletedUser) throw new NotFoundException("Not Found");
    return deletedUser
  }
}