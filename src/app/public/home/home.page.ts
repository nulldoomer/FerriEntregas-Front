import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  constructor
    (private navController: NavController,
      private authService: AuthService,
      private cookieService: CookieService
    ) { }

  submit() {

    if (this.loginForm.valid) {

      const credentials = {
        email: this.loginForm.value.email ?? '', // Si correo es null o undefined, se asigna ''
        password: this.loginForm.value.password ?? '', // Si clave es null o undefined, se asigna ''
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

    if (this.registerForm.valid) {

      const credentials = {
        email: this.registerForm.value.email ?? '',
        password: this.registerForm.value.password ?? '',
        firstNames: this.registerForm.value.firstNames ?? '',
        lastNames: this.registerForm.value.lastNames ?? '',
      }
    }

  }

  email: any;
  password: any;
  selectedSegment: string = 'login';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });


  registerForm = new FormGroup({
    firstNames: new FormControl('', [Validators.required]),
    lastNames: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      hasSpecialCharacter,
      hasNumber,
      hasUpperCase,
      hasLowerCase
    ]),
    passwordConfirmar: new FormControl('', [Validators.required, this.confirmarClave]),
  });

  login() {
    throw new Error('Method not implemented.');
  }

  get fControls() {
    return this.loginForm.controls;
  }

  get fControlsRegister() {
    return this.registerForm.controls;
  }


  goToNotificationsPage() {
    this.navController.navigateForward('admin/inicio');
  }
}
