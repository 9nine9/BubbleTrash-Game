Scene.Story = function () {};

Scene.Story.prototype = {
    create : function(){
        var scaleRatio = window.devicePixelRatio;

        var sizeComic = scaleRatio;
        if(window.innerWidth < window.innerHeight){
            sizeComic = scaleRatio/2
        }

        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'backLoad');

        this.currentComic = 1;
        this.comic = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'comic'+this.currentComic);
        this.comic.anchor.setTo(0.5, 0.5);
        this.comic.scale.setTo(sizeComic, sizeComic);

        this.btnBack = this.add.sprite(this.game.world.centerX, this.game.height - 50 , 'btnBack');
        this.btnBack.anchor.setTo(0.5); 
        this.btnBack.scale.setTo(window.devicePixelRatio/3, window.devicePixelRatio/3);
        this.btnBack.inputEnabled = true;
        this.btnBack.events.onInputDown.add(this.back, this);

        this.btnLeft = this.add.sprite(200, this.game.height - 100, null);
        this.btnLeft.anchor.setTo(0.5); 
        this.btnLeft.scale.setTo(window.devicePixelRatio/3, window.devicePixelRatio/3);
        this.btnLeft.inputEnabled = true;
        this.btnLeft.events.onInputDown.add(this.prev, this);

        this.btnRight = this.add.sprite(window.innerWidth - 200, this.game.height - 100, 'right');
        this.btnRight.anchor.setTo(0.5); 
        this.btnRight.scale.setTo(window.devicePixelRatio/3, window.devicePixelRatio/3);
        this.btnRight.inputEnabled = true;
        this.btnRight.events.onInputDown.add(this.next, this);

    },

    back: function(){
        this.state.start('MainMenu');
    },

    prev: function(){
        this.currentComic--;

        if(this.currentComic < 1){
            return;
        }

        if(this.currentComic == 1){
            this.btnLeft.loadTexture(null);
        }
        this.btnRight.loadTexture('right');
        this.comic.loadTexture('comic'+this.currentComic);
    },

    next: function(){
        this.currentComic++;

        if(this.currentComic > 4){
            return;
        }

        if(this.currentComic == 4){
            this.btnRight.loadTexture(null);
        }

        this.btnLeft.loadTexture('left');
        this.comic.loadTexture('comic'+this.currentComic);
    },
}
