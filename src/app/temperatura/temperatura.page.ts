import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.page.html',
  styleUrls: ['./temperatura.page.scss'],
  standalone: false
})
export class TemperaturaPage implements OnInit {

  resultado: string = "";

  distancias: Array<{ clave: string; valor: string; factor: number }> = [
    { clave: "°C", valor: "Celsius", factor: 1 },
    { clave: "F", valor: "Fahrenheit", factor: 1.8 },
    { clave: "K", valor: "Kelvin", factor: 1 }, // Kelvin requiere una fórmula especial
  ];

  distanciasInvertidas: Array<{ clave: string; valor: string }> = [];
  opcion1: string = "";
  opcion2: string = "";
  numero: number = 0;

  constructor() {
    this.distanciasInvertidas = [...this.distancias].reverse();
  }

  ngOnInit() {}

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

    // Obtener el factor de conversión del destino
    const destinoObjeto = this.distancias.find(distancia => distancia.clave === this.opcion2);
    const factorDestino: number = destinoObjeto ? destinoObjeto.factor : 0;

    // Para conversiones de temperatura
    let valorBase: number = this.numero;

    if (this.opcion1 === '°C' && this.opcion2 === 'F') {
      // Celsius a Fahrenheit
      this.resultado = (this.numero * 1.8) + 32 + " " + this.opcion2;
      return;
    } else if (this.opcion1 === 'F' && this.opcion2 === '°C') {
      // Fahrenheit a Celsius
      this.resultado = ((this.numero - 32) / 1.8) + " " + this.opcion2;
      return;
    } else if (this.opcion1 === '°C' && this.opcion2 === 'K') {
      // Celsius a Kelvin
      this.resultado = (this.numero + 273.15) + " " + this.opcion2;
      return;
    } else if (this.opcion1 === 'K' && this.opcion2 === '°C') {
      // Kelvin a Celsius
      this.resultado = (this.numero - 273.15) + " " + this.opcion2;
      return;
    } else if (this.opcion1 === 'F' && this.opcion2 === 'K') {
      // Fahrenheit a Kelvin
      const celsius = (this.numero - 32) / 1.8; // Convierte primero a Celsius
      this.resultado = (celsius + 273.15) + " " + this.opcion2;
      return;
    } else if (this.opcion1 === 'K' && this.opcion2 === 'F') {
      // Kelvin a Fahrenheit
      const celsius = this.numero - 273.15; // Convierte primero a Celsius
      this.resultado = (celsius * 1.8) + 32 + " " + this.opcion2;
      return;
    }

    // Si no es una conversión de temperatura, usar la lógica estándar
    valorBase = this.numero * factorOrigen;

    this.resultado = (valorBase / factorDestino) + " " + this.opcion2;
  }
}
