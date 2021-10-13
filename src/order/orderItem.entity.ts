import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MenuItem } from "src/menu/menuitem.entity";
import { Order } from "./order.entity";

@Entity('OrderItem')
export class OrderItem {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    @ManyToOne(() => Order, order => order.id)
    @JoinColumn()
    orderId: number;

    @Column()
    @ManyToOne(() => MenuItem, menuItem => menuItem.id)
    @JoinColumn()
    menuItemId: number;

    @Column()
    quantity: number;

    @Column({ default: 0 })
    unitPrice?: number;
}
