import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from './../entities/product.entity';
import { CreateProductDto, FilterProductsDto, UpdateProductDto } from './../dtos/products.dtos';
import { Repository, Between, FindConditions } from 'typeorm';
import { BrandsService } from './brands.service';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';
@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
    @InjectRepository(Brand) private brandsRepository: Repository<Brand>) { }


  findAll(params?: FilterProductsDto) {
    if (params) {
      const where: FindConditions<Product> = {}
      const { limit, offset, maxPrice, minPrice } = params
      console.log(maxPrice, minPrice)
      if (maxPrice && minPrice) {
        where.price = Between(minPrice, maxPrice)
      }
      return this.productRepository.find({ relations: ['brand', 'categories'], take: limit, skip: offset, where });
    }

    return this.productRepository.find({ relations: ['brand', 'categories'] });

  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne(id, { relations: ['brand', 'categories'], });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(payload: CreateProductDto) {
    const newProduct = this.productRepository.create(payload);
    if (payload.brandId) {
      const brand = await this.brandsRepository.findOne(payload.brandId)
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
      const brand = await this.brandsRepository.findOne(changes.brandId)
      product.brand = brand
    }
    if (changes.categoriesIds) {
      const categories = await this.categoryRepository.findByIds(changes.categoriesIds)
      product.categories = categories;
    }
    this.productRepository.merge(product, changes)
    return this.productRepository.save(product);
  }


  async removeCategiryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepository.findOne(productId, { relations: ['categories'] });
    product.categories = product.categories.filter((item) => item.id !== categoryId)
    return this.productRepository.save(product)
  }

  async addCategiryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepository.findOne(productId, { relations: ['categories'] });
    const category = await this.categoryRepository.findOne(categoryId)
    product.categories.push(category)
    return this.productRepository.save(product)
  }

  async remove(id: number) {
    const index = await this.productRepository.findOne(id);
    if (!index) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return this.productRepository.remove(index);
  }
}
