import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';

import { Request, Response } from 'express';

import { User } from '../../../../users/infra/typeorm/entities/User';
import { ICreateCategoryDTO } from '../../../dtos/ICreateCategoryDTO';
import { CreateCategoryUseCase } from '../../../useCases/CreateCategoryUseCase';
import { GetAllCategoriesUseCase } from '../../../useCases/GetAllCategoriesUseCase';
import { GetCategoryUseCase } from '../../../useCases/GetCategoryUseCase';

@Controller('categories')
class CategoriesController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
    private readonly getCategoryUseCase: GetCategoryUseCase,
  ) {}

  @Get()
  async index(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    const { id: user_id } = request.user as User;

    const allCategories = await this.getAllCategoriesUseCase.execute(user_id);

    return response.json(allCategories);
  }

  @Get(':id')
  async show(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<Response> {
    const category = await this.getCategoryUseCase.execute(id);

    return response.json(category);
  }

  @Post()
  async create(
    @Body() createCategory: ICreateCategoryDTO,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    const { id: user_id } = request.user as User;

    const createdCategory = await this.createCategoryUseCase.execute({
      ...createCategory,
      user_id,
    });

    return response.json(createdCategory);
  }
}

export { CategoriesController };
