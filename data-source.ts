import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: configService.get('HOST'),
  port: +configService.get('PORT'),
  username: configService.get('USERNAME'),
  password: configService.get('PASSWORD'),
  database: configService.get('DATABASE'),
  synchronize: true,
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  migrations: ['dist/src/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
