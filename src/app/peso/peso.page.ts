import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-peso',
  templateUrl: './peso.page.html',
  styleUrls: ['./peso.page.scss'],
  standalone: false
})
export class PesoPage implements OnInit {
  resultado: string = "";

  distancias: Array<{ clave: string; valor: string; factor: number }> = [
    { clave: "tl", valor: "Toneladas", factor: 1000 },
    { clave: "kg", valor: "Kilogramos", factor: 1 },
    { clave: "lb", valor: "Libras", factor: 0.453592 },
    { clave: "gr", valor: "Gramos", factor: 0.001 },
  ];
  distanciasInvertidas: Array<{ clave: string; valor: string }> = [];

  opcion1: string = "";
  opcion2: string = "";
  numero: number = 0;

  constructor() {
    this.distanciasInvertidas = [...this.distancias].reverse();
   }

  ngOnInit() {
  }

  primeraOpcion(opcion: string) {
    this.opcion1 = opcion;
  }

  segundaOpcion(opcion: string) {
    this.opcion2 = opcion;
    this.calculo();
  }

  calculo() {
    // Obtener el factor de conversión origen
    const origenObjeto = this.distancias.find((distancia) => distancia.clave === this.opcion1);
    const factorOrigen: number = origenObjeto ? origenObjeto.factor : 0;

    // Obtener el factor de conversión del final
    const destinoObjeto = this.distancias.find(distancia => distancia.clave === this.opcion2);
    const factorDestino: number = destinoObjeto ? destinoObjeto.factor : 0;

    const valorBase = this.numero * factorOrigen;

    this.resultado = (valorBase / factorDestino) + " " + this.opcion2;
  }

}
