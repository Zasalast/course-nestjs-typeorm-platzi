import { Exclude } from 'class-transformer';
import { PrimaryGeneratedColumn, Column, Entity, UpdateDateColumn, CreateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm'
import { Order } from './order.entity';
import { User } from './user.entity';
@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @Column({
    name: 'last_name',
    type: 'varchar', length: 255
  })
  lastName: string;
  @Column({ type: 'varchar', length: 255 })
  phone: string;
  @Exclude()
  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;
  @Exclude()
  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user: User
  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
