import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { ReminderStatus } from '../enum/reminder-status.enum';
import { ReminderPriority } from '../enum/reminder-priority.enum';
import { User } from '../../users/entities/user.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity('reminders')
export class Reminder {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column()
  remindAt!: Date;

  @Column({
    type: 'varchar',
    default: ReminderStatus.PENDING,
  })
  status!: ReminderStatus;

  @Column({
    type: 'varchar',
    default: ReminderPriority.MEDIUM,
  })
  priority!: ReminderPriority;

  @Column({ default: false })
  isRecurring!: boolean;

  @Column({ nullable: true })
  recurrenceRule?: string;

  @Column()
  user_id!: number;
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Task, (task) => task.reminders, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'task_id' })
  task?: Task;

  @Column({ name: 'task_id', nullable: true })
  taskId?: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
