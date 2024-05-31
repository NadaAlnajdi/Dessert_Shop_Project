import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validate the start date must be before the end date
export function dateRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start > end) {
        return { dateRangeInvalid: true };
      }
    }

    return null;
  };
}

// Validate the start date must start from today not in the past
export function startDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate = new Date(control.value);
    const today = new Date();
    // Reset hours, minutes, seconds, and milliseconds to compare only dates
    today.setHours(0, 0, 0, 0);

    return startDate < today ? { startDateInvalid: true } : null;
  };
}
