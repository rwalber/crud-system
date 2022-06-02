import { ValidationErrors } from '@angular/forms';
import { Validator, AbstractControl } from '@angular/forms';

export class AgeValidator implements Validator {

    static validate(c: AbstractControl): ValidationErrors | null {
        const today = new Date();
        const age = today.getFullYear() - new Date(c.value).getFullYear();
        if(!c.value) {
            return null;
        }
        if (age < 18 || age > 60) {
            return { 'age': true };
        }
        return null;
    }

    validate(c: AbstractControl): ValidationErrors | null {
        return AgeValidator.validate(c);
    }
}