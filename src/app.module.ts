import { DynamicModule, Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'dev.env'
    }),
    TasksModule, 
    UsersModule, 
    DatabaseModule],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}


