const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();


const server = http.createServer(app);
app.set('port', process.env.PORT || 3000) 

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  
  socket.on("message", (data) => {
    console.log(`Mensaje recibido de : ${socket.id}`, data);
    io.emit("message", data); 
  });

  
  socket.on("disconnect", () => {
    console.log("Usuario desconectado:", socket.id);
  });
});


server.listen(app.get('port'), () => {
  console.log("Server on port", app.get('port'));
});
