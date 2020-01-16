var out_img = "img";
var img_src;

function img_show(obj) {
    if (FileReader) {
        var reader = new FileReader();
        reader.readAsDataURL(obj.files[0]);
        reader.onload = function (file) {
            var image = new Image();
            image.src = file.target.result;
            image.onload = function () {
                img_src = document.getElementById(out_img).src = image.src;
            };
        }
    }
}

window.onload = function () {
    var canvas = document.getElementById("obraz");
    var context = canvas.getContext("2d");
    var img = document.getElementById("img");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    context.drawImage(img, 0, 0);
};

function check() {
    var canvas = document.getElementById("obraz");
    var context = canvas.getContext("2d");
    var img = document.getElementById("img");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    context.drawImage(img,0,0);
    var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    var zmiana = imgData.data;
    var odwrocone_kolory = document.getElementById("odwrocone_kolory");
    var szarosc = document.getElementById("szarosc");
    var czerwony = document.getElementById("czerwony");
    var zielony = document.getElementById("zielony");
    var niebieski = document.getElementById("niebieski");
    var jasnosc_0 = document.getElementById("jasnosc_0");
    var slider = document.getElementById('slider');
    var wartosc = document.getElementById('wartosc');

    function odwroc_kolory(data) {
        for (var i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];
            data[i+1] = 255 - data[i+1];
            data[i+2] = 255 - data[i+2];
        }
    }

    function skala_szarosci(data) {

        for (var i = 0; i < data.length; i += 4) {
            var average = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = data[i + 1] = data[i + 2] = average;
        }
    }

    function czerwony_tylko(data){
        for (var i = 0; i < data.length; i += 4) {
            data[i+1] = 0;
            data[i+2] = 0;
        }
    }

    function zielony_tylko(data){
        for (var i = 0; i < data.length; i += 4) {
            data[i] = 0;
            data[i+2] = 0;
        }
    }

    function niebieski_tylko(data){
        for (var i = 0; i < data.length; i += 4) {
            data[i+1] = 0;
            data[i] = 0;
        }
    }

    function jasnosc(slider, data){
        for (var i = 0; i < data.length; i += 4) {
            data[i] += 255 * (slider / 100);
            data[i+1] += 255 * (slider / 100);
            data[i+2] += 255 * (slider / 100);
        }
    }

    if(odwrocone_kolory.checked === true)
        odwroc_kolory(zmiana);

    if(szarosc.checked === true)
        skala_szarosci(zmiana);

    if(czerwony.checked === true)
        czerwony_tylko(zmiana);

    if(zielony.checked === true)
        zielony_tylko(zmiana);

    if(niebieski.checked === true)
        niebieski_tylko(zmiana);

    if(jasnosc_0.checked === true){
        if(wartosc.innerText === "0")
            jasnosc(0, zmiana);
        else
            jasnosc(wartosc.innerText, zmiana);
    }

    slider.oninput = function(){
        wartosc.innerText = this.value;
    };

    context.putImageData(imgData, 0, 0);
}

function plotno() {
    var canvas = document.getElementById("obraz");
    var context = canvas.getContext("2d");
    var h = document.getElementById('h');
    var w = document.getElementById('w');
    var kwadrat = document.getElementById('kwadrat');
    var serduszko = document.getElementById('serduszko');
    var dymek = document.getElementById('dymek');
    var stroke = document.getElementById('stroke');
    var fill = document.getElementById('fill');
    var bok = document.getElementById('bok');
    var red = document.getElementById('red');
    var blue = document.getElementById('blue');
    var yellow = document.getElementById('yellow');
    var green = document.getElementById('green');
    var black = document.getElementById('black');
    canvas.width = w.value;
    canvas.height = h.value;
    context.fillStyle = "white";
    context.fillRect(0,0,canvas.width, canvas.height);

    if(red.checked === true) {
        context.fillStyle = 'red';
        context.strokeStyle = 'red';
    }
    if(blue.checked === true) {
        context.fillStyle = 'blue';
        context.strokeStyle = 'blue';
    }
    if(yellow.checked === true) {
        context.fillStyle = 'yellow';
        context.strokeStyle = 'yellow';
    }
    if(green.checked === true) {
        context.fillStyle = 'green';
        context.strokeStyle = 'green';
    }
    if(black.checked === true) {
        context.fillStyle = 'black';
        context.strokeStyle = 'black';
    }

    if(kwadrat.checked === true){
        if(fill.checked === true)
            context.fillRect(rand(0,canvas.width), rand(0,canvas.height), bok.value, bok.value);
        if(stroke.checked === true)
            context.strokeRect(rand(0,canvas.width), rand(0,canvas.height), bok.value, bok.value);
    }

    if(serduszko.checked === true){
        context.beginPath();
        context.moveTo(75,40);
        context.bezierCurveTo(75,37,70,25,50,25);
        context.bezierCurveTo(20,25,20,62.5,20,62.5);
        context.bezierCurveTo(20,80,40,102,75,120);
        context.bezierCurveTo(110,102,130,80,130,62.5);
        context.bezierCurveTo(130,62.5,130,25,100,25);
        context.bezierCurveTo(85,25,75,37,75,40);
        if(fill.checked === true)
            context.fill();
        if(stroke.checked === true)
            context.stroke();
    }

    if(dymek.checked === true){
        context.beginPath();
        context.moveTo(75,25);
        context.quadraticCurveTo(25,25,25,62.5);
        context.quadraticCurveTo(25,100,50,100);
        context.quadraticCurveTo(50,120,30,125);
        context.quadraticCurveTo(60,120,65,100);
        context.quadraticCurveTo(125,100,125,62.5);
        context.quadraticCurveTo(125,25,75,25);
        if(fill.checked === true)
            context.fill();
        if(stroke.checked === true)
            context.stroke();
    }

}

function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}