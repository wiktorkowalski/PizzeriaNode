import { Inject, Injectable } from "@nestjs/common";
import { Order } from "src/order/order.entity";
import { Providers } from "src/providers";
import { Repository } from "typeorm";
import { OrderStatus } from "./orderStatus.entity";

@Injectable()
export class StatusChangerService {
    private readonly MIN_DELAY = 10;
    private readonly MAX_DELAY = 30;

    constructor(
        @Inject(Providers.StatusRepository)
        private readonly statusRepository: Repository<OrderStatus>,
        @Inject(Providers.OrderRepository)
        private readonly orderRepository: Repository<Order>,
    ) { }

    registerOrder(uuid: string) {
        console.debug(`Registered order ${uuid}`);
        this.addStatuses(uuid);
    }

    async addStatuses(uuid: string) {
        const order = await this.orderRepository.findOne({ where: { uuid: uuid } });
        for (const status of StatusDetails) {
            await this.statusRepository.save({ order: order, status: status.status, description: status.details });
            await this.sleep(this.getRandomDelay() * 1000);
        }
    }

    getRandomDelay() {
        return Math.random() * (this.MAX_DELAY - this.MIN_DELAY) + this.MIN_DELAY;
    }

    sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

const StatusDetails = [
    { status: "Received", details: "Order received" },
    { status: "Paid", details: "Payment fullfiled" },
    { status: "Processing", details: "Processing order" },
    { status: "InDelivery", details: "Order in delivery" },
    { status: "Delivered", details: "Order delivered" },
    { status: "Done", details: "Done" }
];
