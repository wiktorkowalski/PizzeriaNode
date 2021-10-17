import { OrderStatus } from "src/status/orderStatus.entity";
import { Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./orderItem.entity";

@Entity('Order')
export class Order {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    @Generated("uuid")
    uuid?: string;

    @CreateDateColumn()
    createTime?: Date;

    @Column({ default: 0 })
    totalPrice?: number;

    @Column()
    comment?: string;

    @Column()
    email?: string;

    @OneToMany(() => OrderStatus, orderStatus => orderStatus.order, { eager: true })
    statuses: OrderStatus[];

    @OneToMany(() => OrderItem, orderItem => orderItem.order, { eager: true })
    orderItems: OrderItem[];
}
