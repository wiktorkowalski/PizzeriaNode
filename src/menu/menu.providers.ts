import { Providers } from 'src/providers';
import { Connection } from 'typeorm';
import { MenuItem } from './menuitem.entity';

export const menuProviders = [
  {
    provide: Providers.MenuRepository,
    useFactory: (connection: Connection) => connection.getRepository(MenuItem),
    inject: [Providers.DatabaseConnection],
  },
];
