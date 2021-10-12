import { Inject, Injectable } from '@nestjs/common';
import { MenuItem } from 'src/menu/menuitem.entity';
import { Repository } from 'typeorm';
import { OrderRequest } from './models/order.request';
import { OrderResponse } from './models/order.response';
import { OrderItemResponse } from './models/orderItem.response';
import { Order } from './order.entity';
import { OrderItem } from './orderItem.entity';

@Injectable()
export class OrderService {
  constructor(
    @Inject('MENU_REPOSITORY')
    private readonly menuRepository: Repository<MenuItem>,
    @Inject('ORDER_REPOSITORY')
    private readonly orderRepository: Repository<Order>,
    @Inject('ORDERITEM_REPOSITORY')
    private readonly orderItemRepository: Repository<OrderItem>
  ) {}

  async postOrder(order: OrderRequest): Promise<OrderResponse>{
    /// TODO: change this to use cached instead of calling DB
    const menu = await this.menuRepository.find();
    const orderEntity: Order = await this.orderRepository.save(order);

    const orderItems: OrderItemResponse[] = [];

    await Promise.all(order.items.map(async item => {
      const unitPrice = menu.find(x => x.id === item.menuItemId)?.price;
      orderEntity.totalPrice += unitPrice * item.quantity;

      const orderItemEntity: OrderItem = await this.orderItemRepository.save({
        menuItemId: item.menuItemId,
        orderId: orderEntity.id,
        quantity: item.quantity,
        unitPrice: unitPrice
      });

      const orderItemResponse: OrderItemResponse = {
        id: orderItemEntity.menuItemId,
        quantity: orderItemEntity.quantity,
        unitPrice: unitPrice
      };

      orderItems.push(orderItemResponse);
    }));

    await this.orderRepository.save(orderEntity);

    const orderResponse: OrderResponse = {
      uuid: orderEntity.uuid,
      createTime: orderEntity.createTime,
      totalPrice: orderEntity.totalPrice,
      email: orderEntity.email,
      comment: orderEntity.comment,
      items: orderItems
    };

    return orderResponse;
  }

  async findAll(): Promise<OrderResponse[]> {
    const ordersResponse: OrderResponse[] = [];
    const ordersEntities: Order[] = await this.orderRepository.find();

    await Promise.all(ordersEntities.map(async order => {
      const orderItemsEntity = await this.orderItemRepository.find({where: {orderId: order.id}});
      const orderItems: OrderItemResponse[] = orderItemsEntity.map(item => ({id: item.id, quantity: item.quantity, unitPrice: item.unitPrice}));

      const orderResponse: OrderResponse = {
        uuid: order.uuid,
        createTime: order.createTime,
        totalPrice: order.totalPrice,
        email: order.email,
        comment: order.comment,
        items: orderItems
      };

      ordersResponse.push(orderResponse);
    }));

    return ordersResponse;
  }

  async findOne(uuid: string): Promise<OrderResponse> {
    const orderEntity = await this.orderRepository.findOne({where: {uuid: uuid}});
    const orderItemsEntity = await this.orderItemRepository.find({where: {orderId: orderEntity.id}});

    const orderItems: OrderItemResponse[] = orderItemsEntity.map(item => ({id: item.id, quantity: item.quantity, unitPrice: item.unitPrice}));
    const orderResponse: OrderResponse = {
      uuid: orderEntity.uuid,
      createTime: orderEntity.createTime,
      totalPrice: orderEntity.totalPrice,
      email: orderEntity.email,
      comment: orderEntity.comment,
      items: orderItems
    };

    return orderResponse;
  }
}
