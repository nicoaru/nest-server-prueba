import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/request/create-user-request.dto';
import { UpdateUserRequestDto } from './dto/request/update-user-request.dto';
import { UserRepository } from 'src/database/mongoDB/repositories/user.repository';


@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository:UserRepository) {}


  async create(createUserDto: CreateUserRequestDto) {
    try {
      const createdUser = await this.userRepository.create(createUserDto);
      return createdUser;
    }
    catch(error) {
      console.log("HUBO UN ERROR")
    }

  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: string|number) {
    return this.userRepository.findById(id);
  }

  update(id: string|number, updateUserDto: UpdateUserRequestDto) {
    return this.userRepository.updateById(id, updateUserDto);
  }

  remove(id: string|number) {
    try {
      const deletedUser = this.userRepository.removeById(id);
      return deletedUser
    }
    catch(error) {
      console.log("HUBO UN ERROR");
      console.log(error)
    }
  }
}
