import { Body, Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './tasks.entity';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  //*   METHODS TO EXPORT CONTROLLER

  //   GET METHOD TO OBTAIN ALL TASKS
  async findAll() {
    const tasks = await this.taskModel.find().exec();
    return {
      ok: true,
      message: 'All tasks',
      data: tasks,
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
    const taskSaved = await task.save();
    return { ok: true, message: 'Task created', data: taskSaved };
  }

  async update(
    @Param('id') id: number,
    @Body() body,
  ): Promise<{ ok: boolean; message: string; data: Task }> {
    const taskFound = await this.taskModel.findById(id);

    if (!taskFound) {
      return {
        ok: false,
        message: 'Task not found',
        data: null,
      };
    }

    const newTask = {
      title: body.title,
      description: body.description,
      completed: body.completed,
    };

    if (
      newTask.title.length == 0 ||
      newTask.description.length == 0 ||
      newTask.completed.length == 0
    ) {
      return {
        ok: false,
        message: 'All fields required',
        data: null,
      };
    }

    const taskUpdate = await taskFound.updateOne(newTask);
    return {
      ok: true,
      message: 'Task updated succesfully',
      data: taskUpdate,
    };
  }
}
