//connect to server and retain the socket
//connect to same host that served the document
const socket = io('http://' + window.document.location.host)

let isUserValid = sessionStorage.getItem('isUserValid')

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
  
  document.getElementById('messages').appendChild(msgDiv)
  scrollToEnd()
})

/*
Updates the login/signup/logout button visibilities based on user status 
*/
function updateAuthenticationButtonVisibility(){
  
  if(!document.getElementById('loginButton'))
    return

  if(!isUserValid || isUserValid !== 'true'){

    isUserValid = false
    sessionStorage.setItem('isUserValid', false)
    document.getElementById('connected-user').textContent = "Not Logged In"
  }
  else{
    document.getElementById('connected-user').textContent = "Logged in as: " + sessionStorage.getItem('username')
  }
  
  let loginButton = document.getElementById('loginButton')
  let signupButton = document.getElementById('signupButton')
  let logoutButton = document.getElementById('logoutButton')

  if(isUserValid){
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


/*
Scrolls to the bottom of the chat box if the message height overflows
*/
function scrollToEnd(){

  let container = document.getElementById('messages')

  container.scrollTop = container.scrollHeight
}