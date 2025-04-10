import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { OrdenesResult } from 'src/interfaces/ordenes.interface';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: false
})
export class InicioPage implements OnInit, AfterViewInit {
eliminar(id: string) {
  this.navController.navigateForward(`admin/entrega-info/${id}`);
}
editar(id: string) {
  this.navController.navigateForward(`admin/ordenes-form/${id}`);
}
deletePokemon: any;

  pokemons: any[] = [];
  ordenes: any[] = [];
  offset = 0;
  limit = 10;
  loading = false;
  rol: string = '';
  private subscriptions: Subscription = new Subscription(); 
  @ViewChild('loadTrigger', { static: false }) loadTrigger!: ElementRef;
  constructor(
    private navController: NavController,
    private pokemonService: PokemonService,
    private ordnesService: OrdenesService,
  ) {}
  ngOnInit() {
    this.rol = localStorage.getItem('role') || '';
    console.log(this.rol);
    this.loadOrdenes();

  }
  ionViewWillLeave() {
    this.subscriptions.unsubscribe(); 
  }
  ngAfterViewInit() {
    if (this.loadTrigger) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !this.loading) {
          // this.loadPokemons();
          this.loadOrdenes();
        }
      }, { threshold: 0.5 });

      observer.observe(this.loadTrigger.nativeElement);
    }
  }

  loadOrdenes(){
    if (this.loading) return;
    this.loading = true;
    this.subscriptions.add(

      this.ordnesService.getEntregasDriver(this.limit, this.offset).subscribe((response) => {
        console.log(response)
        let total = response.result.totalElements;
        response.result.content.forEach((orden: any, index: number) => {
          if(this.ordenes.length <= total){

            this.ordenes.push({
              numeration: orden.numeration,
              customer: orden.customer.firstNames + ' ' + orden.customer.lastNames,
              id: orden.id,
              deliveryStatus: orden.deliveryStatus.name,
              paymentType: orden.paymentType.name,
              total: orden.total,
              deliveryDate: orden.deliveryDate,
              invoiceNumber: orden.invoiceNumber,
              observations: orden.observations,
              comments: orden.comments
            });
          }
        });
  
        this.offset += this.limit;
        this.loading = false;
      })
    );

  }


  goToNotificationsPage() {
    this.navController.navigateForward('admin/notifications');
  }
  goroote(route: string) {
    this.navController.navigateForward(route);
  }
  goToEntregaInfo(item: string) {
    this.navController.navigateForward('admin/entrega-info');
  }
}
