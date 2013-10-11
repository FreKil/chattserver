var url = document.getElementById('url'),
    connect = document.getElementById('connect'),
    close = document.getElementById('close'),
    sendMess = document.getElementById('send_message'),
    display = document.getElementById('log'),
    websocket;
 
// Event handler to create the websocket connection when someone clicks the button #connect
connect.addEventListener('click', function(event) {
  if(websocket){
    websocket.close();
  }
  console.log('Connecting to: ' + url.value);
  websocket = new WebSocket(url.value, 'broadcast-protocol');
 
  // Eventhandler when the websocket is opened.
  websocket.onopen = function() {
    display.innerHTML += "<p>" + getClock() + "<span class=\"user\"> System>> </span>En anslutning till servern har upprättats!</p>";
  }
 
  websocket.onmessage = function(event) {
    checkMessage(event.data);
  }
 
  // Eventhandler when the websocket is closed.
  websocket.onclose = function() {
    display.innerHTML += "<p>" + getClock() + "<span class=\"user\"> System>> </span>Anslutningen till servern har kopplats ifrån!</p>";
  }
} , false);

close.addEventListener('click', function(){
  websocket.close();
}, false);

// Add eventhandler to send message
sendMess.addEventListener('submit', function(event) {

  if(!websocket || websocket.readyState === 3) {
    display.innerHTML += "<p>" + getClock() + "<span class=\"user\"> System>> </span><span class=\"error\">ERROR </span> Ingen anslutning till servern existerar!</p>";
  } 
  else {
    var element = document.getElementById('message');
    var message = element.value;
    element.value = "";
    message = message.replace(/^\s+|\s+$/g,'')
    if(message != ""){
      websocket.send(message);
    }      
  }
  event.preventDefault();

});

function checkMessage(message){
  try{
    messObj = JSON.parse(message);
    display.innerHTML += "<p>" + getClock(messObj.time) + " <span class=\"user\">" + messObj.user + ">></span> " + messObj.message + "</p>"; 
  }
  catch(e){
    display.innerHTML += "<p>" + getClock() + " Mottaget meddelande: " + message + "</p>";
  }
}

function getClock(inpDate){
  var date = (inpDate) ? new Date(inpDate) : new Date();
  return "<span class=\"clock\">[" + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2)+ "]</span>";

}