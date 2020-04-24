# Map-Gen Gold

# Description

An in-browser 2D Map Generator built with HTML, CSS, Javascript and the p5.js library. The Maps are generated using Perlin Noise and have a variety of sliders/buttons to alter the way it generates and a few options to choose from regarding the way it draws the Map onto the canvas.

This project is still a work-in-progress and will probably be so for some time. I have a lot of ideas for functionality to add and generally I'm very excited and interested in procedural-generation/map-generation. Basically, I could work on this forever.

You can also check out my previous version https://github.com/RanDByyp/MapGen-Silver or live at https://randbyyp.github.io/MapGen-Silver/. The previous version won't be updated anymore, but I want to keep it live for comparison with this version.

![Image of MapGen](https://github.com/RanDByyp/MapGen-Gold/blob/master/mapgen-gold.PNG)

# Table of Contents

- **index.html:** Sets up all relevant scripts and allows for the drawing of a canvas.
- **main.css:** Styles the UI.
- **sketch.js** Main operator. Initializes all variables and calls all functions to generate/update/draw/etc.
- **Display** Handles drawing to the canvas, and makes sure the correct colors/sprites are drawn corresponding to their values.
- **Navigator.js** Handles Map Navigation and allows you to be able to read out individual cell data.
- **UI.js** Initializes the UI elements. Updates UI and compares for changes.
- **Images** Stores all Sprites that are used to draw. (You can replace these with your own images, but make sure the naming, file-type and resolution (8x8) is the same!)

# Installation
1. Download all the project files in this repository.
2. Download the p5.js library (https://p5js.org/download/) and add it to the root-folder (Same folder as index.html). The p5.js library is already referenced in the index.html file.

# Usage
- Use the Menu to adjust the way the Map is generated.
  - **Map:** Enter a **Seed** to generate a new Map width by pressing **New Map**.
  - **Noise:** Adjust the **Overall Height** to change the height treshold. Adjust the **Scattering** to change how much the cells clump  together.
  - **Heights:** Adjust the sliders to change the range by which specific sprites are generated.
  - **Visuals:** Change the way the map is drawn to screen (**Sprites** or Shapes including (**Circles, Squares, Triangles**). Toggle **No Fill** to draw only outline or full shapes.
  - **Colors:** Adjust the colors of the drawn shapes for every height-range. 
  <br>Make sure you use the correct color formats!
    - Hexcodes **#00FFDD** 
    - HTML Color-Names **red** 
    - RBG Values **rgb(255, 191, 0)** 
    - HSL Values **hsl(180, 100%, 50%)**
  
- Use WASD to navigate the Map (This is tediously slow, and will definitely be improved upon).

# Contribution
As of now I'm not accepting any pull-requests. This is a passion project of mine I'd like to develop on my own. However, feel free to use the code to build your own map-generator. I'm very curious to see what other people make with this!

# Future Features (No promises!)
Priority
- Seperate Logic and UI properly!

Semi-Priority
- Improved Map Navigation (Cell Select by Mouse)
- Responsive to different devices/screen types + Touch Screen Navigation.
- Biomes (Different climates across the Map. Possibly with UI Manipulation)

Bonus
- River Generation
- Town Generation
- Tree/Flora Generation
- Manual Adjusting of Map (Place your own individual towns/trees)
- Height Brush (Increase or decrease heights by drawing on the canvas)

# Credits
This program was made by Joran de Boer AKA RanDByyp using the p5.js Library (https://p5js.org/) (which is not made by Joran).

# License
The p5.js library used in this project uses the **GNU Lesser General Public License v2.1** which you can view here:
https://github.com/processing/p5.js/blob/master/license.txt

The rest of the program which is written by me (Joran de Boer AKA RanDByyp) uses the **MIT License**:

Copyright 2020 Joran de Boer AKA RanDByyp

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

# Contact

https://twitter.com/RandbYyp
