const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var player, playerBase, playerBow, playerArrow;
var computer, computerBase, computerBow, computerArrow;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  playerBase = new PlayerBase(300, random(450, height - 300), 180, 150);
  player = new Player(285, playerBase.body.position.y - 153, 50, 180);
 
  computerBase = new ComputerBase(
    width-300,
    random(450, height - 300),
    180,
    150
  );
  
  computer = new Computer(
    width - 280,
    computerBase.body.position.y - 153,
    50,
    180
  );

  computerBow = new ComputerArcher(width-270, computerBase.body.position.y-180, 100, 100);
  computerArrow = new ComputerArrow(width-270, computerBase.body.position.y-180, 100, 10);
  
  playerBow = new PlayerArcher(340, playerBase.body.position.y-180, 100, 100);
  playerArrow = new PlayerArrow(340, playerBase.body.position.y-180, 100, 10);  
}

function draw() {
  background(180);

  Engine.update(engine);

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EPIC ARCHERY", width / 2, 100);

  playerBase.display();
  player.display();
  
  computerBase.display();
  computer.display();
  
  playerBow.display();
  computerBow.display();

  if (keyCode == 32) {
    playerArrow.display();
  }
  computerArrow.display();

  if (playerArrow.body.position.x >= width-270 || playerArrow.body.position.y >= 1000) {
      playerArrow.body.position.x = 340;
      playerArrow.body.position.y = playerBase.body.position.y-180;
      playerArrow.body.velocity.x = 0;
      playerArrow.body.velocity.y = 0;
      playerArrow.body.isStatic = true;
  }

  if (computerArrow.body.position.x <= 390 || computerArrow.body.position.y >= 1000) {
    computerArrow.body.position.x = width-270;
    computerArrow.body.position.y = computerBase.body.position.y-180;
    computerArrow.body.velocity.x = 0;
    computerArrow.body.velocity.y = 0;
    computerArrow.body.isStatic = true;
  }  
}

function keyReleased() {
    if (keyCode === 32){
      playerArrow.shoot();
      computerArrow.shoot();
    }
}



