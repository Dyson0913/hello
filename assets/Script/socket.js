

//var _model;



var socket = function ()
{
   // this.name = 'websocket';
    self = this;
     cc.log("socket init ");
};


socket.Connect = function ()
{
   // cc.log(self.name);
    //_model = model.getInstance();
    //var token = _model.login_name +"_"+ _model.login_pw;    
     var _model = require('model');
     var time = _model.getValue("time")
    var token = time
    
    
    // if(self.ws != undefined)
    // {
    //     //no more create
    //      var msg = {"client_id": _model.uuid,"module":"auth","cmd":"try_login","token":token};
    //     self.sendMessage(JSON.stringify(msg));
    //     return
    // }

    //create  socket
    var url = "ws://45.76.97.239:9000/gamesocket/"+token;
    // self.ws = new WebSocket(url);
   cc.log("reday to connect "+token);
     //self.ws.onopen = self.connectionOpen.bind(self);
    // self.ws.onmessage = self.onMessage.bind(self);
    // self.ws.onerror = self.displayError.bind(self);
    // self.ws.onclose = self.socketclose.bind(self);

      self.ws = new WebSocket("ws://45.76.97.239:9000/gamesocket/aa_123123123");
     self.ws.onopen = function (event) {
         console.log("Send Text WS was opened."+event); 
            
     }; 
         self.ws.onmessage = function (event) { 

             console.log("response text msg: " + event.data);
             let protobuf = require("protobufjs");
             let builder = protobuf.newBuilder();
             //protobuf.protoFromFile("lobby.proto",builder);
             protobuf.protoFromFile(cc.url.raw('resources/lobby.proto'),builder);
             let PB = builder.build('msg');
           
             console.log("response text msg: " + typeof(event.data)); 
              var buf ;


             var msgObj = new PB.lobby();
             msgObj.id = "ss";
             msgObj.name = "ihowe";
             msgObj.enterTime ="aa";
             var buffer = msgObj.toArrayBuffer();
             let p = PB.lobby.decode(event.data);
             
             console.log("response text msg: " + p.id);
             console.log("response text msg: " + p.name);
             console.log("response text msg: " + p.enterTime);
          
         };
         self.ws.onerror = function (event) { console.log("Send Text fired an error"); }; 
         self.ws.onclose = function (event) { console.log("WebSocket instance closed."); };
        
          if (self.ws.readyState === WebSocket.OPEN) { 
                   console.log("Hello WebSocket, I'm a text message."); } 
             else {
                   console.log("WebSocket instance wasn't ready..."); } 
};




socket.connectionOpen = function ()
{    
    var ret = {};
    
    //var retjson = JSON.stringify(ret);
    //this.ws.send(retjson)
};

socket.onMessage = function (message)
{
    var data = JSON.parse(message.data);
  // _model.eventHandle(data["state"],[data]);
   
};

socket.sendMessage = function (msg)
{
   // if(self.ws != null)
     //self.ws.send(msg);
}

socket.socketclose = function(msg)
{
    trace('Websocket onclose: ' + msg);
};

module.exports = socket;
