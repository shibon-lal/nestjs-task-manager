import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsEnum,
  IsInt,
  Min,
  IsBoolean,
} from 'class-validator';

import { ReminderPriority } from '../enum/reminder-priority.enum';
import { ReminderStatus } from '../enum/reminder-status.enum';

export class CreateReminderDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  user_id!: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  remindAt!: Date;

  @IsOptional()
  @IsEnum(ReminderStatus)
  status!: ReminderStatus;

  @IsOptional()
  @IsEnum(ReminderPriority)
  priority!: ReminderPriority;

  @IsBoolean()
  isRecurring!: boolean;

  @IsOptional()
  @IsInt()
  @Min(1)
  taskId?: number;
}
