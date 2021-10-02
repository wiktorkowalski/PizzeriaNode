import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { DatabaseModule } from 'src/database/database.module';
import { menuProviders } from './menu.providers';

@Module({
    imports: [DatabaseModule],
    providers: [MenuService, ...menuProviders],
    controllers: [MenuController]
  })
  export class MenuModule {}
