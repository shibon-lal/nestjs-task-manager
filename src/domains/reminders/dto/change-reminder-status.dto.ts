import { IsEnum } from 'class-validator';
import { ReminderStatus } from '../enum/reminder-status.enum';

export class ChangeReminderStatusDto {
  @IsEnum(ReminderStatus)
  status!: ReminderStatus;
}
