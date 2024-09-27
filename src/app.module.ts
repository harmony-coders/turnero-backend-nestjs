import { Module } from '@nestjs/common';
import { ProfessionalModule } from './professional/professional.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongodbModule } from './mongodb/mongodb.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProfessionalModule, MongooseModule.forRoot('mongodb://localhost/nest'), MongodbModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
