Scene.MainMenu = function () {};

Scene.MainMenu.prototype = {
    
    create : function(){
        
        
        var scaleRatio = window.devicePixelRatio;

        this.backMenu = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY, 'arena');
        this.backMenu.anchor.setTo(0.5, 0.5);
        this.backMenu.scale.setTo(scaleRatio, scaleRatio);

        var titleText = 'Bubble Trash';
        this.titleText = this.add.text(this.game.world.centerX, 100, titleText);
        this.titleText.anchor.setTo(0.5);
        //this.titleText.scale.setTo(scaleRatio/2, scaleRatio/2);
        this.titleText.font = 'Revalia';
        this.titleText.fontSize = (scaleRatio/2)*100;
        this.titleText.fill = '#fff';
        this.titleText.align = 'center';


        this.sidogMenu = this.add.sprite(this.game.world.centerX + 70, this.game.world.centerY , 'menuTrash');
        this.sidogMenu.anchor.setTo(0.5); 
        this.sidogMenu.scale.setTo(window.devicePixelRatio/2.5, window.devicePixelRatio/2.5);

        this.mikoMenu = this.add.sprite(this.game.world.centerX - 60, this.game.world.centerY + 50, 'menuBin');
        this.mikoMenu.anchor.setTo(0.5); 
        this.mikoMenu.scale.setTo(window.devicePixelRatio, window.devicePixelRatio);

        this.btnPlay = this.add.sprite(this.game.world.centerX, this.game.height - 100 , 'btnPlay');
        this.btnPlay.anchor.setTo(0.5); 
        this.btnPlay.scale.setTo(window.devicePixelRatio/3, window.devicePixelRatio/3);
        this.btnPlay.inputEnabled = true;
        this.btnPlay.events.onInputDown.add(this.play, this);  

        this.btnLearn = this.add.sprite(this.game.world.centerX + 300, this.game.height - 100 , 'btnLearn');
        this.btnLearn.anchor.setTo(0.5); 
        this.btnLearn.scale.setTo(window.devicePixelRatio/3, window.devicePixelRatio/3);
        this.btnLearn.inputEnabled = true;
        this.btnLearn.events.onInputDown.add(this.learn, this);  

        this.btnStory = this.add.sprite(this.game.world.centerX - 300, this.game.height - 100 , 'btnStory');
        this.btnStory.anchor.setTo(0.5); 
        this.btnStory.scale.setTo(window.devicePixelRatio/3, window.devicePixelRatio/3);
        this.btnStory.inputEnabled = true;
        this.btnStory.events.onInputDown.add(this.story, this);  

        var playText = 'Click Play Button to Start';
        this.playText = this.add.text(this.game.world.centerX, (this.game.height - 40), playText);
        this.playText.anchor.setTo(0.5);
        this.playText.font = 'Revalia';
        this.playText.fontSize = window.devicePixelRatio*20;
        this.playText.fill = '#fff';
        this.playText.align = 'center';
        this.timer = 0;
        //this.play();
    },
    
    update : function(){
        this.timer += this.game.time.elapsed;
            //this is in ms, not seconds.
            if (this.timer >= 500){
                this.timer -= 500;       
                this.playText.visible = !this.playText.visible;    
            }
    },

    play : function(){
        this.state.start('Game');
    },


    learn : function(){
        this.state.start('Learn');
    },


    story : function(){
        this.state.start('Story');
    }
};