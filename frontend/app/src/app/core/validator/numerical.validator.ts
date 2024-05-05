import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function numericalValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return null;
    }
    const isNumeric = /^-?\d+(\.\d+)?$/.test(value);
    return isNumeric ? null : { onlyNumbers: { value: control.value } };
  };
}
