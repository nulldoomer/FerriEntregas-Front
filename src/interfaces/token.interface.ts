import { Role } from "./user.interface";

export interface Token {
  result: {

    accessToken: string;
    refreshToken: string;
    roles: Role[]
  }

}