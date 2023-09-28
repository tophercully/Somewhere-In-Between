function ri(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor($fx.rand() * (max - min + 1) + min); // The maximum is exclusive and the minimum is inclusive
}
function rv(min, max) {
  return $fx.rand() * (max - min) + min;
}

function re(min, max, expo) {
  return map_range(Math.pow($fx.rand(), expo), 0, Math.pow(1, expo), min, max)
}
function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

function shuff(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor($fx.rand() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function keyTyped() {
  if (key === "s" || key === "S") {
    save("Somewhere In Between");
  }
  if (key === "1") {
    window.history.replaceState('', '', updateURLParameter(window.location.href, "size", "1"));
    window.location.reload();
  }
  if (key === "2") {
    window.history.replaceState('', '', updateURLParameter(window.location.href, "size", "2"));
    window.location.reload();
  }
  if (key === "f" || key === 'F') {
    if(forever == false) {
      forever = true
      dur = 999999999999999999999999999999999999999999999
      loop()
    } else if(forever == true) {
      noLoop()
      forever = false
    }
    
  }
  if (key === "p" || key === 'F') {
    dur += 300
    loop()
  }
  if (key === "a" || key === 'A') {
    p.fill(rv(0, 255))
    p.rect(rv(0, w), rv(0, h), rv(w*0.1, w*0.4))
  }
}
function keyPressed() {
  if(keyCode == 32) {
    if(looping == false) {
      loop()
      looping = true
      dur += 30
      newPattern()
    } 
  }
}
function updateURLParameter(url, param, paramVal)
{
    var TheAnchor = null;
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";

    if (additionalURL) 
    {
        var tmpAnchor = additionalURL.split("#");
        var TheParams = tmpAnchor[0];
            TheAnchor = tmpAnchor[1];
        if(TheAnchor)
            additionalURL = TheParams;

        tempArray = additionalURL.split("&");

        for (var i=0; i<tempArray.length; i++)
        {
            if(tempArray[i].split('=')[0] != param)
            {
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }        
    }
    else
    {
        var tmpAnchor = baseURL.split("#");
        var TheParams = tmpAnchor[0];
            TheAnchor  = tmpAnchor[1];

        if(TheParams)
            baseURL = TheParams;
    }

    if(TheAnchor)
        paramVal += "#" + TheAnchor;

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}

function randColor() {
  return chroma(truePal[ri(0, truePal.length-1)]).saturate(0).hex()
}

function angBetween(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
}

function ptFromAng(xPosition, yPosition, ang, dis) {
  xMod = cos(ang)*dis
  yMod = sin(ang)*dis

  return createVector((xPosition+xMod), (yPosition+yMod))
}

function plusOrMin(x) {
  chance = $fx.rand() 
  if(chance < 0.5) {
    mod = 1
  } else {
    mod = -1
  }

  return x*mod
}

function average(array) {
  sum = 0;
  array.forEach((element) => {
    sum += element;
  });
  return sum / array.length;
}
////////////////////////////////////////

function gradLUT() {
  scl = 300
  thisPal = []
  blendAmt = 0
  blendBG = 0
  blendFrame = 0
  thisPal.push(bgc)
  for(let i =0; i < maxCols; i++) {
    thisPal.push(theColor.hex)
  }
  thisPal.push(frameCol)
  for(let y = 0; y < h; y++) {
      
      
      nY = map(y, 0, h, 0, 1)
      
      colScale = chroma.scale(thisPal).classes(thisPal.length)
      col = colScale(nY).hex()
      g.stroke(col)
      g.strokeWeight(2)
      g.line(0, y, w,y)
  }
}

function newPattern() {
  c.rectMode(CENTER)
  rows = ri(4, 10)
  cols = ri(4, 10)
  cellW = w/cols
  cellH = h/rows
  c.noStroke()
  for(let y = 0; y < rows; y++) {
    for(let x = 0; x < cols; x++) {
      c.fill(rv(0, 255), rv(0, 255), rv(0, 255))
      c.push()
      c.translate(rv(-cellW/2, cellW/2), rv(-cellH/2, cellH/2))
      c.rect(x*cellW+cellW/2, y*cellH+cellH/2, cellW, cellH)
      c.pop()
    }
  }

  for(let i = 0; i < 1*displaceDens; i++) {
    c.fill(rv(0, 255), rv(0, 255), rv(0, 255))
    c.rect(rv(0, w), rv(0, h), rv(0, w/displaceDens), rv(0, w/displaceDens))
  }
}

function mainPattern() {
  p.rectMode(CENTER)
  p.noStroke()
  p.stroke(255)
  dens = ri(4, 20)
  colArray = []
  center = createVector(rv(w*0.4, w*0.6), rv(h*0.4, h*0.6))
  for(let i = 0; i < dens; i++) { 
    colArray[i] = map(i, 0, dens-1, 255, (255/5)+3) 

  }
  shuff(colArray)
  for(let i = 0; i < dens; i++) {
    wid = map(i, 0, dens, (w-(marg))*0.666, 0)
    hei = map(i, 0, dens, (h-(marg))*0.666, 0)

    p.fill(colArray[i])
    p.strokeWeight(rv(0, 2))
    
    p.rect(center.x, center.y, wid, hei)
  }
  //accents
  p.noStroke()
  for(let i = 0; i < 400; i++) {
    p.fill(rv(0, 255))
    p.square(rv(0, w),rv(0,h), rv(0.5, 10))
  }
}

function bTexture() {
  b.noFill()
  for(let i = 0; i < 10000; i++) {
    r= rv(w*0.15, w)
    val = rv(0, 255)
    ang = (90*ri(0,1))+rv(-5, 5)
    here = createVector(rv(0, w), rv(0, h))
    length  = rv(w*0.1, w*0.2)
    ptA = ptFromAng(here.x, here.y, ang, length)
    ptB = ptFromAng(here.x, here.y, ang, -length)
    b.stroke(chroma(val,val,val).alpha(0.5+rv(-0.0001, 0.0001)).hex())
    b.strokeWeight(rv(0.25, 0.5))
    b.line(ptA.x, ptA.y, ptB.x, ptB.y)

    b.strokeWeight(rv(0.5, 5))
    b.point(rv(0, w), rv(0, h))
  }
}
