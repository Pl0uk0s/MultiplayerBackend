var colyseus = require("colyseus");
var http = require("http");
var path = require('path');

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

// app.use(compression());
// if (!process.env.LOCAL) {
//     app.use(enforce.HTTPS({ trustProtoHeader: true }));
//   }
app.listen(port);

app.use('/static', express.static(path.join(__dirname, 'public')))

// Create HTTP & WebSocket servers
const server = http.createServer();
const gameServer = new colyseus.Server({ server });

class ChatRoom extends colyseus.Room {
  // maximum number of clients per active session
  constructor() {
    this.maxClients = 4;
  }

  onInit () {
      this.setState({ messages: [] });
  }
  onJoin (client) {
      this.state.messages.push(`${ client.sessionId } joined.`);
  }
  onMessage (client, data) {
      this.state.messages.push(data);
  }
}

// Register ChatRoom as "chat"
gameServer.register("chat", ChatRoom);
gameServer.listen(2657);