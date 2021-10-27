import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ITokenPayload } from '../dtos/ITokenPayload';

import { User } from 'src/modules/users/infra/entities/User';
import { UsersRepository } from 'src/modules/users/infra/repositories/implementations/UsersRepository';
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

    delete foundUser.password;

    return foundUser;
  }

  async login({ id, name, email }: ITokenPayload) {
    return {
      token: this.jwtService.sign({
        id,
        name,
        email,
      }),
    };
  }
}

export { AuthenticationUserUseCase };
