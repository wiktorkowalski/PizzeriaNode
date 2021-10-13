import { OrderItemRequest } from "./orderItem.request";

export class OrderRequest {
    email?: string;
    comment?: string;
    items: OrderItemRequest[];
}
