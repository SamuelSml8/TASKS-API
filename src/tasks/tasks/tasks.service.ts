import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './tasks.entity';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  //*   METHODS TO EXPORT CONTROLLER

  //   GET METHOD TO OBTAIN ALL TASKS
  findAll() {
    return this.taskModel.find().exec();
  }
}
