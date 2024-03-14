//connect to server and retain the socket
//connect to same host that served the document
const socket = io('http://' + window.document.location.host)

let isUsernameValid = false

socket.on('serverSays', function(message, type) {

  let msgDiv = document.createElement('div')

  msgDiv.textContent = message

  // If the socket is sending the message, create a div with different class for css formatting
  if(type === "sender"){

    msgDiv.innerHTML = '<div class="sender">' + message + '</dir>'
  }

  // Create a new div with different class if the message is private
  else if(type === "private"){

    msgDiv.innerHTML = '<div class="private">' + message + '</dir>'
  }

  else{

    msgDiv.innerHTML = '<div class="receiver">' + message + '</dir>'
  }
  
  // Send public message
  document.getElementById('messages').appendChild(msgDiv)
})

function sendMessage() {

  // Don't do anything if username is not valid
  if(isUsernameValid === false)
    return

  let combinedMessage = document.getElementById('msgBox').value.trim()
  if(combinedMessage === '') return //do nothing

  // .map usage from: https://stackoverflow.com/questions/7695997/split-the-sentences-by-and-remove-surrounding-spaces
  let splittedMessage = combinedMessage.split(":").map(element => element.trim())

  // Message is not private
  if(splittedMessage.length == 1){

    socket.emit('clientSays', "", splittedMessage, socket.id)
  }

  // Message is private
  else{

    let receivers = splittedMessage[0]
    let message = splittedMessage[1]

    socket.emit('clientSays', receivers, message, socket.id)
  }

  document.getElementById('msgBox').value = ''
}

// Send the username and socket ID of the current socket to server
function sendValidUsernameInfo(username) {

  socket.emit('validated', socket.id, username)
}
