import { Module } from '@nestjs/common';
import { DatabaseConfigService } from './database-config.service';
import { DatabaseConfigController } from './database-config.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AdvertModule } from 'src/advert/advert.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AdvertModule,
  ],
  controllers: [
    process.env.NODE_ENV == "development" && DatabaseConfigController
  ],
  providers: [DatabaseConfigService]
})
export class DatabaseConfigModule {}
