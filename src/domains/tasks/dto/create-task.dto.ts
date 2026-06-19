import { IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';
import { TaskStatus } from '../enum/task-status.enum';
export class CreateTaskDto {
  @IsNotEmpty()
  name!: string;

  user_id!: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status!: TaskStatus;
}
