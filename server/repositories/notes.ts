import { injectable } from 'inversify';

import { IReadableRepository, Predicate } from 'server/lib/mvc/repositories/types';
import { INote, Note } from 'server/models/note';

const notes: INote[] = [
  {
    id: 1,
    userId: 1,
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'
  },
  {
    id: 2,
    userId: 2,
    text: 'There are many variations of passages of Lorem Ipsum available'
  },
  {
    id: 3,
    userId: 2,
    text: 'Lorem Ipsum is therefore always free from repetition, injected humour'
  }
];

export type INotesRepository = IReadableRepository<INote, Note>;

@injectable()
export class NotesRepository implements INotesRepository {
  findAll(predicate?: Predicate<INote>) {
    if (!predicate) {
      return notes.map(noteData => new Note(noteData));
    }

    return notes.filter(predicate).map(noteData => new Note(noteData));
  }

  findOne(predicate: Predicate<INote>) {
    const noteData = notes.find(predicate);

    if (!noteData) {
      return undefined;
    }

    return new Note(noteData);
  }
}
