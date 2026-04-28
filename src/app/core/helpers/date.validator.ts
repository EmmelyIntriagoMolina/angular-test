import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class DateValidator {
    static releaseDate(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) return null;

            const today = new Date();
            const input = new Date(control.value);

            today.setHours(0, 0, 0, 0);
            input.setHours(0, 0, 0, 0);

            return input < today ? { releaseDate: true } : null;
        };
    }

    static revisionDate(group: AbstractControl): ValidationErrors | null {
        const realse = group.get('date_release')?.value;
        const revision = group.get('date_revision')?.value;

        if (!realse || !revision) return null;

        const releasseDate = new Date(realse);
        const expected = new Date(releasseDate);
        expected.setFullYear(expected.getFullYear() + 1);

        const reviewDate = new Date(revision);
        return reviewDate.getTime() !== expected.getTime() ? { revisionDate: true } : null;
    }
}