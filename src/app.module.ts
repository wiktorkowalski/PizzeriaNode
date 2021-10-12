import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './order/order.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: ['.dev.env','.env']}), MenuModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
