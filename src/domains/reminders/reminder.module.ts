import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Reminder } from './entities/reminder.entity';
import { ReminderRepository } from './reminder.repository';
import { ReminderService } from './reminder.service';

import { RemindersController } from '@/api/controllers/reminders.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Reminder])],
  providers: [ReminderService, ReminderRepository],
  exports: [ReminderService],
  controllers: [RemindersController],
})
export class ReminderModule {}
