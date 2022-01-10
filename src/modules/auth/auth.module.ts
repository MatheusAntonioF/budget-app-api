import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { authConfig } from '../../config/auth';
import { HashProvider } from '../../shared/providers/HashProvider';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './guards/strategies/jwt.strategy';
import { LocalStrategy } from './guards/strategies/local.strategy';
import { AuthenticationController } from './infra/http/controllers/AuthenticationController';
import { AuthenticationUserUseCase } from './useCases/AuthenticateUserUseCase';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: authConfig.secret,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationUserUseCase,
    LocalStrategy,
    JwtStrategy,
    {
      provide: 'HashProvider',
      useClass: HashProvider,
    },
  ],
})
export class AuthModule {}
