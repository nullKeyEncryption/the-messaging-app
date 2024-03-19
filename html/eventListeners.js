//Add event listeners
//This function is called after the browser has loaded the web page
document.addEventListener('DOMContentLoaded', function() {
  
    document.getElementById('loginButton').addEventListener('click', userLogin)
    document.getElementById('signupButton').addEventListener('click', userSignup)
    document.getElementById('logoutButton').addEventListener('click', userLogout)

    document.getElementById('messageBox').addEventListener('input', resizeMessageBox)
    document.getElementById('send_button').addEventListener('click', sendMessage)
    document.getElementById('clear_button').addEventListener('click', clearMessages)
  
    //add handlers for the document as a whole, not separate elements.
    document.addEventListener('keydown', handleKeyDown)
  })
  