export interface Payment{
    id?: string;
    name: string;
}
export interface PaymentResult{
    result: Payment;
    errors?: string;
    code: number;
    success: boolean;
}
export interface PaymentResults{
    result: [Payment];
    errors?: string;
    code: number;
    success: boolean;
}

// {
//     "result": {
//       "id": "3d1e1d40-4ef4-43bb-86c9-e167f92a9b2c",
//       "name": "efectivo"
//     },
//     "errors": null,
//     "code": 201,
//     "success": true
//   }