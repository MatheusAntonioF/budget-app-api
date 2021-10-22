import { Controller, Post, Res } from '@nestjs/common';

import { Response } from 'express';

@Controller('users')
export class UsersController {
  @Post()
  create(@Res() response: Response) {
    return response.json('bati aqui');
  }
}
