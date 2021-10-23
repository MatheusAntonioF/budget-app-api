import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationUserUseCase } from '../useCases/AuthenticateUserUseCase';

@Injectable()
class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationUseCase: AuthenticationUserUseCase) {
    super({ usernameField: 'email' });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authenticationUseCase.validateUser(
      username,
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

export { LocalStrategy };
