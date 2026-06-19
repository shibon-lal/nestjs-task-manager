import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';

import { ReminderRepository } from './reminder.repository';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { Reminder } from './entities/reminder.entity';
import { ReminderStatus } from './enum/reminder-status.enum';
import { ReminderPriority } from './enum/reminder-priority.enum';
import { canTransition } from './workflows/reminder-status.workflow';
import { canTransitionPriority } from './workflows/reminder-priority.workflow';
@Injectable()
export class ReminderService {
  constructor(private readonly taskRepo: ReminderRepository) {}

  public async findAll(userId: number, page: number, perPage: number) {
    const [reminders, total] = await this.taskRepo.findPaginated(
      userId,
      page,
      perPage,
    );

    return {
      reminders,
      total,
    };
  }

  public async findOneOrFail(id: number) {
    const task = await this.taskRepo.findOne(id);

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  public async create(createReminderDto: CreateReminderDto) {
    const reminder = await this.taskRepo.create(createReminderDto);
    return reminder;
  }

  public checkReminderOwnership(reminder: Reminder, userId: number): void {
    if (reminder.user_id !== userId) {
      throw new ForbiddenException('You can only access your own reminder');
    }
  }

  async changeStatus(id: number, status: ReminderStatus, userId: number) {
    const reminder = await this.findOneOrFail(id);
    this.checkReminderOwnership(reminder, userId);

    if (!canTransition(reminder.status, status)) {
      throw new BadRequestException(
        `Cannot change status from ${reminder.status} to ${status}`,
      );
    }

    reminder.status = status;

    await this.taskRepo.update(reminder.id, reminder);
    return reminder;
  }

  async changePriority(id: number, priority: ReminderPriority, userId: number) {
    const reminder = await this.findOneOrFail(id);
    this.checkReminderOwnership(reminder, userId);

    if (!canTransitionPriority(reminder.priority, priority)) {
      throw new BadRequestException(
        `Cannot change priority from ${reminder.priority} to ${priority}`,
      );
    }

    reminder.priority = priority;
    await this.taskRepo.update(reminder.id, reminder);

    return reminder;
  }
}
