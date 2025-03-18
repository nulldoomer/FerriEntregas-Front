// mat-paginator-intl.ts
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable()
export class MatPaginatorIntlEs extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Elementos por página';  
  override nextPageLabel = 'Página siguiente';         
  override previousPageLabel = 'Página anterior';     
  override firstPageLabel = 'Primera página';       
  override lastPageLabel = 'Última página';        

  // Opcional: para personalizar el texto de "page X of Y"
  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    return `${page * pageSize + 1} - ${(page + 1) * pageSize} de ${length}`;
  };
}
