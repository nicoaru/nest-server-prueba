import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { DatabaseModule } from 'src/database/database.module';
import { Mapper } from 'src/mappers/mapper';

@Module({
  controllers: [TasksController],
  providers: [TasksService, Mapper],
  imports: [DatabaseModule.register("MongoDB") //** Ver de sacar el dato de ConfigService
  ]
})
export class TasksModule {}
