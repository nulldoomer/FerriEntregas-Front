import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MenuController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { userService } from 'src/app/services/user.service';
import { Customer } from 'src/interfaces/customer.interface';
import { User } from 'src/interfaces/user.interface';

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
filterUsers() {
throw new Error('Method not implemented.');
}

  constructor(    private navController: NavController, private UserService: userService, private menuCtrl: MenuController   ) { }

  UserS: User[] = [];
  displayedColumns: string[] = ['img', 'rol', 'nombres', 'apellidos',  'acciones'];
  dataSource = new MatTableDataSource<any>();
  totalCustomer: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  filterValue: string = ''; 
  private subscriptions: Subscription = new Subscription(); 
  
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  showInfo(pokemon: any) {
    console.log('Información', pokemon);
  }
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.loadUserS(this.pageIndex + 1, this.filterValue);
  }
  info(id:string){
    this.navController.navigateForward(`admin/usuarios-form/${id}`);
  }
  nuevo(){
    this.navController.navigateForward('admin/usuarios-form');
  
  }
  loadUserS(page: number = 1, filter: string = ''): void {
    const subscription = this.UserService.getusers(page, this.pageSize).subscribe(response => {
      this.totalCustomer = response.result.totalElements;
      this.UserS = response.result.content; 
      this.dataSource = new MatTableDataSource(this.UserS);
      this.dataSource.sort = this.sort!;
      this.dataSource.paginator = this.paginator!;
      console.log(response);
    });
    this.subscriptions.add(subscription); 
  }
  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  paginatedUsers: any[] = [];
  totalPages: number | undefined;
  ngOnInit() {
    this.menuCtrl.enable(true, 'main-menu'); // Activa el menú al cargar la página
    this.loadUserS();
    if (this.paginator) {
      this.subscriptions.add(
        this.paginator.page.subscribe(() => this.onPageChange({ pageIndex: this.paginator!.pageIndex, pageSize: this.pageSize, length: this.totalCustomer }))
      );
    }

    if (this.sort) {
      this.subscriptions.add(
        this.sort.sortChange.subscribe(() => {
          this.dataSource.sort = this.sort!;
        })
      );
    }
  }



}
