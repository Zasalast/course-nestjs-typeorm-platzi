import { User } from './user.entity';
import { Product } from './../../products/entities/product.entity';
import { PrimaryGeneratedColumn, Column, Entity, UpdateDateColumn, CreateDateColumn } from 'typeorm'
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'date' })
  date: Date;
  @Column({ type: 'varchar', length: 255 })
  user: User;
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

  @Column({ type: 'varchar', length: 255 })
  products: Product[];

}
