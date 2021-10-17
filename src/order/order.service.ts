import { Inject, Injectable } from '@nestjs/common';
import { MenuItem } from 'src/menu/menuitem.entity';
import { Providers } from 'src/providers';
import { StatusChangerService } from 'src/status/statusChanger.service';
import { Repository } from 'typeorm';
import { OrderRequest } from './models/order.request';
import { OrderResponse } from './models/order.response';
import { OrderItemResponse } from './models/orderItem.response';
import { Order } from './order.entity';
import { OrderItem } from './orderItem.entity';

@Injectable()
export class OrderService {
  constructor(
    private readonly statusChanger: StatusChangerService,
    @Inject(Providers.MenuRepository)
    private readonly menuRepository: Repository<MenuItem>,
    @Inject(Providers.OrderRepository)
    private readonly orderRepository: Repository<Order>,
    @Inject(Providers.OrderItemRepository)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) { }

  async postOrder(order: OrderRequest): Promise<OrderResponse> {
    /// TODO: change this to use cached instead of calling DB
    const menu = await this.menuRepository.find();
    const orderEntity: Order = await this.orderRepository.save(order);

    const orderItemsEntity: OrderItem[] = [];

    order.items.map(item => {
      const menuItem = menu.find(x => x.id === item.menuItemId);
      orderEntity.totalPrice += menuItem.price * item.quantity;

      orderItemsEntity.push({
        menuItem: menuItem,
        order: orderEntity,
        quantity: item.quantity,
        unitPrice: menuItem.price
      });
    });

    await this.orderRepository.save(orderEntity);
    const orderItems = (await this.orderItemRepository.save(orderItemsEntity)).map(item => ({ id: item.id, quantity: item.quantity, unitPrice: item.unitPrice }));

    const orderResponse: OrderResponse = {
      uuid: orderEntity.uuid,
      createTime: orderEntity.createTime,
      totalPrice: orderEntity.totalPrice,
      email: orderEntity.email,
      comment: orderEntity.comment,
      items: orderItems
    };
    this.statusChanger.registerOrder(orderResponse.uuid);

    return orderResponse;
  }

  async findAll(): Promise<OrderResponse[]> {
    const ordersResponse: OrderResponse[] = [];
    const ordersEntities: Order[] = await this.orderRepository.find();
    const orderItemsEntities = await this.orderItemRepository.find();

    ordersEntities.map(async order => {
      const orderItems: OrderItemResponse[] = orderItemsEntities
        .filter(item => item.order.id === order.id)
        .map(item => ({ id: item.id, quantity: item.quantity, unitPrice: item.unitPrice }));

      const orderResponse: OrderResponse = {
        uuid: order.uuid,
        createTime: order.createTime,
        totalPrice: order.totalPrice,
        email: order.email,
        comment: order.comment,
        items: orderItems
      };

      ordersResponse.push(orderResponse);
    });

    return ordersResponse;
  }

  async findOne(uuid: string): Promise<OrderResponse> {
    const orderEntity = await this.orderRepository.findOne({ where: { uuid: uuid } });
    const orderItemsEntity = await this.orderItemRepository.find({ where: { orderId: orderEntity.id } });

    const orderItems: OrderItemResponse[] = orderItemsEntity.map(item => ({ id: item.id, quantity: item.quantity, unitPrice: item.unitPrice }));
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
