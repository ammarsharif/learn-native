export const ALERT_MESSAGES = {
  EMPTY_TODO: {
    title: 'Empty Todo',
    message: 'Please enter a todo item',
  },
  DELETE_TODO: {
    title: 'Delete Todo',
    message: 'Are you sure you want to delete this todo?',
  },
  CLEAR_COMPLETED: {
    title: 'Clear Completed',
    message: 'Are you sure you want to clear all completed todos?',
  },
} as const;

export const ALERT_BUTTONS = {
  CANCEL: 'Cancel',
  DELETE: 'Delete',
  CLEAR: 'Clear',
} as const;

export const FILTER_OPTIONS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
} as const;

