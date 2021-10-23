import { Controller, Post, UseGuards, Req, Get } from '@nestjs/common';

import { Request } from 'express';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { LocalGuard } from 'src/modules/auth/guards/local-auth.guard';
import { AuthenticationUserUseCase } from 'src/modules/auth/useCases/AuthenticateUserUseCase';

interface ICredentials {
  id: string;
  name: string;
  email: string;
}

@Controller('auth')
export class AuthenticationController {
  constructor(private authenticationUseCase: AuthenticationUserUseCase) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Req() request: Request) {
    const { id, name, email } = request.user as ICredentials;

    return this.authenticationUseCase.login({ id, name, email });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() request: Request) {
    return request.user;
  }
}
