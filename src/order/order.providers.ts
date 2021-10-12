import { Connection } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from './orderItem.entity';

export const orderProviders = [
  {
    provide: 'ORDER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Order),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'ORDERITEM_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(OrderItem),
    inject: ['DATABASE_CONNECTION'],
  }
];
