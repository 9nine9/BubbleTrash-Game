var Scene = function() {};

Scene.Boot = function () {};
Scene.Boot.prototype = {  

    preload : function () {
        this.load.image('backLoad','assets/images/background/bce.png');
        
        this.load.image('green_1','assets/images/character/banana.png');
        this.load.image('green_2','assets/images/character/root.png');
        this.load.image('yellow_1','assets/images/character/plastic.png');
        this.load.image('yellow_2','assets/images/character/bottle.png');
        this.load.image('blue_1','assets/images/character/paper.png');
        this.load.image('blue_2','assets/images/character/tissue.png');
        this.load.image('white_1','assets/images/character/lamp.png');
        this.load.image('white_2','assets/images/character/mirror.png');
        this.load.image('black_1','assets/images/character/screw.png');
        this.load.image('black_2','assets/images/character/can.png');
        this.load.image('red_1','assets/images/character/battery.png');
        this.load.image('red_2','assets/images/character/battery.png');

    },
    
    create : function () {
        // set max touch pointers 
        this.input.maxPointers = 1;
        
        if(this.game.device.desktop){
            //if you have any desktop specifics they can go in here
            this.scale.pageAlignHorizontally = true ;
        } 
        else {
          //  Same goes for mobile settings.
          //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
          this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
          this.scale.minWidth = 568;
          this.scale.minHeight = 600;
          this.scale.maxWidth = 2048;
          this.scale.maxHeight = 1536;
          this.scale.forceLandscape = true;
          this.scale.pageAlignHorizontally = true;
          //this.scale.setScreenSize(true);
        }

        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        this.state.start('Preload'); 
        
    },

    
};
