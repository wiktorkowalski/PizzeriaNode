import { Connection } from 'typeorm';
import { MenuItem } from './menuitem.entity';

export const menuProviders = [
  {
    provide: 'MENU_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(MenuItem),
    inject: ['DATABASE_CONNECTION'],
  },
];
