import { AbstractControl } from '@angular/forms';

export function passwordValidator( control: AbstractControl) {
    if (control && ( control.value !== null || control.value !== undefined)) {
        const cnfpassValue = control.value;
        const passControl = control.root.get('password1');
        if (passControl) {
            const passValue = passControl.value;
            if (passValue !== cnfpassValue) {
                return { passCheck: true };
            }
        }
    }
    return null;
}
export function phoneNumberValidator( control: AbstractControl) {
    if (control && ( control.value !== null || control.value !== undefined)) {
        const regex = new RegExp('^[0-9]{10}$');
        const phoneNumberControl = control.root.get('phone');
        if (phoneNumberControl) {
            if (!regex.test(control.value)) {
                return { phoneNumberError: true };
            }
        }
    }
    return null;
}
export function firstNameValidator( control: AbstractControl) {
    if (control && ( control.value !== null || control.value !== undefined)) {
        const regex1 = new RegExp('^[A-Z][a-z]{1,15}$');
        const regex2 = new RegExp('^[А-Я][а-я]{1,15}$');
        const firstNameControl = control.root.get('firstName');
        if (firstNameControl) {
            if (!regex1.test(control.value || !regex2.test(control.value))) {
                return { nameError: true };
            }
        }
    }
    return null;
}
export function lastNameValidator( control: AbstractControl) {
    if (control && ( control.value !== null || control.value !== undefined)) {
        const regex1 = new RegExp('^[A-Z][a-z]{1,15}$');
        const regex2 = new RegExp('^[А-Я][а-я]{1,15}$');
        const lastNameControl = control.root.get('lastName');
        if (lastNameControl) {
            if (!regex1.test(control.value || !regex2.test(control.value))) {
                return { nameError: true };
            }
        }
    }
    return null;
}
export function emailValidator( control: AbstractControl) {
    if (control && ( control.value !== null || control.value !== undefined)) {
        const regex1 = new RegExp('^[^\s@]+@[^\s@]+\.[^\s@]+$');
        const emailControl = control.root.get('email');
        if (emailControl) {
            if (!regex1.test(control.value)) {
                return { emailError: true };
            }
        }
    }
    return null;
}
export function cityValidator( control: AbstractControl) {
    if (control && ( control.value !== null || control.value !== undefined)) {
        const regex = new RegExp('^[A-Z][a-z]{1,15}$');
        const cityControl = control.root.get('city');
        if (cityControl) {
            if (!regex.test(control.value)) {
                return { cityError: true };
            }
        }
    }
    return null;
}
export function codeValidator( control: AbstractControl) {
    if (control && ( control.value !== null || control.value !== undefined)) {
        const regex = new RegExp('^[0-9]{5}$');
        const codeControl = control.root.get('code');
        if (codeControl) {
            if (!regex.test(control.value)) {
                return { codeError: true };
            }
        }
    }
    return null;
}
