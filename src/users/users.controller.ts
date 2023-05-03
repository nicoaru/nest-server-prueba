import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequestDto } from './dto/request/create-user-request.dto';
import { UpdateUserRequestDto } from './dto/request/update-user-request.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserRequestDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    console.log("Entró en GET /users")
    return this.usersService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    console.log("Entró en GET /users/:id")
    return this.usersService.findOne(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserRequestDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
