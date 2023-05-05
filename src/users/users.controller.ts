import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, DefaultValuePipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequestDto } from './dto/request/create-user-request.dto';
import { UpdateUserRequestDto } from './dto/request/update-user-request.dto';
import { ParseIdPipe } from 'src/pipes/parseId.pipe';
import { IPaginationOptions } from 'src/interfaces/paginationOptions.interface';


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }


  @Post()
  create(@Body() createUserDto: CreateUserRequestDto) {
    console.log("entró en POST 'users'")
    return this.usersService.create(createUserDto);
  }

  @Get()
  find(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page:number,
    @Query('limit', new DefaultValuePipe(0), ParseIntPipe) limit:number,
    @Query('sort') sort:string) {
      console.log("entró en GET 'users'")
      
      const paginationOptions:IPaginationOptions = {page, limit}
      if(page>0 && limit>0) return this.usersService.findPaginated(paginationOptions, sort)
      else return this.usersService.findAll(sort);
  }

  @Get('/:id')
  findById(@Param('id', ParseIdPipe) id: string|number) {
    console.log("entró en GET 'users/:id'")
    return this.usersService.findById(id);
  }

  @Get('/:id/tasks')
  findTasksByUserId(
    @Param('id', ParseIdPipe) id: string|number,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page:number,
    @Query('limit', new DefaultValuePipe(0), ParseIntPipe) limit:number,
    @Query('sort') sort:string) {
      console.log("entró en GET 'users/:id/tasks'")
      
      const paginationOptions:IPaginationOptions = {page, limit}
      console.log("pagination options: ", paginationOptions)

      if(page>0 && limit>0) return this.usersService.findTasksByUserIdPaginated(id, paginationOptions, sort)
      else return this.usersService.findTasksByUserId(id, sort);

  }

  @Patch('/:id')
  updateById(@Param('id', ParseIdPipe) id: string|number, @Body() updateUserDto: UpdateUserRequestDto) {
    console.log("entró en PATCH 'users/:id'")
    return this.usersService.updateById(id, updateUserDto);
  }

  @Delete('/:id')
  removeById(@Param('id', ParseIdPipe) id: string|number) {
    console.log("entró en DELETE 'users/:id'")
    return this.usersService.removeById(id);

  }
}
