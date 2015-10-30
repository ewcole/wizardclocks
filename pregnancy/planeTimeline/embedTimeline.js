/** Embed the pregnancy clock timeline */
var embedTimeline = function (divId, dueDate, appHome) {
    var root = appHome?appHome:'';
    var div = document.getElementById(divId);
    var iframe = document.createElement('iframe')
    iframe.width = "620px";
    iframe.height = "203px";
    iframe.style = "border: none;";
    div.appendChild(iframe);
    iframe.src=appHome + "innerPregnancyTimeline.html#" + dueDate;
};
