/** Embed the pregnancy clock timeline */
var embedTimeline = function (divId, dueDate, appHome) {
    var root = appHome?appHome:'';
    var div = document.getElementById(divId);
    var iframe = document.createElement('iframe');
    iframe.width = "907px";
    iframe.height = "208px";
    iframe.style = "border: none;";
    div.appendChild(iframe);
    iframe.src=appHome + "innerPregnancyTimeline.html#" + dueDate;
};
