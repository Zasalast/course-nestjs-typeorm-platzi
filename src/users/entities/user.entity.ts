import { Exclude } from 'class-transformer';
import { PrimaryGeneratedColumn, Column, Entity, UpdateDateColumn, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm'
import { Customer } from './customer.entity'
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255 })
  email: string;
  @Column({ type: 'varchar', length: 255 })
  password: string;
  @Column({ type: 'varchar', length: 255 })
  role: string;
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

  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
  @JoinColumn({
    name: "customer_id",
    referencedColumnName: "id"
  })
  customer: Customer
}
