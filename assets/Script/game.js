cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        // this property quotes the PreFab resource of stars
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        // the random scale of disappearing time for stars
        maxStarDuration: 0,
        minStarDuration: 0,
        // ground node for confirming the height of the generated star's position
        ground: {
            default: null,
            type: cc.Node
        },
        // player node for obtaining the jump height of the main character and controlling the movement switch of the main character
        player: {
            default: null,
            type: cc.Node
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
         scoreAudio: {
            default: null,
            url: cc.AudioClip
        }
    },

    // use this for initialization
     onLoad: function () {
        // obtain the anchor point of ground level on the y axis
        var self = this;
         this.timer = 0;
        this.starDuration = 0;
        
        this.groundY = this.ground.y + this.ground.height/2;   // this.ground.top may also work
        // generate a new star
        this.spawnNewStar();
        this.score = 0;
        
       
         setTimeout(function () { 
             var _model = require('model');
            _model.start();
         }, 3);
        
        
    },
    
    spawnNewStar: function() {
        // generate a new node in the scene with a preset template
        var newStar = cc.instantiate(this.starPrefab);
        // put the newly added node under the Canvas node
        this.node.addChild(newStar);
        // set up a random position for the star
        newStar.setPosition(this.getNewStarPosition());
        
         // deliver the concrete example of the Game component into the star component
        newStar.getComponent('Star').game = this;
        
        this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
        
       
        //  self.ws = new WebSocket("ws://45.76.97.239:7000/gamesocket/aa_123123123");
        // self.ws.onopen = function (event) {
        //     console.log("Send Text WS was opened."+event); 
            
        // }; 
        // self.ws.onmessage = function (event) { 
        //     console.log("response text msg: " + event.data); 
            
        // };
        // self.ws.onerror = function (event) { console.log("Send Text fired an error"); }; 
        // self.ws.onclose = function (event) { console.log("WebSocket instance closed."); };
        
        //  if (self.ws.readyState === WebSocket.OPEN) { 
        //           console.log("Hello WebSocket, I'm a text message."); } 
        //     else {
        //           console.log("WebSocket instance wasn't ready..."); } 
    },

    getNewStarPosition: function () {
        
        var randX = 0;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = this.groundY + cc.random0To1() * this.player.getComponent('Player').jumpHeight;// + 50;
        // according to the width of the screen, randomly obtain an anchor point of star on the x axis
        var maxX = this.node.width/2;
        randX = cc.randomMinus1To1() * maxX;
        // return to the anchor point of the star
        return cc.p(randX, randY);
    },
    
    gainScore: function () {
        this.score += 1;
        // update the words of the scoreDisplay Label
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
       cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    gameOver: function () {
        this.player.stopAllActions(); // stop the jumping action of the player node
       // cc.director.loadScene('myhellow');
    },
    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
         
         if (this.timer > this.starDuration) {
            this.gameOver();
            return;
        }
        this.timer += dt;
        
         
            
     }
});
