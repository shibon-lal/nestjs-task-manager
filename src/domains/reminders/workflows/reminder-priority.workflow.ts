import { ReminderPriority } from '../enum/reminder-priority.enum';

const ALLOWED_TRANSITIONS: Record<ReminderPriority, ReminderPriority[]> = {
  [ReminderPriority.LOW]: [ReminderPriority.MEDIUM, ReminderPriority.HIGH],

  [ReminderPriority.MEDIUM]: [ReminderPriority.LOW, ReminderPriority.HIGH],

  [ReminderPriority.HIGH]: [ReminderPriority.LOW, ReminderPriority.MEDIUM],
};

export function canTransitionPriority(
  from: ReminderPriority,
  to: ReminderPriority,
): boolean {
  return ALLOWED_TRANSITIONS[from].includes(to);
}
