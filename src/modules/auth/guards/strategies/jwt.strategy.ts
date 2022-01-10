import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { authConfig } from '../../../../config/auth';
import { ITokenPayload } from '../../dtos/ITokenPayload';

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
