import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  constructor(   private navController: NavController,
    private authService: AuthService, private cookieService: CookieService
  ) { }
submit() {
  if (this.form.valid) {
    const credentials = {
      email: this.form.value.email ?? '', // Si correo es null o undefined, se asigna ''
      password: this.form.value.password ?? '', // Si clave es null o undefined, se asigna ''
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
}
  email: any;
  password: any;
  selectedSegment: string = 'login';
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  login() {
    throw new Error('Method not implemented.');
  }
  get fControls() {
    return this.form.controls;
  }


  goToNotificationsPage() {
    this.navController.navigateForward('admin/inicio');
  }
}
