import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ProfessionalService } from 'src/professional/professional.service';
import { MongodbService } from 'src/mongodb/mongodb.service';
import { AppointmentService } from 'src/appointment/appointment.service';
import { ProfessionalModule } from 'src/professional/professional.module';
import { MongodbModule } from 'src/mongodb/mongodb.module';
import { jwtConstants } from 'src/utils/constants';

@Module({
  imports: [
    ProfessionalModule,
    MongodbModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '8h' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {
  constructor() {
    console.log(1);
  }
}
