export interface Customer {
    id: string;
    firstNames: string;
    lastNames: string;
    identification: string;
    address: string;
    addressMaps: string;
    phone: string;
    birthDate: string;
    email: string;
}
export interface CustomerResult {
    result: Customer;
    errors?: string;
    code: number;
    success: boolean;
}
export interface CustomerResults {
    result: ContentCutomer;
    errors?: string;
    code: number;
    success: boolean;
}
export interface ContentCutomer {
    content: Customer[];
    pageable: {
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
    };
    totalPages: number;
    totalElements: number;
    last: boolean;
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

