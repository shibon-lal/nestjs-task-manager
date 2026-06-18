import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Reminder } from '../../reminders/entities/reminder.entity';

import { TaskStatus } from '../enum/task-status.enum';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({
    length: 255,
  })
  name!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description!: string;

  @Column({
    length: 20,
    default: TaskStatus.PENDING,
  })
  status!: string;
  @Column({ type: 'timestamp', nullable: true })
  disabledAt!: Date | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;

  @OneToMany(() => Reminder, (reminder) => reminder.task)
  reminders?: Reminder[];
}
