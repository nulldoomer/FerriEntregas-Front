import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
export class OrdenesPage implements OnInit, AfterViewInit {

  constructor(private navController: NavController, 
              private customerService: CustomerService, 
              private menuCtrl: MenuController, 
              private ordenesService: OrdenesService) { }

  userRole: string | null = null;
  ordenes: OrdenesResult[] = [];
  customers: Customer[] = [];
  displayedColumns: string[] = ['estado', 'conductor', 'pago', 'acciones'];
  dataSource = new MatTableDataSource<any>();
  totalCustomer: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  filterValue: string = '';
  private subscriptions: Subscription = new Subscription();
  
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.loadOrdenes(this.pageIndex + 1, this.filterValue);
  }

  info(id: string){
    this.navController.navigateForward(`admin/ordenes-form/${id}`);
  }

  nuevo(){
    this.navController.navigateForward('admin/ordenes-form');
  }

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

  ngOnInit() {
    this.userRole = localStorage.getItem('role');
    this.menuCtrl.enable(true, 'main-menu');
    this.loadOrdenes();
    if (this.paginator) {
      this.subscriptions.add(
        this.paginator.page.subscribe(() => this.onPageChange({
          pageIndex: this.paginator!.pageIndex, 
          pageSize: this.pageSize, 
          length: this.totalCustomer
        }))
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

  ngAfterViewInit(): void {
    // Aquí te aseguras de que los datos se recarguen cuando la vista se haya inicializado
    this.loadOrdenes();  // Asegúrate de que la llamada sea en ngAfterViewInit también si es necesario
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
    console.log('Ordenes cargadas:', this.ordenes);
  }
}
