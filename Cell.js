class Cell
{
    constructor(x,y,value,sprite,color,)
    {
        this.coordinates = [x,y];

        this.value = value
        this.prevSprite = sprite;
        this.prevColor = color;
        this.sprite = sprite;
        this.color = color;
        this.hasChanged = false;
    }

    compare()
    {
        if (this.prevSprite != this.sprite || this.prevColor != this.color)
        {
            this.hasChanged = true;
        }
    }

    getVisuals()
    {
        let visualsIndex;

        this.prevColor = this.color;
        this.prevSprite = this.sprite;

        for(i = 0; i < 8; i++)
        {
            //Get Height Ranges (From every Height-Range-Slider Value)
            let min = heightRanges[i] * i;
            let max = heightRanges[i] * i+1;

            //Get the right Visual-Index for Visual to Draw for Height-Range
            if (this.value >= min && this.value < max)
            {
                //Draw either Pre-Loaded Images or Drawn Shapes, based on Visuals-Radio-Button Setting.
                visualsIndex = i;   
            }
        }
        this.color = colors[i];
        this.sprite = sprites[i];
        this.compare();
    }


}