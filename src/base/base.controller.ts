import { Get, Post, Body, NotFoundException, Put, Param, ParseIntPipe } from "@nestjs/common";
import { Repository } from "typeorm";
import { BaseModel } from "./base.entity";

import * as _ from 'lodash';
import { ApiTags, ApiExtraModels, ApiBody, ApiProduces, ApiResponse } from "@nestjs/swagger";
import { CreateUserDto } from "src/user/create-user.dto";

@ApiTags('Users')
export class BaseController<T extends BaseModel, DTO = {}> {
    propsMap: string[];
    repository: Repository<T>;

    constructor(
        repository
    ) {
        this.repository = repository;

        this.propsMap = Object.keys(this.repository.metadata.propertiesMap);
    }

    @ApiResponse({
        status: 200,
        type: CreateUserDto,
        isArray: true
    })
    @Get()
    getAll(): Promise<T[]> {
        return this.repository.find({deleted_at: null});
    }

    create(body: DTO | T): Promise<T> {
        const newRecord = this.repository.create();

        this.mergeData(newRecord, body);

        return newRecord.save();
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: T | DTO
    ): Promise<T> {
        const existingRecord = await this.repository.findOne(id);

        if (!existingRecord) {
            throw new NotFoundException(`Record not found with id: ${id}`);
        }

        this.mergeData(existingRecord, body);

        return existingRecord.save();
    }

    private mergeData(record, data) {
        Object.assign(record, _.pick(data, this.propsMap));
    }
}
