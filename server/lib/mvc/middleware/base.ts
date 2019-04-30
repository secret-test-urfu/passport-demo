import { NextFunction, Request, Response } from 'express';

export abstract class BaseMiddleware {
  abstract run(req: Request, res: Response, next: NextFunction): void;
}
