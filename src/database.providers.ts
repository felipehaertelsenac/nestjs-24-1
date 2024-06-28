import {DataSourceOptions} from "typeorm"

export const config: DataSourceOptions = {
    type: 'mysql',
    host: 'mysql',
    port: 3306,
    username: 'root',
    password: 'esii1234',
    database: 'esii_noite',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true
}