Scene.Game = function () {
    this.reg = {};
};

Scene.Game.prototype = {
    render : function(){
        //this.game.debug.body(this.wall);
      
    },
    create : function(){
        //sound

        //  Here we set-up our audio sprite
        this.fxcat = this.game.add.audio('cat');
        //this.fxcat.allowMultiple = true;
        //this.fxcat.addMarker('cat', 0, 2.0);
        this.fxcat.volume = 0.4;

        //  Here we set-up our audio sprite
        this.fxdog = this.game.add.audio('dog');
        //this.fxdog.allowMultiple = true;
        //this.fxdog.addMarker('dog', 2, 4.0);
        this.fxdog.volume = 1;
        
        this.bouncefx = this.game.add.audio('bounce');
        this.bouncefx.volume = 0.3;

        //time
        this.counter = 60;
        this.texttime = 0;
        this.penalty  = 0;
        this.timeBonus = 8;
        
        //score
        this.score = 0;
        this.highScore = 0;
        this.level = 2;
        this.levelScore = [0, 0, 10, 15, 20, 25];

        this.session = new Session;
        if(this.session.get('highScore')) 
            this.highScore = this.session.get('highScore');

        this.checkBox = '';
        this.checkInput = '';
        this.curBox = null;
        this.pressed = false;
        this.touchground = false;
        this.isPenalty = false;
        this.isGameOver = false;

        this.trash = [
            ['green_1', 'green_2'],
            ['yellow_1', 'yellow_2'],
            ['blue_1', 'blue_2'],
            ['white_1', 'white_2'],
            ['black_1', 'black_2'],
            ['red_1', 'red_2'],
        ];

        this.bin = ['btn_green', 'btn_yellow', 'btn_blue', 'btn_white', 'btn_black', 'btn_red'];

        var scaleRatio = window.devicePixelRatio;

         //  A simple background for our game
        this.bg = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY, 'arena');
        this.bg.anchor.setTo(0.5, 0.5);        
        this.bg.scale.setTo(scaleRatio, scaleRatio);

        this.texttime = this.game.add.text(80,60, this.counter , { font: "64px Josefin Sans", fill: "#ffffff", align: "center" });
        //this.text.anchor.setTo(0.5, 0.5);

        this.game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);

        this.textscore = this.game.add.text(this.game.width-200, 100 , "Score : "+this.score, { font: "64px Josefin Sans", fill: "#ffffff", align: "center" });
        this.textscore.anchor.setTo(0.5, 0.5);

        // initiate the modal class
        this.reg.modal = new gameModal(this.game);
        this.createModals();

        //button
        this.setBtn();

        this.game.physics.startSystem(Phaser.Physics.P2JS);
        
          //  Turn on impact events for the world, without this we get no collision callbacks
        this.game.physics.p2.setImpactEvents(true);

          //  Create our collision groups. One for the player, one for the pandas
        this.groundCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.boxCollisionGroup = this.game.physics.p2.createCollisionGroup();

        //  This part is vital if you want the objects with their own collision groups to still collide with the world bounds
        //  (which we do) - what this does is adjust the bounds to use its own collision group.
        //    this.game.physics.p2.updateBoundsCollisionGroup();

        this.groundY = this.game.world.centerY + 70;
        this.ground = this.add.sprite(0, 0, null);
        
        //debug mode
        //this.game.physics.p2.enableBody(this.ground,true);
        this.game.physics.p2.enableBody(this.ground);
        this.game.physics.p2.gravity.y = 4000;

        this.ground.body.addRectangle(this.game.width, this.game.height - (this.groundY - 100), this.game.width/2, this.game.height);
        this.ground.body.kinematic = true;
        this.ground.body.static = false;

        this.wall = this.add.sprite(0, 0, null);
        
        //debug wall
        //this.game.physics.p2.enableBody(this.wall,true);
        this.game.physics.p2.enableBody(this.wall);

       //first wall
        this.wall.body.addRectangle(130*scaleRatio, this.game.height*5 , this.game.world.centerX - (100*scaleRatio), this.game.height/2);
        this.wall.body.kinematic = true;
        //  Set the ships collision group
        this.wall.body.setCollisionGroup(this.groundCollisionGroup);
        this.wall.body.collides([this.boxCollisionGroup, this.groundCollisionGroup]);

        //second wall
        this.wall.body.addRectangle(130*scaleRatio, this.game.height*5 , this.game.world.centerX + (100*scaleRatio), this.game.height/2);
        this.wall.body.kinematic = true;
        
        //  Set the collision group
        this.wall.body.setCollisionGroup(this.groundCollisionGroup);
        this.wall.body.collides([this.boxCollisionGroup, this.groundCollisionGroup]);

        this.signLeft = this.add.sprite(this.game.world.centerX - 400 , this.game.height - 100, 'left');
        this.signLeft.anchor.setTo(0.5);
        this.signLeft.scale.setTo(scaleRatio/3, scaleRatio/3);
        this.signRight = this.add.sprite(this.game.world.centerX + 400 , this.game.height - 100, 'right');
        this.signRight.anchor.setTo(0.5);
        this.signRight.scale.setTo(scaleRatio/3, scaleRatio/3);

        this.boxs = this.game.add.group();
        this.game.physics.arcade.enable([this.ground, this.boxs]);

        //  Set the ships collision group
        this.ground.body.setCollisionGroup(this.groundCollisionGroup);
        this.ground.body.collides(this.boxCollisionGroup, this.groundHit , this);
        
        this.spriteLeft = 'green';
        this.spriteRight = 'yellow';

        for(var i = 1; i <= 6 ; i++){
            this.initBox(0 -200*i ); 
        }
   
    },
    
    update : function(){
        if(!this.isGameOver && !this.isPenalty && this.pressed && this.touchground && this.curBox != null){
            //console.log('box: ' + this.checkBox);console.log('input: ' + this.checkInput);
            if(this.checkBox == this.checkInput){
                this.pressed = false;
                this.touchground = false;
                //console.log("count "+this.boxs.total);

                this.initBox(-200);
                this.curBox.sprite.kill();
               
                this.score++;
                this.textscore.setText("Score : "+this.score);

                if(this.levelScore.length > this.level && this.score >= this.levelScore[this.level]){
                    this.level++;
                }

                if(this.score % 10 == 0){
                    this.counter+=this.timeBonus;
                    this.reg.modal.showModal("time");
                }
            }
            else{
                //console.log("Wrong");
                this.isPenalty = true;
                this.reg.modal.showModal("wrong");
                this.penalty = 2;
            }
        }

    },

    updateCounter : function() {
        if(!this.isGameOver){
            if(this.counter > 0){
            
                this.counter--;
                this.reg.modal.hideModal("time");
            
            }
            else{
                if(this.score > this.highScore){
                    this.highScore = this.score;
                    this.session.set('highScore', this.highScore);
                }
                this.isGameOver = true;
                this.createModals();
                this.reg.modal.hideModal("wrong");
                this.reg.modal.showModal("game over");
            }
           
            this.texttime.setText(this.counter);
            
            if(this.penalty > 0){
                this.penalty--;
                
            }
            else if(this.penalty == 0){
                this.isPenalty = false;
                this.reg.modal.hideModal("wrong");
                this.penalty = -1;
            }
           // console.log(this.penalty);
        }
    
    },

    createModals : function(){
         //////// modal test ////////////
        this.reg.modal.createModal({
            type: "game over",
            includeBackground: true,
            modalCloseOnInput: false,
            itemsArr: [
                {
                    type: "text",
                    content: "Try Again?",
                    fontFamily: "Josefin Sans" ,
                    fontSize: 42,
                    color: "0xFEFF49",
                    offsetY: -100
                },
                {
                    type: "text",
                    content: this.score.toString(),
                    fontFamily: "Josefin Sans" ,
                    fontSize: 42,
                    color: "0xFEFF49",
                    offsetY: -250
                },
                {
                    type: "text",
                    content: "High Score: " + this.highScore.toString(),
                    fontFamily: "Josefin Sans" ,
                    fontSize: 42,
                    color: "0xFEFF49",
                    offsetY: -200
                },
                {
                    type: "image",
                    content: "gameover",
                    offsetX: 0,
                    offsetY: 50,
                    contentScale: 0.6,
                    callback: function() {
                        this.game.state.restart();
                    }
                },

                /*{
                    type: "image",
                    content: "share",
                    offsetX: 150,
                    offsetY: 50,
                    contentScale: 0.6,
                    callback: function() {
                      // shareScore(globalScore);
                       modal.style.display = "block";
                    /*   var txt;
                       var r = confirm("Press a button!");
                       if (r == true) {
                          // txt = "You pressed OK!";
                            shareScore(globalScore);
                        } else {
                           txt = "You pressed Cancel!";
                       }
                       alert(txt);
                       
                    }
                }*/
            ]
        });

        this.reg.modal.createModal({
            type: "wrong",
            includeBackground: true,
            modalCloseOnInput: false,
            itemsArr: [
                {
                    type: "image",
                    content: "oops",
                    offsetY: 70,
                    contentScale: 0.6,
                }
            ]
        });

        this.reg.modal.createModal({
            type: "time",
            includeBackground: false,
            modalCloseOnInput: false,
            itemsArr: [
                {
                    type: "text",
                    content: "+" + this.timeBonus.toString() + " Sec",
                    fontFamily: "Josefin Sans" ,
                    fontSize: 80,
                    color: "0xFEFF49",
                    offsetY: 80,
                    offsetX: -100,
                }
            ]
        });



    },


    groundHit : function(ground,box){
        this.touchground = true;
        this.checkBox = box.sprite.key.split('_')[0];
        this.curBox = box;


        var rand = Math.floor(Math.random() * 100);
        if(rand < 50){
            this.btnLeft.loadTexture('btn_' + this.checkBox);
            this.spriteLeft = this.checkBox;

            while(1){
                var index = Math.floor(Math.random() * this.level);
                var btn = this.bin[index];
                if(btn != ('btn_' + this.checkBox)){
                    this.btnRight.loadTexture(btn);
                    this.spriteRight = btn.split('_')[1];
                    break;
                }
            }
        }
        else{
            this.btnRight.loadTexture('btn_' + this.checkBox);
            this.spriteRight = this.checkBox;

            while(1){
                var index = Math.floor(Math.random() * this.level);
                var btn = this.bin[index];
                if(btn != ('btn_' + this.checkBox)){
                    this.btnLeft.loadTexture(btn);
                    this.spriteLeft = btn.split('_')[1];
                    break;
                }
            }
        }

        this.bouncefx.play();
    },

    initBox(height){
        var rand = Math.floor(Math.random() * this.level);
        var rand2 = Math.floor(Math.random() * 100);
        var index = (rand2 < 50) ? 0 : 1;

        var obj = this.trash[rand][index];
        this.createBox(obj, this.game.world.centerX, height);
    },

    setBtn : function(){
        var scaleRatio = window.devicePixelRatio/3;

        /***/
        this.btnLeft = this.add.sprite(this.game.world.centerX - 200 , this.game.height - 100, null);
        this.btnLeft.anchor.setTo(0.5);

        this.btnRight = this.add.sprite(this.game.world.centerX + 200 , this.game.height - 100, null);
        this.btnRight.anchor.setTo(0.5);
        this.btnRight.scale.x *= -1;

        this.btnLeft.inputEnabled = true;
        this.btnLeft.events.onInputDown.add(function(){
            this.pressKey('left', 0.7, true);
            this.fxcat.play();
        }, this);
        this.btnLeft.events.onInputUp.add(function(){
            this.pressKey('left', 1, false);
        }, this);
        this.keyLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.keyLeft.onDown.add(function(){
            this.pressKey('left', 0.7, true);
            this.fxcat.play();
        }, this);
        this.keyLeft.onUp.add(function(){
            this.pressKey('left', 1, false);
        }, this);

        this.btnRight.inputEnabled = true;
        this.btnRight.events.onInputDown.add(function(){
            this.pressKey('right', 0.7, true);
            this.fxdog.play();
        }, this);
        this.btnRight.events.onInputUp.add(function(){
            this.pressKey('right', 1, false);
        }, this);
        this.keyRight = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.keyRight.onDown.add(function(){
            this.pressKey('right', 0.7, true);
            this.fxdog.play();
        }, this);
        this.keyRight.onUp.add(function(){
            this.pressKey('right', 1, false);
        }, this);
    },

    pressKey : function(action, opacity, pressed){
        var checkInputBox = '';
        if(pressed)
            checkInputBox = (action == 'left') ? this.spriteLeft : this.spriteRight;
        this.action(action, opacity);
        this.checkInputBox(checkInputBox);
        this.pressed = pressed;
        // console.log("state "+ this.pressed);
    },

    action : function(obj, opacity){
        if(obj == 'left'){
            this.btnLeft.alpha = opacity;
        }
        else if(obj == 'right'){
            this.btnRight.alpha = opacity;
        }
    },

    checkInputBox : function(input){
        this.checkInput = input;
    },

    createBox : function(boxSprite, x, y){ 
        //set no first elements in the group of boxs
        var box = this.boxs.getFirstExists(false);
        box = new Box(this.game, 0, 0, boxSprite);
        box.body.setCollisionGroup(this.boxCollisionGroup);

        box.body.collides([this.boxCollisionGroup, this.groundCollisionGroup]);

        this.boxs.add(box);
        box.reset(x, y);
        box.revive();
        
    },

};