var Main = function() {};

var BackSound;

Main.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

Main.game.state.add('Boot', Scene.Boot);
Main.game.state.add('Preload', Scene.Preload);
Main.game.state.add('MainMenu', Scene.MainMenu);
Main.game.state.add('Game', Scene.Game);
Main.game.state.add('Story', Scene.Story);
Main.game.state.add('Learn', Scene.Learn);

Main.game.state.start('Boot');
