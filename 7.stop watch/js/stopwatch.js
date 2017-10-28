$(function () {
    var mode = false;
    var counter = 0;
    var lapCounter = 0;
    var timer;
    var numberLap = 0;
    var minutes, seconds, miliseconds;
    var lapMinutes, lapSeconds, lapMiliseconds;

    function updateTime() {
        minutes = Math.floor(counter / 6000);
        seconds = Math.floor((counter % 6000) / 100);
        miliseconds = (counter % 6000) % 100;
        $("#timeMiliseconds").text(format(miliseconds));
        $("#timeSeconds").text(format(seconds));
        $("#timeMinutes").text(format(minutes));


        lapMinutes = Math.floor(lapCounter / 6000);
        lapSeconds = Math.floor((lapCounter % 6000) / 100);
        lapMiliseconds = (lapCounter % 6000) % 100;

        $("#lapMiliseconds").text(format(lapMiliseconds));
        $("#lapSeconds").text(format(lapSeconds));
        $("#lapMinutes").text(format(lapMinutes));
    }

    function startAction() {
        mode = true;
        timer = setInterval(function () {
            counter++;
            lapCounter++;
            updateTime();
        }, 10);
    }

    function stopAction() {
        clearInterval(timer);
    }

    function format(numb) {
        return numb >= 10 ? numb : '0' + numb;
    }

    function hideShowButtons(buttonA, buttonB) {
        $(".control").hide();
        $(buttonA).show();
        $(buttonB).show();
    }

    $("#startButoon").click(function () {
        hideShowButtons("#stopButton", "#lapButton");
        startAction();
    });

    $("#stopButton").click(function () {
        hideShowButtons("#resumeButton", "#resetButton");
        stopAction();
    });

    $("#resumeButton").click(function () {
        hideShowButtons("#stopButton", "#lapButton");
        startAction();
    });

    $("#resetButton").click(function () {
        location.reload();
    });

    function addLap() {
        numberLap++;
        var lapDetails = "<div class='lap'>" +
            "<div class='lapTittle'>Lap " + numberLap + "</div>" +
            "<div class='lapTime'><span>" + $("#lapMinutes").text() + ":" + $("#lapSeconds").text() + ":" + $("#lapMiliseconds").text() + "</span></div>" +
            "</div>";

        $(lapDetails).prependTo("#laps");
        $("#laps").scrollTop(0);
    }

    $("#lapButton").click(function () {
        if (mode) {
            stopAction();
            lapCounter = 0;
            addLap();
            startAction();
        }
    });

    hideShowButtons("#startButoon", "#resetButton");

});
