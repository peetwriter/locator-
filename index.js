const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config.js')

const app = express()
const server = require('http').Server(app);
const io = socketIo(server)

app.use(express.static(__dirname + '/public'))
app.use(webpackDevMiddleware(webpack(webpackConfig)))
app.use(bodyParser.urlencoded({ extended: false }))


io.on('connection', socket => {
  socket.on('clientMessage', body => {
    socket.broadcast.emit('serverMessage', {
      body,
      from: socket.id.slice(8)
    })
  })


  socket.on('coordinates', body => {
    socket.broadcast.emit('coordinatesChanged', {
      from: socket.id.slice(8),
      coordinates: body.coordinates
    });
  })
})

server.listen(3000)
