import { Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, Entity, JoinColumn } from "typeorm";
import { Order } from "src/order/order.entity";

@Entity('OrderStatus')
export class OrderStatus {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => Order, order => order)
    @JoinColumn()
    order: Order;

    @CreateDateColumn()
    createTime: Date;

    @Column()
    status: string;

    @Column()
    description: string;
}
