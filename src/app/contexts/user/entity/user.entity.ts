import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../model/user.model';

@Entity()
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  email: string;
}
