const config = require('./config.json')
const express = require('express')
const http = require('http')
const https = require('https')
const fs = require('fs')
const key = fs.readFileSync('./key.pem')
const cert = fs.readFileSync('./cert.pem')

const app = express()
const route_handler = require('./lib/route_handler')
app.use(route_handler)
app.use((req, res, next) => {
  const filePath = `./www_static${req.path}.html`
  if (fs.existsSync(filePath)) {
    return res.sendFile(req.path + '.html', {
      root: './www_static'
    })
  }
  next()
})
app.use(express.static('./www_static')) // serves the website assets

const start = (server, port, name) => {
  server.on('error', e => {
    console.error(`${name}: ${e.message}`)
    process.exit(1)
  })
  server.listen(port, '0.0.0.0', () =>
    console.log(`${name.toUpperCase()}: ${name}://0.0.0.0:${port}`)
  )
}

const httpServer = http.createServer(app)
const httpsServer = https.createServer({ key, cert }, app)
start(httpServer, config.web.http_port, 'http')
start(httpsServer, config.web.https_port, 'https')

const shutdown = () => {
  httpServer.close()
  httpsServer.close()
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)