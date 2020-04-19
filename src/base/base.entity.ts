import { BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

import * as _ from 'lodash';

export class BaseModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    deleted_at: Date;

    @Column({ nullable: true })
    deleted_by: string;
}