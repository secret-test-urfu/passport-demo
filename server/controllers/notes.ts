import { NotFound } from 'http-errors';

import { container } from 'server/di/config';
import { REPOSITORY_TYPES } from 'server/di/types';
import { BaseController } from 'server/lib/mvc/controllers/base';
import { INotesRepository } from 'server/repositories/notes';
import { IUsersRepository } from 'server/repositories/users';

interface INotePath {
  noteId: string;
}

export class NotesRenderController extends BaseController {
  protected usersRepo = container.get<IUsersRepository>(REPOSITORY_TYPES.Users);
  protected notesRepo = container.get<INotesRepository>(REPOSITORY_TYPES.Notes);

  async renderNotesListPage() {
    const notes = await this.notesRepo.findAll();

    this.res.render('notes-list', {
      meta: {
        charset: 'UTF-8',
        description: 'Список заметок'
      },
      page: {
        lang: 'ru',
        title: 'Список заметок'
      },
      notes
    });
  }

  async renderNotePage() {
    const { noteId }: INotePath = this.req.params;

    const note = await this.notesRepo.findOne(noteItem => noteItem.id === Number(noteId));

    if (!note) {
      throw new NotFound(`Note ${noteId} not found`);
    }

    const owner = await this.usersRepo.findOne(user => user.id === note.userId);

    this.res.render('note', {
      meta: {
        charset: 'UTF-8',
        description: `Заметка ${note.id}`
      },
      page: {
        lang: 'ru',
        title: `Заметка ${note.id}`
      },
      note,
      owner
    });
  }
}
