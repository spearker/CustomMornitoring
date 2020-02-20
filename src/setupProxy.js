const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  console.log('middle-ware...')
  app.use(
    proxy('/api', {
      target: 'http://yts.am/',
      changeOrigin: true
    })
  );
};