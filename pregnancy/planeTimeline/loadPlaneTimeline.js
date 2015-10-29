var f = function (div, dueDate) {
    var clockDiv = document.getElementById(div);
    var iFrame = document.createElement('iframe');
    clockDiv.appendChild(iFrame);
    iFrame.width  = "620px";
    iFrame.height = "203px";
    iFrame.style.border = "none";
    iFrame.src = "pregnancyTimeline.html#2016-06-03";
    return;
}();
