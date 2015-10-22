var scriptRoot = "https://sites.google.com/site/wizardclocks/special-events/pregnancy-clock/";
scriptRoot='';
var clockMotor = (function () {
    var clockWidth = 60;
    var cm = {};
    var faceFile = "tinyClockFace.png";
    var secondHandFile = "secondHand.png";
    var minuteHandFile = "minuteHand.png";
    var hourHandFile = "hourHand.png";
    cm.createClock = function (div) {
        if (!(div && div.getElementsByTagName)) {
            div = document.createElement("div");
            document.body.appendChild(div);
        }
        var clock = document.createElement("div");
        // set up the clock face
        clock.className = "js-clock";
        div.appendChild(clock);
        clock.style.width = clockWidth + "px";
        clock.style.height = clockWidth + "px";
        clock.style.position = "relative";
        var face = document.createElement("img");
        face.src = scriptRoot + faceFile;
        clock.appendChild(face);
        var createSixtyHand = function (className, handFileName) {
            var hand = document.createElement("img");
            hand.src = scriptRoot + handFileName;
            hand.style.position = "absolute";
            hand.style.top = 0;
            // Function to move the second hand to where it should be.
            hand.setPosition = function (s) {
                var offset = s * 60;
                // don't use commas in the rect, because it causes trouble 
                //    with old versions of internet explorer.
                var rect = "rect(0px " +
                        (offset + clockWidth) + "px " + //right
                        clockWidth + "px " + // bottom
                        offset + "px)";  //left
                hand.style.clip = rect;
                // if you don't specify units, firefox won't work.
                hand.style.left = -offset + "px";
            };
            return hand;
        };
        // Create the hour hand
        var hourHand = createSixtyHand("hours", hourHandFile);
        hourHand.setHours = function (h, m) {
            var position = Math.floor((h % 12) * 5);
            position += Math.floor(m / 12);
            hourHand.setPosition(position);
        };
        clock.appendChild(hourHand);
        // Create the minute hand.
        var minuteHand = createSixtyHand("minutes", minuteHandFile);
        minuteHand.setMinutes = function (m) {
            minuteHand.setPosition(m);
        };
        clock.appendChild(minuteHand);
        // Now to create the second hand.
        var secondHand = createSixtyHand("seconds", secondHandFile);
        // Function to move the second hand to where it should be.
        secondHand.setSeconds = function (s) {
            secondHand.setPosition(s);
        };
        clock.appendChild(secondHand);
        clock.setTime = function () {
            var time = new Date();
            secondHand.setSeconds(time.getSeconds());
            var minutes = time.getMinutes();
            minuteHand.setMinutes(time.getMinutes());
            hourHand.setHours(time.getHours(), minutes); 
        };
        clock.setTime();
        setInterval(clock.setTime, 200);
        return clock;
    };
    return cm;
}());

var createTimeline = function (dueDateString, div) {
    // Dimensions for the slider
    var slider = "StorkPlaneTiny.png?attredirects=0&d=1";
    var sliderHeight = 139;
    var sliderWidth  = 203;
    //var sliderMid = sliderWidth / 2;

    // Dimensions for the display
    var width = 600;
    var height = sliderHeight + 13;

    var skyHeight = 70;
    // Dates
    var dueDate = new Date(dueDateString);
    var conception = new Date(dueDate.getFullYear(), dueDate.getMonth() - 9, 
                              dueDate.getDate());
    var today = new Date();
    var rawScale = dueDate.getTime() - conception.getTime();
    var rawProgress = today.getTime() - conception.getTime();
    var day = 1000 * 60 * 60 * 24;
    //var gestationDays = Math.ceil(rawScale / day);
    //var gestationDaysCompleted = Math.ceil(rawProgress / day);

    var date2x = function (date) {
        var rawTime = date.getTime() - conception.getTime();
        var xTime = rawTime / rawScale;
        return Math.ceil(xTime * width);
    };

    // Now we create the frame to hold
    if (!(div && div.appendChild)) {
        div = document.createElement("div");
    }
    var frame = document.createElement("div");
    div.appendChild(frame);
    //frame.style.backgroundColor = "#eef";
    frame.style.width = width;
    //frame.style.border = "1px solid blue";
    frame.style.height = height + "px";
    frame.style.left = 0;
    frame.style.right = 0;
    // 
    var sky = document.createElement("img");
    sky.src = scriptRoot + "sky.jpg";
    frame.appendChild(sky);
    sky.style.position = "absolute";
    var skyTop = Math.ceil((height - skyHeight) / 2);
    sky.style.top = skyTop + "px";

    // Decide where the clock should go.
    var clockX = 20;
    var clockWidth = 60;
    var clockY = (skyTop + 5);
    if (rawProgress / rawScale < 0.5) {
        clockX = 530;
    }

    // Add markings for each month.
    var addMonthMark = function (date) {
        var month = date.getMonth();
        var year = date.getFullYear();
        var newDate = new Date(year, month, 1);
        var posn = date2x(newDate);
        var tick = document.createElement("img");
        tick.src = scriptRoot + "monthMarks.png";
        tick.style.position = "absolute";
        tick.style.top = "41px";
        var clipLeft = month * 10;
        var rect = "rect(0px " + (clipLeft + 10) + "px 70px " + (clipLeft) + "px)";
        tick.style.clip = rect;
        var left = (posn - 5 - clipLeft);
        tick.style.left = left + "px";
        if (posn < 15) {
            // don't show the mark.
        } else if (posn > 585) {
            // don't show the mark.
        } else if (posn > clockX - 15 && posn < clockX + clockWidth + 15) {
            // don't show the mark.
        } else {
            frame.appendChild(tick);
        }
        return new Date(year, month - 1, 1);
    };

    // Put tick marks in for each month
    var tickDate = dueDate;
    while ((tickDate = addMonthMark(tickDate)) > conception) {}

    // If there is a clockMotor, then add a clock to the face.
    if (clockMotor) {
        var clockFrame = document.createElement("div");
        frame.appendChild(clockFrame);
        clockFrame.style.position = "absolute";
        clockFrame.style.top = clockY + "px";
        clockFrame.style.left = clockX  + "px";
        frame.clock = clockMotor.createClock(clockFrame);
    }

    // now create the image element to show the slider.
    var img = document.createElement("img");
    img.src = scriptRoot + slider;
    img.style.position = "absolute";
    img.style.top = ((height - sliderHeight) / 2) + "px";
    //img.style.left = Math.ceil((rawProgress / rawScale) * width - sliderWidth / 2);
    frame.appendChild(img);
    frame.setSliderPosition = function () {
        rawProgress = today.getTime() - conception.getTime();
        img.style.left = (Math.ceil((rawProgress / rawScale) * width - sliderWidth / 2)) + "px";
    };
    frame.setSliderPosition();
    // update the position once an hour.
    setInterval(frame.setSliderPosition, 360000);
    
    // Add text to show show the number of days remaining.
    var textDiv = document.createElement("div");
    frame.appendChild(textDiv);
    textDiv.style.textAlign = "center";
    var completedSpan = document.createElement("span");
    textDiv.appendChild(completedSpan);
    textDiv.appendChild(document.createTextNode(" days completed, "));
    var remainingSpan = document.createElement("span");
    textDiv.appendChild(remainingSpan);
    textDiv.appendChild(document.createTextNode(" days to go."));    
    var gestationDaysCompleted = Math.floor((today - conception) / day);
    completedSpan.innerHTML = gestationDaysCompleted;
    var gestationDaysRemaining = Math.floor((dueDate - today) / day);
    remainingSpan.innerHTML = gestationDaysRemaining;
};
