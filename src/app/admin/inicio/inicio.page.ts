import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: false
})
export class InicioPage implements OnInit, AfterViewInit {
  pokemons: any[] = [];
  offset = 0;
  limit = 10;
  loading = false;
  private subscriptions: Subscription = new Subscription(); 

  @ViewChild('loadTrigger', { static: false }) loadTrigger!: ElementRef;

  constructor(
    private navController: NavController,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.loadPokemons();
  }
  ionViewWillLeave() {
    this.subscriptions.unsubscribe(); 
  }
  ngAfterViewInit() {
    if (this.loadTrigger) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !this.loading) {
          this.loadPokemons();
        }
      }, { threshold: 0.5 });

      observer.observe(this.loadTrigger.nativeElement);
    }
  }

  loadPokemons() {
    if (this.loading) return;
    this.loading = true;
    this.subscriptions.add(

      this.pokemonService.getPokemons(this.limit, this.offset).subscribe((response) => {
        response.results.forEach((pokemon: any, index: number) => {
          const id = this.offset + index + 1;
          this.pokemons.push({
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
          });
        });
  
        this.offset += this.limit;
        this.loading = false;
      })
    );
  }

  goToNotificationsPage() {
    this.navController.navigateForward('/notifications');
  }

  goroote(route: string) {
    this.navController.navigateForward(route);
  }

  goToEntregaInfo(item: string) {
    this.navController.navigateForward('admin/entrega-info');
  }
}
