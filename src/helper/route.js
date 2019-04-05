const util = require('util');
const fs = require('fs');
const stat = util.promisify(fs.stat);
const readdir = util.promisify(fs.readdir);
const nunjucks = require('nunjucks');
const path = require('path');
const conf = require('../config/defaultConfig.js');
const mime = require('mime');
// const chalk = require('chalk');
const compress = require('./compress');
const range = require('./range');
const isFresh = require('./cache');
const Handlebars = require('handlebars');

const tplPath = path.join(__dirname, '../template/dir.tpl');
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString());

nunjucks.configure('views', { autoescape: true });

module.exports = async function (filePath, req, res) {
  try {
    // 通过filePath读取对应的文件
    const stats = await stat(filePath)
    // 如果时文件，就读取文件内容
    if (stats.isFile()) {
      let type = mime.getType(filePath);
      type = type?type:'text/plain';
      res.setHeader('Content-type', `${type}; charset=utf-8`);
      // 如果返回true，说明可以使用本地缓存
      if (isFresh(stats, req, res)) {
        res.statusCode = 304;
        res.end();
        return;
      }

      const {code, start, end} = range(stats.size, req, res);
      let rs;
      if (code === 200) {
        res.statusCode = 200;
        rs = fs.createReadStream(filePath);
      } else {
        res.statusCode = 206;
        rs = fs.createReadStream(filePath, {start, end});
      }
      if (filePath && filePath.match(conf.compress)) {
        rs = compress(rs, req, res)                
      }
      rs.pipe(res)
    } else if (stats.isDirectory()) { // 如果是目录，就显示目
      let data = await readdir(filePath, 'utf8')
      res.setHeader('content-type', 'text/html; charset=utf-8');
      // 模板路径 
      let tmlPath = path.join(__dirname, '../template/tml.html');
      // let tmlPath = 'C:\\Program Files\\nodejs\\node_global\\node_modules\\resourcedoor\\src\\template\\tml.html'
      // 获取相对位置
      const dir = path.relative(conf.root, filePath);
      let content;
      try {
        content = nunjucks.render(tmlPath, {
          dir: dir?`/${dir}`:'',
          items: data.map(item => {
            return {
              type: mime.getType(item)?mime.getType(item):'text/plain',
              path: item
            }
          })
        }) 
        res.end(content);
      } catch (error) {
        console.info('这儿时error', error)
        const content = {
          title: path.basename(filePath),
          dir: dir ? `/${dir}` : '',
          files: data.map(file => {
            return {
              file,
              icon: mime.getType(file)?mime.getType(file):'text/plain',
            }
          })
        };
        res.end(template(content));
      }
    }
  } catch (error) {
    res.statusCode = 404;
    res.setHeader('content-type', 'text/plain');
    res.end(`${filePath} is not a directory or file\n ${error}`)
  }
}