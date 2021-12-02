import { User } from './user.entity';
import { Product } from './../../products/entities/product.entity';
import { PrimaryGeneratedColumn, Column, Entity, UpdateDateColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm'
import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];
}
