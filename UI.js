var UI = 
{
    initialize: function()
    {
        //Create UI (Sliders/Checkbox/Buttons)
        //-----Slider to alter Map Shape (FallOff) - Link to HTML - and set Variables
        sliderFallOff = {element:createSlider(0.00,1,.6,.05)};
        sliderFallOff.element.class('slider');
        let myDiv = createDiv('<p>Overall Height</p>');
        myDiv.id('slider-falloff');
        myDiv.parent('menu-noise-holder');
        sliderFallOff.element.parent(myDiv);
        fallOff = sliderFallOff.element.value();
        
        //-----Slider to alter Map Shape (Scale) - Link to HTML - and set Variables
        sliderNoiseScale = {element:createSlider(0,.5,.1,0.01)};
        sliderNoiseScale.element.class('slider');
        myDiv = createDiv('<p>Scattering</p>')
        myDiv.id('slider-scale');
        myDiv.parent('menu-noise-holder');
        sliderNoiseScale.element.parent(myDiv);
        noiseScale = sliderNoiseScale.element.value();
        
        //-----Checkbox to Substract Gradient from Map - Link to HTML - and set Variables;
        checkBoxGradient = {element:createCheckbox('Island',true)};
        checkBoxGradient.element.class('checkbox');
        myDiv = createDiv();
        myDiv.id('checkbox-gradient');
        myDiv.parent('menu-noise-holder');
        checkBoxGradient.element.parent(myDiv);
        gradient = checkBoxGradient.element.value();

        //-----Textfield to Type Noise Generation Seed - Link to HTML - and set Variables
        myDiv = createElement('p','Seed: ');
        myDiv.parent('menu-map-holder');
        textFieldSeed = createInput(mapSeed);
        textFieldSeed.class('textfield');
        myDiv = createDiv();
        myDiv.id('seed');
        myDiv.parent('menu-map-holder');
        textFieldSeed.parent(myDiv);

        myDiv = createElement('p','Must be numeric!');
        myDiv.parent('menu-map-holder');

        //-----Button for New Map Generation - Link to HTML - and set Variables
        buttonNewMap = {element:createButton('New Map')};
        buttonNewMap.element.class('button');
        myDiv = createDiv();
        myDiv.id('button-new-map');
        myDiv.parent('menu-map-holder');
        buttonNewMap.element.parent(myDiv);


        //-----Create Radio Button to Switch between Visual Representation of Map - and set Variables
        for(let i = 0; i < 4; i ++)
        {
            radioVisuals[i] = document.getElementById('radio-visuals-type-'+String(i));
        }
        radioVisuals[0].checked = true;
        visualsType = radioVisuals[0].value;

        //-----Checkbox to Toggle Shape Outlines - Link to HTML - and set Variables
        checkBoxOutline = {element:createCheckbox(' No Fill',true)};
        checkBoxOutline.element.class('checkbox');
        myDiv = createDiv();
        myDiv.id('checkbox-outline');
        myDiv.parent('menu-visuals-holder');
        checkBoxOutline.element.parent(myDiv);
        outline = checkBoxOutline.element.value();

        //-----Create 7 Sliders for Height Distribution - Link to HTML - and set Variables
        for(i = 1; i < 8; i++)
        {
            let max = 1 / sprites.length;
            slidersHeightRange[i] = {element:createSlider(0,max,max,max/20),step:max/20};
            slidersHeightRange[i].element.class('slider');
            myDiv = createDiv('<p>'+sprites[i].name+'</p>');
            myDiv.id('slider-height-range-'+String[i]);
            myDiv.parent('input-height-range-holder');
            slidersHeightRange[i].element.parent(myDiv);
            heightRanges[i] = slidersHeightRange[i].element.value();
        }

        //-----Create 8 Textfields for Shape Colors - Linkt to HTML - and set Variables
        for(i = 0; i < 8; i++)
        {
            textFieldsColor[i] = {element:createInput(colors[i])};
            textFieldsColor[i].element.class('textfield');
            myDiv = createDiv('<p>'+sprites[i].name+'</p>');
            myDiv.id('textfield-visuals-color-'+String[i]);
            myDiv.parent('input-visuals-color-holder');
            textFieldsColor[i].element.parent(myDiv);
        }
    },

    update: function()
    { 
        let updated = false;

        //Store Latest UI Values
        let prevFallOff = fallOff;
        let prevNoiseScale = noiseScale;
        let prevGradient = gradient;
        let prevVisualsType = visualsType; 
        let prevOutline = outline;

        //Update Current UI Values
        fallOff = sliderFallOff.element.value();
        noiseScale = sliderNoiseScale.element.value();
        gradient = checkBoxGradient.element.checked();
        outline = checkBoxOutline.element.checked();
        buttonNewMap.element.mousePressed(newMap);

        //Compare UI Values for Changes
        if (prevFallOff != fallOff || prevNoiseScale != noiseScale || prevGradient != gradient || prevOutline != outline)
        {
            updated = true;
        }

        //Check Radio Button
        for(let i = 0; i < 4; i++)
        {
            if (radioVisuals[i].checked == true)
            {
                prevVisualsType = visualsType;
                visualsType = radioVisuals[i].value;
                if (prevVisualsType != visualsType)
                {
                    updated = true;
                }
            }
        }
        
        //Store Latest and Update Current UI Values for Height Distribution - and compare for Changes
        for(i = 1; i < sprites.length; i++)
        {
            prevHeightRanges[i] = heightRanges[i];
            heightRanges[i] = slidersHeightRange[i].element.value();

            if (prevHeightRanges[i] != heightRanges[i])
            {
                this.adjustSliders(i);
                updated = true;
            }
        }

        //Store Latest and Update Current UI Values for Visuals Colors - and compare for Changes
        for(i = 0; i < sprites.length; i++)
        {
            prevColors[i] = colors[i];
            colors[i] = textFieldsColor[i].element.value();
            if (prevColors[i] != colors[i])
            {
                updated = true;
            }
        }

        return updated;
    },

    adjustSliders: function(sliderIndex)
    {
        let i = sliderIndex;

        //Compare Height Distribution Sliders and Adjust According to Neighbours Value if nessecary.    
        //-----If Slider Value has Decreased
        if (prevHeightRanges[i] > heightRanges[i])
        {
            //If Current Slider is Lower than Neighbouring-Top-Slider
            if (heightRanges[i] < heightRanges[i-1])
            {
                //Set all Neighbouring-Top-Slider to Value of Current Slider
                for(j = i; j > 1; j--)
                {
                    heightRanges[j-1] = heightRanges[j];
                    slidersHeightRange[j-1].element.value(heightRanges[j-1]);
                }
            }
        }
        //-----If Slider Value has Increased
        else if (prevHeightRanges[i] < heightRanges[i])
        {
            //If Current Slider is Higher than Neighbouring-Bottom-Slider
            if (heightRanges[i] > heightRanges[i+1])
            {
                //Set all Neighbouring-Bottom-Slider to Value of Current Slider
                for(j = i; j < heightRanges.length-1; j++)
                {
                    heightRanges[j+1] = heightRanges[j];
                    slidersHeightRange[j+1].element.value(heightRanges[j+1]);
                }
            }
        }
    }
}