import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn()
    id:Number;
    @Column()
    name:String;

}