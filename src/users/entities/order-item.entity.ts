import { User } from './user.entity';
import { Product } from '../../products/entities/product.entity';
import { PrimaryGeneratedColumn, Column, Entity, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Customer } from './customer.entity';
import { Order } from './order.entity';
import { Exclude } from 'class-transformer';
@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;
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

    @Column({ type: 'int' })
    quantity: number;

    @JoinColumn({ name: 'product_id' })
    @ManyToOne(() => Product)
    product: Product;
    @JoinColumn({ name: 'order_id' })
    @ManyToOne(() => Order, (order) => order.items)
    order: Order;
}
