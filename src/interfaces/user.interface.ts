export interface Role {
    id: string;
    deleted?: boolean;
    name: string;
  }
  
  export interface User {
    id: string;
    firstNames: string;
    lastNames: string;
    email: string;
    password?: string;
    profileImage?: string | null;
    emailConfirmed?: boolean;
    roles: Role[];
    role?: string
  }
  
  export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  }
  
  export interface UserResponse {
    content: User[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  }
  
  export interface ApiUserResponse {
    result: UserResponse;
    errors: any;
    code: number;
    success: boolean;
  }
  export interface ApiUserResponseOne {
    result: User;
    errors: any;
    code: number;
    success: boolean;
  }
  