var pregnancyTimelineLoader = function (div, dueDate, local) {
    var root = "http://ewcole.github.io/wizardclocks/pregnancy/planeTimeline/";
    root = local?"":root;
root = "";
    var clockDiv = document.getElementById(div);
    var iFrame = document.createElement('iframe');
    clockDiv.appendChild(iFrame);
    iFrame.width  = "620px";
    iFrame.height = "203px";
    iFrame.style.border = "none";
    iFrame.src = root + "embeddedPregnancyTimeline.html";// + dueDate;
    return;
};
