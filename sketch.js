splt = 2
w= 320//1600/splt
h = 400//2000/splt
marg = 5//30/splt

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
numPasses = 1//500

scrollX = 0
scrollY = 0
if(fxrand() < 0.5) {
  scrollX = plusOrMin(rv(0.00025, 0.00075))
} else {
  scrollY = plusOrMin(rv(0.00025, 0.00075))
}

$fx.features({
  "param1": 0,
  "param2": 0,
})

function setup() {
  createCanvas(w, h, WEBGL);
  if(pxSize == 1) {
    pixelDensity(1)
  } else if (pxSize == 2) {
    pixelDensity(2)
  } else if (pxSize == 3) {
    pixelDensity(3)
  }
  pixelDensity(4)
  recur = createGraphics(w, h, WEBGL)
  canv = createCanvas(1600, 2000)
  p = createGraphics(w, h)
  c = createGraphics(w, h)
  b = createGraphics(w, h)
  g = createGraphics(w, h)
  angleMode(DEGREES)
  p.angleMode(DEGREES)
  c.angleMode(DEGREES)
  // noLoop()
  p.noLoop()
  c.noLoop()
  frameRate(30)
}
dur = ri(50, 100)
expo = 1
segs = ri(2, 4)
function draw() {
  

  //Sketch
  if(frameCount == 1) {
    background(bgc)
    p.background(0)
    c.background(0)
    g.background(255)
    gradLUT()
    mainPattern()
    newPattern()
    // newDur = 360/freq
  }

  if(frameCount%ceil(dur/segs)==0 && frameCount !== dur) {
    newPattern()
  }
  sinMod = 1//map(sin((frameCount*(freq))-45), -1, 1, 0.5, 1)
  cosMod = 1////map(cos((frameCount*(freq))-45), -1, 1, 0, 1)

  //Post processing
   lastPass = false
   bgc = color(bgc)
   recur.shader(shade)
   shade.setUniform("u_resolution", [w, h]);
   shade.setUniform("pxSize", pxSize)
   shade.setUniform("p", p);
   shade.setUniform("g", g);
   shade.setUniform("c", c);
   shade.setUniform("scrollX", scrollX);
   shade.setUniform("scrollY", scrollY);
   shade.setUniform("sinMod", map(pow(sinMod, expo), 0, pow(1, expo), 0, 1));
   shade.setUniform("cosMod", map(pow(cosMod, expo), 0, pow(1, expo), 0, 1));

   shade.setUniform("seed", rv(0, 10));
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
   image(recur, -800, -1000, 1600, 2000)

   //render preview
   

if(frameCount == floor(dur)) {
  noLoop()

  fxpreview()
  //  save(fxhash)
   setTimeout(()=> {
    // window.location.reload();
 }
 ,2000);
}

}
