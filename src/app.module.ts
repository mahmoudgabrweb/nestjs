import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesModule } from './countries/countries.module';
import { dataSourceOptions } from '../data-source';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    CountriesModule,
    TeamsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
