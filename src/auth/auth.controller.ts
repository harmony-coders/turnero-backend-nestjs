import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { LoginDTO } from './dto/login.dto';
import { Request } from 'express';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() payload: LoginDTO, @Req() request: Request) {
    let loginAttemp = await this.authService.login(payload);
    if (loginAttemp) {
      request.res.setHeader('Set-Cookie', `token=${loginAttemp.access_token}; HttpOnly; Secure`);
    }

    return loginAttemp;
  }
}
