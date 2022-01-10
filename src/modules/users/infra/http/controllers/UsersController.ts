import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  Delete,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';

import { PublicRoute } from '../../../../../shared/decorators/public.resource';
import { ICreateUserDTO } from '../../../dtos/CreateUserDTO';
import { CreateUserUseCase } from '../../../useCases/CreateUserUseCase';
import { DeleteUserUseCase } from '../../../useCases/DeleteUserUseCase';
import { GetUserUseCase } from '../../../useCases/GetUserUseCase';

@Controller('users')
class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Get(':id')
  async show(@Param('id') id: string, @Res() response: Response) {
    const foundUser = await this.getUserUseCase.execute(id);

    return response.json(foundUser);
  }

  @Post()
  @PublicRoute()
  async create(@Body() createUser: ICreateUserDTO, @Res() response: Response) {
    console.log(createUser);

    const createdUser = await this.createUserUseCase.execute(createUser);

    return response.json(createdUser);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() response: Response) {
    await this.deleteUserUseCase.execute(id);

    return response.status(HttpStatus.NO_CONTENT).send();
  }
}

export { UsersController };
