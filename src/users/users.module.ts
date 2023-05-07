import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { Mapper } from 'src/mappers/mapper';

@Module({
  controllers: [UsersController],
  providers: [UsersService, Mapper],
  imports: [DatabaseModule.register("MongoDB") //** Ver de sacar el dato de ConfigService
  ]
})
export class UsersModule {}
