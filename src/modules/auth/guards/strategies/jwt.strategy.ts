import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ITokenPayload } from '../../dtos/ITokenPayload';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { authConfig } from 'src/config/auth';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.secret,
    });
  }

  async validate({ id, name, email }: ITokenPayload) {
    return { id, name, email };
  }
}
