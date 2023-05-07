import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import mongoose from "mongoose";
import { Injectable } from "@nestjs/common";
import { ITask } from "src/interfaces/task.interface";

export type TaskDocument = HydratedDocument<Task>;

@Injectable()
@Schema()
export class Task implements ITask {

  _id:string|number;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' , required: true})
  userId: string;    

  @Prop({required: true})
  title: string;

  @Prop()
  content: string;

  @Prop({default: false})
  completed: boolean;



}

export const TaskSchema = SchemaFactory.createForClass(Task);