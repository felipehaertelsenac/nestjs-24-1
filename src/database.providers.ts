import {DataSourceOptions} from "typeorm"

export const config: DataSourceOptions = {
    type: 'mysql',
    host: 'mysql',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'esii_manha',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true
}