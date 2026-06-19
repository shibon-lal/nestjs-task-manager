import { IsEnum } from 'class-validator';
import { TaskStatus } from '../enum/task-status.enum';

export class ChangeTaskStatusDto {
  @IsEnum(TaskStatus)
  status!: TaskStatus;
}
