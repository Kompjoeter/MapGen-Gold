var Display =
{
    show: function()
    {
        //Draw Background before Drawing Map
        background('#233343');

        //Draw every cell of Loaded Map
        for(let y = Navigator.minBoundsCurrent[1]; y < Navigator.maxBoundsCurrent[1]; y++)
        {
            for(let x = Navigator.minBoundsCurrent[0]; x < Navigator.maxBoundsCurrent[0]; x++)
            {
               //Correct Slider Values
                UI.adjustSliders();       
                this.drawVisuals(x,y);
            }
        }

        this.cellData();
    },
    getVisuals: function(x, y)
    {
        //Get Value of Cell at XY Coordinate of Loaded Map
        let elevation = mapLoaded.terrain[x][y];
        let visualsIndex = 0;
        //Compare Height Ranges with Cell Value and pick appropriate Sprite or Color
        for(i = 0; i < 8; i++)
        {
            //Get Height Ranges (From every Height-Range-Slider Value)
            let min = heightRanges[i] * i;
            let max = heightRanges[i] * i+1;

            //Get the right Visual-Index for Visual to Draw for Height-Range
            if (elevation >= min && elevation < max)
            {
                //Draw either Pre-Loaded Images or Drawn Shapes, based on Visuals-Radio-Button Setting.
                visualsIndex = i;   
            }
        }

        return visualsIndex;
    },
    drawVisuals: function(x,y)
    {
        //Set Drawing Coordinates for Canvas
        let xDisplay = x - Navigator.minBoundsCurrent[0];
        let yDisplay = y - Navigator.minBoundsCurrent[1];
       
        //Initialize Visuals
        let strokeThickness = 1;
        let visualsIndex = this.getVisuals(x,y);
        let img = sprites[visualsIndex].image;

        //If Drawing Method is 'Sprites', draw Sprite to Canvas
        if (visualsType == 'Sprites')
        {
            image(img,xDisplay*8,yDisplay*8);
        }
        else //If Visuals == 'Circles' or 'Squares' or 'Triangles'
        {
            stroke(colors[visualsIndex]);
            fill(colors[visualsIndex]);
            if (outline)
            {
                noFill();
            }

            //Pick appropriate Visuals (based on Visuals-Radio-Button Setting.) and draw to Canvas
            switch(visualsType)
            {
                case "Circles":
                    circle(4+xDisplay*8,4+yDisplay*8,8 - strokeThickness*2);
                    break;
                case "Squares":
                    square(strokeThickness+xDisplay*8,strokeThickness+yDisplay*8,8 - strokeThickness*2);
                    break;
                case "Triangles":
                    triangle(strokeThickness+xDisplay*8,8-strokeThickness+yDisplay*8,(xDisplay*8)+(8-strokeThickness),8-strokeThickness+yDisplay*8,(xDisplay*8)+4,8+(strokeThickness)+(yDisplay*8)-8);
                    break;
            }
        }
    },
    cellData: function()
    {
        let title = "Selected Cell Data<br><br>";
        let posX = "Pos X: "+String(Navigator.posCell[0])+"<br>";
        let posY =  "Pos Y: "+String(Navigator.posCell[1])+"<br>";
        let visualsIndex = this.getVisuals(Navigator.posCell[0],Navigator.posCell[1]);
        let tile = "Tile: "+String(sprites[visualsIndex].name);
        cellDataBox.innerHTML = title+posX+posY+tile
    }
}
