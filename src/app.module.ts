import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuController } from './menu/menu.controller';

@Module({
  imports: [],
  controllers: [AppController, MenuController],
  providers: [AppService],
})
export class AppModule {}
