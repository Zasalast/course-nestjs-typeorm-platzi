import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './../entities/order.entity';
import { OrderItem } from './../entities/order-item.entity';
import { Product } from './../../products/entities/product.entity';
import {
    CreateOrderItemDto,
    UpdateOrderItemDto,
} from './../dtos/order-item.dto';
@Injectable()
export class OrderItemService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(OrderItem) private orderItemRepository: Repository<OrderItem>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
    ) { }
    findAll() {
        return this.orderItemRepository.find();
    }

    async findOne(id: number) {
        const OrderItem = await this.orderItemRepository.findOne(id, {
            relations: ['items', 'items.product'],
        });
        if (!OrderItem) {
            throw new NotFoundException('not found');
        }
        return OrderItem;
    }
    async create(data: CreateOrderItemDto) {
        const order = await this.orderRepository.findOne(data.orderId);
        const product = await this.productRepository.findOne(data.productId);
        const item = new OrderItem();
        item.order = order;
        item.product = product;
        item.quantity = data.quantity;
        return this.orderItemRepository.save(item);
    }
}
