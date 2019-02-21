// TODO
// Reflections
// Skybox
// Module
// Image Select
// Aspect Ratio Correction
// Signature
// Achieved with three.js

// Compile time parameters
meshX=72
meshY=45
outerGap=.125
fovX=45
transitionSpeed=1
interactionSensitivity=.5

// Initializing Constants
const rendererEle=document.getElementById('renderer')
const meshMax=Math.max(meshX,meshY)
const viewRectWidth=meshX+outerGap*meshX
const viewRectHeight=meshY+outerGap*meshX
const aspectRatio=viewRectWidth/viewRectHeight
const camZ=(viewRectWidth/2)/Math.tan((fovX/2)*piBy180)
const fovY=2*Math.atan((viewRectHeight/2)/camZ)/piBy180

// Internal Variables
let mul=(meshX+meshY)/(2*meshMax)
mul=(mul+1)/2
