import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ConfigModule } from '@nestjs/config';
import { MongoDBModule } from './mongoDB/mongoDB.module';


@Module({
    imports: [
        ConfigModule,
        MongoDBModule, 
    ],
    providers: [DatabaseService, ConfigModule],
    exports: [DatabaseService, MongoDBModule]
})
export class DatabaseModule  {
    
}
