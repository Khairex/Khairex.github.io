function UnityProgress(dom)
{
    this.progress = 0.0;
    this.message = "";
    this.dom = dom;

    var parent = dom.parentNode;
    
    var bg = document.getElementById("bg");
    var bgBar = document.getElementById("bgBar");
    var progressBar = document.getElementById("progressBar");
    var loadingBox = document.getElementById("loadingBox");
    var runningBox = document.getElementById("runningBox");
    var spinner = document.getElementById("spinner");

    this.SetProgress = function (progress)
    {
        if (this.progress < progress)
            this.progress = progress;

        if (progress == 1)
        {
            this.SetMessage("Preparing...");
            bgBar.style.display = "none";
            spinner.style.display = "inherit";
            runningBox.style.display = "block";
            progressBar.style.display = "none";
        }
        this.Update();
    }

    this.SetMessage = function (message)
    {
        // incoming: “Downloading Data… (XXXX/YYYYY)”
        if (message.toLowerCase().indexOf("down") !== -1)
        {
            // seperate numbers from all string
            var splitted1 = message.split("(");
            var lastPart = splitted1[splitted1.length - 1].slice(0, -1);
            var sizesArray = lastPart.split("/");

            // calculate percentage
            var percentage = Math.round((sizesArray[0] / sizesArray[1]) * 100);

            // set custom message
            this.message = !isNaN(percentage) ? "Downloading Data... " + percentage + "%" : "Downloading Data... 0%";
        }
        else
        {
            this.message = message;
        }
        this.Update();
    }

    this.Clear = function ()
    {
        loadingBox.style.display = "none";
        bg.style.display = "none";
        spinner.style.display = "none";
        runningBox.style.display = "none";
    }

    this.Update = function ()
    {
        var length = 200 * Math.min(this.progress, 1);
        //var tween = new createjs.Tween(progressBar).to({ width: length, ignoreGlobalPause: true }, 400, createjs.Ease.sineOut);
        progressBar.style.width = length + "px";
        loadingInfo.innerHTML = this.message;
    }

    this.Update();
}