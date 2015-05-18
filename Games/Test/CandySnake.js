

var game = new Phaser.Game(800, 480, Phaser.AUTO, 'game_div');

var titlestate = {
    preload: function () {
    
        this.load.image('titlepage', '/assets/CandyTitle.png');
        this.load.image('objectivespage', '/assets/CandyObjectives.png');
        this.load.image('candygamewon', '/assets/CandyWon.png');
        this.load.image('player', '/assets/PurpleSnakeHead.png');
        this.load.image('player2', '/assets/LightBrownCandy.png');
        this.load.image('player3', '/assets/LightVanillaHead.png');
        this.load.image('Candy1', '/assets/RedCandy.png');
        this.load.image('Candy2', '/assets/YellowCandy.png');
        this.load.image('Candy3', '/assets/GreenCandy.png');
        this.load.image('Candy4', '/assets/BlueCandy.png');
        this.load.image('Candy5', '/assets/PurpleCandy.png');
        this.load.image('Candy6', '/assets/OrangeCandy.png');
        this.load.image('Choc1', '/assets/DarkBrownCandy.png');
        this.load.image('Choc2', '/assets/MedDarkBrownCandy.png');
        this.load.image('Choc3', '/assets/BrownCandy.png');
        this.load.image('Choc4', '/assets/LightMedBrownCandy.png');
        this.load.image('Choc5', '/assets/LightBrownCandy.png');
        this.load.image('Vanilla1', '/assets/LightVanillaCandy.png');
        this.load.image('Vanilla2', '/assets/DarkVanillaCandy.png');
        
        this.load.image('Body1', '/assets/LightRedCandy.png');
        this.load.image('Body2', '/assets/LightYellowCandy.png');
        this.load.image('Body3', '/assets/LightGreenCandy.png');
        this.load.image('Body4', '/assets/LightBlueCandy.png');
        this.load.image('Body5', '/assets/LightPurpleCandy.png');
        this.load.image('Body6', '/assets/OrangeLightCandy.png');
        this.load.image('BodyChoc1', '/assets/DarkBrownLightCandy.png');
        this.load.image('BodyChoc2', '/assets/MedDarkBrownLightCandy.png');
        this.load.image('BodyChoc3', '/assets/BrownLightCandy.png');
        this.load.image('BodyChoc4', '/assets/LightMedBrownLightCandy.png');
        this.load.image('BodyChoc5', '/assets/LightBrownLightCandy.png');
        this.load.image('BodyVanilla1', '/assets/LightVanillaLightCandy.png');
        this.load.image('BodyVanilla2', '/assets/DarkVanillaLightCandy.png');
        
        this.load.image('chocolate', '/assets/Chocolate.png');
        this.load.image('vanilla', '/assets/Vanilla.png');
        this.load.image('strawberry', '/assets/Strawberry.png');
        this.load.audio('CandyMusicmp3', ['/assets/CandyMusic.mp3', '/assets/CandyMusic.mp3']);
        this.load.audio('CandyMusicogg', ['/assets/CandyMusic.ogg', '/assets/CandyMusic.ogg']);
        this.load.audio('SnakeSoundmp3', ['/assets/SnakeSound.mp3', '/assets/SnakeSound.mp3']);
        this.load.audio('SnakeSoundogg', ['/assets/SnakeSound.ogg', '/assets/SnakeSound.ogg']);
        this.load.audio('FinalSnakeSoundmp3', ['/assets/FinalSnakeSound.mp3', '/assets/FinalSnakeSound.mp3']);
        this.load.audio('FinalSnakeSoundogg', ['/assets/FinalSnakeSound.ogg', '/assets/FinalSnakeSound.ogg']);
    
    },
    
	create: function () {
        var browser=this.get_browser();
        
        if((browser == "Chrome") || (browser == "Firefox") || (browser == "Opera"))
        {    
            music = this.add.audio('CandyMusicogg', 1, true);
            sound = this.add.audio('SnakeSoundogg');
            finalsound = this.add.audio('FinalSnakeSoundogg');
        }
        else
        {
            music = this.add.audio('CandyMusicmp3', 1, true);
            sound = this.add.audio('SnakeSoundmp3');
            finalsound = this.add.audio('FinalSnakeSoundmp3');
        }
       gameStage = 1;
	   this.add.sprite(0, 0, 'titlepage');
       cursors = this.input.keyboard.createCursorKeys();
    },

	update: function () {
        if (cursors.up.isDown)
        {
            this.state.start('objectivestate');
        }

    },
    get_browser: function(){
        var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
        if(/trident/i.test(M[1])){
            tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
            return 'IE '+(tem[1]||'');
            }   
        if(M[1]==='Chrome'){
            tem=ua.match(/\bOPR\/(\d+)/)
            if(tem!=null)   {return 'Opera '+tem[1];}
            }   
        M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
        if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
        return M[0];
    }
}


var objectivestate = {
    preload: function () {
    },
    
	create: function () {
	   this.add.sprite(0, 0, 'objectivespage');
       cursors = this.input.keyboard.createCursorKeys();
    },

	update: function () {
        if (cursors.up.isDown)
        {
            this.state.start('gamestate');
        }

    }
}

var winstate = {
    preload: function () {
    },
    
    create: function () {
       finalsound.play();
	   this.add.sprite(0, 0, 'candygamewon');
       cursors = this.input.keyboard.createCursorKeys();
    },

	update: function () {
        if (cursors.up.isDown)
        {
            finalsound.stop();
            this.state.start('titlestate');
        }
    }
}

//TODO:
//_X_ Create music and sound effects
//_X_ Allow more candies based on levels - right now not functional cause can't see them all
//_X_ Make snake head unique for each stage
//_X_ Create title/content/game won states

var gamestate = {

    preload: function () {
    },

    create: function () {
        

        music.play('',0,1,true);

        
        if(gameStage == 1)
            this.add.sprite(0, 0, 'vanilla');
        else if(gameStage == 2)
            this.add.sprite(0, 0, 'chocolate');
        else if(gameStage == 3)
            this.add.sprite(0, 0, 'strawberry');
        
        //newlyStarted = 150;
        
        //player = game.add.sprite(46, 46, 'player');
        
        
        currentDir = "right";
        
        SnakeArray = new Array();
        AteCandyArray = new Array();
        CandyNeededArray = new Array();
        AteCandySize = 0;
        MaxCandyActive = 10;
        
        killedCount = 0;
        
        CandyArray = new Array();
        CandyArraySize = 0;
        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        snakeSize = 0;
        
        horizontalPlayer = 48;
        verticalPlayer = 48;
        
        horizontal = 1;
        vertical = 1;
        
        if(gameStage == 3)
            player = game.add.sprite(horizontalPlayer * horizontal, vertical * verticalPlayer, 'player');
        else if(gameStage == 2)
            player = game.add.sprite(horizontalPlayer * horizontal, vertical * verticalPlayer, 'player2');
        else if(gameStage == 1)
            player = game.add.sprite(horizontalPlayer * horizontal, vertical * verticalPlayer, 'player3');
        
        appendSnake = false;
        
        moved = false;
        

        game.physics.arcade.enable(player);
        
        //Body = SnakeBodyPiece.create(tempHorizontal * horizontalPlayer, tempVertical * verticalPlayer,'body');
        SnakeArray[snakeSize] = player;
        snakeSize++;
        
        cursors = game.input.keyboard.createCursorKeys();
        rightButton = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        leftButton = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        upButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downButton = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

        rightButton.onDown.add(this.moveRight, this);
        leftButton.onDown.add(this.moveLeft, this);
        upButton.onDown.add(this.moveUp, this);
        downButton.onDown.add(this.moveDown, this);
        
        if( gameStage == 1)
            generatedCandyArraySize = 10;
        else if( gameStage == 2)
            generatedCandyArraySize = 15;
        else if( gameStage == 3)
            generatedCandyArraySize = 20;
        
        CandyPiece = this.add.group();
        CandyPiece.createMultiple(200, 'candy');
        CandyPiece.enableBody = true;
        
        SnakeBodyPiece = this.add.group();
        SnakeBodyPiece.createMultiple(200, 'body');
        SnakeBodyPiece.enableBody = true;
        
        this.createCandyArray();
        
        if( gameStage == 1)
            snakeTimer = game.time.events.loop(300, this.move_snake, this);
        if( gameStage == 2)
            snakeTimer = game.time.events.loop(275, this.move_snake, this);
        if( gameStage == 3)
            snakeTimer = game.time.events.loop(250, this.move_snake, this);
        
        candyTimer = game.time.events.loop(3000, this.generate_candy, this);
        
        //newlyStarted = true
        
    },

    update: function () {
        /*if (newlyStarted > 0)
        {
            vertical = 1;
            horizontal = 1;
            newlyStarted--;
        }
        else*/
        {
        var tempHorizontal;
        var tempVertical;
        if((vertical == 10)  || (vertical == -1) || (horizontal == 17) || (horizontal == -1))
        {
                    
            horizontal = 1;
            vertical = 1;
            music.stop();
            this.state.start('gamestate');
        }        
        if(!moved)
        {
            if(snakeSize > 1)
            {
                var pastx = SnakeArray[0].body.x; 
                var pasty = SnakeArray[0].body.y;
                for(var j=1; j < snakeSize; j++)
                {
                    var temp = j;
                    temp--;
                    tempx = SnakeArray[j].body.x;
                    tempy = SnakeArray[j].body.y;
                    SnakeArray[j].body.x = pastx;
                    SnakeArray[j].body.y = pasty;
                    pastx = tempx;
                    pasty = tempy;
                }
            }
            
            tempHorizontal = horizontal;
            tempVertical = vertical;
            if(dirToExecute == "right")
            {
                if(horizontal < 13)
                {
                    horizontal++;
                    player.body.x = horizontal * horizontalPlayer;
                    moved = true;
                }
                else
                {
                     music.stop();
                     this.state.start('gamestate');
                }
            }
            else if(dirToExecute == "left")
            {
                horizontal--;
                player.body.x = horizontal * horizontalPlayer;
                moved = true;
            }
            else if(dirToExecute == "up")
            {
                vertical--;
                player.body.y = vertical * verticalPlayer;
                moved = true;
            }
            else if(dirToExecute == "down")
            {
                vertical++;
                player.body.y = vertical * verticalPlayer;
                moved = true;
            }
            
            
            if(appendSnake)
            {
                if(gameStage == 1)
                {
                    if(AteCandyArray[0] == 1)
                    {
                        Body = SnakeBodyPiece.create(tempHorizontal * horizontalPlayer, tempVertical * verticalPlayer,'BodyVanilla1');
                        Body.value = 1;
                    }
                    else if(AteCandyArray[0] == 2)
                    {
                        Body = SnakeBodyPiece.create(tempHorizontal * horizontalPlayer, tempVertical * verticalPlayer,'BodyVanilla2');
                        Body.value = 2;
                    }
                }

                else if(gameStage == 2)
                {
                    if(AteCandyArray[0] == 1)
                    {
                        Body = SnakeBodyPiece.create(tempHorizontal * horizontalPlayer, tempVertical * verticalPlayer,'BodyChoc1');
                        Body.value = 1;
                    }
                    else if(AteCandyArray[0] == 2)
                    {
                        Body = SnakeBodyPiece.create(tempHorizontal * horizontalPlayer, tempVertical * verticalPlayer,'BodyChoc2');
                        Body.value = 2;
                    }
                    else if(AteCandyArray[0] == 3)
                    {
                        Body = SnakeBodyPiece.create(tempHorizontal * horizontalPlayer, tempVertical * verticalPlayer,'BodyChoc3');
                        Body.value = 3;
                    }
                    else if(AteCandyArray[0] == 4)
                    {
                        Body = SnakeBodyPiece.create(tempHorizontal * horizontalPlayer, tempVertical * verticalPlayer,'BodyChoc4');
                        Body.value = 4;
                    }

                }
                
                else if(gameStage == 3)
                {
                    if(AteCandyArray[0] == 1)
                    {
                        Body = SnakeBodyPiece.create(tempHorizontal * horizontalPlayer, tempVertical * verticalPlayer,'Body1');
                        Body.value = 1;
                    }
                    else if(AteCandyArray[0] == 2)
                    {
                        Body = SnakeBodyPiece.create(tempHorizontal * horizontalPlayer, tempVertical * verticalPlayer,'Body2');
                        Body.value = 2;
                    }
                    else if(AteCandyArray[0] == 3)
                    {
                        Body = SnakeBodyPiece.create(tempHorizontal * horizontalPlayer, tempVertical * verticalPlayer,'Body3');
                        Body.value = 3;
                    }
                    else if(AteCandyArray[0] == 4)
                    {
                        Body = SnakeBodyPiece.create(tempHorizontal * horizontalPlayer, tempVertical * verticalPlayer,'Body4');
                        Body.value = 4;
                    }
                    else if(AteCandyArray[0] == 5)
                    {
                        Body = SnakeBodyPiece.create(tempHorizontal * horizontalPlayer, tempVertical * verticalPlayer,'Body5');
                        Body.value = 5;
                    }
                     else if(AteCandyArray[0] == 6)
                    {
                        Body = SnakeBodyPiece.create(tempHorizontal * horizontalPlayer, tempVertical * verticalPlayer,'Body6');
                        Body.value = 6;
                    }
                }
                
                
                //shift cells over
                for(var k = 1; k <= AteCandySize; k++)
                    AteCandyArray[k-1] = AteCandyArray[k];
                
                AteCandySize--;
                
                SnakeArray[snakeSize] = Body;
                
                var temp = snakeSize;
                temp--;
                
                var tempCandy = CandyNeededArray[temp];
                
  
                if((Body.value) != (tempCandy.value))
                {   
                    //snakeText.setText("Body: " + Body.value + " Candy: " + tempCandy.value);
                    horizontal = 1;
                    vertical = 1;
                    music.stop();
                    this.state.start('gamestate');
                }
                appendSnake = false;
                snakeSize++;
                if(snakeSize > generatedCandyArraySize)
                { 
                    if(gameStage != 3)
                    {
                        horizontal = 1;
                        vertical = 1;
        
                        gameStage++;
                        music.stop();
                        this.state.start('gamestate');
                    }
                    else
                    {
                        music.stop();
                        this.state.start('winstate');
                    }
                }
            }
        }}
        this.physics.arcade.overlap(player, CandyPiece, this.collectCandy, null, this);
        this.physics.arcade.overlap(player, SnakeBodyPiece, this.collideSnakeBody, null, this);
        this.physics.arcade.overlap(CandyPiece, CandyPiece, this.collideCandy, null, this);
        //this.physics.arcade.overlap(player, CandyPiece, this.collectCandy, null, this);
    },
    
    
    createCandyArray: function(){
        var randomCandy;
        var yMultiplier = 0;
        var xValue = 0;

        for(var i = 0; i < generatedCandyArraySize; i++)
        {
            if(i < 10)
            {
                yMultiplier = i;
                xValue = 695;
            }
            else
            {
                var temp = i;
                yMultiplier = temp - 10;
                xValue = 745;
            }
            if(gameStage == 3)
            {
                randomCandy = game.rnd.integerInRange(1,6);
                
                if(randomCandy == 1)
                {
                    Candy = CandyPiece.create( xValue, 48 * yMultiplier,'Candy1');
                    Candy.value = 1;

                }
                else if (randomCandy == 2)
                {
                    Candy = CandyPiece.create( xValue, 48 * yMultiplier,'Candy2');
                    Candy.value = 2;

                }
                else if (randomCandy == 3)
                {
                    Candy = CandyPiece.create( xValue, 48 * yMultiplier,'Candy3');
                    Candy.value = 3;

                }
                else if( randomCandy == 4)
                {
                    Candy = CandyPiece.create( xValue, 48 * yMultiplier,'Candy4');
                    Candy.value = 4;

                }
                else if( randomCandy == 5)
                {
                    Candy = CandyPiece.create( xValue, 48 * yMultiplier,'Candy5');
                    Candy.value = 5;

                }
                else if( randomCandy == 6)
                {
                    Candy = CandyPiece.create( xValue, 48 * yMultiplier,'Candy6');
                    Candy.value = 6;

                }
            }
            else if(gameStage == 2)
            {
                randomCandy = game.rnd.integerInRange(1,4);
                if(randomCandy == 1)
                {
                    Candy = CandyPiece.create( xValue, 48 *yMultiplier,'Choc1');
                    Candy.value = 1;
                }
                else if (randomCandy == 2)
                {
                    Candy = CandyPiece.create( xValue, 48 *yMultiplier,'Choc2');
                    Candy.value = 2;
                }
                else if (randomCandy == 3)
                {
                    Candy = CandyPiece.create( xValue, 48 *yMultiplier,'Choc3');
                    Candy.value = 3;
                }
                else if( randomCandy == 4)
                {
                    Candy = CandyPiece.create( xValue, 48 *yMultiplier,'Choc4');
                    Candy.value = 4;
                }

            }
            
            else if(gameStage == 1)
            {
                randomCandy = game.rnd.integerInRange(1,2);
                if(randomCandy == 1)
                {
                    Candy = CandyPiece.create( 720, 48 *yMultiplier,'Vanilla1');
                    Candy.value = 1;
                }
                else if (randomCandy == 2)
                {
                    Candy = CandyPiece.create( 720, 48 *yMultiplier,'Vanilla2');
                    Candy.value = 2;
                }
            }
            CandyNeededArray[i] = Candy;
        }
        

    },
    
    collectCandy: function(player, Candy){
        sound.play();
        AteCandyArray[AteCandySize] = Candy.value;
        AteCandySize++;
        Candy.kill();
        appendSnake = true;
        //sound.play();
        
    }, 
    
    collideCandy: function(Candy1, Candy2){
        if(Candy1 != Candy2)
            Candy1.kill();
    },
    
    collideSnakeBody: function( player, SnakeBodyPiece )
    {
        music.stop();
        this.state.start('gamestate');
    },
    
    move_snake: function()
    {
       if(currentDir == "right")
        {
            dirToExecute = "right";
            moved = false;
        }
        else if(currentDir == "left")
        {
            dirToExecute = "left";
            moved = false;
        }
        else if(currentDir == "up")
        {
            dirToExecute = "up";
            moved = false;
        }
        else if(currentDir == "down")
        {
            dirToExecute = "down";
            moved = false;
        }
    },
    generate_candy:function()
    { 
        var randomCandyLoc;
        var tempCandy;
        
        randomCandyHorizontalLoc = game.rnd.integerInRange(0,13);
        randomCandyVerticalLoc = game.rnd.integerInRange(0,9);
        if(gameStage == 1)
        {
            randomCandy = game.rnd.integerInRange(1,2);
            if(randomCandy == 1)
            {
                Candy = CandyPiece.create(randomCandyHorizontalLoc * horizontalPlayer, randomCandyVerticalLoc * verticalPlayer,'Vanilla1');
            }
            else if(randomCandy == 2)
            {
                Candy = CandyPiece.create(randomCandyHorizontalLoc * horizontalPlayer, randomCandyVerticalLoc * verticalPlayer,'Vanilla2');
            }
            //Candy.value = randomCandy;
           tempCandy = randomCandy;
        }
        else if(gameStage == 2)
        {
            randomCandy = game.rnd.integerInRange(1,4);
            if(randomCandy == 1)
            {
                Candy = CandyPiece.create(randomCandyHorizontalLoc * horizontalPlayer, randomCandyVerticalLoc * verticalPlayer,'Choc1');
            }
            else if(randomCandy == 2)
            {
                Candy = CandyPiece.create(randomCandyHorizontalLoc * horizontalPlayer, randomCandyVerticalLoc * verticalPlayer,'Choc2');
            }
            else if(randomCandy == 3)
            {
                Candy = CandyPiece.create(randomCandyHorizontalLoc * horizontalPlayer, randomCandyVerticalLoc * verticalPlayer,'Choc3');
            }
            else if(randomCandy == 4)
            {
                Candy = CandyPiece.create(randomCandyHorizontalLoc * horizontalPlayer, randomCandyVerticalLoc * verticalPlayer,'Choc4');
            }
            //Candy.value = randomCandy;
            tempCandy = randomCandy;
        }
        else if(gameStage == 3)
        {
            randomCandy = game.rnd.integerInRange(1,6);
            if(randomCandy == 1)
            {
                Candy = CandyPiece.create(randomCandyHorizontalLoc * horizontalPlayer, randomCandyVerticalLoc * verticalPlayer,'Candy1');
            }
            else if(randomCandy == 2)
            {
                Candy = CandyPiece.create(randomCandyHorizontalLoc * horizontalPlayer, randomCandyVerticalLoc * verticalPlayer,'Candy2');
            }
            else if(randomCandy == 3)
            {
                Candy = CandyPiece.create(randomCandyHorizontalLoc * horizontalPlayer, randomCandyVerticalLoc * verticalPlayer,'Candy3');
            }
            else if(randomCandy == 4)
            {
                Candy = CandyPiece.create(randomCandyHorizontalLoc * horizontalPlayer, randomCandyVerticalLoc * verticalPlayer,'Candy4');
            }
            else if(randomCandy == 5)
            {
                Candy = CandyPiece.create(randomCandyHorizontalLoc * horizontalPlayer, randomCandyVerticalLoc * verticalPlayer,'Candy5');
            }
            else if(randomCandy == 6)
            {
                Candy = CandyPiece.create(randomCandyHorizontalLoc * horizontalPlayer, randomCandyVerticalLoc * verticalPlayer,'Candy6');
            }
            //Candy.value = randomCandy;
            tempCandy = randomCandy;
        }
        
        Candy.value = tempCandy;

        CandyArray[CandyArraySize] = Candy;
        CandyArraySize++;
        if(CandyArraySize >= MaxCandyActive)
        {
            killedCount++;
            CandyArray[0].kill();
           // snakeText.setText("Killed " + killedCount);
            for(var k = 1; k < CandyArraySize; k++)
            {
                CandyArray[k-1] = CandyArray[k];
            }
            CandyArraySize --;
        }
        
    },
    
    moveRight:function(key)
    {
        currentDir = "right";
    },
    moveLeft:function(key)
    {
        currentDir = "left";
    },
    moveUp:function(key)
    {
        currentDir = "up";
    },
    moveDown:function(key)
    {
        currentDir = "down";
    },
    moveNowhere:function()
    {
        currentDir = "nomove";
    }
};

// Add and start the 'main' state to start the game
game.state.add('gamestate', gamestate);
game.state.add('titlestate', titlestate);
game.state.add('objectivestate', objectivestate);
game.state.add('winstate', winstate);
game.state.start('titlestate');

var player;
var horizontal;
var vertical;
var currentDir;
var snakeTimer;
var downButton;
var upButton;
var leftButton;
var rightButton;
var moved;
var loopExecuted;
var dirToExecute;
var CandyPiece;
var Candy;
var snakeSize;
var appendSnake;
var Body;
var SnakeBodyPiece;
var SnakeArray;
var AteCandyArray;
var AteCandySize;
var snakeText;
var CandyArray;
var CandyArraySize;
var generatedCandyArraySize;
var MaxCandyActive;
var killedCount;
var CandyNeededArray;
var gameStage = 1;
var sound;
var newlyStarted;
var music;
var sound;
var finalsound;
