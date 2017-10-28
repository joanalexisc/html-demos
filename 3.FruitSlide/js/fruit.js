    var lifePoints = 3;
    var isPlaying = false;
    var score = 0;
    var fruitImages = ["apple", "grapes", "orange"];
    var floor = 0;
    var goDown;
    //var generatorTimer;

    function updateLifePoints() {
        if (lifePoints === 0) {
            $("#lifePoints").hide();
            gameOver();
        }
        $("#lifePoints").empty();
        var img = "";
        for (i = 1; i <= lifePoints; i++) {
            img += '<img id="heart_' + i + '"  class="heartPoint" src="images/heart_mini.png">';
        }

        $(img).appendTo($("#lifePoints"));
    }

    function gameOver() {
        $("#finalScore").html(score);
        $("#gameOver").show();
    }

    function startPlaying() {
        updateLifePoints();
        //        generatorTimer = setInterval(function () {
        generateFruit();
        //        }, 2000);
    }

    function generateFruit() {
        var fruitIndex = generateRandom(fruitImages.length);
        var img = "images/" + fruitImages[fruitIndex] + ".png";
        var fieldWidth = parseInt($("#gameField").css("width"), 10) - 42;
        var x = generateRandom(1, fieldWidth);
        var y = 1; //-50
        $("#fruitObject").attr("src", img);
        $("#fruitObject").css({
            "left": x,
            "top": y //-50
        });
        $("#fruitObject").show();


        goDown = setInterval(function () {
            var y = $("#fruitObject").position().top;
            var step = generateRandom(1, 6);
            y += step;
            $("#fruitObject").css({
                "top": y
            });

            if (y > floor) {
                stopFruit();
                reduceLife();
            }
        }, 10);

    }

    function reduceLife() {
        lifePoints--;
        updateLifePoints();
        if (lifePoints > 0) {
            generateFruit();
        }
    }

    function generateRandom() {

        var number = 0,
            startFrom = 0,
            ramd = 0;
        if (arguments.length === 1) {
            number = arguments[0];
        } else if (arguments.length === 2) {
            startFrom = arguments[0];
            number = arguments[1];
        }
        ramd = startFrom + Math.floor(Math.random() * number);
        return ramd;
    }

    function increaseScore() {
        score++;
        $("#scoreValue").html(score);
    }

    function slideFruit() {
        $("#slideSound")[0].play(); //return an array need to select the firts element

        clearInterval(goDown);
        $("#fruitObject").hide("explode", 500);
        timeout = setTimeout(function(){
            generateFruit()
        }, 500);
        increaseScore();
    }

    function stopFruit() {
        clearInterval(goDown);
        $("#fruitObject").hide();
    }

    $(function () {
        floor = $("#gameField").height()

        $("#startReset").click(function () {
            if (isPlaying) {
                location.reload();
            } else {
                isPlaying = true;
                $("#startReset").text("Reset");
                $("#lifePoints").show();
                startPlaying();
            }
        });



        $("#fruitObject").mouseover(function () {
            slideFruit();
        });

    });
