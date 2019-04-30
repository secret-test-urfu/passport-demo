import { BaseController } from 'server/lib/mvc/controllers/base';

export class ErrorRenderController extends BaseController {
  render404() {
    this.res.status(404).render('error', {
      meta: {
        charset: 'UTF-8',
        description: 'Страница не найдена'
      },
      page: {
        lang: 'ru',
        title: 'Страница не найдена'
      },
      errorCode: 404
    });
  }
}
