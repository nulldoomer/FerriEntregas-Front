import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { hasSpecialCharacter, hasNumber, hasUpperCase, hasLowerCase } from '../validators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  email: any;
  password: any;
  selectedSegment: string = 'login';

  constructor(
    private navController: NavController,
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  registerForm = new FormGroup(
    {
      firstNames: new FormControl('', [Validators.required]),
      lastNames: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        hasSpecialCharacter,
        hasNumber,
        hasUpperCase,
        hasLowerCase,
      ]),
      passwordConfirmar: new FormControl('', [
        Validators.required,
        this.confirmarClave.bind(this), // Aseguramos el contexto aquí
      ]),
    },
    this.confirmarClave.bind(this)
  );

  get fControls() {
    return this.loginForm.controls;
  }

  get fControlsRegister() {
    return this.registerForm.controls;
  }

  // Método para manejar el submit
  submit() {
    if (this.selectedSegment === 'login' && this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.value.email ?? '',
        password: this.loginForm.value.password ?? '',
      };

      this.authService.login(credentials).subscribe(
        (res) => {
          console.log('Login successful:', res);
          this.cookieService.set('token', res.token);
          this.navController.navigateForward('admin/inicio');
        },
        (error) => {
          console.error('Error during login:', error);
        }
      );
    }

    if (this.selectedSegment === 'register' && this.registerForm.valid) {
      const credentials = {
        email: this.registerForm.value.email ?? '',
        password: this.registerForm.value.password ?? '',
        firstNames: this.registerForm.value.firstNames ?? '',
        lastNames: this.registerForm.value.lastNames ?? '',
      };

      this.authService.register(credentials).subscribe(
        (res) => {
          console.log('Registration successful:', res);
          this.cookieService.set('token', res.token);
          this.navController.navigateForward('admin/inicio');
        },
        (error) => {
          console.error('Error during registration:', error);
        }
      );
    }
  }

  // Método de validación personalizada para confirmar la contraseña
  confirmarClave(control: AbstractControl): { [key: string]: boolean } | null {
    if (!this.registerForm) {
      return null; // Si el formulario aún no está definido, no realizamos ninguna validación
    }

    if (this.registerForm.get('password')?.value !== control.value) {
      return { passwordMismatch: true }; // Error si las contraseñas no coinciden
    }

    return null;
  }

  goToNotificationsPage() {
    this.navController.navigateForward('admin/inicio');
  }
}
