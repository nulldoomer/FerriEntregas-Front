import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
  standalone: false
})
export class FooterPage implements OnInit {
  currentTab: string = '';
  rol: string = localStorage.getItem('role') || '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.getCurrentTab();
    this.getRole();
    // window.location.reload();

  }
  getRole() {
    this.rol = localStorage.getItem('role') || '';
  }

  getCurrentTab() {
    const path = window.location.pathname.split('/'); // Dividimos la ruta en partes
    this.currentTab = '/' + path[path.length - 2]+'/'+ path[path.length - 1]; // Tomamos el último segmento como la ruta activa
  }

  isActive(tab: string): boolean {
    return this.currentTab === tab; // Comparamos para ver si la ruta activa es la que esperamos
  }

  // Navegación absoluta usando navigateByUrl
  navigateTo(route: string) {
    const absoluteRoute = route.startsWith('/') ? route : `/${route}`;
    this.router.navigateByUrl(absoluteRoute); // Usamos navigateByUrl para navegación absoluta
  }
}
