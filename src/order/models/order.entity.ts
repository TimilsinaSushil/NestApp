import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";
import { Exclude, Expose } from "class-transformer";

@Entity('orders')
export class Order{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Exclude()
    first_name:string;

    @Column()
    @Exclude()
    last_name:string;
 
    @CreateDateColumn()
    created_at:string
    
    @OneToMany(()=>OrderItem, orderItem =>orderItem.order)
    order_items: OrderItem[];

    @Expose()
    get name(): string {  //returning full name
        return `${this.first_name} ${this.last_name}`
    }

    @Expose()
    get total(): number{
        return this.order_items.reduce((sum,i)=> sum + i.quantity * i.price,0)  //initial sum is 0 and loop through each item to get total sum of order
    }

} 