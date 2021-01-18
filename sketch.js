var dog,dogSitImg,dogStand,dogStandImg;
var database;
var dogFood;
var foods;
var feedButton,addButton;
var food;
var feedTime;
var getState,gameState;
var lastFeed;
var changingGameState,readingGameState;
var bedroom,garden,washroom;
var bedroomImg,gardenImg,washroomImg;
var currentTime;

function preload(){
  dogSitImg = loadImage("images/dogImg.png");
  dogStandImg = loadImage("images/dogImg1.png");
  bedroomImg = loadImage('image/Bed Room.png');
  gardenImg = loadImage('image/Garden.png');
  washroomImg = loadImage('image/Wash Room.png');
}

function setup(){
  database = firebase.database();
    createCanvas(450,500);
    dog = createSprite(350,300,10,10);
    dog.addImage("dog",dogStandImg);
    dog.scale = 0.3;
    dog.visible = true;

    dogFood = database.ref("dog/Food");
    dogFood.on("value",readStock);    

    food   = new Milk();

    feedButton = createButton("Feed the dog");
    feedButton.position(685,100);
    feedButton.style('background','skyblue');
    feedButton.style('color','red');
    feedButton.mousePressed(feedDog,
      dog.addImage("dog",dogStandImg));

    addButton = createButton("Add food");
    addButton.position(600,100);
    addButton.style('background','lightpink')
    addButton.style('color','darkviolet')
    addButton.mousePressed(addFood,
      dog.addImage("dog",dogSitImg));

      garden = createSprite(displayWidth/6,100,10,10);
      garden.addImage("garden",gardenImg);
      garden.visible = false;

      washroom = createSprite(displayWidth/6,100,1,1);
      washroom.addImage("washroom",washroomImg);
      washroom.visible = false;

      bedroom = createSprite(displayWidth/6,100,1,1);
      bedroom.addImage("bedroom",bedroomImg);
      bedroom.visible = false;

    foods = 0;
}

function draw(){
    background("green");

    food.display();

    lastFeed = hour();

    drawSprites();

    lastFeed = database.ref("dog/lastFeed");
    lastFeed.on("value",(data)=>{
      lastFeed = data.val();
})

textFont('lucida calligraphy')
textSize(20);
fill(255,202,42);

    if(lastFeed>=12){
      text("last feed : " + lastFeed%12+" PM",50,30);
    }else if(lastFeed == 0){
      text("last feed : 12 AM",50,30);
    }else{
      text("last feed : "+lastFeed+"AM",50,30);
    }    
    
    currentTime = hour();
    if(currentTime == (lastFeed-1)){
      garden.visible = true;
      addButton.hide();
      feedButton.hide();
      dog.visible = false;
    }

    else{
      garden.visible = false;
      feedButton.show();
      addButton.show();
      dog.visible = true;
    }

    if(currentTime == (lastFeed-2)){
      bedroom.visible = true;
      addButton.hide();
      feedButton.hide();
      dog.visible = false;
    }

    else{
      bedroom.visible = false;
      feedButton.show();
      addButton.show();
      dog.visible = true;
    }

    if(currentTime == (lastFeed-3)){
      washroom.visible = true;
      addButton.hide();
      feedButton.hide();
      dog.visible = false;
    }

    else{
      washroom.visible = false;
      feedButton.show();
      addButton.show();
      dog.visible = true;
    }

    if(currentTime == (lastFeed-4)){
      washroom.visible = true;
      addButton.hide();
      feedButton.hide();
      dog.visible = false;
    }

    else{
      washroom.visible = false;
      feedButton.show();
      addButton.show();
      dog.visible = true;
    }
    
    fill(255,255,254);
    textSize(20);
    strokeWeight(0.7);
    stroke(255,202,42)

    textSize(25);
    fill(255,202,42);
    textFont("lucida calligraphy");
    strokeWeight(0.6);
    stroke(255,202,42)
    text("Food remaining : "+foods,150,170);
  }

    function readStock(data){
      foods = data.val();
      food.updateFoodStock(foods);
    }

    function feedDog(){
      dog.addImage("dog",dogStandImg);

      foods--;

      if(foods < 0){
        foods = 0;
      }

      database.ref("dog/").update({
        Food : foods
      })

      feedTime = hour();
    }

    function updateState(state){
      database.ref("/").update({
        gameState:state
      });
    }

    function addFood(){
      dog.addImage("dog",dogSitImg);
      foods++

      food.display();
      
      database.ref('dog/').update({
        Food:foods
      })
    }