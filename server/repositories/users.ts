import { injectable } from 'inversify';

import { IReadableRepository, Predicate } from 'server/lib/mvc/repositories/types';
import { IUser, User } from 'server/models/user';

const users: IUser[] = [
  {
    id: 1,
    lastName: 'Ильенко',
    firstName: 'Кристина',
    username: 'user',
    password: '9244616fee4e28a7e26ab1b5bc877179' // qwerty
  },
  {
    id: 2,
    lastName: 'Савичев',
    firstName: 'Игорь',
    username: 'admin',
    password: '0232121a164cc13502681fb725864c6f' // 123456
  }
];

export type IUsersRepository = IReadableRepository<IUser, User>;

@injectable()
export class UsersRepository implements IUsersRepository {
  findAll(predicate?: Predicate<IUser>) {
    if (!predicate) {
      return users.map(userData => new User(userData));
    }

    return users.filter(predicate).map(userData => new User(userData));
  }

  findOne(predicate: Predicate<IUser>) {
    const userData = users.find(predicate);

    if (!userData) {
      return undefined;
    }

    return new User(userData);
  }
}
