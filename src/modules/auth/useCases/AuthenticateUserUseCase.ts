import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../../../modules/users/infra/typeorm/entities/User';
import { IHashProvider } from '../../../shared/providers/HashProvider/interfaces/IHashProvider';
import { IUsersRepository } from '../../users/infra/typeorm/repositories/IUsersRepository';
import { ITokenPayload } from '../dtos/ITokenPayload';

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
