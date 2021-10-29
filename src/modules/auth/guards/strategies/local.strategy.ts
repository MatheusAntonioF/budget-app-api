import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthenticationUserUseCase } from '../../useCases/AuthenticateUserUseCase';

import { Strategy } from 'passport-local';
import { User } from 'src/modules/users/infra/typeorm/entities/User';

@Injectable()
class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationUseCase: AuthenticationUserUseCase) {
    super({ usernameField: 'email' });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.authenticationUseCase.validateUser(email, password);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}

export { LocalStrategy };
