import { Reminder } from '../entities/reminder.entity';
import { ReminderStatus } from '../enum/reminder-status.enum';
import { ReminderPriority } from '../enum/reminder-priority.enum';

class UserResponseDto {
  id!: number;
  name!: string;
}

class TaskResponseDto {
  id!: number;
  name!: string;
}

export class ReminderResponseDto {
  id!: number;
  title!: string;
  description?: string;
  remind_at?: Date;
  status!: ReminderStatus;
  priority!: ReminderPriority;
  is_recurring!: boolean;

  user?: UserResponseDto;
  task?: TaskResponseDto;

  created_at!: Date;
  updated_at!: Date;

  static fromEntity(reminder: Reminder): ReminderResponseDto {
    return {
      id: reminder.id,
      title: reminder.title,
      description: reminder.description,
      remind_at: reminder.remindAt,
      status: reminder.status,
      priority: reminder.priority,
      is_recurring: reminder.isRecurring,

      user: reminder.user
        ? {
            id: reminder.user.id,
            name: reminder.user.name,
          }
        : undefined,

      task: reminder.task
        ? {
            id: reminder.task.id,
            name: reminder.task.name,
          }
        : undefined,

      created_at: reminder.createdAt,
      updated_at: reminder.updatedAt,
    };
  }
}
