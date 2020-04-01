//CANVAS AND MAP VARIABLES
    //Map Grid Cell Size
    const cellSize = 8;

    //Canvas
    var canvas;

    //Canvas/Display Size
    const canvasWidth = (Math.ceil(window.innerWidth/cellSize)-cellSize)*cellSize;
    const canvasHeight = (Math.ceil(window.innerHeight/cellSize)-cellSize)*cellSize;

    //Map Size
    var mapWidth = canvasWidth/cellSize;
    var mapHeight = canvasHeight/cellSize;

    var mapLoaded;
    var mapSeed = Math.floor(Math.random()*100000);

//UI VARIABLES
    //UI Elements
    var slidersHeightRange = [];
    var textFieldsColor = [];
    var textFieldSeed;
    var sliderFallOff;
    var sliderNoiseScale;
    var buttonNewMap;
    var radioVisuals = [];
    var cellDataBox;

    //UI Element Values
    var fallOff;
    var noiseScale;
    var gradient;
    var prevColors = []
    var prevHeightRanges = [];
    var heightRanges = [];
    var visualsType;
    var outline;

//VISUALS VARIABLES
    sprites = [];
    colors = [];

//TOGGLE VARIABLES
    allowDraw = true;

function preload()
{
    //Pre-Load Sprite Images
    sprites[0] = {image: loadImage('assets/images/water.png'), name: "Deep Water"};
    sprites[1] = {image: loadImage('assets/images/water-shallow.png'), name: "Shallow Water"};
    sprites[2] = {image: loadImage('assets/images/sand.png'), name: "Beach/Sand"};
    sprites[3] = {image: loadImage('assets/images/grass-light.png'), name: "Short Grass"};
    sprites[4] = {image: loadImage('assets/images/grass-medium.png'), name: "Medium Grass"};
    sprites[5] = {image: loadImage('assets/images/grass-heavy.png'), name: "Tall Grass"};
    sprites[6] = {image: loadImage('assets/images/mountain.png'), name: "Mountains"};
    sprites[7] = {image: loadImage('assets/images/mountain-snow.png'), name: "Tall Mountains"};

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
    //Initialize Canvas and Map
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('sketch-holder');
    canvas.addClass('canvas-one');

    UI.initialize();
    mapLoaded = new Map(mapWidth,mapHeight);
    
}
  
function draw() 
{
    let updated = UI.update();
    if (updated)
    {
        for(y = 0; y < mapHeight; y++)
        {
            for(x = 0; x < mapWidth; x++)
            {
                mapLoaded.cells[x][y].update();
            }
        }
        allowDraw = true;
    }

    if (allowDraw)
    {
        for(y = 0; y < mapHeight; y++)
        {
            for(x = 0; x < mapWidth; x++)
            {
               let cell = mapLoaded.cells[x][y];
               if (checkCellRedraw(cell))
               {
                cell.show();
               }
            }
        }
        allowDraw = false;
    }
}

function checkCellRedraw(cell) {
  if (cell.changePending) {
    return true;
  }
  let i = getVisuals(cell);
  if (heightRanges[i] != prevHeightRanges[i]) {
    return true;
  }
}

function getVisuals(cell)
{
    let visualsIndex;

    for(i = 0; i < heightRanges.length; i++)
    {
        //Get Height Ranges (From every Height-Range-Slider Value)
        let min = heightRanges[i] * i;
        let max = heightRanges[i] * i+1;

        //Get the right Visual-Index for Visual to Draw for Height-Range
        if (cell.elevation >= min && cell.elevation < max)
        {
            //Draw either Pre-Loaded Images or Drawn Shapes, based on Visuals-Radio-Button Setting.
            visualsIndex = i;   
        }
    }
    return visualsIndex;
}