var Koa = require('koa');
var Router = require('koa-router');
const bodyParser = require('koa-bodyparser')
var app = new Koa();
var router = new Router();
// var cors = require('koa2-cors');

app.use(bodyParser());
// app.use(cors());
router.options('/test',async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Headers", "Content-Type");
  ctx.set("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  ctx.set('Access-Control-Allow-Credentials', true);
  ctx.set("Content-Type", "application/json;charset=utf-8");
  ctx.status = 204;
  ctx.body = ''
  // next();
});
router.post('/test',async (ctx, next) => {
  // ctx.router available
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Headers", "Content-Type");
  ctx.set("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  ctx.set('Access-Control-Allow-Credentials', true);
  ctx.set("Content-Type", "application/json;charset=utf-8");
  ctx.body = {
    status: 'success',
    result: ctx.request.body
  };
  next();
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3001);