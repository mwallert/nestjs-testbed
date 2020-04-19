import { Entity, Column } from "typeorm";
import { BaseModel } from "../base/base.entity";

@Entity()
export class GameUser extends BaseModel {
    @Column()
    first_name: string;

    @Column()
    last_name: string;
}