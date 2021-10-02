import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('MenuItem')
export class MenuItem {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    Name: string;

    @Column()
    Category: string;

    @Column()
    Price: number;
}
