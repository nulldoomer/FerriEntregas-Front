import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PaymentService } from 'src/app/services/payment.service';
import { Payment } from 'src/interfaces/payment.interface';

@Component({
  selector: 'app-patment-type-form',
  templateUrl: './patment-type-form.page.html',
  styleUrls: ['./patment-type-form.page.scss'],
  standalone: false,
})
export class PatmentTypeFormPage implements OnInit {

  id: string | null = null; 
  titulo = 'Nuevo Tipo de Pago';
  payment: Payment = {
    name: '',}


  constructor(private route: ActivatedRoute, private paymentService: PaymentService, private  nav: NavController) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.titulo = 'Editar Tipo de Pago';
      this.getPayment();
    }
  }
  getPayment(){
    if(this.id){
      this.paymentService.getPayment(this.id).subscribe((res: any) => {
        this.payment = res.result;
      });
    }
  }
  save() {
    console.log(this.payment);
    if (this.id) {
      this.paymentService.updatePayment(this.payment).subscribe((res: any) => {
        console.log(res);
        this.nav.navigateBack('admin/payment-type');
      });
    } else {
      this.paymentService.createPaymentIntent(this.payment).subscribe((res: any) => {
        console.log(res);
        this.nav.navigateBack('admin/payment-type');
      });
    }
  }
  delete() {
    if (this.id) {
      this.paymentService.deletePayment(this.id).subscribe((res: any) => {
        console.log(res);
        this.nav.navigateBack('admin/payment-type');
      });
    }
  }
}
