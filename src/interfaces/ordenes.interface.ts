import { User } from "./user.interface";

export interface OrdenesRequest {
  id?: string,
  numeration: string;
  invoiceNumber: string;
  deliveryDate: string;
  estimateHourInit: string;
  estimateHourEnd: string;
  deliveryStatus: string;
  paymentType: string;
  credit: number;
  total: number;
  evidence: any[];
  userId: string;
  customerId: string;
  deliveryData: string;
  observations: string;
  comments: string;
}
// {
//   "numeration": "1234",
//   "invoiceNumber": "3",
//   "deliveryDate": "2025-04-01",
// "estimateHourInit": "08:00:00",
//     "estimateHourEnd": "09:00:00",
//   "deliveryStatus": "8740617c-d9f1-4717-a66a-ebcb9bd9bf16",
//   "paymentType": "d5a65639-1c3a-421e-b870-fc5a8efe3b79",
//   "credit": 0,
//   "total": 0,
//   "evidence": [
  
//   ],
//  "deliveryStatus": "Pendiente",
//   "paymentType": "Pagado",
//   "credit": 25.75,
//   "total": 120.5,
//   "evidence": [],
//   "userId": "25fe9e1a-ab48-47e9-a4a0-9b68cbc24d68",
//   "customerId": "607add50-eeca-4024-b21a-53901c2cb85a",
//   "deliveryData": "",
//   "observations": "",
//   "comments": ""
// }

export interface OrdenesResponse {
  result: OrdenesResult;
  errors: any;
  code: number;
  success: boolean;
}

export interface OrdenesResult {
  id?: string;
  numeration: string;
  OrdenesNumber: string;
  deliveryDate: string;
  estimateHourInit: string;
  invoiceNumber?:string;
  estimateHourEnd: string;
  deliveryStatus: StatusInfo;
  paymentType: StatusInfo;
  credit: number;
  total: number;
  evidence?: any[];
  user: User;
  customer: CustomerInfo;
  deliveryData: string;
  observations: string;
  comments: string;
}

export interface StatusInfo {
  id: string;
  deleted: boolean;
  name: string;
}



export interface CustomerInfo extends User {
  identification: string;
  address: string;
  addressMaps: string;
  phone: string;
  birthDate: string;
}

export interface Role {
  id: string;
  deleted: boolean;
  name: string;
}

export interface Authority {
  authority: string;
}

export interface OrdenesListResponse {
  result: {
    content: OrdenesResult[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  };
  errors: any;
  code: number;
  success: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}


// asi se manda 
  // {
  //   "numeration": "INV-20250329-001",
  //   "OrdenesNumber": "FD-1001",
  //   "DeliveryDate": "2025-03-29",
  //   "estimateHourInit": "14:30:00",
  //   "estimateHourEnd": "15:15:00",
  //   "deliveryStatusName": "f0316895-e798-4981-98e3-22bdf72c179b",
  //   "paymentType": "Efectivo",  
  //   "credit": 25.75,
  //   "total": 120.50,
  //   "evidence": [
     
  //   ],
  //   "user": "4c9a02d0-8470-4b78-9280-c19fd29fd33a",
  //   "customer": "d60f41cd-2b0e-407c-a5fb-35adc49eb5cc",
  //   "deliveryData": "Paquete entregado en la dirección indicada.",
  //   "observations": "El paquete llegó sin daños.",
  //   "comments": "Cliente satisfecho con la entrega."



  // }



  // asi recibe 
  // {
  //   "result": {
  //     "id": "0fa42934-00c6-42f3-a05e-98caf76dcbb4",
  //     "numeration": "INV-20250329-001",
  //     "OrdenesNumber": "FD-1001",
  //     "deliveryDate": "2025-03-29",
  //     "estimateHourInit": "00:58:19.8567619",
  //     "estimateHourEnd": "16:15:00",
  //     "deliveryStatusName": {
  //       "id": "8740617c-d9f1-4717-a66a-ebcb9bd9bf16",
  //       "deleted": false,
  //       "name": "PENDIENTE"
  //     },
  //     "paymentType": {
  //       "id": "47781c9d-363d-494e-843c-2b7d26383f0b",
  //       "deleted": false,
  //       "name": "Efectivo"
  //     },
  //     "credit": 25.75,
  //     "total": 120.5,
  //     "evidence": [],
  //     "user": {
  //       "id": "4c9a02d0-8470-4b78-9280-c19fd29fd33a",
  //       "deleted": false,
  //       "firstNames": "string",
  //       "lastNames": "string",
  //       "email": "string@gFDdfsfeefSFEamil.00com",
  //       "password": "$2a$10$U.U7YkmQk1SU.U9A/UgMAuJKfqmLejDwdCXwC5RfVhpuYS3XLlzzS",
  //       "profileImage": "7fa85f64-5717-4562-b3fc-2c963f66afa6",
  //       "emailConfirmed": false,
  //       "token": "29859",
  //       "roles": [
  //         {
  //           "id": "98749e13-c4e3-4209-bf02-2d20aa83539d",
  //           "deleted": false,
  //           "name": "DRIVER"
  //         }
  //       ],
  //       "username": "string@gFDdfsfeefSFEamil.00com",
  //       "authorities": [
  //         {
  //           "authority": "ROLE_DRIVER"
  //         }
  //       ],
  //       "enabled": true,
  //       "accountNonLocked": true,
  //       "credentialsNonExpired": true,
  //       "accountNonExpired": true
  //     },
  //     "customer": {
  //       "id": "d60f41cd-2b0e-407c-a5fb-35adc49eb5cc",
  //       "deleted": false,
  //       "firstNames": "Christian Nicolas",
  //       "lastNames": "Leon Teneda",
  //       "email": "chrisito@gmail.com",
  //       "password": "$2a$10$eqH8ECLTiv2b2fBBMRoLK.0GrT.Cx8f77YHau2gfQ9LUZWyUrsvS2",
  //       "profileImage": null,
  //       "emailConfirmed": false,
  //       "token": "66549",
  //       "roles": [
  //         {
  //           "id": "ac332ecf-fb82-4906-9d63-997c444354ff",
  //           "deleted": false,
  //           "name": "CUSTOMER"
  //         }
  //       ],
  //       "identification": "1804909404",
  //       "address": "Letamendi",
  //       "addressMaps": "https://maps.app.goo.gl/9GJ3P43UCgEXGsB17",
  //       "phone": "0999913354",
  //       "birthDate": "1997-05-24",
  //       "username": "chrisito@gmail.com",
  //       "authorities": [
  //         {
  //           "authority": "ROLE_CUSTOMER"
  //         }
  //       ],
  //       "enabled": true,
  //       "accountNonLocked": true,
  //       "credentialsNonExpired": true,
  //       "accountNonExpired": true
  //     },
  //     "deliveryData": "Paquete entregado en la dirección indicada.",
  //     "observations": "El paquete llegó sin daños.",
  //     "comments": "Cliente satisfecho con la entrega."
  //   },
  //   "errors": null,
  //   "code": 201,
  //   "success": true
  // }