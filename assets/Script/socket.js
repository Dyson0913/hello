
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
   // self.ws = new WebSocket("ws://45.76.97.239:9000/gamesocket/aa_123123123");
    self.ws = new WebSocket("ws://192.168.0.21:3653");
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
     self.simulate_msg();
};

socket.onMessage = function (event)
{
    //console.log("response text msg: " + event.data);

    var byteArray = new Uint8Array(event.data);

    //表頭解析 | protoc type |body len | msg_protoc | body data 
    var protoc_type = byteArray.slice(0,1);
    var body_leng = byteArray.slice(1,4);
    var msg_protoc = byteArray.slice(4,8);

    //消息內容解析
    var body_data = byteArray.slice(8,byteArray.byteLength);
    var data = proto.msg.lobby.deserializeBinary(body_data.buffer);
    console.log("data = "+data.getId());

    self.simulate_msg();

    //var data = JSON.parse(message.data);
    // _model.eventHandle(1,["123","356"]);
   
};

//
socket.simulate_msg = function()
{
    var p = new proto.msg.lobby();
    p.setId("dyson");
   
    var data = p.serializeBinary();
    var header = self.header(0,data.length+4,1,128);
    
    
    var c = new Uint8Array(header.length + data.length);
    c.set(header);
    c.set(data, header.length);
    console.log("msg protocal : " + c);
   
     self.ws.send(c);
   
}

// |proto type | body length| msg protocal| data 
// |00         | 00  00  04 |  23 01 00 01| data... 
// |1 byte     |3 byte      | S3010001... |
//  type 协议类型： 0：protobuf
//  len :协议包体长度，大端整数
//  body :消息内容
socket.header = function(prot_tpye =0,body_length,game_id,game_msg_id)
{
    var array = new Uint8Array(8);
    array[0] = prot_tpye;
    //1,2 
    array[3] = body_length;

    //1:S   服务端发送的协议 ,2:C 客户端发送的协议 ,3:I 服务端或客户端内部通讯协议 ,4-F 保留类型
    //第二位: 0:系统或架构级别的协议 ,1,通用协议 ,2:未使用,3:内部游戏协议（内部游戏协议三四位表示游戏类型，例如01表示斗地主，余下各位为协议标识号） ,4-F   未使用
    var protocal_type = 2*10;
    var protocal_Level = 3;
    array[4] = protocal_type+protocal_Level;
    array[5] =game_id;
    array[6] =game_msg_id / 100;
    array[7] =game_msg_id % 100;
    return array;
}

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
