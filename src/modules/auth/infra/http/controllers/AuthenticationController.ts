import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticationUserUseCase } from 'src/modules/auth/useCases/AuthenticateUserUseCase';
import { JwtGuard } from '../../../guards/local-auth.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private authenticationUseCase: AuthenticationUserUseCase) {}

  @UseGuards(JwtGuard)
  @Post('login')
  async login(@Req() request: Request) {
    return this.authenticationUseCase.login(request.user);
  }
}
