import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';

import { CreateTaskDto } from '@/domains/tasks/dto/create-task.dto';
import { TaskService } from '@/domains/tasks/task.service';
import { ApiResponse } from '@/shared/interceptors/response.interceptor';
import { TaskResponseDto } from '@/domains/tasks/dto/task-response.dto';
import { ListDto } from '@/shared/dto/list.dto';
import { ChangeTaskStatusDto } from '@/domains/tasks/dto/change-task-status.dto';
import { FindOneParams } from '@/shared/params/find-one.params';
import { CurrentUserId } from '@/shared/decorators/current-user-id.decorator';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(
    @Query() query: ListDto,
    @CurrentUserId() userId: number,
  ): Promise<ApiResponse<TaskResponseDto[]>> {
    const { tasks, total } = await this.taskService.findAll(
      userId,
      query.page,
      query.per_page,
    );

    return {
      success: true,
      message: 'Tasks retrieved successfully',
      data: tasks.map((task) => TaskResponseDto.fromEntity(task)),
      meta: {
        page: query.page,
        per_page: query.per_page,
        total,
        last_page: Math.ceil(total / query.per_page),
      },
    };
  }

  @Get('/:id')
  public async findOne(
    @Param() params: FindOneParams,
    @CurrentUserId() userId: number,
  ): Promise<ApiResponse<TaskResponseDto>> {
    const task = await this.taskService.findOneOrFail(params.id);
    console.log(userId);

    this.taskService.checkTaskOwnership(task, userId);

    return {
      success: true,
      message: 'Task fetched successfully',
      data: TaskResponseDto.fromEntity(task),
    };
  }

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUserId() userId: number,
  ): Promise<ApiResponse<TaskResponseDto>> {
    const task = await this.taskService.create({
      ...createTaskDto,
      user_id: userId,
    });
    return {
      success: true,
      message: 'Task created successfully',
      data: TaskResponseDto.fromEntity(task),
    };
  }

  @Patch(':id/status')
  async changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ChangeTaskStatusDto,
    @CurrentUserId() userId: number,
  ): Promise<ApiResponse<TaskResponseDto>> {
    const task = await this.taskService.changeStatus(id, dto.status, userId);

    return {
      success: true,
      message: 'Task status updated successfully',
      data: TaskResponseDto.fromEntity(task),
    };
  }
}
