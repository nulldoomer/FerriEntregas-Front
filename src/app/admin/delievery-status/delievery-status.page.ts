import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DelieveryService } from 'src/app/services/delievery.service';
import { DelieveryStatus } from 'src/interfaces/delievery.interface';

@Component({
  selector: 'app-delievery-status',
  templateUrl: './delievery-status.page.html',
  styleUrls: ['./delievery-status.page.scss'],
  standalone: false

})
export class DelieveryStatusPage implements OnInit {
nuevo() {
  this.navController.navigateForward(`admin/delievery-status-form`);
}
editar(id: string) {
  this.navController.navigateForward(`admin/delievery-status-form/${id}`);
}
  delieverisStatus: [DelieveryStatus] | undefined;
  constructor(private delieveryService: DelieveryService, private  navController: NavController) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.delieveryService.getDelieveryIntents().subscribe((res: any) => {
      console.log(res);
      this.delieverisStatus = res.result;
    });
  }

}
