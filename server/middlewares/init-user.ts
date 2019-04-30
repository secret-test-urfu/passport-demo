import { NextFunction, Request, Response } from 'express';

import { container } from 'server/di/config';
import { REPOSITORY_TYPES } from 'server/di/types';
import { BaseMiddleware } from 'server/lib/mvc/middleware/base';
import { IUsersRepository } from 'server/repositories/users';

export class InitUserMiddleware extends BaseMiddleware {
  protected usersRepo = container.get<IUsersRepository>(REPOSITORY_TYPES.Users);

  async run(req: Request, res: Response, next: NextFunction) {
    const { session } = req;

    if (!session) {
      next();

      return;
    }

    if (session.auth && session.auth.id) {
      try {
        req.user = await this.usersRepo.findOne(user => user.id === session.auth.id);
      } catch (err) {
        next(err);

        return;
      }
    }

    next();
  }
}
