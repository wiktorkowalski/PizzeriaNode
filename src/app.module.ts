import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: ['.dev.env','.env']}), MenuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
