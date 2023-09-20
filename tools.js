function ri(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(fxrand() * (max - min + 1) + min); // The maximum is exclusive and the minimum is inclusive
}
function rv(min, max) {
  return fxrand() * (max - min) + min;
}

function re(min, max, expo) {
  return map_range(Math.pow(fxrand(), expo), 0, Math.pow(1, expo), min, max)
}
function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

function shuff(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(fxrand() * currentIndex);
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
    save("TEMPEST"+fxhash);
  }
  if (key === "1") {
    window.history.replaceState('', '', updateURLParameter(window.location.href, "size", "1"));
    window.location.reload();
  }
  if (key === "2") {
    window.history.replaceState('', '', updateURLParameter(window.location.href, "size", "2"));
    window.location.reload();
  }
  if (key === "3") {
    window.history.replaceState('', '', updateURLParameter(window.location.href, "size", "3"));
    window.location.reload();
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
  chance = fxrand() 
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
  thisCol = randColor()
  tiers = 1
  maxCols = truePal.length//truePal.length//constrain(randomInt(3, truePal.length-1), 3, 6)
  thisPal = []//[thisCol]
  // thisPal.push(bgc)
  // thisPal.push(bgc)
  if(bgNum == 0) {
    blendAmt = 0.1
  } else {
    blendAmt = 0.025
  }
  blendAmt = 0
  thisPal.push(chroma.mix(bgc, underCols[0], blendAmt).hex())
  thisPal.push(truePal[0])
  thisPal.push(truePal[1])
  thisPal.push(chroma.mix(frameCol, underCols[0], blendAmt).hex())
  // thisPal.push(frameCol)
  // thisPal.push(frameCol)
  // for(let i = 0; i < maxCols; i++) {
  //   thisPal.push(truePal[i])
  // }
  // thisPal.push(chroma(truePal[0]).desaturate(1).hex())
  // thisPal.push(chroma(truePal[1]).saturate(2).hex())
  // thisPal.push('black')
  // shuff(thisPal)
  for(let y = 0; y < h; y++) {
      
      
      nY = map(y, 0, h, 0, 1)
      
      colScale = chroma.scale(thisPal).padding(0.0).classes(thisPal.length)//.classes((maxCols+2)*5)
      hueCol = colScale(nY).hex()
      
      
      col = hueCol
      g.stroke(col)
      g.strokeWeight(2)
      g.line(0, y, w,y)
  }
}

function newPattern() {
  c.rectMode(CENTER)
  // cols = ri(2, 10)
  // rows = ri(2, 10)
  // cellW = w/cols
  // cellH = h/rows
  // c.noStroke()
  // for(let y = 0; y < rows; y++) {
  //   for(let x = 0; x < cols; x++) {
  //     c.fill(rv(0, 255), rv(0, 255), rv(0, 255))
  //     c.rect(x*cellW+cellW/2, y*cellH+cellH/2, cellW, cellH)
  //   }
  // }

  for(let i = 0; i < 100*displaceDens; i++) {
    c.fill(rv(0, 255), rv(0, 255), rv(0, 255))
    c.rect(rv(0, w), rv(0, h), rv(0, w/displaceDens), rv(0, w/displaceDens))
  }
}

function mainPattern() {
  p.rectMode(CENTER)
  // cols = ri(2, 5)
  // rows = ri(2, 5)
  // p.noStroke()
  // cellW = w/cols
  // cellH = h/rows
  // for(let y = 0; y < rows; y++) {
  //   for(let x = 0; x < cols; x++) {
  //     p.fill(rv(0, 255))
  //     p.rect(x*cellW+cellW/2, y*cellH+cellH/2, cellW, cellH)
  //   }
  // }
  p.noStroke()
  p.stroke(255)
  dens = 3//ri(4, 10)
  colArray = []
  for(let i = 0; i < dens; i++) { 
    colArray[i] = map(i, 0, dens-1, 255, (255/4)+3) 

  }
  shuff(colArray)
  for(let i = 0; i < dens; i++) {
    wid = map(i, 0, dens, (w-(marg))*0.6, 0)
    hei = map(i, 0, dens, (h-(marg))*0.6, 0)

    p.fill(colArray[i])
    p.rect(w/2, h/2, wid, hei)
    // p.rect(rv(0,w),rv(0,w),rv(w/10, w/2), rv(w/10, w/2))
  }
  //accents
  for(let i = 0; i < 150; i++) {
    p.fill(rv(0, 255))
    // p.strokeWeight(rv(0.5, 3))
    p.square(rv(0, w),rv(0,h), rv(0.5, 10))
  }
}

function bTexture() {
  b.noStroke()
  for(let i = 0; i < 4000; i++) {
    val = rv(0, 255)
    b.fill(chroma(val,val,val).alpha(0.01+rv(-0.0001, 0.0001)).hex())
    b.circle(rv(0, w), rv(0, h), rv(0, w*0.4))
  }
}
