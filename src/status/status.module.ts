import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { orderProviders } from 'src/order/order.providers';
import { StatusController } from './status.controller';
import { statusProviders } from './status.providers';
import { StatusService } from './status.service';
import { StatusChangerService } from './statusChanger.service';

@Module({
    imports: [DatabaseModule],
    providers: [StatusService, StatusChangerService, ...orderProviders, ...statusProviders],
    controllers: [StatusController],
    exports: [StatusChangerService]
})
export class StatusModule { }
