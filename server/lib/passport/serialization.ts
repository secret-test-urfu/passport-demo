import { container } from 'server/di/config';
import { REPOSITORY_TYPES } from 'server/di/types';
import { User } from 'server/models/user';
import { IUsersRepository } from 'server/repositories/users';

export class UserSerializer {
  serialize(user: User, done: (err?: Error, id?: number) => void) {
    done(undefined, user.id);
  }
}

export class UserDeserializer {
  protected usersRepo = container.get<IUsersRepository>(REPOSITORY_TYPES.Users);

  constructor() {
    this.deserialize = this.deserialize.bind(this);
  }

  async deserialize(id: number, done: (err?: Error, user?: User) => void) {
    try {
      done(undefined, await this.usersRepo.findOne(user => user.id === id));
    } catch (err) {
      done(err, undefined);
    }
  }
}
