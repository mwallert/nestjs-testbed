import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'pgadmin',
    password: 'devPassword123!',
    database: 'nestudemydb',
    entities: [`${__dirname}/../**/*.entity.{js,ts}`],
    synchronize: true
};