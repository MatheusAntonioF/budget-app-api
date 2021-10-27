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
import { ICreateUserDTO } from 'src/modules/users/dtos/CreateUserDTO';
import { CreateUserUseCase } from 'src/modules/users/useCases/CreateUserUseCase';
import { DeleteUserUseCase } from 'src/modules/users/useCases/DeleteUserUseCase';
import { GetUserUseCase } from 'src/modules/users/useCases/GetUserUseCase';
import { PublicRoute } from 'src/shared/decorators/public.resource';

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
