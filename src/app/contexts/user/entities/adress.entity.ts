import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IAdress } from '../model/address.model';
import { UserEntity } from './user.entity';
import { IUser } from '../model/user.model';

@Entity()
export class AddressEntity implements IAdress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @ManyToOne(() => UserEntity, (user) => user.addresses)
  user: IUser;
}
