const PORT=3000
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

let players =[]

app.use(express.static('public'))

io.on("connection",socket=>{
    socket.on("new-player",player=>{
        players.push(player)
        socket.broadcast.emit("other-players")
    })
})

server.listen(PORT)