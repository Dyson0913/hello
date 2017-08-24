
//font


//dictionary
var Scene={}; //Scene
var font={};


var current_view_name;
//loging & lobby
var login_name;
var login_pw;
var uuid;
var game_list;
var join_game;
var join_group;
var game_id;
var total_Credit;

//joined game state
var gameState;

//game command
var take_in_gamePoint;

//eash game
var line;  //幾輪幾線的線
var symbol_num; //總symbol 數量
var odds;  //賠率表 symbol_N{N0~NM):[中1格倍率,2格,3格,4格,5格] 
                   //(W= wild card):[0,20,200,500,1000] 
                   //(F= free game):[0,0,5,10,15] (免費轉動次數)
                   //(B=bouns game):[0,0,1,2,3] (bounds game 種類)
//顥示賠率表用,不計算
var winAniSet;

var hint_msg;
var betamount;

//model 最先建立

var model = {//function ()

    //this.instance = undefined;

    // this.login_ok  =  new signals.Signal();
    // this.lobbylist_getok  =  new signals.Signal();
    // this.in_game =  new signals.Signal();

    // //lobby
    // this.creditUpdate =  new signals.Signal();

    // //game share
    // this.cashin =  new signals.Signal();    
    // this.gameStateUpdate = new signals.Signal();
    // this.countDown = new signals.Signal();
    // this.betCancel = new signals.Signal();
    // this.betok = new signals.Signal();    
    // this.betResult = new signals.Signal();
    // this.betBtnApear = new signals.Signal();
    // this.betTimeout = new signals.Signal();
    // this.pokerShow = new signals.Signal();
    // this.settleInfo = new signals.Signal();

    // //game self
    // this.spinResult =  new signals.Signal();
    // this.rollercomplet =  new signals.Signal();
    // this.rollerAnicomplet =  new signals.Signal();
    
         
    // this.comfirmHint =  new signals.Signal();

    // //viewclose
    // this.openview =  new signals.Signal();
    // this.closeview =  new signals.Signal();

    // this.socket = undefined;
    // this.odds = [];
    // this.winAniSet = [];

    // this.gameState = ["init","wait_bet","player_card","banker_card","settle"];
    
    init: function () {
        // ...
      // this.dicVaule={};
      cc.log('model init');
      this.dicVaule={};
        
       //this.sign_login_ok  =  new notify.signals.Signal();
    },
    
    start: function ()
    {
        //cc.log('model start');
        var socket = require('socket')
        
       //this.sign_login_ok  =  new notify.signals.Signal();// new notify.signals.Signal();
        socket.Connect();
        //this.socket.Connect();
    },
    
    pushValue : function(key,value)
    {
        this.dicVaule[key] = value    
    },
    
    getValue : function(key)
    {    
        return this.dicVaule[key]
    },
    
    eventHandle : function (msgtype,data)
    {
        console.log("response text msgtype: " + msgtype);
        console.log("response text data: " + data);
    },

};


module.exports = model;
