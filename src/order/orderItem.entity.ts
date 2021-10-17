import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MenuItem } from "src/menu/menuitem.entity";
import { Order } from "./order.entity";

@Entity('OrderItem')
export class OrderItem {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    quantity: number;

    @Column({ default: 0 })
    unitPrice?: number;

    @ManyToOne(() => Order, order => order)
    order: Order;

    @ManyToOne(() => MenuItem, menuItem => menuItem)
    menuItem: MenuItem;
}
