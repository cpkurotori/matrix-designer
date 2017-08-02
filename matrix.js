var table = document.getElementById('matrix_table');
console.log(table)
for (var i = 0; i < 8; i++){
    var tr = document.createElement("TR");
    for (var j = 0; j < 8; j++){
        var td = document.createElement("TD");
        td.id = String(i)+'-'+String(j)
        td.rgb = "(0,0,0)";
        td.active = false;
        td.style="background-color:rgb(0,0,0);"
        td.onclick = function changeColor(){
            var red = document.getElementById("red").value;
            var green = document.getElementById("green").value;
            var blue = document.getElementById("blue").value;
            var rgb = "("+String(red)+','+String(green)+','+String(blue)+")";
            console.log(rgb);
            if (!this.active || this.rgb != rgb){
                this.style="background-color:"+"rgb"+rgb+";";
                this.active=true;
                this.rgb=rgb;
            }
            else{
                this.style = "background-color:rgb(0,0,0);";
                this.active=false;
                this.rgb="(0,0,0)";
            };
        };
        tr.appendChild(td);
    };
    table.appendChild(tr);
};


function printGrid(colors,matrix){
    var list = document.getElementById('color-list');
    while (list.hasChildNodes()){
        list.removeChild(list.lastChild);
    }
    for (var col in Object.keys(colors)){
        var li = document.createElement('LI')
        var textnode = document.createTextNode(colors[Object.keys(colors)[col]]+" = "+Object.keys(colors)[col]);
        li.appendChild(textnode);
        list.appendChild(li);
    };
    var matrix_text = document.createElement('LI');
    var textnode = document.createTextNode("image = ["+String(matrix)+"]");
    matrix_text.appendChild(textnode);
    list.appendChild(matrix_text)
};

function populateMatrix(){
    var alpha = "abcdefghijklmnopqrstuvwxyz".split('')
    var colorList = {};
    var matrix = [];
    var colorCount = 0;
    for (var i = 0; i < 8; i++){
        for (var j = 0; j < 8; j++){
            var color = document.getElementById(String(i)+'-'+String(j)).rgb;
            if (colorList[color] === undefined) {
                colorList[color] = alpha[colorCount];
                colorCount ++;
            };
            matrix.push(colorList[color]);
        }
    }
    printGrid(colorList,matrix);
}

