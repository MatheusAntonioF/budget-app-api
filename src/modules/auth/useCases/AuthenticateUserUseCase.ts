import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/users/infra/typeorm/entities/User';
import { UsersRepository } from 'src/modules/users/infra/typeorm/repositories/UsersRepository';
import { HashProvider } from 'src/shared/providers/HashProvider';

@Injectable()
class AuthenticationUserUseCase {
  constructor(
    private readonly usersService: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly hashProvider: HashProvider,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const foundUser = await this.usersService.findByEmail(email);

    if (!foundUser)
      throw new HttpException(
        'Email or password incorrect',
        HttpStatus.FORBIDDEN,
      );

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      foundUser.password,
    );

    if (!passwordMatched)
      throw new HttpException(
        'Email or password incorrect',
        HttpStatus.FORBIDDEN,
      );

    return foundUser;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

export { AuthenticationUserUseCase };
