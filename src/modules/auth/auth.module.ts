import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { authConfig } from 'src/config/auth';
import { UsersModule } from '../users/users.module';
import { AuthenticationController } from './infra/http/controllers/AuthenticationController';
import { LocalStrategy } from './guards/local.strategy';
import { HashProvider } from 'src/shared/providers/HashProvider';
import { AuthenticationUserUseCase } from './useCases/AuthenticateUserUseCase';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: authConfig.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationUserUseCase, LocalStrategy, HashProvider],
})
export class AuthModule {}
