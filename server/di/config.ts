import { Container } from 'inversify';

import { REPOSITORY_TYPES } from 'server/di/types';
import { INotesRepository, NotesRepository } from 'server/repositories/notes';
import { IUsersRepository, UsersRepository } from 'server/repositories/users';

export const container = new Container();

container.bind<IUsersRepository>(REPOSITORY_TYPES.Users).to(UsersRepository);
container.bind<INotesRepository>(REPOSITORY_TYPES.Notes).to(NotesRepository);
