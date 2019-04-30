import path from 'path';

import express from 'express';
import expressSession from 'express-session';
import 'reflect-metadata';

import { config } from 'server/config';
import { passport } from 'server/lib/passport/init';
import { router } from 'server/router';

const app = express();

app.use(
  expressSession({
    secret: config.secret,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(router);

app.listen(8000, () => {
  console.info(`Server started on http://localhost:${8000}`);
});
