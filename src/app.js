const conf = require('./config/defaultConfig.js');
const chalk = require('chalk');
const http = require('http');
const route = require('./helper/route.js');
// const fs = require('fs');
const url = require('url');
const openUrl = require('./helper/openUrl');

class Server {
  constructor(config) {
    this.conf = Object.assign({}, conf, config);
  }

  start() {
    const server = http.createServer((req, res) => {
      res.statusCode = 200;
      let requestPath = url.parse(req.url).pathname;
      let filePath = conf.root + requestPath;
      route(filePath, req, res);
    })
    

    server.listen(this.conf.port, this.conf.hostname, () => {
      const addr = `http://${this.conf.hostname}:${this.conf.port}`;
      console.info(`Server started at ${chalk.green(addr)}`);
      openUrl(addr); // 设置自动打开
    });
  }
}

module.exports = Server;