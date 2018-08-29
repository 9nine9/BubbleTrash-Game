Scene.Preload = function () {};
//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    //active: function() { this.game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Revalia','Josefin Sans']
    }

};
Scene.Preload.prototype = {
    
    preload : function (){
        this.game.load.audio('BackSound', 'assets/audio/BackSound.mp3');
        this.game.load.audio('StorySound', 'assets/audio/StorySound.mp3');

        this.load.image('comic1','assets/images/story/comic1.png');
        this.load.image('comic2','assets/images/story/comic2.png');
        this.load.image('comic3','assets/images/story/comic3.png');
        this.load.image('comic4','assets/images/story/comic4.png');

        this.load.image('menuBin','assets/images/character/yellow.png');
        this.load.image('menuTrash','assets/images/character/plastic.png');
        //this.load.image('backMenu','assets/images/background/bg1.png');
        this.load.image('arena','assets/images/background/bg1.png');
        this.load.image('btnPlay','assets/images/button/play-btn.png');
        this.load.image('btnLearn','assets/images/button/learn-btn.png');
        this.load.image('btnStory','assets/images/button/story-btn.png');
        this.load.image('btnBack','assets/images/button/back-btn.png');

        this.load.image('gameover','assets/images/button/retry.png');
        this.load.image('share','assets/images/button/share.png');
        this.load.image('oops','assets/images/button/wrong.png');

        this.load.image('btn_green','assets/images/button/green.png');
        this.load.image('btn_yellow','assets/images/button/yellow.png');
        this.load.image('btn_blue','assets/images/button/blue.png');
        this.load.image('btn_white','assets/images/button/white.png');
        this.load.image('btn_black','assets/images/button/black.png');
        this.load.image('btn_red','assets/images/button/red.png');

        this.load.image('left','assets/images/button/left.png');
        this.load.image('right','assets/images/button/right.png');


        //this.game.load.audio('cat', 'assets/audio/cat.wav');
        //this.game.load.audio('dog', 'assets/audio/dog.wav');
        this.game.load.audio('munch', 'assets/audio/munch.mp3');
        this.game.load.audio('bounce', 'assets/audio/bounce.wav');


        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        this.load.onLoadStart.add(this.loadStart, this);
        this.load.onLoadComplete.add(this.loadComplete, this);
    },
    
    create : function(){
        BackSound = this.game.add.audio('BackSound');
        BackSound.volume = 0.7;
    },
    update : function(){
        if(this.ready === true){
            if(this.game.input.activePointer.isDown){
                BackSound.play();
                this.state.start('MainMenu');
            }

            this.loadingText.setText("Click The Screen");
            this.timer += this.game.time.elapsed;
            //this is in ms, not seconds.
            if (this.timer >= 500){
                this.timer -= 500;       
                this.loadingText.visible = !this.loadingText.visible;    
            }

            
        }
    },
    loadStart : function (){

        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'backLoad');
        
        var trash = [
            ['green_1', 'green_2'],
            ['yellow_1', 'yellow_2'],
            ['blue_1', 'blue_2'],
            ['white_1', 'white_2'],
            ['black_1', 'black_2'],
            ['red_1', 'red_2'],
        ];

        var trashText = [
            ['green_1', 'green_2'],
            ['yellow_1', 'yellow_2'],
            ['blue_1', 'blue_2'],
            ['white_1', 'white_2'],
            ['black_1', 'black_2'],
            ['red_1', 'red_2'],
        ];

        var rand = Math.floor(Math.random() * 6);
        var rand2 = Math.floor(Math.random() * 100);
        var index = (rand < 50) ? 0 : 1;
        var obj = trash[rand][index];

        this.splash = this.add.sprite(this.game.world.centerX , this.game.world.centerY , obj);
        this.splash.anchor.setTo(0.5);
        //this.splash.scale.setTo(window.devicePixelRatio/5, window.devicePixelRatio/5);
        this.startBounce();  

        var loadingText = 'Loading';
        this.loadingText = this.add.text(this.game.world.centerX, (this.game.world.centerY + this.splash.height / 2 + 70), loadingText);
        this.loadingText.anchor.setTo(0.5);
        this.loadingText.font = 'Revalia';
        this.loadingText.fontSize = window.devicePixelRatio*32;
        this.loadingText.fill = '#fff';
        this.loadingText.align = 'center';

        /*var whatText = (rand < 50) ? 
            'Miko is a cat.\nSstt, or you will get a scratch on your cheek.. Uulala..\n"Miaw miauw miauww!!" - Miko' : 
            'What do you see, hah?\nGo home kidz, or Sidog will bites you like a b*tch.\n"Augh aug ough!!" - Sidog';
*/
        var whatText = trashText[rand][index];

        this.whatText = this.add.text(this.game.world.centerX, (this.game.height - 100), whatText);
        this.whatText.anchor.setTo(0.5);
        this.whatText.font = 'Times New Roman';
        this.whatText.fontSize = window.devicePixelRatio*16;
        this.whatText.fill = '#fff';
        this.whatText.align = 'center';
    },
    loadComplete : function (){
        this.ready = true;
        this.timer = 0;
    },

    startBounce : function () {
      var bounce = this.add.tween(this.splash.position);

      bounce.to( {y: this.splash.position.y - 100}, 2200, Phaser.Easing.Back.InOut, true, 0, 20, true).loop(true);
      bounce.onComplete.add(this.startBounce, this);
      bounce.start();
    }
};