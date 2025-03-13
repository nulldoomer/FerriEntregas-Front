import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { interval, Subscription, take } from 'rxjs';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.page.html',
  styleUrls: ['./confirm-email.page.scss'],
  standalone: false,
})
export class ConfirmEmailPage implements OnInit {
  constructor(private emailService: EmailService, private navController: NavController) { }


submitCode() {
this.veryEmail();
}
submit() {
    if (this.formEmail.valid) {
      this.email = this.formEmail.value.email ?? '';
      console.log('Email:', this.email);
      this.startCountdown();
    }
  
}
sendEmail() {
  if (this.email) {
    console.log('Enviando correo electrónico a:', this.email);
    this.emailService.sendEmail(this.email).subscribe(
      (response) => {
        console.log('Correo electrónico enviado:', response);
      },
      (error) => {
        console.error('Error al enviar el correo electrónico:', error);
      }
    );
  }
}
veryEmail() {
  if (this.formCode.valid) {
    this.token = this.formCode.value.code ?? '';
    console.log('Token:', this.token);
    this.emailService.veryEmail(this.token).subscribe(
      (response) => {
        console.log('Correo electrónico verificado:', response);
        this.navController.navigateForward('public/home');
      },
      (error) => {
        console.error('Error al verificar el correo electrónico:', error);
      }
    );
  }
}

  token: string = '';
  email: string = '';
  isDisabled: boolean = false;  
  countdown: number = 0; 
  private countdownSubscription!: Subscription; 

  ngOnInit() {
  }
  get fControlsEmail() {
    return this.formEmail.controls;
  }
  get fControlsCode() {
    return this.formCode.controls;
  }
  startCountdown() {
    if (this.countdown > 0) return; 
    
    this.isDisabled = true;
    this.countdown = 60; 
    this.sendEmail();
    this.countdownSubscription = interval(1000)
      .pipe(take(60)) 
      .subscribe({
        next: () => this.countdown--,
        complete: () => {
          this.isDisabled = false;
        }
      });
  }
    formEmail = new FormGroup({
      email: new FormControl('', [Validators.required , Validators.email], ),
    });
    formCode = new FormGroup({
      code: new FormControl('', [Validators.required]),
    });
}
