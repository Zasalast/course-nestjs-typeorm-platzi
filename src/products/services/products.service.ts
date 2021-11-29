import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';
import { Repository } from 'typeorm';
import { MESSAGES } from '@nestjs/core/constants';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) { }


  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: CreateProductDto) {
    const newProduct = {
      ...data,
    };
    return this.productRepository.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
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
