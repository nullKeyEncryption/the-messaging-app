
function userLogin(){

  window.location.href = 'loginPage.html'
}


function userSignup(){

  window.location.href = 'signupPage.html'
}


function userLogout(){

isUserValid = false
sessionStorage.setItem('isUserValid', false)
updateAuthenticationButtonVisibility()
}

function resizeMessageBox(){

  let box = document.getElementById('messageBox')
  
  box.rows = Math.floor(box.scrollHeight / 30)
}


/* 
Sends a message to server for the server to distribute to every valid user
*/
function sendMessage(){


  // Don't do anything if username is not valid
  if(isUserValid === false || message === '')
    return
  
  
  // Only allow the socket to receive messages after a message has been sent
  socket.emit('updateSocketID', sessionStorage.getItem('username'), socket.id)

  let message = document.getElementById('messageBox').value.trim()
  let username = sessionStorage.getItem('username')
  

  socket.emit('clientSays', message, username)

  // Reset message box value and size
  let box = document.getElementById('messageBox')
  box.value = ''
  box.rows = 1
}


// Send the username and socket ID of the current socket to server
function sendValidUsernameInfo(username){

  socket.emit('validated', socket.id, username)
  sessionStorage.setItem('isUserValid', true)
  sessionStorage.setItem('username', username)
  
  window.location.href = 'chatClient.html'
}

// Clear the messages from users' screen -excluding the message that shows the user is connected to the chat server
function clearMessages() {

  if(!isUserValid)
    return
  document.getElementById('messages').innerHTML = "<div class='chat-header'></div>"
}


function loginRequest() {

  const username = document.getElementById('username').value.trim()
  const password = document.getElementById('password').value

  const invalidFeedback = document.getElementById('error-message')

  invalidFeedback.textContent = ''

  if(!username || username.trim() == '')
    invalidFeedback.textContent = "Invalid username"
  else if(!password)
    invalidFeedback.textContent = "Invalid password"

  else{
    // Check database for a match
    socket.emit('userMatchRequest', username, password)

    // server response to existing username
    socket.on('userMatchResponse', (userExists) => {

      // Add user if does not exist in database
      if(userExists){

        sendValidUsernameInfo(username) // Add user to socket list
      }

      else{
        invalidFeedback.textContent = "Account not found with given credentials"
      }
    })
  }
}


function signupRequest() {
  
  const username = document.getElementById('username').value.trim()
  const password = document.getElementById('password').value
  const confirmPassword = document.getElementById('password-confirmation').value

  const invalidFeedback = document.getElementById('error-message')

  invalidFeedback.textContent = ''
  
  // Check username for allowed characters
  if(!username || username.trim() == '')
    invalidFeedback.textContent = "Username can't empty"
  else if(!/^[a-zA-Z0-9!?\\-_~|=+*.:]+$/.test(username))
    invalidFeedback.textContent = "Username contains invalid characters"

  // Check if passwords match
  else if(!password)
    invalidFeedback.textContent = "You must set a password"
  else if(password !== confirmPassword)
    invalidFeedback.textContent = "Passwords do not match"
  
  // Valid Input
  else{
    // check server for existing username collisions
    socket.emit('usernameRequest', username)

    // server response to existing username
    socket.on('usernameResponse', (exists) => {

      if(!exists){
        socket.emit('registerUserRequest', username, password)

        socket.on('registerUserResponse', (successful) => {

          if(successful)
            sendValidUsernameInfo(username) // Add user to socket list

          else
            invalidFeedback.textContent = "Unable to register. Please try again later"
        })
      }
      else{
        invalidFeedback.textContent = "Username already exists"
      }
    })
  }
}


function handleKeyDown(event) {
  const ENTER_KEY = 13
  if (event.keyCode === ENTER_KEY){

    sendMessage()
    event.preventDefault()
  }
}

function submitSignup(event) {

  const ENTER_KEY = 13
  if(event.keyCode === ENTER_KEY){

    signupRequest()
  }
}

function submitLogin(event) {

  const ENTER_KEY = 13
  if(event.keyCode === ENTER_KEY){

    loginRequest()
  }
}

function toggleShowPassword() {

  toggleState = document.getElementById('toggle-password')

  if(toggleState.textContent == "Show"){
    
    toggleState.textContent = "Hide"
    document.getElementById('password').type = 'text'

    if(document.getElementById('password-confirmation'))
      document.getElementById('password-confirmation').type = 'text'
  }
  else{
    
    toggleState.textContent = "Show"
    document.getElementById('password').type = 'password'

    if(document.getElementById('password-confirmation'))
      document.getElementById('password-confirmation').type = 'password'
  }
}