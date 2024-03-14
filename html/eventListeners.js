//Add event listeners
document.addEventListener('DOMContentLoaded', function() {
    //This function is called after the browser has loaded the web page
  
    //add listener to buttons
    document.getElementById('send_button').addEventListener('click', sendMessage)
    document.getElementById('username_button').addEventListener('click', validateUsername)
    document.getElementById('clear_button').addEventListener('click', clearMessages)
  
    //add keyboard handler for the document as a whole, not separate elements.
    document.addEventListener('keydown', handleKeyDown)
  })
  