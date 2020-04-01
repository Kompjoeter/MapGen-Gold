class Map
{
    constructor(width, height)
    {
        this.width = width;
        this.height = height;

        this.squareGradientMap = this.squareGradient(this.width,this.height);
        this.radialGradientMap = this.radialGradient(this.width,this.height);

        this.cells = this.new(this.width,this.height);
    }

    new(width,height)
    {   
        let cells = []

        for(let x = 0; x < width; x++)
        {
            cells[x] = [];
            for(let y = 0; y < height; y++)
            {   
                let radialGradientVal = this.radialGradientMap[x][y];
                let squareGradientVal = this.squareGradientMap[x][y];
                cells[x][y] = new Cell(x,y,radialGradientVal,squareGradientVal);
            }
        }
        return cells;
    }

    squareGradient(width,height)
    {
        let halfWidth = width/2;
        let halfHeight = height /2;

        //Initialize 2D Array
        let gradientMap = this.plain(width,height,0);

        //Fill 2D Array with Square Gradient
        for(let j = 0; j < height; j++)
        {
            for(let i = 0; i < width; i++)
            {
                let x = i;
                let y = j;

                let value;

                x = x > halfWidth ? width - x : x;
                y = y > halfHeight ? height - y : y;

                let smaller = x < y ? x : y;
                value = smaller / halfWidth;

                value = 1 - value;
                value *= value * value;

                gradientMap[i][j] = value;
            }
        }
        return gradientMap;
    }

    radialGradient(width,height)
    {
        //Initialize 2D Arrays
        let plain = this.plain(width,height,1);
        let gradientMap = []

        let euclideanDistance = (point1, point2) => 
        {
            return Math.sqrt
            (
              Math.abs(Math.pow(point1.x - point2.x, 2)) +
              Math.abs(Math.pow(point1.y - point2.y, 2))
            )
        }
        
        let centrePoint = {x: Math.floor(width / 2), y: Math.floor(height / 2)}
        let furthestDistanceFromCentre = euclideanDistance({x: 0, y: 0}, centrePoint);
          
        for (let x = 0; x < width; x++) 
        {
            gradientMap[x] = [];
            for (var y = 0; y < height; y++) 
            {
                let val = Math.floor(furthestDistanceFromCentre - euclideanDistance({x: x, y: y}, centrePoint));
                val = (val / furthestDistanceFromCentre);
                gradientMap[x][y] = plain[x][y] - val;
            }
        }

        return gradientMap;
    }

    plain(width,height,value)
    {
        let plain = [];

        for(let x = 0; x < width; x++)
        {
            plain[x] = [];
            for(let y = 0; y < height; y++)
            {   
                plain[x][y] = value;
            }
        }

        return plain;
    }
}
