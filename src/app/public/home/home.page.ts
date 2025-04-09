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
      passwordConfirmar: new FormControl('', [Validators.required,this.confirmarClave,]),
    },
  );

  get fControls() {
    return this.loginForm.controls;
  }

  get fControlsRegister() {
    return this.registerForm.controls;
  }
  ionViewWillEnter() {
    console.log('HomePage is about to be displayed. Clearing localStorage...');
    localStorage.clear();
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
          this.navController.navigateForward('admin/inicio');
        },
        (error) => {
          console.error('Error during login:', error);
        }
      );
    }

    if (this.selectedSegment === 'registro' && this.registerForm.valid) {
      const credentials = {
        email: this.registerForm.value.email ?? '',
        password: this.registerForm.value.password ?? '',
        firstNames: this.registerForm.value.firstNames ?? '',
        lastNames: this.registerForm.value.lastNames ?? '',
      };

      this.authService.register(credentials).subscribe(
        (res) => {
          console.log('Registration successful:', res);
          this.navController.navigateForward('public/confirm-email');
        },
        (error) => {
          console.error('Error during registration:', error);
        }
      );
    }
  }

  confirmarClave(control: FormControl): {[s: string]: boolean} {
    const formGroup = control.parent;
    if (formGroup) {
      const claveControl = formGroup.get('password');
      const claveConfirmarControl = formGroup.get('passwordConfirmar');
      if (claveControl && claveConfirmarControl) {
        if (claveControl.value === claveConfirmarControl.value) {
          return {}; // La validación es exitosa
        }
      }
    }
    return { 'noCoincide': true }; // La validación falla
  }

  goToNotificationsPage() {
    this.navController.navigateForward('admin/inicio');
  }
}
