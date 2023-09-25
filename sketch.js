splt = 2
w= 320//1600/splt
h = 400//2000/splt
marg = 20//30/splt

let shade;
function preload() {
  shade = loadShader("shader.vert", "shader.frag");
}
url = new URL(window.location.href)
urlParams = new URLSearchParams(url.search)
if(url.searchParams.has('size') == true) {
  pxSize = url.searchParams.get('size')
} else {
  url.searchParams.append('size', 1);
}
pxSize = url.searchParams.get('size')

//parameters
numPasses = 1
shadeSeed = rv(0, 100000000)

displaceDens = 2//the max size of each panel displacer, by h/x


finished = false
looping = true
forever = false

if($fx.rand() < 0.2) {
  maxCols = 0
} else {
  maxCols = 1
}

if(maxCols == 0) {
  mode = 'Binary'
} else {
  mode = 'Ternary'
}


$fx.features({
  "param1": 0,
  "param2": 0,
})

if(pxSize == 1) {
  totalW = 800
  totalH = 1000
} else if(pxSize == 2){
  totalW = 1600
  totalH = 2000
} 

function setup() {
  createCanvas(totalW, totalH);
  pixelDensity(4)
  recur = createGraphics(w, h, WEBGL)
  canv = createCanvas(totalW, totalH)
  p = createGraphics(320, 400)
  c = createGraphics(w, h)
  b = createGraphics(w, h)
  g = createGraphics(w, h)
  angleMode(DEGREES)
  // noLoop()
  p.noLoop()
  c.noLoop()
  frameRate(30)
}
dur = 100//ri(50, 100)
expo = 1
segs = Math.floor(dur/30)//ri(3, 6)
segInc = Math.ceil(dur/segs)
count = 1
function draw() {
  

  //Sketch
  if(frameCount == 1) {
    background(bgc)
    p.background(0)
    c.background(0)
    b.background(0)
    g.background(255)
    gradLUT()
    mainPattern()
    newPattern()
    bTexture()
    // newDur = 360/freq
  }

  if(frameCount%segInc==0 && frameCount !== dur) {
    

    newPattern()
    if(frameCount < 100) {
      p.push()
      p.noFill()
      p.strokeWeight(2)
      p.drawingContext.setLineDash([rv(10, 1000), rv(10, 1000), rv(10, 1000), rv(10, 1000), rv(10, 1000), rv(10, 1000)])
      p.stroke(rv(0, 255))
      p.rect(w/2, h/2, w, h)
      p.pop()
    }
    
    count++
  }
  sinMod = 1//map(sin((frameCount*(freq))-45), -1, 1, 0.5, 1)
  cosMod = 1////map(cos((frameCount*(freq))-45), -1, 1, 0, 1)

  

  //Post processing
  lastPass = false
  bgc = color(bgc)
  recur.shader(shade)
  shade.setUniform("u_resolution", [320, 400]);
  shade.setUniform("pxSize", pxSize)
  shade.setUniform("p", p);
  shade.setUniform("g", g);
  shade.setUniform("c", c);
  shade.setUniform("b", b);
  shade.setUniform("scrollX", scrollX);
  shade.setUniform("scrollY", scrollY);
  shade.setUniform("sinMod", map(pow(sinMod, expo), 0, pow(1, expo), 0, 1));
  shade.setUniform("cosMod", map(pow(cosMod, expo), 0, pow(1, expo), 0, 1));

  shade.setUniform("seed", shadeSeed);
  shade.setUniform("marg", map(marg, 0, w, 0, 1));
  shade.setUniform("lastPass", lastPass)
  shade.setUniform("bgc", [
    bgc.levels[0] / 255,
    bgc.levels[1] / 255,
    bgc.levels[2] / 255,
  ]);

  //recursive passes
  for(let i = 0; i < numPasses; i++) {
  
    if(i == 0) {
      firstPass = true
    } else {
      firstPass = false
    }

    shade.setUniform("firstPass", firstPass)
    shade.setUniform("p", p)
    recur.rect(0, 0, w, h)
    p.image(recur, 0, 0)
  }



  //final display pass
  lastPass = true
  shade.setUniform("lastPass", lastPass)
  shade.setUniform("p", p)
  recur.rect(0, 0, w, h)
  rectMode(CENTER)
  image(recur, 0, 0, totalW, totalH)

  //render preview
  if(frameCount == floor(dur)){
    $fx.preview()
  }
  if(frameCount == floor(dur) && finished == false) {
    noLoop()
    newPattern()
    finished = true
  } 
  if(frameCount == floor(dur) && finished == true && forever == false) {
    noLoop()
    newPattern()
    looping = false
  }
}
