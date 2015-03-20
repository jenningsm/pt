
function randomGaussian(){
  var r1 = Math.random();
  var r2 = Math.random();

  var c = Math.sqrt(-2 * Math.log(r1));
  return c * Math.cos(2 * Math.PI * r2);
}


var svg = document.getElementById("svg");

function drawLine(x1, y1, x2, y2, width, unit){
  if(unit === undefined)
    unit = '';
  var line;

  if(x1 === x2){
    line = document.createElementNS('http://www.w3.org/2000/svg','rect');
    line.setAttribute("x", x1 + unit);
    line.setAttribute("y", Math.min(y1, y2) + unit);
    line.setAttribute("width", width);
    line.setAttribute("height", Math.abs(y1 - y2) + unit);
    line.setAttribute("transform", "translate(-" + (width/ 2) + ", 0)");
    line.setAttribute("stroke", "none");
    line.setAttribute('class', 'rect');
  } else if (y1 === y2){
    line = document.createElementNS('http://www.w3.org/2000/svg','rect');
    line.setAttribute("x", Math.min(x1, x2) + unit);
    line.setAttribute("y", y1 + unit);
    line.setAttribute("width", Math.abs(x1 - x2) + unit);
    line.setAttribute("height", width);
    line.setAttribute("transform", "translate(0, -" + (width/2) + ")");
    line.setAttribute("stroke", "none");
    line.setAttribute('class', 'rect');
  } else {
    line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1', x1 + unit);
    line.setAttribute('y1', y1 + unit);
    line.setAttribute('x2', x2 + unit);
    line.setAttribute('y2', y2 + unit);
    line.setAttribute('stroke-width', width);
    line.setAttribute('class', 'line');
  }
  svg.appendChild(line);
  return line;
}

function createCorners(){
  var vertpos = 3;
  
  var corners = [];
  corners.push([0, 0]);
  corners.push([40,vertpos]);
  
  while(vertpos < 50){
    vertpos += 3.5;
    //vertpos += (.7 + .3 * Math.random()) * 10;
    vertpos = Math.min(50, vertpos);
    var length = 3 + 47 * Math.random() * Math.pow((50 - vertpos) / 50, 1.2);
    corners.push([length, vertpos]);
  }

  return corners;
}

function drawBoxes(corners){
  var width = 1.2;
  
  for(var i = 1; i < corners.length; i++){
    var corner = corners[i];

    var breadth = corner[0];
    if(i !== corners.length - 1){
      breadth = Math.max(breadth, corners[i+1][0]);
    }
    drawLine(50 - breadth, corner[1], 50 + breadth, corner[1], width, '%');
    var tailsize = .5 + Math.random() * .5;
    tailsize *= 2;
    for(var j = 0; j < 2; j++){
      var x1 = 50 + (breadth + tailsize) * (j === 0 ? 1 : -1);
      var x2 = 50 + breadth * (j === 0 ? 1 : -1);
      var tail = drawLine(x1, corner[1], x2, corner[1], width, '%');
      tail.style.fill = "url(#" + (j === 0 ? 'right' : 'left') + "-horz-grad)";
    }  

    var verts = 1 + Math.floor(Math.random() * corner[0] * .25);
//    verts = 0;
    for(var j = 0; j < verts; j++){
      var spot = Math.random() * corner[0];
      for(var k = 0; k < 2; k++){
        var x = 50 + (k === 0 ? 1 : -1) * spot;
        drawLine(x, corner[1], x, corners[i-1][1], width / 2, '%');
      }
    }
 
    var tailsize = .4 + Math.random() * .6;
    tailsize *= 2;
    var uptail = (corner[0] > corners[i-1][0] ? tailsize : 0);
    var downtail = (i === corners.length - 1 || corner[0] > corners[i+1][0] ? tailsize : 0);
    for(var j = 0; j < 2; j++){
      var x = 50 + (j === 0 ? 1 : -1) * corner[0];
      drawLine(x, corner[1], x, corners[i-1][1], width, '%');
      if(uptail !== 0){
        var tail = drawLine(x, corners[i-1][1], x, corners[i-1][1] - uptail, width, '%');
        tail.style.fill = "url(#top-vert-grad)";
      }
      if(downtail !== 0){
        var tail = drawLine(x, corners[i][1], x, corners[i][1] + downtail, width, '%');
        tail.style.fill = "url(#bottom-vert-grad)";
      }
    }
  }
}


drawBoxes(createCorners());
