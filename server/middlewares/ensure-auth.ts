import { NextFunction, Request, Response } from 'express';

import { BaseMiddleware } from 'server/lib/mvc/middleware/base';

export class EnsureAuthMiddleware extends BaseMiddleware {
  run(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect('/login');
  }
}
