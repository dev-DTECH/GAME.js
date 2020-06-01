const PORT=3000
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

let players =[]
let playerIDs=[]

app.use(express.static('public'))

io.on("connection",socket=>{
    socket.on("new-player",player=>{
        players.push(player)
        playerIDs.push(socket.id)
        // console.log(players)

        socket.emit("new-player",[players,players.indexOf(player)])
    })
    socket.on("sync-position",data=>{
        players[data[1]].x=data[0].x
        players[data[1]].y=data[0].y
        players[data[1]].bullet=data[0].bullet
        
        // players.concat(data)
        io.emit("sync-player",players)
    })
    socket.on("sync-health",data=>{
        players[data[1]].health=data[0]
        // console.log(data[0])
        io.emit("sync-player",players)
    })
    socket.on("kill",data=>{
        players[data]=null
        // console.log(data[0])
        io.emit("sync-player",players)
    })

    socket.on("disconnect",()=>{
        playerIDs.forEach((id,i) => {
            if(socket.id==id){
                players[i]=null
                playerIDs[i]=null
                // players.splice(i,1)
                // playerIDs.splice(i,1)
            }
        });
        // players.slice(0,1)
    })
})

server.listen(PORT)