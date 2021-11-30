import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';
import { Repository } from 'typeorm';
import { BrandsService } from './brands.service';
import { Category } from '../entities/category.entity';
@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
    private brandsService: BrandsService) { }


  findAll() {
    return this.productRepository.find({ relations: ['brand'] });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return this.productRepository.findOne(id);
  }

  async create(payload: CreateProductDto) {
    const newProduct = this.productRepository.create(payload);
    if (payload.brandId) {
      const brand = await this.brandsService.findOne(payload.brandId)
      newProduct.brand = brand
    }
    if (payload.categoriesIds) {
      const categories = await this.categoryRepository.findByIds(payload.categoriesIds)
      newProduct.categories = categories;
    }
    return this.productRepository.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    if (changes.brandId) {
      const brand = await this.brandsService.findOne(changes.brandId)
      product.brand = brand
    }
    this.productRepository.merge(product, changes)
    return this.productRepository.save(product);
  }

  async remove(id: number) {
    const index = await this.productRepository.findOne(id);
    if (!index) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return this.productRepository.remove(index);
  }
}
