import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(

    @InjectRepository(Customer) private customerRepository: Repository<Customer>
  ) { }

  findAll() {
    return this.customerRepository.find();
  }

  findOne(id: number) {
    const customer = this.customerRepository.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return this.customerRepository.findOne(id);
  }

  create(data: CreateCustomerDto) {

    const newCustomer =
      this.customerRepository.create(data);
    return this.customerRepository.save(newCustomer);
  }

  async update(id: number, changes: UpdateCustomerDto) {
    const customer = await this.customerRepository.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    this.customerRepository.merge(customer, changes)
    return this.customerRepository.save(customer);
  }

  async remove(id: number) {
    const index = await this.customerRepository.findOne(id);
    if (!index) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return this.customerRepository.delete(index);;
  }
}
