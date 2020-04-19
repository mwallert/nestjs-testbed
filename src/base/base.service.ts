import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseService {
    async getAll<T>(model): Promise<T[]> {
        const allRecords = await model.find({deleted_at: null});

        return allRecords;
    }

    async getOne<T>(model, id: number): Promise<T> {
        const foundRecord = await model.findOne({where: {id, deleted_at: null}});

        return foundRecord;
    }
}
