class Cell
{
    constructor(x,y,radialGradientVal,squareGradientVal)
    {
        this.x = x;
        this.y = y;

        this.radialGradientVal = radialGradientVal;
        this.squareGradientVal = squareGradientVal;

        this.changePending = true;

        this.elevation = this.generate();
        this.visualsIndex = this.getVisuals();
    }

    update()
    {
        this.elevation = this.generate();
        this.visualsIndex = this.getVisuals();   
        this.changePending = true;
    }

    generate()
    {
        let frequency = sliderNoiseScale.value();
        let octaves = Math.log(mapWidth) / Math.log(2);
        let value;
        
        noiseDetail(octaves,fallOff);

        //Get Noise at XY Coordinates
        value = noise((this.x)*frequency, (this.y)*frequency)

        //If Gradient Checkbox is Checked, substract Gradient Value from Noise Value
        if (gradient)
        {
            value = value - ((this.squareGradientVal + this.radialGradientVal)/2);
        }

        if (value < 0)
        {
            value = 0;
        }
   
        return value;
    }

    getVisuals()
    {
        let visualsIndex;

        for(i = 0; i < heightRanges.length; i++)
        {
            let min = heightRanges[i] * i;
            let max = heightRanges[i] * i+1;

            //Get the right Visual-Index for Visual to Draw for Height-Range
            if (this.elevation >= min && this.elevation < max)
            {
                //Draw either Pre-Loaded Images or Drawn Shapes, based on Visuals-Radio-Button Setting.
                visualsIndex = i;   
            }
        }
        return visualsIndex;
    }

    show()
    {
          //Set Drawing Coordinates for Canvas
          let xDisplay = this.x;
          let yDisplay = this.y;;
         
          //Initialize Visuals
          let strokeThickness = 1;
          let visualsIndex = this.visualsIndex;

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
    }
}