import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { ICreateSpendingDTO } from 'src/modules/spendings/dtos/ICreateSpendingDTO';
import { IUpdateSpendingDTO } from 'src/modules/spendings/dtos/IUpdateSpendingDTO';
import { CreateSpendingUseCase } from 'src/modules/spendings/useCases/CreateSpendingUseCase';
import { DeleteSpendingUseCase } from 'src/modules/spendings/useCases/DeleteSpendingUseCase';
import { GetAllSpendingsUseCase } from 'src/modules/spendings/useCases/GetAllSpendingsUseCase';
import { GetSpendingUseCase } from 'src/modules/spendings/useCases/GetSpendingUseCase';
import { UpdateSpendingUseCase } from 'src/modules/spendings/useCases/UpdateSpendingUseCase';
import { User } from 'src/modules/users/infra/typeorm/entities/User';

@Controller('spendings')
class SpendingsController {
  constructor(
    private readonly createSpendingUseCase: CreateSpendingUseCase,
    private readonly getSpendingUseCase: GetSpendingUseCase,
    private readonly getAllSpendingsUseCase: GetAllSpendingsUseCase,
    private readonly updateSpendingUseCase: UpdateSpendingUseCase,
    private readonly deleteSpendingUseCase: DeleteSpendingUseCase,
  ) {}

  @Get()
  async index(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    const { id: user_id } = request.user as User;

    const allSpendings = await this.getAllSpendingsUseCase.execute(user_id);

    return response.json(allSpendings);
  }

  @Get(':id')
  async show(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<Response> {
    const foundSpending = await this.getSpendingUseCase.execute(id);

    return response.json(foundSpending);
  }

  @Post()
  async create(
    @Req() request: Request,
    @Body() createSpending: ICreateSpendingDTO,
    @Res() response: Response,
  ): Promise<Response> {
    const { id: user_id } = request.user as User;

    const createdSpending = await this.createSpendingUseCase.execute({
      ...createSpending,
      user_id,
    });

    return response.json(createdSpending);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSpending: IUpdateSpendingDTO,
    @Res() response: Response,
  ): Promise<Response> {
    const updatedSpending = await this.updateSpendingUseCase.execute(
      id,
      updateSpending,
    );

    return response.json(updatedSpending);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<Response> {
    await this.deleteSpendingUseCase.execute(id);

    return response.status(HttpStatus.NO_CONTENT).send();
  }
}

export { SpendingsController };
