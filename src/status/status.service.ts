import { Inject, Injectable } from "@nestjs/common";
import { Order } from "src/order/order.entity";
import { Providers } from "src/providers";
import { Repository } from "typeorm";
import { StatusResponse } from "./models/statusResponse";

@Injectable()
export class StatusService {
    constructor(
        @Inject(Providers.OrderRepository)
        private readonly orderRepository: Repository<Order>,
    ) { }

    async findOne(uuid: string): Promise<StatusResponse[]> {
        const order = await this.orderRepository.findOne({ where: { uuid: uuid } });
        console.log(order.statuses);
        return order.statuses;
    }

    async findAll(): Promise<StatusResponse[]> {
        const orderEntities = await this.orderRepository.find();
        console.debug(orderEntities[0].statuses);
        const statuses: StatusResponse[] = [];

        for (const order of orderEntities) {
            for (const status of order.statuses) {
                statuses.push({
                    orderUuid: order.uuid,
                    createTime: status.createTime,
                    status: status.status,
                    description: status.description
                });
            }
        }

        return statuses;
    }
}
