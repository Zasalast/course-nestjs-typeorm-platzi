import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm'
import { Brand } from './brand.entity'
import { Category } from './category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @Column({ type: 'text' })
  description: string;
  @Column({ type: 'int' })
  price: number;
  @Column({ type: 'int' })
  stock: number;
  @Column({ type: 'varchar' })
  image: string;
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

  @ManyToOne(() => Brand, (brand) => brand.products, { nullable: true })
  brand: Brand

  @ManyToMany(() => Category, (categories) => categories.products, { nullable: true })

  @JoinTable({
    name: "product_categories",
    joinColumn: {
      name: "pk_product",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "pk_category",
      referencedColumnName: "id"
    }
  })
  categories: Category[];
}
