(function () {
    "use strict";

    var isPlaying = false,
        time = 30,
        score = 0,
        correctAnswser = 0,
        timer;

    function getObject(id) {
        return document.getElementById(id);
    }

    function genenateRandom(maxValue) {
        return Math.floor((Math.random() * maxValue) + 1);;
    }

    
    function getFakesAnswsers(correctAnswser) {
        var maxResult = 144; //12x12
        var answsers = [];
        
        for (i = 0; i < 4; i++) {
            var added = false;
            
            while(!added){
                var ramd = genenateRandom(maxResult);
                if(answsers.indexOf(ramd) < 0  && ramd !== correctAnswser){
                   answsers.push(ramd);
                   //[i] = ramd;
                    added = true;
                }
            }
             
        }
        
        return answsers;
    }

    function generateQuestion() {
        var maxTable = 12,
            positions = 4,
            a = genenateRandom(maxTable),
            b = genenateRandom(maxTable),
            answerPosition = genenateRandom(positions);
            

        correctAnswser = a * b;
        var fakeAnswers = getFakesAnswsers(correctAnswser);
        fakeAnswers[answerPosition - 1] = correctAnswser;
        
        getObject("question").innerHTML = a + "x" + b;

        for (i = 0; i < positions; i++) {
            var id = "option_" + (i + 1);
            getObject(id).innerHTML = fakeAnswers[i];
        }
    }



    function gameOver() {
        isPlaying = false;
        getObject("finalScore").innerHTML = score;
        getObject("gameOver").style.display = "block";
    }

    function updateTimer() {
        if (time <= 0) {
            getObject("timer").style.display = "none";
        } else {
            getObject("timeValue").innerHTML = time;
        }
    }



    function reduceTime() {
        time -= 1;
        if (time === 0) {
            clearInterval(timer);
            gameOver();
        }
        updateTimer();
    }

    function testAnswser(value) {
        var divToShow = "correct";
        if (value != correctAnswser) {
            divToShow = "wrong";
        } else {
            updateScore();
            generateQuestion();
        }
        getObject(divToShow).style.display = "block";
        setTimeout(function () {
            getObject(divToShow).style.display = "none";
        }, 1000);
    }



    function updateScore() {
        score += 10;
        getObject("scoreValue").innerHTML = score;
    }

    function reset() {
        location.reload();
    }

    function start() {
        isPlaying = true;
        getObject("startReset").innerHTML = "Reset Game";
        updateTimer();
        getObject("timer").style.display = "block";
        generateQuestion();
        timer = setInterval(function () {
            reduceTime();
        }, 1000);
    }


    getObject("startReset").onclick = function () {
        if (isPlaying || time <= 0) {
            reset();
        } else {
            start();
        }
    };

    var x = document.getElementsByClassName("optionButton");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].onclick = function () {
            if (isPlaying) {
                testAnswser(this.innerHTML);
            }
        }
    }

})();
