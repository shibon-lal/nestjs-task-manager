import { Task } from '../entities/task.entity';

export class TaskResponseDto {
  id!: number;
  name!: string;
  description!: string;
  status!: string;
  created_at!: Date;
  updated_at!: Date;

  static fromEntity(this: void, task: Task): TaskResponseDto {
    return {
      id: task.id,
      name: task.name,
      description: task.description,
      status: task.status,
      created_at: task.createdAt,
      updated_at: task.updatedAt,
    };
  }
}
