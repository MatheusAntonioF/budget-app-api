import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ITokenPayload } from '../dtos/ITokenPayload';

import { User } from 'src/modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from 'src/modules/users/infra/typeorm/repositories/IUsersRepository';
import { IHashProvider } from 'src/shared/providers/HashProvider/interfaces/IHashProvider';

@Injectable()
class AuthenticationUserUseCase {
  constructor(
    @Inject('UsersRepository')
    private readonly usersService: IUsersRepository,
    @Inject('HashProvider')
    private readonly hashProvider: IHashProvider,
    private readonly jwtService: JwtService,
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
