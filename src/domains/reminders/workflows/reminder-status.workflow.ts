import { ReminderStatus } from '../enum/reminder-status.enum';

const ALLOWED_TRANSITIONS: Record<ReminderStatus, ReminderStatus[]> = {
  [ReminderStatus.PENDING]: [ReminderStatus.SENT, ReminderStatus.CANCELLED],

  [ReminderStatus.SENT]: [ReminderStatus.COMPLETED],

  [ReminderStatus.COMPLETED]: [],

  [ReminderStatus.CANCELLED]: [],
};
export function canTransition(
  from: ReminderStatus,
  to: ReminderStatus,
): boolean {
  return ALLOWED_TRANSITIONS[from].includes(to);
}
