import { ValidationErrors } from '@angular/forms';
import { Validator, AbstractControl } from '@angular/forms';

export class HasLastName implements Validator {

    static validate(c: AbstractControl): ValidationErrors | null {
        if(!c.value) {
            return null;
        }
        if (!/^(?:[\u00c0-\u01ffa-zA-Z'-]){2,}(?:\s[\u00c0-\u01ffa-zA-Z'-]{2,})+$/.test(c.value)) {
            return { 'hasLastName': true };
        }
        return null;
    }

    validate(c: AbstractControl): ValidationErrors | null {
        return HasLastName.validate(c);
    }
}