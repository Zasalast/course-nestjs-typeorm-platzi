import { User } from './user.entity';
import { Product } from '../../products/entities/product.entity';
import { PrimaryGeneratedColumn, Column, Entity, UpdateDateColumn, CreateDateColumn, ManyToOne } from 'typeorm'
import { Customer } from './customer.entity';
import { Order } from './order.entity';
@Entity()
export class OrderItem {
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

    @Column({ type: 'int' })
    quantity: number;

    @ManyToOne(() => Product)
    product: Product;

    @ManyToOne(() => Order, (order) => order.items)
    order: Order;
}
