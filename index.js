const server = require('auth-static');

server({
  options: {
    cache: 3600,
    gzip: true
  },
  password: process.env.PASSWORD,
  port: 1234,
  realm: 'Private',
  root: './public/',
  username: process.env.USERNAME
});
