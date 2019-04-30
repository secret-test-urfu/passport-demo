import 'express';

import { User } from 'server/models/user';

declare module 'express' {
  interface Request {
    user?: User;
  }
}
