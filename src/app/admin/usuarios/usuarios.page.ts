import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
  standalone: false,
  animations: [
    // Animación de fade-in
    trigger('fadeIn', [
      transition('void => *', [
        style({ opacity: 0 }), 
        animate('400ms 100ms', style({ opacity: 1 })) 
      ]),
    ]),
    trigger('slideIn', [
      transition('void => *', [
        style({ transform: 'translateX(100%)' }), // Desplazamiento inicial
        animate('500ms ease-out', style({ transform: 'translateX(0)' })) // Deslizamiento a la posición original
      ])
    ])
  ]
})
export class UsuariosPage implements OnInit {

  users = [
    { name: 'Juan Pérez', email: 'juanperez@mail.com' },
    { name: 'Ana Gómez', email: 'anagomez@mail.com' },
    { name: 'Carlos López', email: 'carloslopez@mail.com' },
    // Añadir más usuarios
  ];
  pokemons = [
    { name: 'Pikachu', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
    { name: 'Charmander', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
    { name: 'Bulbasaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
    // Agregar más pokemones aquí...
  ];
  edit(pokemon: any) {
    console.log('Editar', pokemon);
    this.navController.navigateForward(`admin/usuarios-form/${pokemon.name}`);
    
  }

  // Función para mostrar información del Pokémon (o usuario)
  showInfo(pokemon: any) {
    console.log('Información', pokemon);
    // Lógica para mostrar la información (puedes abrir un modal o una nueva página)
  }

  // Función para eliminar un Pokémon (o usuario)
  eliminar(pokemon: any) {
    console.log('Eliminar', pokemon);
    // Lógica para eliminar
    const index = this.pokemons.indexOf(pokemon);
    if (index > -1) {
      this.pokemons.splice(index, 1);  // Elimina el Pokémon de la lista
    }
  }
  
  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  paginatedUsers: any[] = [];
  totalPages: number | undefined;

  constructor(    private navController: NavController,
  ) { }

  ngOnInit() {
    this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
    this.updatePage();
  }

  // Filtra los usuarios por el texto de búsqueda
  filterUsers() {
    this.currentPage = 1;  // Reinicia a la primera página
    this.updatePage();
  }

  // Paginación hacia la página siguiente
  nextPage() {
    if (this.currentPage < this.totalPages!) {
      this.currentPage++;
      this.updatePage();
    }
  }

  // Paginación hacia la página anterior
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

  // Actualiza los usuarios a mostrar en la página actual
  updatePage() {
    let filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.totalPages = Math.ceil(filteredUsers.length / this.itemsPerPage);

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedUsers = filteredUsers.slice(start, end);
  }
}
