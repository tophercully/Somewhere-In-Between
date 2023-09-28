w = 320
h = 400
marg = 20

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
displaceDens = 2
finished = false
looping = true
forever = false

dur = 90
segs = 3
segInc = 30

if(maxCols == 0) {
  mode = 'Binary'
  colName = 'N/A'
} else {
  mode = 'Ternary'
  colName = theColor.name
}

$fx.features({
  "Mode": mode,
  "Color": colName,
})

if(pxSize == 1) {
  totalW = 800
  totalH = 1000
} else if(pxSize == 2) {
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
  frameRate(30)
}

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
  }

  if(frameCount%segInc==0 && frameCount !== dur) {
    if(frameCount < dur && forever == true) { 
      newPattern()
    }
    
    if(frameCount < dur) {
      newPattern()
      p.push()
      p.noFill()
      p.strokeWeight(2)
      p.drawingContext.setLineDash([rv(10, 1000), rv(10, 1000), rv(10, 1000), rv(10, 1000), rv(10, 1000), rv(10, 1000)])
      p.stroke(rv(0, 255))
      p.rect(w/2, h/2, w, h)
      p.pop()
    } 
  }


  

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
  if(frameCount == floor(dur) && $fx.isPreview == true){
    $fx.preview()
    
  }
  if(frameCount == floor(dur) && finished == false) {
    noLoop()
    finished = true
  } 
  if(frameCount == floor(dur) && finished == true && forever == false) {
    noLoop()
    looping = false
  }
}
