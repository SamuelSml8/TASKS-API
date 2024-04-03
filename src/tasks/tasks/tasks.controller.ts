import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.taskService.findAll();
  }

  @Post('create')
  createTask(@Body() body) {
    return this.taskService.create(body);
  }

  @Put('update')
  updateTask(@Body() Body) {
    return this.taskService.create(Body);
  }
}
