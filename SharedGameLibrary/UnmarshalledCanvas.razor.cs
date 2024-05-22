#region Namespaces

using System.Runtime.InteropServices.JavaScript;
using System.Runtime.Versioning;

#endregion

namespace SharedGameLibrary
{
    /// <summary>
    /// See the link below for more on the documentation for this
    /// https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/import-export-interop?view=aspnetcore-8.0
    /// </summary>
    [SupportedOSPlatform("browser")]
    public partial class UnmarshalledCanvas
    {
        #region Imports - JS functions which can be called by .NET

        [JSImport("clearRect", "unmarshalledInterop")]
        internal static partial void ClearRect(
            [JSMarshalAs<JSType.Number>] int x,
            [JSMarshalAs<JSType.Number>] int y,
            [JSMarshalAs<JSType.Number>] int width,
            [JSMarshalAs<JSType.Number>] int height);

        [JSImport("drawRect", "unmarshalledInterop")]
        internal static partial void DrawRect(
            [JSMarshalAs<JSType.Number>] int x,
            [JSMarshalAs<JSType.Number>] int y,
            [JSMarshalAs<JSType.Number>] int width,
            [JSMarshalAs<JSType.Number>] int height);

        [JSImport("initialiseModule", "unmarshalledInterop")]
        internal static partial void InitialiseModule(
            [JSMarshalAs<JSType.String>] string assemblyName,
            [JSMarshalAs<JSType.String>] string componentName,
            [JSMarshalAs<JSType.String>] string canvasID);

        #endregion

        #region Exports - .NET functions which can be called from JS

        [JSExport]
        internal static void GameLoop(float gameTime, float timeDifference, float currentFramePerSecond)
        {
            // Update the game time
            ComponentObject?.MyFunctionWhichIsCalledEachFrame();
            //GameTime.FramesPerSecond = currentFramePerSecond;
            //GameTime.TimeSinceLastFrame = timeDifference;
            //GameTime.TotalGameTime = timeStamp;

            //// Run our games update/draw methods
            //await Game.UpdateAsync(GameTime);
            //await Game.DrawAsync(GameTime);
        }

        #endregion
    }    
}
