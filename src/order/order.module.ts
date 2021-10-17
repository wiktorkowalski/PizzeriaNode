import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { menuProviders } from 'src/menu/menu.providers';
import { StatusModule } from 'src/status/status.module';
import { OrderController } from './order.controller';
import { orderProviders } from './order.providers';
import { OrderService } from './order.service';

@Module({
  imports: [DatabaseModule, StatusModule],
  providers: [OrderService, ...orderProviders, ...menuProviders],
  controllers: [OrderController]
})
export class OrderModule { }
