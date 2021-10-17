import { Controller, Get, Param } from '@nestjs/common';
import { StatusResponse } from './models/statusResponse';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
    constructor(private readonly statusService: StatusService) { }

    @Get(':uuid')
    async getStatus(@Param() params): Promise<StatusResponse[]> {
        return await this.statusService.findOne(params.uuid);
    }

    @Get()
    async getAllStatuses(): Promise<StatusResponse[]> {
        return await this.statusService.findAll();
    }
}
