import { IAdress } from './address.model';

export interface IUser {
  id: number;
  name: string;
  age: number;
  email?: string;
  addresses: IAdress[];
}
