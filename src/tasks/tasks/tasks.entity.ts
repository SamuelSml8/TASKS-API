import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Task extends Document {
  @Prop()
  title: string;
  @Prop()
  decription: string;
  @Prop()
  completed: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
