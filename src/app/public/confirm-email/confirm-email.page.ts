import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { interval, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.page.html',
  styleUrls: ['./confirm-email.page.scss'],
  standalone: false,
})
export class ConfirmEmailPage implements OnInit {
submitCode() {
throw new Error('Method not implemented.');
}
submit() {
    if (this.formEmail.valid) {
      this.email = this.formEmail.value.email ?? '';
      console.log('Email:', this.email);
      this.startCountdown();
    }
  
}

  constructor() { }
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
