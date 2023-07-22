import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'process';
import { CountryEntity } from './countries/country.entity';
import { CountryController } from './countries/country.controller';
import { CountriesService } from './countries/countries.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number(process.env.PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [CountryEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController, CountryController],
  providers: [AppService, CountriesService],
})
export class AppModule {}
