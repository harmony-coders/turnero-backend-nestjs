import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongodbService } from 'src/mongodb/mongodb.service';
import { ProfessionalService } from 'src/professional/professional.service';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: ProfessionalService,
    private mongoService: MongodbService,
  ) {}

  async login(payload: LoginDTO) {
    //let res: CustomResponseType<ILoginResponse> = new CustomResponseType<ILoginResponse>();

    let user = await this.mongoService.authRepository.findOne(payload.user);

    if (user) {
      if (await user.checkPassword(payload.pass)) {
        const paylo = { sub: user.uuid, username: user._id };
        return { access_token: 'Bearer ' + (await this.jwtService.signAsync(paylo)), uuid: user.uuid };
        /*const response: ILoginResponse = {
          access_token: 'Bearer ' + (await this.jwtService.signAsync(paylo)),
          user_uuid: user.uuid,
        };*/
        //res.setOK(response);
      } else {
        throw new UnauthorizedException();
        //res.setFAIL(FailsStrings.INVALID_PASSWORD);
      }
    } else {
      //res.setFAIL(FailsStrings.INEXISTENT_USER);
    }

    //return res;
  }
}
