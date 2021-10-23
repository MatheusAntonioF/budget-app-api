import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';

import { Response } from 'express';
import { CreateUserDTO } from 'src/modules/users/dtos/CreateUserDTO';
import { CreateUserUseCase } from 'src/modules/users/useCases/CreateUserUseCase';
import { GetUserUseCase } from 'src/modules/users/useCases/GetUserUseCase';

@Controller('users')
export class UsersController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase,
  ) {}

  @Get(':id')
  async show(@Param() params, @Res() response: Response) {
    const foundUser = await this.getUserUseCase.execute(params.id);

    return response.json(foundUser);
  }

  @Post()
  async create(@Body() createUser: CreateUserDTO, @Res() response: Response) {
    const createdUser = await this.createUserUseCase.execute(createUser);

    return response.json(createdUser);
  }
}
