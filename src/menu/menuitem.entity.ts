import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('MenuItem')
export class MenuItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    category: string;

    @Column()
    price: number;
}
