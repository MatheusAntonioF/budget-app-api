import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthenticationUserUseCase } from '../../useCases/AuthenticateUserUseCase';

import { Strategy } from 'passport-local';
import { User } from 'src/modules/users/infra/entities/User';

@Injectable()
class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationUseCase: AuthenticationUserUseCase) {
    super({ usernameField: 'email' });
  }

  async validate(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.authenticationUseCase.validateUser(
      username,
      password,
    );
    if (!user) throw new UnauthorizedException();

    return user;
  }
}

export { LocalStrategy };
