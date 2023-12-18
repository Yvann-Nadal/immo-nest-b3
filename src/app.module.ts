import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AdvertModule } from './advert/advert.module';
import { ServiceModule } from './service/service.module';
import { UploadFileModule } from './upload-file/upload-file.module';
import { DatabaseConfigModule } from './database-config/database-config.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AdvertModule,
    ServiceModule,
    UploadFileModule,
    DatabaseConfigModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
