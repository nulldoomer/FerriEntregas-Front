export interface EstimateHour {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }
  
  export interface DeliveryStatusName {
    id: string;
    deleted: boolean;
    name: string;
  }
  
  export interface PaymentType {
    id: string;
    deleted: boolean;
    name: string;
  }
  
  export interface Evidence {
    id: string;
    deleted: boolean;
    url: string;
  }
  
  export interface Role {
    id: string;
    deleted: boolean;
    name: string;
  }
  
  export interface Authority {
    authority: string;
  }
  
  export interface User {
    id: string;
    deleted: boolean;
    firstNames: string;
    lastNames: string;
    email: string;
    password: string;
    profileImage: string;
    emailConfirmed: boolean;
    token: string;
    roles: Role[];
    username: string;
    authorities: Authority[];
    enabled: boolean;
    accountNonLocked: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
  }
  
  export interface Customer {
    id: string;
    deleted: boolean;
    firstNames: string;
    lastNames: string;
    email: string;
    password: string;
    profileImage: string;
    emailConfirmed: boolean;
    token: string;
    roles: Role[];
    identification: string;
    address: string;
    addressMaps: string;
    phone: string;
    birthDate: string;
    username: string;
    authorities: Authority[];
    enabled: boolean;
    accountNonLocked: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
  }
  
  export interface Invoice {
    id: string;
    numeration: string;
    invoiceNumber: string;
    deliveryDate: string;
    estimateHourInit: EstimateHour;
    estimateHourEnd: EstimateHour;
    deliveryStatusName: DeliveryStatusName;
    paymentType: PaymentType;
    credit: number;
    total: number;
    evidence: Evidence[];
    user: User;
    customer: Customer;
    deliveryData: string;
    observations: string;
    comments: string;
  }
  
  export interface InvoiceApiResponse {
    result: Invoice;
    errors: string[];
    code: number;
    success: boolean;
  }
  