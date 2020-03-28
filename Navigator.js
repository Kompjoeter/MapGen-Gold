var Navigator =
{
    minBoundsMap: new Array(2),
    maxBoundsMap: new Array(2),

    posSelector: new Array(2),

    initialize: function()
    {
        this.minBoundsMap[0] = 0;
        this.minBoundsMap[1] = 0;
        this.maxBoundsMap[0] = mapWidth;
        this.maxBoundsMap[1] = mapHeight;

        this.posSelector[0] = 0;
        this.posSelector[1] = 0;
    },

    update()
    {
        //Initialize
        let updated = false;

        //Store previous Coordinates of Selector
        let prevPosSelector = [this.posSelector[0],this.posSelector[1]];

        //Get Coordinates of Mouse and Snap to Map-Grid
        let x = (Math.round(mouseX / 8) * 8)/8;
        let y = (Math.round(mouseY / 8) * 8)/8;

        //Adjust Selector Coordinates if Out-of-bounds
        if (x < 0) 
        {x = 0;}
        else if (x >= this.maxBoundsMap[0]-1)
        {x = this.maxBoundsMap[0];}

        if (y < 0)
        {y = 0;}
        else if (y >= this.maxBoundsMap[1]-1)
        {y = this.maxBoundsMap[1]-1;}

        this.posSelector[0] = x;
        this.posSelector[1] = y;

        //Check if Selector Position has changed since previous Frame.
        if (prevPosSelector[0] != this.posSelector[0] || prevPosSelector[1] != this.posSelector[1])
        {
            updated = true;
        }

        return updated;
    },
}