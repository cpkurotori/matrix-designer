/* global $*/

function changeColor(){
    var red = $('input')[3].value;
    var green =$('input')[4].value;
    var blue = $('input')[5].value;
    var rgb = String(red)+','+String(green)+','+String(blue);
    console.log(rgb);
    if (!this.active || this.rgb != rgb){
        this.style="background-color:"+"rgb("+rgb+");";
        this.active=true;
        this.rgb=rgb;
    }
    else{
        this.style = "background-color:rgb(0,0,0);";
        this.active=false;
        this.rgb="0,0,0";
    };
};

function fillAll(){
    var width = document.getElementById('width').value
    var height = document.getElementById('height').value
    var red = $('input')[3].value;
    var green =$('input')[4].value;
    var blue = $('input')[5].value;
    var rgb = String(red)+','+String(green)+','+String(blue);   
    for (var i = 0; i < height; i++){
        for (var j = 0; j < width; j++){
            var cell = document.getElementById(width*Number(i)+Number(j));
            cell.style="background-color:rgb("+rgb+");";
            cell.active = true;
            cell.rgb = rgb;
        };
    };
};

function clearBack(){
    var width = document.getElementById('width').value
    var height = document.getElementById('height').value
    for (var i = 0; i < height; i++){
        for (var j = 0; j < width; j++){
            var cell = document.getElementById(width*Number(i)+Number(j));
            cell.style="background-color:rgb(0,0,0);";
            cell.active = false;
            cell.rgb = "0,0,0";
        };
    };
};

function hoverColor(){
    var red = $('input')[3].value;
    var green =$('input')[4].value;
    var blue = $('input')[5].value;
    var rgb = String(red)+','+String(green)+','+String(blue);
    this.style="background-color:rgb("+rgb+");";
    if (this.active && this.rgb == rgb){
        var gradient = "linear-gradient(45deg,"
        for (var i = 1; i < 5; i++){
            gradient += "rgb("+rgb+") "+(2*i-1)*10+"%, ";
            gradient += "rgb(0,0,0) "+(2*i-1)*10+"%, ";
            gradient += "rgb(0,0,0) "+(2*i)*10+"%, ";
            gradient += "rgb("+rgb+") "+(2*i)*10+"%, ";
        }
        gradient += "rgb("+rgb+") 90%, "+"rgb(0,0,0) 90%)";
        this.style.background = gradient;
    }
}

function revertColor(){
    this.style="background-color:rgb("+this.rgb+");";
}


function createTable(){
    var table = document.getElementById('matrix_table');
    while (table.hasChildNodes()){
        table.removeChild(table.lastChild);
    }
    var width=document.getElementById("width").value;
    var height=document.getElementById("height").value;
    if (width > 16) {width=16;document.getElementById("width").value=16};
    if (height > 16) {height=16;document.getElementById("height").value=16};
    if (width < 1) {width=1;document.getElementById("width").value=1};
    if (width < 1) {height=1;document.getElementById("height").value=1};
    for (var i = 0; i < height; i++){
        var tr = document.createElement("TR");
        for (var j = 0; j < width; j++){
            var td = document.createElement("TD");
            td.id = width*Number(i)+Number(j);
            td.rgb = "0,0,0";
            td.active = false;
            td.style="background-color:rgb(0,0,0);";
            td.onclick = changeColor;
            td.onmouseover = hoverColor;
            td.onmouseout = revertColor;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}



function printGrid(colors,matrix){
    // var list = document.getElementById('color-list');
    // while (list.hasChildNodes()){
    //     list.removeChild(list.lastChild);
    // }
    var text = 'width = '+document.getElementById('width').value+'\nheight = '+document.getElementById('height').value+'\n';
    for (var col in Object.keys(colors)){
        // var li = document.createElement('LI')
        // var textnode = document.createTextNode(colors[Object.keys(colors)[col]]+" = "+'('+Object.keys(colors)[col]+')');
        // li.appendChild(textnode);
        // list.appendChild(li);
        text += colors[Object.keys(colors)[col]]+" = "+'('+Object.keys(colors)[col]+')';
        text += '\n'
    };
    // var matrix_text = document.createElement('LI');
    // var textnode = document.createTextNode("image = ["+String(matrix)+"]");
    text += "image = ["+String(matrix)+"]"
    // matrix_text.appendChild(textnode);
    // list.appendChild(matrix_text)
    document.getElementById('load').value = text;
};

function populateMatrix(){
    var width = document.getElementById('width').value;
    var height = document.getElementById('height').value;
    var alpha = "abcdefghijklmnopqrstuvwxyz".split('');
    var colorList = {};
    var matrix = [];
    var colorCount = 0;
    for (var i = 0; i < height; i++){
        for (var j = 0; j < width; j++){
            var color = document.getElementById(width*Number(i)+Number(j)).rgb;
            if (colorList[color] === undefined) {
                colorList[color] = alpha[colorCount];
                colorCount ++;
            }
            matrix.push(colorList[color]);
        }
    }
    printGrid(colorList,matrix);
}

function loadImage(){
    document.getElementById('error').innerHTML = '';
    try {
        var dict = {}
        var text = document.getElementById('load').value.split('\n');
        for (var entry in text){
            var t = text[entry].split('=');
            dict[t[0].substr(0,t[0].search(' '))+t[0].substr(t[0].search(' ')+1,t[0].length)] = t[0].substr(0,t[1].search(' '))+t[1].substr(t[1].search(' ')+1,t[1].length)
        }
        var image = dict['image'].split(',');
        image[0] = image[0][1];
        image[image.length-1] = image[image.length-1][0];
        document.getElementById('width').value= Number(dict['width']);
        document.getElementById('height').value= Number(dict['height']);
        createTable()
        for (var i in image){
            var td = document.getElementById(i);
            var rgb = dict[image[i]].substr(1,dict[image[i]].length-2);
            td.style="background-color:"+"rgb("+rgb+");";
            td.active=true;
            td.rgb=rgb;
        }
    }
    catch(err){
        document.getElementById('error').innerHTML = 'Incorrect format of loaded image... try again!';
        console.log('Incorrect format of loaded image...');
    }
}


loadImage()