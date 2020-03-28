//Canvas and Map
const cellSize = 8;

//Window Size
const innerWidth = window.innerWidth;
const innerHeight = window.innerHeight;

//Display Size
const canvasWidth = (Math.ceil(innerWidth/8)-8)*8;
const canvasHeight = (Math.ceil(innerHeight/8)-8)*8;

//Map Size
var mapWidth = canvasWidth/8;
var mapHeight = canvasHeight/8;

//Current Map
var mapLoaded;

//Draw Elements
sprites = [];
colors = [];

//UI Elements
var slidersHeightRange = [];
var textFieldsColor = [];
var textFieldSeed;
var sliderFallOff;
var sliderNoiseScale;
var buttonNewMap;
var radioVisuals = [];
var cellDataBox;

var myFont;
var myDisplay = Display;

//-----UI Element Values
var fallOff;
var noiseScale;
var gradient;
var prevColors = []
var prevHeightRanges = [];
var heightRanges = [];
var visualsType;
var outline;

var selectedCellData;

var mapSeed = Math.floor(Math.random()*100000);

//Toggles - Temps
var allowMapDraw = true;
var allowNavigatorDraw = true;
var storedTime = new Date();

var myp5;

function preload()
{
    myFont = loadFont('assets/AnonymousPro-Regular.ttf');

    //Pre-Load Sprite Images
    sprites[0] = {image: loadImage('images/water.png'), name: "Deep Water"};
    sprites[1] = {image: loadImage('images/water-shallow.png'), name: "Shallow Water"};
    sprites[2] = {image: loadImage('images/sand.png'), name: "Beach/Sand"};
    sprites[3] = {image: loadImage('images/grass-light.png'), name: "Short Grass"};
    sprites[4] = {image: loadImage('images/grass-medium.png'), name: "Medium Grass"};
    sprites[5] = {image: loadImage('images/grass-heavy.png'), name: "Tall Grass"};
    sprites[6] = {image: loadImage('images/mountain.png'), name: "Mountains"};
    sprites[7] = {image: loadImage('images/mountain-snow.png'), name: "Tall Mountains"};

    //Pre-Set Colors for Drawn Shapes
    colors[0] = '#4b5bab';
    colors[1] = '#4da6ff';
    colors[2] = '#f2a65e';
    colors[3] = '#3ca370';
    colors[4] = '#3d6e70';
    colors[5] = '#323e4f';
    colors[6] = '#606070';
    colors[7] = '#ffffeb';
}

function setup() 
{

    myp5 = new p5(sketchOne, 'c1');
    //Create Canvas and Link it to HTML Element
    var canvas = createCanvas(canvasWidth,canvasHeight);
    canvas.parent('sketch-holder');
    canvas.addClass('canvas-one');

    //Randomize Map Seed
    noiseSeed(mapSeed);

    
    //Create UI (Sliders/Checkbox/Buttons)
    UI.initialize();

    //Generate New Map of standard Size
    mapLoaded = new Map(mapWidth,mapHeight);
    
    //Initialize Variables for Navigation and Display
    Navigator.initialize();
}

function draw()
{
    if (allowMapDraw) 
    {
        //Generate Map with Updated Variables       
        mapLoaded.update();
        
        //Draw Map to Canvas
        Display.show(mapLoaded);
       
        //Reset Draw-Map Toggle
        allowMapDraw = false;
    }

    //Check for UI Manipulation
    let updatingUI = UI.update();
    let updatingNavigator = Navigator.update();

    //If Navigation Input or UI Manipulation is true, allow Redrawing of Map
    if (updatingUI)
    {
        allowMapDraw = true;
    }

    if (updatingNavigator)
    {
        allowNavigatorDraw = true;
        let cellIndex = Display.getVisuals(Navigator.posSelector[0],Navigator.posSelector[1]);
        selectedCellData = sprites[cellIndex].name;
    }
}

function newMap()
{
    //Randomize Map Seed
    noiseSeed(textFieldSeed.value());
    mapLoaded = new Map(mapWidth,mapHeight);
    Navigator.initialize();
    allowMapDraw = true;
}

// Sketch One
var sketchOne = function( p ) { // p could be any variable name
    var myDisplay = Display;
    p.setup = function() {
      let cc = p.createCanvas(canvasWidth, canvasHeight);
      cc.addClass('canvas-two');
      cc.parent('sketch-holder');
    };
  
    p.draw = function() {
        console.log(allowNavigatorDraw);
        if (allowNavigatorDraw)
        {
            p.clear();
            p.stroke(255);
            p.strokeWeight(1);
            p.noFill();

            let xMouse = Navigator.posSelector[0];
            let yMouse = Navigator.posSelector[1];

            p.square(xMouse*8,yMouse*8,8);

            //Text Box
            let minX = 16;
            let minY = 16;
            let maxX = 152;
            let maxY = 80;
            let opacity = 50;

            if (xMouse*8 >= minX && xMouse*8 <= maxX+8 && yMouse*8 >= minY && yMouse*8 <= maxY+8)
            {
                opacity = 25;
            }

            let color = p.color(0,opacity);
            p.fill(color);
            p.noStroke();
            p.rect(minX,minY,maxX,maxY,5,5,5,5);
    
            //Text
            p.fill(255);
            p.textStyle(NORMAL);
            p.textFont(myFont);

            p.text("Selected Cell Data",24,32)
            p.text('Pos X: '+String(xMouse),24,56);
            p.text('Pos Y: '+String(yMouse),24,72);

            let tile = "Tile: "+selectedCellData;
            p.text(tile,24,88);
            allowNavigatorDraw = false;
        }
    };
  };
