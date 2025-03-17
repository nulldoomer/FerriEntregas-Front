import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PaymentService } from 'src/app/services/payment.service';
import { Payment } from 'src/interfaces/payment.interface';

@Component({
  selector: 'app-patment-type',
  templateUrl: './patment-type.page.html',
  styleUrls: ['./patment-type.page.scss'],
  standalone: false,
})
export class PatmentTypePage implements OnInit {
  payments: [Payment] | undefined;

  constructor(private paymentService: PaymentService,private  nav: NavController) { }
  ngOnInit() {
    this.paymentList();

  }
  ionViewWillEnter() {
    this.paymentList(); 
  }
  paymentList(){
    this.paymentService.getPayments().subscribe((res: any) => {
      console.log(res);
      this.payments = res.result;
      console.log(this.payments);
    });

  }
  editar(id: string){
    this.nav.navigateForward(`admin/payment-type-form/${id}`);
  }
  nuevo(){
    this.nav.navigateForward('admin/payment-type-form');
  }

}
