//Add event listeners for button and key functionalities

//This function is called after the browser has loaded the web page
document.addEventListener('DOMContentLoaded', function() {

  // Main page buttons
  if(document.getElementById('loginButton')){

    // User authentication buttons
    document.getElementById('loginButton').addEventListener('click', userLogin)
    document.getElementById('signupButton').addEventListener('click', userSignup)
    document.getElementById('logoutButton').addEventListener('click', userLogout)

    // Main page messaging buttons
    document.getElementById('messageBox').addEventListener('input', resizeMessageBox)
    document.getElementById('send_button').addEventListener('click', sendMessage)
    document.getElementById('clear_button').addEventListener('click', clearMessages)
    
    //add handlers for the page as a whole, not to separate elements.
    document.addEventListener('keydown', handleKeyDown)
  }

  // Sign up page buttons
  else if(document.getElementById('signup-submit-button')){
    document.getElementById('signup-submit-button').addEventListener('click', signupRequest)
    document.getElementById('toggle-password').addEventListener('click', toggleShowPassword)
    document.addEventListener('keydown', submitSignup) // Enter button to submit form
  }

  // Log in page buttons
  else if(document.getElementById('login-submit-button')){
    document.getElementById('login-submit-button').addEventListener('click', loginRequest)
    document.getElementById('toggle-password').addEventListener('click', toggleShowPassword)
    document.addEventListener('keydown', submitLogin) // Enter button to submit form
  }
})
  