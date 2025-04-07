import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
  standalone: false
})
export class ReportesPage implements OnInit {


  currentRoute: string = '';

  constructor(private router: Router, private menuCtrl: MenuController) {}
  goTo(route: string) {
    // Navegar a la ruta y habilitar el menú
    this.router.navigate([`/admin/${route}`]).then(() => {
      this.menuCtrl.enable(true, 'main-menu'); // Asegura que el menú esté habilitado
    });
  }
  abrir(){
    this.menuCtrl.open('main-menu')
  }
  fechaInicio: string = '';
  fechaFin: string = '';
  
  ngOnInit() {
    const hoy = new Date().toISOString().split('T')[0]; // yyyy-mm-dd
    this.fechaInicio = hoy;
    this.fechaFin = hoy;
  }
  

generarReporte() {
  if (this.fechaInicio && this.fechaFin) {
    const formData = new FormData();
    formData.append('fechaInicio', this.fechaInicio);
    formData.append('fechaFin', this.fechaFin);

    fetch('http://localhost:8081/Proyecto/Back/controllers/reportes.controller.php?op=reporteEntregasPorFechas', {
      method: 'POST',
      body: formData
    })
    .then(async response => {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Reporte_Entregas_${new Date().toISOString()}.xlsx`;
      link.click();
      window.URL.revokeObjectURL(url);
    })
    .catch(error => console.error('Error al generar reporte:', error));
  } else {
    alert('Selecciona ambas fechas para generar el reporte.');
  }
}

  
}
