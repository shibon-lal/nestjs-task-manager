import { IsEnum } from 'class-validator';
import { ReminderPriority } from '../enum/reminder-priority.enum';

export class ChangeReminderPriorityDto {
  @IsEnum(ReminderPriority)
  priority!: ReminderPriority;
}
