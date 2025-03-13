export interface Registro{
    firstNames: string;
    lastNames: string;
    email: string;
    password: string;
}
export interface RegistroResponse{
    token: string;
    role: {
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
    }
}


