
1
2
3
4
5
6
7
8
9
10
11
12
13
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
console.log('server start port:' + port);