import { Exclude } from 'class-transformer';
import { PrimaryGeneratedColumn, Column, Entity, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Product } from './product.entity';
@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @Column({ type: 'varchar', length: 255 })
  image: string;
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

  @OneToMany(() => Product, (product) => product.brand, { nullable: true })
  products: Product[]
}
