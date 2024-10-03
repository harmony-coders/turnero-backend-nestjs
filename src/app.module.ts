import { Module } from '@nestjs/common';
import { ProfessionalModule } from './professional/professional.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongodbModule } from './mongodb/mongodb.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), ProfessionalModule, MongooseModule.forRoot(process.env.MONGO_URI + process.env.MONGO_DB_NAME), MongodbModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
