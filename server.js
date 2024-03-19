const server = require('http').createServer(handler)
const io = require('socket.io')(server) //wrap server app in socket io capability
const fs = require('fs') //file system to server static files
const url = require('url'); //to parse url strings
const PORT = process.env.PORT || 3000 //useful if you want to specify port through environment variable

const ROOT_DIR = 'html' //dir to serve static files from

const MIME_TYPES = {
  'css': 'text/css',
  'gif': 'image/gif',
  'htm': 'text/html',
  'html': 'text/html',
  'ico': 'image/x-icon',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',
  'js': 'application/javascript',
  'json': 'application/json',
  'png': 'image/png',
  'svg': 'image/svg+xml',
  'txt': 'text/plain'
}

// holds usernames and their corresponding socket ID's
let socketMap = new Map();

function get_mime(filename) {
  for (let ext in MIME_TYPES) {
    if (filename.indexOf(ext, filename.length - ext.length) !== -1) {
      return MIME_TYPES[ext]
    }
  }
  return MIME_TYPES['txt']
}

server.listen(PORT) //start http server listening on PORT

function handler(request, response) {
  //handler for http server requests
  let urlObj = url.parse(request.url, true, false)
  console.log('\n============================')
  console.log("PATHNAME: " + urlObj.pathname)
  console.log("METHOD: " + request.method)

  let filePath = ROOT_DIR + urlObj.pathname

  if(urlObj.pathname.split('/').length() > 2)
    filePath = '.' + urlObj.pathname
  
  console.log("REQUEST: " + filePath)

  fs.readFile(filePath, function(err, data) {
    if (err) {
      //report error to console
      console.log('ERROR: ' + JSON.stringify(err))
      //respond with not found 404 to client
      response.writeHead(404);
      response.end(JSON.stringify(err))
      return
    }
    response.writeHead(200, {
      'Content-Type': get_mime(filePath)
    })
    response.end(data)
  })
}

//Socket Server
io.on('connection', function(socket) {

  // Add new socket to the map without a username
  socketMap.set(socket.id, "")

  
  // If a valid username was given to one of the sockets
  socket.on('validated', function(socketID, username){

    socket.emit('serverSays', '', 'clear')
    // Set the username for given socket ID in the map
    socketMap.set(socketID, username)
  })

  
  socket.on('clientSays', function(receiversCombined, data, socketID) {

    console.log('RECEIVED: ' + data)

    // Get the username of the sender
    let sender = socketMap.get(socketID)

    // Update data to show sender's username
    data = sender + ": " + data

    // if the message is not private, broadcast the message to everyone
    if(receiversCombined === ""){

      socketMap.forEach((value, key) => {

        // broadcast the message to everyone who is registered
        if(value !== ''){

          if(sender === value){
            io.to(key).emit('serverSays', data, "sender")
          }
          else{
            io.to(key).emit('serverSays', data, "")
          }
        }
      });
    }

    // if the message is private, only broadcast it to the receivers
    else{

      let sentToSender = false // checks if the message is sent to the sender

      // .map usage from: https://stackoverflow.com/questions/7695997/split-the-sentences-by-and-remove-surrounding-spaces
      let receivers = receiversCombined.split(",").map(element => element.trim())

      receivers.forEach((username, index) => {

        socketMap.forEach((value, key) => {

          // send the message to the original sender if not already
          if(value === sender && !sentToSender){
            io.to(key).emit('serverSays', data, "private")
            sentToSender = true
          }

          // Check if that username exists
          if(username === value){
            io.to(key).emit('serverSays', data, "private")
          }
        });
      });
    }
  })

  // Remove socket from map if the socket leaves
  socket.on('disconnect', () => {
    socketMap.delete(socket.id)
  })
})

console.log(`Server Running at port ${PORT}  CNTL-C to quit`)
console.log(`To Test:\nOpen several browsers to: http://localhost:3000/chatClient.html`)

