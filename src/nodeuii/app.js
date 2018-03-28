import Koa from 'koa';
import config from './config';
import log4js from 'log4js';
import errorHandler from "./middlewares/errorHandler";
const app = new Koa();
/* app.use(async ctx => {
  ctx.body = 'Hello World';
}); */

// log4js配置
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'huicli.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});

const logger = log4js.getLogger('cheese');

errorHandler.error(app, logger);
app.listen(config.port, () => {
  console.log(`huicli listening on ${config.port}`);
});