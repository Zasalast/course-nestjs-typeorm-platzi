import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './../entities/order.entity';
import { Customer } from './../entities/customer.entity';
import { CreateOrderDto, UpdateOrderDto } from './../dtos/order.dto';
@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(Customer) private customerRepository: Repository<Customer>,
    ) { }

    findAll() {
        return this.orderRepository.find();
    }

    async findOne(id: number) {
        const order = await this.orderRepository.findOne(id, {
            relations: ['items', 'items.product'],
        });
        if (!order) {
            throw new NotFoundException('not found');
        }
        return order;
    }

    async create(data: CreateOrderDto) {
        const order = new Order();
        if (data.customerId) {
            const customer = await this.customerRepository.findOne(data.customerId);
            order.customer = customer;
        }
        return this.orderRepository.save(order);
    }

    async update(id: number, changes: UpdateOrderDto) {
        const order = await this.orderRepository.findOne(id);
        if (changes.customerId) {
            const customer = await this.customerRepository.findOne(changes.customerId);
            order.customer = customer;
        }
        return this.orderRepository.save(order);
    }

    remove(id: number) {
        return this.orderRepository.delete(id);
    }
}
