var UI = 
{       
    elements: 
    {
        //Menu Map
        textFieldSeed: undefined, 
        buttonNewMap: undefined,
        //Menu Noise
        sliderFallOff: undefined,
        sliderNoiseScale: undefined,
        checkBoxGradient: undefined,
        //Menu Heights
        slidersHeightRange: [],
        //Menu Visuals
        radioVisuals: [],
        checkBoxOutline: undefined,
        //Menu Colors
        textFieldsColor: []
    },

    initialize: function()
    {
        //Create UI (Sliders/Checkbox/Buttons)

        //MENU MAP
            //-----Textfield to Type Noise Generation Seed - Link to HTML - and set Variables
            let myDiv = createElement('p','Seed: ');
            myDiv.parent('menu-map-holder');
            textFieldSeed = createInput(mapSeed);
            textFieldSeed.changePending = false;
            textFieldSeed.prevValue = textFieldSeed.value();

            textFieldSeed.class('textfield');
            myDiv = createDiv();
            myDiv.id('seed');
            myDiv.parent('menu-map-holder');
            textFieldSeed.parent(myDiv);

            myDiv = createElement('p','Must be numeric!');
            myDiv.parent('menu-map-holder');

            //-----Button for New Map Generation - Link to HTML - and set Variables
            buttonNewMap = createButton('New Map');
            buttonNewMap.changePending = false;

            buttonNewMap.class('button');
            myDiv = createDiv();
            myDiv.id('button-new-map');
            myDiv.parent('menu-map-holder');
            buttonNewMap.parent(myDiv);

        //MENU NOISE
            //-----Slider to alter Map Shape (FallOff) - Link to HTML - and set Variables
            sliderFallOff = createSlider(0.00,1,.6,.05);
            sliderFallOff.class('slider');
            sliderFallOff.changePending = false;
            sliderFallOff.prevValue = sliderFallOff.value();

            myDiv = createDiv('<p>Overall Height</p>');
            myDiv.id('slider-falloff');
            myDiv.parent('menu-noise-holder');
            sliderFallOff.parent(myDiv);
            fallOff = sliderFallOff.value();
            
            //-----Slider to alter Map Shape (Scale) - Link to HTML - and set Variables
            sliderNoiseScale = createSlider(0,.5,.1,0.01);
            sliderNoiseScale.class('slider');
            sliderNoiseScale.changePending = false;
            sliderNoiseScale.prevValue = sliderNoiseScale.value();

            myDiv = createDiv('<p>Scattering</p>')
            myDiv.id('slider-scale');
            myDiv.parent('menu-noise-holder');
            sliderNoiseScale.parent(myDiv);
            noiseScale = sliderNoiseScale.value();
            
            //-----Checkbox to Substract Gradient from Map - Link to HTML - and set Variables;
            checkBoxGradient = createCheckbox('Island',true);
            checkBoxGradient.class('checkbox');
            checkBoxGradient.changePending = false;
            checkBoxGradient.prevValue = checkBoxGradient.value();

            myDiv = createDiv();
            myDiv.id('checkbox-gradient');
            myDiv.parent('menu-noise-holder');
            checkBoxGradient.parent(myDiv);
            gradient = checkBoxGradient.value();

        //-----Create 7 Sliders for Height Distribution - Link to HTML - and set Variables

        heightRanges[0] = 0;

        slidersHeightRange[0] = {val: 0, value: function(){return this.val}};
        for(i = 1; i < 8; i++)
        {
            let max = 1 / sprites.length;
            slidersHeightRange[i] = createSlider(0,max,max,max/20);

            slidersHeightRange[i].class('slider');
            slidersHeightRange[i].changePending = false;
            slidersHeightRange[i].prevValue = slidersHeightRange[i].value();

            myDiv = createDiv('<p>'+sprites[i].name+'</p>');
            myDiv.id('slider-height-range-'+String[i]);
            myDiv.parent('input-height-range-holder');
            slidersHeightRange[i].parent(myDiv);
            heightRanges[i] = slidersHeightRange[i].value();
        }

         //-----Create Radio Button to Switch between Visual Representation of Map - and set Variables
        for(let i = 0; i < 4; i ++)
         {
             radioVisuals[i] = document.getElementById('radio-visuals-type-'+String(i));
             radioVisuals[i].changePending = false;
             radioVisuals[i].prevValue = radioVisuals[i].checked;
         }
         radioVisuals[0].checked = true;
         visualsType = radioVisuals[0].value;
 
         //-----Checkbox to Toggle Shape Outlines - Link to HTML - and set Variables
         checkBoxOutline = createCheckbox(' No Fill',true);
         checkBoxOutline.changePending = false;
         checkBoxOutline.prevValue = checkBoxOutline.value();

         checkBoxOutline.class('checkbox');
         myDiv = createDiv();
         myDiv.id('checkbox-outline');
         myDiv.parent('menu-visuals-holder');
         checkBoxOutline.parent(myDiv);
         outline = checkBoxOutline.value();

        //-----Create 8 Textfields for Shape Colors - Linkt to HTML - and set Variables
        for(i = 0; i < 8; i++)
        {
            textFieldsColor[i] = createInput(colors[i]);
            textFieldsColor[i].changePending = false;
            textFieldsColor[i].prevValue = textFieldsColor[i].value();

            textFieldsColor[i].class('textfield');
            myDiv = createDiv('<p>'+sprites[i].name+'</p>');
            myDiv.id('textfield-visuals-color-'+String[i]);
            myDiv.parent('input-visuals-color-holder');
            textFieldsColor[i].parent(myDiv);
        }
    },

    update: function()
    { 
        let updated = false;

        //Store Latest UI Values
        let prevFallOff = fallOff;
        let prevNoise = noiseScale;
        let prevGradient = gradient;
        let prevVisualsType = visualsType; 
        let prevOutline = outline;

        //Update Current UI Values
        fallOff = sliderFallOff.value();
        noiseScale = sliderNoiseScale.value();
        gradient = checkBoxGradient.checked();
        outline = checkBoxOutline.checked();
        //buttonNewMap.element.mousePressed(newMap);

        //Compare UI Values for Changes
        if (prevFallOff != fallOff || prevNoise != noiseScale || prevGradient != gradient || prevOutline != outline)
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
            heightRanges[i] = slidersHeightRange[i].value();

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
            colors[i] = textFieldsColor[i].value();
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
                    slidersHeightRange[j-1].value(heightRanges[j-1]);
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
                    slidersHeightRange[j+1].value(heightRanges[j+1]);
                }
            }
        }
    }
}