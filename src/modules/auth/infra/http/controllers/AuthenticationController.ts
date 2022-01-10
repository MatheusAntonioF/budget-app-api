import { Controller, Post, UseGuards, Req, Get } from '@nestjs/common';

import { Request } from 'express';

import { PublicRoute } from '../../../../../shared/decorators/public.resource';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';
import { LocalGuard } from '../../../guards/local-auth.guard';
import { AuthenticationUserUseCase } from '../../../useCases/AuthenticateUserUseCase';

interface ICredentials {
  id: string;
  name: string;
  email: string;
}

@Controller('auth')
export class AuthenticationController {
  constructor(private authenticationUseCase: AuthenticationUserUseCase) {}

  @UseGuards(LocalGuard)
  @PublicRoute()
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
