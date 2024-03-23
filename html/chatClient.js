//connect to server and retain the socket
//connect to same host that served the document
const socket = io('http://' + window.document.location.host)

let isUsernameValid = false
updateAuthenticationButtonVisibility()


/* 
Receiving a message from server
*/
socket.on('serverSays', function(message, type) {

  let msgDiv = document.createElement('div')

  msgDiv.textContent = message

  // If the socket is sending the message, create a div sender tag
  if(type === "sender"){

    msgDiv.innerHTML = '<div class="sender">' + message + '</dir>'
  }

  // Clear placeholder outputs for recently validated socket
  else if(type == "clear"){

    clearMessages()
  }

  // Create a receiver div if the current socket is receiving the message
  else{

    msgDiv.innerHTML = '<div class="receiver">' + message + '</dir>'
  }
  
  // Send public message
  document.getElementById('messages').appendChild(msgDiv)

  scrollToEnd()
})

/*
Updates the login/signup/logout button visibilities based on user status 
*/
function updateAuthenticationButtonVisibility(){

  let loginButton = document.getElementById('loginButton');
  let signupButton = document.getElementById('signupButton');
  let logoutButton = document.getElementById('logoutButton');

  if(isUsernameValid){
    loginButton.style.display = 'none'
    signupButton.style.display = 'none'
    logoutButton.style.display = 'inline-block'
  }
  else{
    loginButton.style.display = 'inline-block'
    signupButton.style.display = 'inline-block'
    logoutButton.style.display = 'none'
  }
}

// Send the username and socket ID of the current socket to server
function sendValidUsernameInfo(username){

  socket.emit('validated', socket.id, username)
}

/*
Scrolls to the bottom of the chat box if the message height overflows
*/
function scrollToEnd(){

  let container = document.getElementById('messages')

  container.scrollTop = container.scrollHeight
}