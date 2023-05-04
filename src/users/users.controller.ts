import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequestDto } from './dto/request/create-user-request.dto';
import { UpdateUserRequestDto } from './dto/request/update-user-request.dto';
import { ParseIdPipe } from 'src/pipes/parseId.pipe';


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }


  @Post()
  create(@Body() createUserDto: CreateUserRequestDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  findById(@Param('id', ParseIdPipe) id: string) {
    return this.usersService.findById(id);
  }

  @Patch('/:id')
  updateById(@Param('id', ParseIdPipe) id: string, @Body() updateUserDto: UpdateUserRequestDto) {
    return this.usersService.updateById(id, updateUserDto);
  }

  @Delete('/:id')
  removeById(@Param('id', ParseIdPipe) id: string) {
    return this.usersService.removeById(id);

  }
}
