import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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

  @Put('update/:id')
  updateTask(@Param('id') id: number, @Body() body) {
    return this.taskService.update(id, body);
  }

  @Delete('delete/:id')
  deleteTask(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
  }
}
