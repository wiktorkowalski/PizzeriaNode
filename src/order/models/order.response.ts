import { OrderItemResponse } from "./orderItem.response";

export class OrderResponse{
    uuid: string;
    createTime: Date;
    email?: string;
    comment?: string;
    totalPrice: number;
    items: OrderItemResponse[];
}
