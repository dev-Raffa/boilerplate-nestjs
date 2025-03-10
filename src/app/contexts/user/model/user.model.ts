import { IAdress } from './address.model';

export enum ERoles {
  Admin = 'admin',
  Principal = 'principal',
  Client = 'professor',
  Student = 'student'
}

export interface IUser {
  id: number;
  name: string;
  age: number;
  email?: string;
  addresses: IAdress[];
  role: keyof typeof ERoles;
}
