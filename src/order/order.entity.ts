import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity('Order')
export class Order {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    @Generated("uuid")
    uuid?: string;

    @CreateDateColumn()
    createTime?: Date;
    
    @Column({default: 0})
    totalPrice?: number;

    @Column()
    comment?: string;
    
    @Column()
    email?: string;
}
