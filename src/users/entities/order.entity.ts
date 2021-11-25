import { User } from './user.entity';
import { Product } from './../../products/entities/product.entity';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm'
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'date' })
  date: Date;
  @Column({ type: 'varchar', length: 255 })
  user: User;
  @Column({ type: 'varchar', length: 255 })
  products: Product[];
}
