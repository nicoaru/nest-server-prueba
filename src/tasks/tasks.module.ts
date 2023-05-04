import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [DatabaseModule.register("MongoDB") //** Ver de sacar el dato de ConfigService
  ]
})
export class TasksModule {}
