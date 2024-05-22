var canvasContext = {};
var exports = {};
var lastFrameTime = 0;
var componentReference = {};
var initialised = false;

export async function initialiseModule(assemblyName, componentName, canvasID) {
    
    // Get the assembly exports
    const { getAssemblyExports } = await globalThis.getDotnetRuntime(0);
    exports = await getAssemblyExports(assemblyName + ".dll");

    // Save a reference to the Blazor component
    componentReference = exports[assemblyName][componentName];

    // References to the canvas
    var canvas = document.getElementById(canvasID);
    canvasContext = canvas.getContext("2d");

    if (!initialised) {
        // Set flag
        initialised = true;

        // Kick off the first game loop call...
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
    componentReference.GameLoop(gameTime, timeDifference, fps);
    
    // Save the time of the rendered frame
    lastFrameTime = gameTime;

    // Round and round we go...
    window.requestAnimationFrame(gameLoop);
}