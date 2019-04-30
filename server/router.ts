import express, { Router } from 'express';

import { ErrorRenderController } from 'server/controllers/errors';
import { LoginRenderController } from 'server/controllers/login';
import { NotesRenderController } from 'server/controllers/notes';
import { UsersRenderController } from 'server/controllers/users';
import { passport } from 'server/lib/passport/init';
import { EnsureAuthMiddleware } from 'server/middlewares/ensure-auth';
import { RenderErrorHandlerMiddleware } from 'server/middlewares/error-handler';
import { InitUserMiddleware } from 'server/middlewares/init-user';

const router = Router();

router.use([new InitUserMiddleware().run]);

router.get('/', (req, res) => res.redirect('/notes'));

router
  .route('/login')
  .get(LoginRenderController.use('renderLoginPage'))
  .post(
    express.urlencoded({ extended: true }),
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' })
  );

router.get(
  '/profile',
  [new EnsureAuthMiddleware().run],
  UsersRenderController.use('renderProfilePage')
);

router.get('/notes', NotesRenderController.use('renderNotesListPage'));
router.get('/notes/:noteId', NotesRenderController.use('renderNotePage'));

router.all('*', ErrorRenderController.use('render404'));
router.use(new RenderErrorHandlerMiddleware().run);

export { router };
