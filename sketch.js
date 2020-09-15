
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var PLAY=1;
var END=0;
var gamestate=1;
var score1;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_animation=loadAnimation("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
   // monkeyimage=loadImage("sprite_0.png");
}



function setup() {
   //createCanvas(600,400);
  
  monkey=createSprite(100,330,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("END",monkey_animation);
  monkey.scale=0.1;
  
  ground = createSprite(400,390,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
  score1=0;
}


function draw() {
 background("white");
 textSize(15);
 text("Survival Time:"+score,250,50);

  monkey.collide(ground);
  
  if(gamestate===PLAY){
  score=Math.ceil(frameCount/frameRate());
    
    if(ground.x<0){
    ground.x=ground.width/2;
    }
     if(keyDown("space")&& monkey.y >= 354) {
        monkey.velocityY = -14;
    }
    
    monkey.velocityY = monkey.velocityY + 0.5;
    
     obstacles();
     food();
    
    if (FoodGroup.isTouching(monkey)){
     
     FoodGroup.destroyEach();
     score1=score1+1; 
    }
   
    if(obstacleGroup.isTouching(monkey)){
    gamestate=END;
    }
  }
  if(gamestate===END){
  ground.velocityX=0;
  monkey.velocityX=0;
  monkey.changeAnimation(monkey_animation);  
  FoodGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);  
    
  FoodGroup.setLifetimeEach(-1);
  obstacleGroup.setLifetimeEach(-1);  
  
  }
   
  drawSprites();
 textSize(14);
 text("Score:"+score1,250,80); 
}

function food(){
if(frameCount%80===0){
banana=createSprite(590,Math.round(random(120,200)),10,10);
banana.addImage("food",bananaImage);  
banana.velocityX=-4;
banana.scale = 0.1;
banana.lifetime = 190;
    
FoodGroup.add(banana);
}
}

function obstacles(){
if(frameCount%300===0){
  obstacle=createSprite(600,350,10,35);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX=-4;
  obstacle.scale=0.15;
  obstacle.lifetime=200;
  
  obstacleGroup.add(obstacle);
}
}