import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import mongoose from "mongoose";
import { User } from "./user.schema.mongo";
import { Injectable } from "@nestjs/common";

export type TaskDocument = HydratedDocument<Task>;

@Injectable()
@Schema()
export class Task {
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;    

  @Prop({required: true})
  title: string;

  @Prop()
  content: string;

  @Prop({default: false})
  completed: boolean;

}

export const TaskSchema = SchemaFactory.createForClass(Task);