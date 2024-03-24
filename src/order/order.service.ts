import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Order } from './models/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService extends AbstractService {
    constructor(
        @InjectRepository(Order) 
        private readonly orderRepository: Repository<Order>
    ){
        super(orderRepository)
    }

    async chart(){
        return this.orderRepository.query(`SELECT DATE_FORMAT(o.created_at, '%Y-%m-%d') as date, sum(oi.price*oi.quantity) as sum
        FROM orders o
        JOIN order_items oi on o.id= oi.order_id
        GROUP BY date;`)
    }
}
