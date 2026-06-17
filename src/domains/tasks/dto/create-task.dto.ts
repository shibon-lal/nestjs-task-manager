import { IsNotEmpty, IsOptional, IsString, IsIn } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  name!: string;

  user_id!: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(['pending', 'in_progress', 'completed'])
  status!: string;
}
