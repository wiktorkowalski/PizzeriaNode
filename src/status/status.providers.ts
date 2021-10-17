import { Providers } from 'src/providers';
import { Connection } from 'typeorm';
import { OrderStatus } from './orderStatus.entity';

export const statusProviders = [
    {
        provide: Providers.StatusRepository,
        useFactory: (connection: Connection) => connection.getRepository(OrderStatus),
        inject: [Providers.DatabaseConnection],
    }
];
