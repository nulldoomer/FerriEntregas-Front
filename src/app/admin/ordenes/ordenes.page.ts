import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MenuController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { Customer } from 'src/interfaces/customer.interface';
import { OrdenesResponse, OrdenesResult } from 'src/interfaces/ordenes.interface';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.page.html',
  styleUrls: ['./ordenes.page.scss'],
  standalone: false
})
export class OrdenesPage implements OnInit {

  filterUsers() {
  throw new Error('Method not implemented.');
  }
  
    constructor(    private navController: NavController, private customerService: CustomerService, private menuCtrl: MenuController, private ordenesService: OrdenesService   ) { }
    ordenes: OrdenesResult[] = [];
    customers: Customer[] = [];
    displayedColumns: string[] = ['estado', 'conductor', 'pago',  'acciones'];
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
      // this.loadcustomers(this.pageIndex + 1, this.filterValue);
      this.loadOrdenes(this.pageIndex + 1, this.filterValue);
    }
    info(id:string){
      this.navController.navigateForward(`admin/customer-form/${id}`);
    }
    nuevo(){
      this.navController.navigateForward('admin/customer-form');
    
    }
    // loadcustomers(page: number = 1, filter: string = ''): void {
    //   const subscription = this.customerService.getCustomers(page, this.pageSize).subscribe(response => {
    //     this.totalCustomer = response.result.totalElements;
    //     this.customers = response.result.content; 
    //     this.dataSource = new MatTableDataSource(this.customers);
    //     this.dataSource.sort = this.sort!;
    //     this.dataSource.paginator = this.paginator!;
    //     console.log(response);
    //   });
    //   this.subscriptions.add(subscription); 
    // }
    loadOrdenes(page: number = 1, filter: string = ''): void {
      const subscription = this.ordenesService.getCustomers(page, this.pageSize).subscribe(response => {
        this.totalCustomer = response.result.totalElements;
        this.ordenes = response.result.content;
        this.dataSource = new MatTableDataSource(this.ordenes);
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
      // this.loadcustomers();
      this.loadOrdenes();
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
