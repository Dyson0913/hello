
var _model = require('model');

var socket = function ()
{
   // this.name = 'websocket';
    self = this;
     cc.log("socket init ");
};


socket.Connect = function ()
{
   
    //_model = model.getInstance();
    //var token = _model.login_name +"_"+ _model.login_pw;    
     
     var time = _model.getValue("time")
    var token = time
     cc.log(time);
    
    // if(self.ws != undefined)
    // {
    //     //no more create
    //      var msg = {"client_id": _model.uuid,"module":"auth","cmd":"try_login","token":token};
    //     self.sendMessage(JSON.stringify(msg));
    //     return
    // }

    //create  socket
    var url = "ws://45.76.97.239:9000/gamesocket/"+token;
    
    self = this;
    self.ws = new WebSocket("ws://45.76.97.239:9000/gamesocket/aa_123123123");
    self.ws.binaryType = 'arraybuffer';
    self.ws.onopen = self.connectionOpen.bind(self);
    self.ws.onmessage = self.onMessage.bind(self);
    self.ws.onclose = self.socketClose.bind(self);
    self.ws.onerror = self.onError.bind(self);
    //self.ws.readyState === WebSocket.OPEN
};


socket.connectionOpen = function ()
{    
    console.log("Send Text WS was opened."+event); 

    //var retjson = JSON.stringify(ret);
    //this.ws.send(retjson)
};

socket.onMessage = function (event)
{
    console.log("response text msg: " + event.data);

    var data = proto.msg.lobby.deserializeBinary(event.data);
    var p = new proto.msg.lobby();
    p.setId("10");
    self.ws.send(p.serializeBinary());
    //var data = JSON.parse(message.data);
     _model.eventHandle(1,["123","356"]);
   
};

socket.sendMessage = function (msg)
{
    if(self.ws != null) self.ws.send(msg);
}

socket.socketClose = function(msg)
{
    console.log('Websocket onclose: ' + msg);
};

socket.onError = function(msg)
{
    console.log('Websocket onError: ' + msg);
};

module.exports = socket;
