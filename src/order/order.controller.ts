import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderRequest } from './models/order.request';
import { OrderResponse } from './models/order.response';
import { OrderService } from './order.service';


@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    async createOrder(@Body() order: OrderRequest): Promise<OrderResponse>{
        return await this.orderService.postOrder(order);
    }

    @Get()
    async getAllOrders(): Promise<OrderResponse[]>{
        return await this.orderService.findAll();
    }

    @Get(':uuid')
    async getOrder(@Param() params): Promise<OrderResponse>{
        return await this.orderService.findOne(params.uuid);
    }
}
