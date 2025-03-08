import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';

export function hasSpecialCharacter(control: AbstractControl): ValidationErrors | null {
  const regExp = /[@$!%*?&.,#-/]/; // Expresión regular para caracteres especiales

  // Verifica si el valor cumple con la expresión regular
  const hasSpecialChar = regExp.test(control.value);

  // Devuelve un error si no tiene un carácter especial
  return hasSpecialChar ? null : { 'noSpecialChar': true };
}
// Validador para al menos un número
export function hasNumber(control: AbstractControl): ValidationErrors | null {
  const regExp = /\d/; // Expresión regular para números
  const hasNumber = regExp.test(control.value);
  return hasNumber ? null : { 'noNumber': true };
}

// Validador para al menos una mayúscula
export function hasUpperCase(control: AbstractControl): ValidationErrors | null {
  const regExp = /[A-Z]/; // Expresión regular para mayúsculas
  const hasUpperCase = regExp.test(control.value);
  return hasUpperCase ? null : { 'noUpperCase': true };
}

// Validador para al menos una minúscula
export function hasLowerCase(control: AbstractControl): ValidationErrors | null {
  const regExp = /[a-z]/; // Expresión regular para minúsculas
  const hasLowerCase = regExp.test(control.value);
  return hasLowerCase ? null : { 'noLowerCase': true };
}

// Validador para cédula ecuatoriana
export function validateEcuadorianID(control: AbstractControl): ValidationErrors | null {
  const value = control.value?.toString();

  // Verificar que el valor tenga exactamente 10 dígitos
  if (!/^\d{10}$/.test(value)) {
    return { 'invalidID': true };
  }

  // Validación específica para cédulas ecuatorianas
  const provinceCode = parseInt(value.substring(0, 2), 10);
  if (provinceCode < 1 || provinceCode > 24) {
    return { 'invalidID': true };
  }

  const checkDigit = parseInt(value.charAt(9), 10);
  const sum = value
    .split('')
    .slice(0, 9)
    .map((numStr: string, index: number) => {
      const num = parseInt(numStr, 10);
      return num * ((index % 2 === 0) ? 2 : 1);
    })
    .reduce((acc: number, num: number) => acc + (num > 9 ? num - 9 : num), 0);

  const modulo = (10 - (sum % 10)) % 10;

  if (checkDigit !== modulo) {
    return { 'invalidID': true };
  }

  return null;
}
// Validador para solo números
export function validateNumeric(control: AbstractControl): ValidationErrors | null {
  const value = control.value?.toString();
  // Verificar que el valor sea un número y no tenga caracteres no numéricos
  if (value && /^\d+$/.test(value)) {
    return null; // Es un número válido
  }
  return { 'invalidNumeric': true }; // No es un número válido
}

// Validador asíncrono para verificar la existencia del nombre de usuario
// export function usernameExistsValidator(usuarioService: UsuarioService): AsyncValidatorFn {
//     return (control: AbstractControl): Observable<ValidationErrors | null> => {
//       if (!control.value) {
//         return of(null);
//       }
//       return usuarioService.checkUsernameExists(control.value).pipe(
//         map(exists => exists ? { 'usernameExists': true } : null),
//         catchError(() => of(null)) // Manejar errores de red u otros errores
//       );
//     };
//   }

//   // Validador asíncrono para verificar la existencia del correo electrónico
//   export function emailExistsValidator(usuarioService: UsuarioService): AsyncValidatorFn {
//     return (control: AbstractControl): Observable<ValidationErrors | null> => {
//       if (!control.value) {
//         return of(null);
//       }
//       return usuarioService.checkEmailExists(control.value).pipe(
//         map(exists => exists ? { 'emailExists': true } : null),
//         catchError(() => of(null)) // Manejar errores de red u otros errores
//       );
//     };
//   }



// Validador para RUC ecuatoriano
export function validateEcuadorianRUC(control: AbstractControl): ValidationErrors | null {
  const value = control.value?.toString();

  // Verificar que el valor tenga exactamente 13 dígitos
  if (!/^\d{13}$/.test(value)) {
    return { 'invalidRUC': true };
  }

  // Validar que los primeros 10 dígitos sean una cédula válida
  const idPart = value.substring(0, 10);
  const idValidation = validateEcuadorianID({ value: idPart } as AbstractControl);

  if (idValidation) {
    return { 'invalidRUC': true };
  }

  // Verificar los últimos 3 dígitos (generalmente indican un establecimiento)
  const establishmentCode = parseInt(value.substring(10, 13), 10);
  if (establishmentCode < 1) {
    return { 'invalidRUC': true };
  }

  return null;
}

// Validador para pasaporte
export function validatePassport(control: AbstractControl): ValidationErrors | null {
  const value = control.value?.toString();

  // Verificar que tenga entre 6 y 10 caracteres alfanuméricos
  if (!/^[a-zA-Z0-9]{6,10}$/.test(value)) {
    return { 'invalidPassport': true };
  }

  return null;
}
