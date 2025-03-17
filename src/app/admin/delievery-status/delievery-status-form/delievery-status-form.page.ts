import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DelieveryService } from 'src/app/services/delievery.service';
import { DelieveryStatus } from 'src/interfaces/delievery.interface';

@Component({
  selector: 'app-delievery-status-form',
  templateUrl: './delievery-status-form.page.html',
  styleUrls: ['./delievery-status-form.page.scss'],
  standalone: false
})
export class DelieveryStatusFormPage implements OnInit {

  id: string | null = null; 
  titulo = 'Nuevo estado de entrega';
  status: DelieveryStatus = {
    name: '',}


  constructor(private route: ActivatedRoute , private deliveryService: DelieveryService, private  nav: NavController) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.titulo = 'Editar estado de entrega'
      this.deliveryService.getDelieveryIntent(this.id).subscribe((res: any) => {
        this.status = res.result;
        console.log(res);
      }
      );
  }
  }
  delete() {
    if (this.id) {
      this.deliveryService.deleteDelieveryIntent(this.id).subscribe((res: any) => {
        console.log(res);
        this.nav.navigateBack('admin/delievery-status');
      });
    }
    }
    save() {
      if (this.id) {
        this.deliveryService.updateDelieveryIntent(this.status).subscribe((res: any) => {
          console.log(res);
          this.nav.navigateBack('admin/delievery-status');
        });
      } else {
        this.deliveryService.createDelieveryIntent(this.status).subscribe((res: any) => {
          console.log(res);
          this.nav.navigateBack('admin/delievery-status');
        });
      }

    }

}
