import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepository: Repository<Brand>) { }


  findAll() {
    return this.brandRepository.find({ relations: ['products'] });
  }

  async findOne(id: number) {
    const brand = await this.brandRepository.findOne(id, { relations: ['products'] });
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  async create(data: CreateBrandDto) {
    const newBrand = await this.brandRepository.create(data)
    return this.brandRepository.save(newBrand);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.brandRepository.findOne(id);
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    this.brandRepository.merge(brand, changes)
    return this.brandRepository.save(brand);
  }

  async remove(id: number) {
    const index = await this.brandRepository.findOne(id);
    if (!index) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return this.brandRepository.remove(index);
  }
}
