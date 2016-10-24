var socket = io();

// Configure the socket to listen for our own custom events.
socket.on('vote-count', updateVotes);
socket.on('receive-chat', updateChat);

// Wait for DOMContentLoaded before we attach any click handlers.
document.addEventListener("DOMContentLoaded", function() {
  // emit our custom 'left-vote' and 'right-vote' events
  // whenever someone clicks on a left or right box.
  $("#left").on('click', function() {
    console.log("left click");
    socket.emit('left-vote');
  });

  $("#right").on('click', function() {
    console.log("right click");
    socket.emit('right-vote');
  });

  // Obtain the value in the input box and send it to the server
  // as our custom 'send-chat' event.
  $("form").on('submit', function(e) {
    console.log("submit");
    e.preventDefault();

    var msg = $("#msg").val();
    console.log(msg)
    socket.emit('send-chat', msg);
  })
});

// Receive a new chat message and simply append it to the list of all chats.
function updateChat(msg) {
  console.log(msg);
  var chat = $("<li>").text(msg);
  $("#chatroom").append(chat);
}

// Overwrite the values of the left and write votes with whatever the server
// tells us is the current value.
function updateVotes(msg) {
  console.log(msg);
  $("#left-vote").text(msg.left);
  $("#right-vote").text(msg.right);
}
