$(function () {
    //    alert(":v");

    var paint = false;
    var painting = true;
    var canvas = document.getElementById("lienzo");
    var context = canvas.getContext("2d");

    context.lineWidth = 3;
    context.strokeStyle = "#000";
    context.lineCap = "round";
    context.lineJoin = "round";
    
    if(typeof(localStorage) != null){
        var imageUrl = localStorage.getItem("imagen");
        if(imageUrl != null){
            var img = new Image();
            img.onload = function(){
                context.drawImage(img,0,0);
            }
            img.src = imageUrl;
        }
    }
    
    var mouse = {
        x: 10,
        y: -10
    };
    var container = $("#container");

    $("#slider").slider({
        min: 3,
        max: 30,
        slide: function (event, ui) {

            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            context.lineWidth = ui.value;
        }


    });
    
    $("#paintColor").change(function(){
       $("#circle").css("background-color",$(this).val()); 
    });
    
    function selectColor(){
        if(painting){
        context.strokeStyle = $("#paintColor").val();
        }else{
            context.strokeStyle = "#fff";
        }
    }
    $("#reset").click(function(){
       context.clearRect(0,0,800,600);
        $("#erase").removeClass("buttonPressed");
        painting = true;
    });

    $("#erase").click(function () {
        painting = !painting;
        
        $(this).toggleClass("buttonPressed");
        
        
            selectColor();

        
    });
    
    $("#save").click(function(){
        if(typeof(localStorage) != null){
            var url = canvas.toDataURL();
            localStorage.setItem("imagen", url);
        }else{
            alert("Your Browser does't not suppor local storage");
        }
    });
    
    

    container.mousedown(function (e) {
        paint = true;
        context.beginPath();
        selectColor();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        context.moveTo(mouse.x, mouse.y);



    });
    container.mousemove(function (e) {

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;

        if (paint) {
//            console.log(mouse);
            context.lineTo(mouse.x, mouse.y);
            context.stroke();
        }
    });





    container.mouseup(function () {
        paint = false;
    });



    //    context.lineCap = "round";
    //    context.moveTo(50,50);
    //    context.lineJoin = "round";
    //    context.lineTo(100,100);

    //    context.lineTo(200,100);

    //    context.stroke();


});
