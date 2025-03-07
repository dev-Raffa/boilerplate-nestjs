import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../model/user.model';
import { IAdress } from '../model/address.model';
import { AddressEntity } from './adress.entity';

@Entity()
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column({ nullable: true })
  email: string;

  @OneToMany(() => AddressEntity, (address) => address.user, { cascade: true })
  addresses: IAdress[];
}
