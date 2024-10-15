import { Roles } from './roles';

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  rol: Roles;
}

export interface UserForm {
  email: string;
  password: string;
}