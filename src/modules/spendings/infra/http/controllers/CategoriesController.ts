import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';

import { Request, Response } from 'express';
import { ICreateCategoryDTO } from 'src/modules/spendings/dtos/ICreateCategoryDTO';
import { CreateCategoryUseCase } from 'src/modules/spendings/useCases/CreateCategoryUseCase';
import { GetAllCategoriesUseCase } from 'src/modules/spendings/useCases/GetAllCategoriesUseCase';
import { User } from 'src/modules/users/infra/typeorm/entities/User';

@Controller('categories')
class CategoriesController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getAllCategories: GetAllCategoriesUseCase,
  ) {}

  @Get()
  async index(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    const { id: user_id } = request.user as User;

    const allCategories = await this.getAllCategories.execute(user_id);

    return response.json(allCategories);
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
