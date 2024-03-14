
function validateUsername() {

    let username = document.getElementById('username').value.trim()
  
    // Check if the user entered username is valid
    // Regex syntax from: https://bobbyhadz.com/blog/javascript-check-if-character-is-letter
    if((username !== '') && (!username.includes(" ")) && (/^[a-z]+$/.test(username.charAt(0).toLowerCase()))){
  
      isUsernameValid = true;
      sendValidUsernameInfo(username) // send info to server if username is valid
    }
    else {
  
      isUsernameValid = false
      document.getElementById('username').value = "" // clean text area
    }
  
    if(isUsernameValid){
      alert("You have successfully connected to the server")
    }
    else{
      alert("Username is not valid. Please try again")
    }
  }
  
  // Clear the messages from users' screen -excluding the message that shows the user is connected to the chat server
  function clearMessages() {
  
    document.getElementById('messages').innerHTML = "<div>You are connected to CHAT SERVER</div>"
  }
  
  function handleKeyDown(event) {
    const ENTER_KEY = 13 //keycode for ENTER key
    if (event.keyCode === ENTER_KEY) {
      sendMessage()
      return false //don't propogate event
    }
  }
  