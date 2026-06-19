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

import { CreateReminderDto } from '@/domains/reminders/dto/create-reminder.dto';
import { ReminderService } from '@/domains/reminders/reminder.service';
import { ApiResponse } from '@/shared/interceptors/response.interceptor';
import { ReminderResponseDto } from '@/domains/reminders/dto/reminder-response.dto';
import { ListDto } from '@/shared/dto/list.dto';
import { ChangeReminderStatusDto } from '@/domains/reminders/dto/change-reminder-status.dto';
import { ChangeReminderPriorityDto } from '@/domains/reminders/dto/change-reminder-priority.dto';
import { FindOneParams } from '@/shared/params/find-one.params';
import { CurrentUserId } from '@/shared/decorators/current-user-id.decorator';

@Controller('reminders')
export class RemindersController {
  constructor(private readonly reminderService: ReminderService) {}

  @Get()
  async findAll(
    @Query() query: ListDto,
    @CurrentUserId() userId: number,
  ): Promise<ApiResponse<ReminderResponseDto[]>> {
    const { reminders, total } = await this.reminderService.findAll(
      userId,
      query.page,
      query.per_page,
    );

    return {
      success: true,
      message: 'Reminders retrieved successfully',
      data: reminders.map((reminder) =>
        ReminderResponseDto.fromEntity(reminder),
      ),
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
  ): Promise<ApiResponse<ReminderResponseDto>> {
    const reminder = await this.reminderService.findOneOrFail(params.id);

    this.reminderService.checkReminderOwnership(reminder, userId);

    return {
      success: true,
      message: 'Reminder fetched successfully',
      data: ReminderResponseDto.fromEntity(reminder),
    };
  }

  @Post()
  async create(
    @Body() createReminderDto: CreateReminderDto,
    @CurrentUserId() userId: number,
  ): Promise<ApiResponse<ReminderResponseDto>> {
    const reminder = await this.reminderService.create({
      ...createReminderDto,
      user_id: userId,
    });
    return {
      success: true,
      message: 'Reminder created successfully',
      data: ReminderResponseDto.fromEntity(reminder),
    };
  }

  @Patch(':id/status')
  async changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ChangeReminderStatusDto,
    @CurrentUserId() userId: number,
  ): Promise<ApiResponse<ReminderResponseDto>> {
    const reminder = await this.reminderService.changeStatus(
      id,
      dto.status,
      userId,
    );

    return {
      success: true,
      message: 'Reminder status updated successfully',
      data: ReminderResponseDto.fromEntity(reminder),
    };
  }

  @Patch(':id/priority')
  async changePriority(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ChangeReminderPriorityDto,
    @CurrentUserId() userId: number,
  ): Promise<ApiResponse<ReminderResponseDto>> {
    const reminder = await this.reminderService.changePriority(
      id,
      dto.priority,
      userId,
    );

    return {
      success: true,
      message: 'Reminder priority updated successfully',
      data: ReminderResponseDto.fromEntity(reminder),
    };
  }
}
