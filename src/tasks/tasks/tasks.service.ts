import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './tasks.entity';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  //*   METHODS TO EXPORT CONTROLLER

  //   GET METHOD TO OBTAIN ALL TASKS
  findAll() {
    return {
      ok: true,
      message: 'All tasks',
      data: this.taskModel.find().exec(),
    };
  }

  //   POST METHOD TO CREATE ONE TASK
  async create(
    @Body() body,
  ): Promise<{ ok: boolean; message: string; data: Task }> {
    const taskData = {
      title: body.title,
      description: body.description,
      completed: body.completed,
    };

    if (
      taskData.title.length == 0 ||
      taskData.description.length == 0 ||
      taskData.completed.length == 0
    ) {
      return {
        ok: false,
        message: 'All fields required',
        data: null,
      };
    }

    const task = new this.taskModel(taskData);
    return { ok: true, message: 'Task created', data: task };
  }
}
