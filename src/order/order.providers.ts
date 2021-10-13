import { Providers } from 'src/providers';
import { Connection } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from './orderItem.entity';

export const orderProviders = [
  {
    provide: Providers.OrderRepository,
    useFactory: (connection: Connection) => connection.getRepository(Order),
    inject: [Providers.DatabaseConnection],
  },
  {
    provide: Providers.OrderItemRepository,
    useFactory: (connection: Connection) => connection.getRepository(OrderItem),
    inject: [Providers.DatabaseConnection],
  }
];
