const koa = require('koa');
const serve = require('koa-static');
const send = require('koa-send');

const app = new koa();
app.use(serve(__dirname + '/build'));
app.use(async (ctx) => {
  if(ctx.status === 404) await send(ctx, 'index.html', { root: __dirname + '/build' });
});

const port = 80;
const server = app.listen(port);
