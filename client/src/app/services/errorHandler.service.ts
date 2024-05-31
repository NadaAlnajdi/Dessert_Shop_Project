import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export const handleError = (error: HttpErrorResponse) => {
  let errorMessage;
  if (error.error instanceof ErrorEvent) {
    errorMessage = `Error: ${error.error.message}`;
  } else {
    if (error.status === 422 && error.error.message) {
      errorMessage = error.error.message;
    }
  }
  return throwError(errorMessage);
};
