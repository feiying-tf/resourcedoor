module.exports = {
  hostname: '127.0.0.1',
  port: '8080',
  root: process.cwd(),
  compress: /\.(html|js|css|md|txt)/,
  cache: {
    maxAge: 60,
    expires: true, // 支持expires
    cacheControl: true, // 支持cacheControl
    lastModified: true,
    etag: true
  }
}