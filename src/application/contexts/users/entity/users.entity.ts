import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface IUser {
  id: number;
  name: string;
  age: number;
}

@Entity()
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;
}
