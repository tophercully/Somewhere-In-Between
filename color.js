//Background color parameters
if($fx.rand() < 0.25) {
  bgLum = 0.075
  adj = -0.05
} else {
  bgLum = 0.9
  adj = 0.05
}

bgc = chroma(rv(35, 45), rv(0.15, 0.2), bgLum+rv(0.00, adj), 'hsl').hex()//'#e6d4cc'//'#3f3f3f'//'black'//'#ECECEE'//bgCols[bgNum];

//Make a color that always contrasts bgc
calcBgLum = chroma(bgc).luminance();
if (calcBgLum > 0.5) {
  frameCol = 'black'; //black
} else if( calcBgLum < 0.5) {
  frameCol = 'white'; //white
}

tennisGreen = {
  //tennis green 7/10
  name: 'Tennis Green',
  hex: "#16765A",
}
richPinkRed = {
  // 10/10
  name: 'Tart Pink-Orange',
  hex: '#FB484A',
}
deepTangerine = {
  // 8/10 solid
  name: 'Deep Tangerine',
  hex: '#DB6E23',
}
dullTeal = {
  // 7/10 unique
  name: 'Dull Teal',
  hex: '#0C5769',
}
lightMoss = {
  //7/10 soft inoffensive
  name: 'Light Moss',
  hex: '#768D6E',
}
ultramarine = {
  //
  name: 'Ultramarine',
  hex: '#1415FC',
}
magenta = {
  //
  name: 'Magenta',
  hex: '#FB0264',
}
brightMint = {
  //
  name: 'Bright Mint',
  hex: '#86D8BE',
}
honey = {
  //
  name: 'Honey',
  hex: '#F2AC55',
}
rustOrange = {
  //
  name: 'Rust Orange',
  hex: '#C95424',
}
salmon = {
  //
  name: 'Salmon',
  hex: '#D76C68',
}
opalGreen = {
  //
  name: 'Opal Green',
  hex: '#096048',
}
pinkShift = {
  //
  name: 'Pinkshift',
  hex: '#E92A40',
}
deepUltramarine = {
  //
  name: 'Deep Ultramarine',
  hex: '#061C79',
}
cornflower = {
  //
  name: 'Cornflower',
  hex: "#557AFF",
}
crimson = {
  //
  name: 'Crimson',
  hex: "#9a0603",
}
richLavender = {
  //
  name: 'Rich Lavender',
  hex: '#BB76CF',
}
redOrange = {
  //
  name: 'Red-Orange',
  hex: "#FF4D21",
}
bubblegumPink = {
  //
  name: 'Bubblegum Pink',
  hex: "#ff70a6",
}
cyan = {
  //
  name: 'Cyan',
  hex: "#3EBCE0",
}
blush = {
  //
  name: 'Blush',
  hex: "#BB5468",
}

allCols = [
  richPinkRed,
  tennisGreen,
  deepTangerine,
  dullTeal,
  ultramarine,
  lightMoss,
  magenta,
  brightMint,
  honey,
  rustOrange,
  salmon,
  opalGreen,
  pinkShift,
  deepUltramarine,
  cornflower,
  crimson,
  richLavender,
  redOrange,
  bubblegumPink,
  cyan,
  blush,
]

truePal = []
theColor = allCols[ri(0, allCols.length-1)]
truePal[0] = theColor.hex//testF[20]
console.log(theColor.name)

//Pass our palette back to the CSS spinner
let root = document.documentElement;
root.style.setProperty("--c1", theColor.hex);
root.style.setProperty("--c2", theColor.hex);
root.style.setProperty("--c3", theColor.hex);
root.style.setProperty("--c4", theColor.hex);
