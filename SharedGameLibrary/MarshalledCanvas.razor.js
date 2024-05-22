var canvasContext = {};
var lastFrameTime = 0;
var dotNetObjectReference = {};
var initialised = false;
export async function initialiseModule(objectReference, canvasID) {
    // Get the reference for .NET
    dotNetObjectReference = objectReference;

    // References to the canvas
    var canvas = document.getElementById(canvasID);
    canvasContext = canvas.getContext("2d");

    // Kick off the first game loop call...
    if (!initialised) {
        // Set flag
        initialised = true;

        window.requestAnimationFrame(gameLoop);
    }
}

export function clearRect(x, y, width, height) {    
    canvasContext.clearRect(x, y, width, height);
}

export function drawRect(x, y, width, height) {
    canvasContext.fillStyle = "red";
    canvasContext.fillRect(x, y, width, height);
}

function gameLoop(gameTime) {
    // Calculate time difference since last frame    
    var timeDifference = gameTime - lastFrameTime;
    var fps = 1.0 / (timeDifference / 1000);

    // Call our Blazor game loop
    dotNetObjectReference.invokeMethodAsync("GameLoop", gameTime, timeDifference, fps);

    // Save the time of the rendered frame
    lastFrameTime = gameTime;

    // Round and round we go...
    window.requestAnimationFrame(gameLoop);
}