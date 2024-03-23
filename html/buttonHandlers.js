
function userLogin(){

  window.location.href = 'loginPage.html'
}


function userSignup(){

  window.location.href = 'signupPage.html'
}


function userLogout(){

  isUsernameValid = false
  updateAuthenticationButtonVisibility()
}


function validateUsername() {

  // NEW IMPLEMENTATION NEEDED FOR LOGIN SIGNUP LOGOUT

    // let username = document.getElementById('username').value.trim()
  
    // // Check if the user entered username is valid
    // // Regex syntax from: https://bobbyhadz.com/blog/javascript-check-if-character-is-letter
    // if((username !== '') && (!username.includes(" ")) && (/^[a-z]+$/.test(username.charAt(0).toLowerCase()))){
  
    //   isUsernameValid = true;
    //   sendValidUsernameInfo(username) // send info to server if username is valid
    // }
    // else {
  
    //   isUsernameValid = false
    //   document.getElementById('username').value = "" // clean text area
    // }
  
    // if(isUsernameValid){
    //   alert("You have successfully connected to the server")
    // }
    // else{
    //   alert("Username is not valid. Please try again")
    // }
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
    if(isUsernameValid === false)
      return

    let message = document.getElementById('messageBox').value.trim()
    if(message === '') return //do nothing

    socket.emit('clientSays', "", message, socket.id)

    // Reset message box value and size
    let box = document.getElementById('messageBox')
    box.value = ''
    box.rows = 1
  }


  // Clear the messages from users' screen -excluding the message that shows the user is connected to the chat server
  function clearMessages() {
  
    if(!isUsernameValid)
      return
    document.getElementById('messages').innerHTML = "<div class='chat-header'>" + "{PLACEHOLDER}" + "</div>"
  }


  function loginRequest() {

    username = document.getElementById('username').value
    password = document.getElementById('password').value

    invalidFeedback = document.getElementById('error-message')

    invalidFeedback.textContent = ''

    if(!username || username.trim() == '')
      invalidFeedback.textContent = "Invalid username"
    else if(!password)
      invalidFeedback.textContent = "Invalid password"
    else{

      // ### TODO
      // Check database for a match
      // Last Step
      window.location.href = 'chatClient.html'
    }
    
  }


  function signupRequest() {
    
    username = document.getElementById('username').value.trim()
    password = document.getElementById('password').value
    confirmPassword = document.getElementById('password-confirmation').value

    invalidFeedback = document.getElementById('error-message')

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
      // ### TODO
      // check server for existing username collisions


      // finally
      window.location.href = 'chatClient.html'
    }
  }


  function handleKeyDown(event) {
    const ENTER_KEY = 13
    if (event.keyCode === ENTER_KEY){

      sendMessage()
      event.preventDefault()
    }
  }
  