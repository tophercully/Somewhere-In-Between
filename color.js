bgCols = [
  "#FFF5EE", //seashell
  "#fbf6e3", //canvas
  "#E6E0D4", //white coffee
  "#FDDEBD", //butter white
  "#F6FCFA", //white rose
  "#ECECEE", //christmas white
  "#1F201F", //retro black
  "#212122", //ink black
  "#1B1B1B", //eerie black
  "#242124", //raisin black
  "#ffb1ed",
];

bgNames = [
  "SeaShell",
  "Canvas",
  "White Coffee",
  "Butter White",
  "White Rose",
  "Christmas White",
  "Retro Black",
  "Ink Black",
  "Eerie Black",
  "Raisin Black",
];
bgColsB = ['#ECECEE', "#e6dcdc", "#272727"]

//Background color parameters
bgNum = ri(0, bgColsB.length-1);
bgc = bgColsB[bgNum];
bgName = bgNames[bgNum];

//Make a color that always contrasts bgc
calcBgLum = chroma(bgc).luminance();
if (calcBgLum > 0.5) {
  frameCol = 'black'; //black
} else if( calcBgLum < 0.5) {
  frameCol = 'white'; //white
}

//Palettes
//Always include frameCol instead of black or white so our colors don't blend into bgc
const source = [
  "#A6C8CA",
  "#097857",
  //"#F1E8D9",
  "#E3CE61",
  "#E35A7E",
  //frameCol,
  "#EE692A",
  //"#BFCCD4",
  "#217F96",
  //"#EBD5D7",
];

const shepard = [
  "#3D5A80", 
"#98C1D9", 
// "#E0FBFC", 
"#FF4D21", 
"#293241", 
frameCol
];

const mcWoot = ["#ED6A5A", "#636CCE", "#DFB2F4", "#50B386", "#55D6C2", frameCol];

const soft = [
  "#F94144",
  "#F3722C",
  "#F8961E",
  "#F9844A",
  "#F9C74F",
  "#90BE6D",
  "#43AA8B",
  "#4D908E",
  "#577590",
  "#277DA1",
  // frameCol,
  // "white",
];

 const seaFoam = [
 "#22577a", "#38a3a5", "#57cc99", "#80ed99", //"#c7f9cc", "#f2f9e8", "#f9f9f9"
] //credit Wouter Missler

const bau = [
  "#1267b7",
  "#ec3e2b",
  "#f6b81a",
  // "#E4D6C2",
  "#1D1F22",
]

const elliot = [
  "#E73542",
  "#F6A026",
  "#2CA8C4",
  "#EE7140",
  "#289C5B",
  // "#F5E2CC",
  // "#161117"
]

const wildberry = [
  '#62A8E5',
  '#BB76CF',
  '#407060',
  '#FF6C2F',
]

const burn = ["#00b4e2","#fd4f92","#ff7b89","#ffa070","#ffd403"]

const overlook = ["#3d4d20","#ad0b08","#1d5473","#798b97","#b76439","#d2955f"]
earth = ["#59b4be","#F2E7AF","#D99774","#A5583C","#582C21"]
rust = ["#D9B88F","#BE814B","#BE754C","#8C4227","#402722"]
natural = ["#6f1d1b","#bb9457","#432818","#99582a","#ffe6a7"]
firewatch = ["#c9cba3","#ffe1a8","#e26d5c","#723d46","#472d30"]
leaves = ["#585123","#eec170","#f2a65a","#f58549","#772f1a"]
rose = ["#386641","#6a994e","#a7c957","#f2e8cf","#bc4749"]
cool = ["#03045e","#023e8a","#0077b6","#0096c7","#00b4d8","#48cae4","#90e0ef","#ade8f4","#caf0f8"]
okeeffe = ["#3c2048","#a73721","#4c5080","#669293","#bb9d6d","#3d1617","#d2bd9e"]
clay = ["#9c785e","#39322a","#4a4b3f","#773320","#572e20","#29191c","#968573","#dcc6ae"]
tangerine = ["#fcfcfc","#9c887e","#f0d2bf","#f1ae83","#f1873a","#f26800","#cbcc9b","#024302"]
flowerMarket = ["#b4b1c6","#d3c0c6","#a33139","#a54e44","#dbce99","#9db5c6","#cd886f"]
const retroBaby = [
  '#8fb886', 
"#e7b763", 
"#46abc7", 
"#9a0603", 
"#fc5207"]

comboA = ["#142e70", "#f74d13"]
comboE = ['#F57103', '#00598D', '#214C25']
comboF = ['#de3be1', "#e9a32b"]

testC = [
  "#EC521A",
"#3656C9",
"#AD80C3",
"#74BFFE",
"#FF3B09",
"#5B7554",
"#047B37",
"#FDD4C3",
"#FE7BA1"
]

mono = [bgc, frameCol]//["#ced4da","#adb5bd","#6c757d","#495057","#343a40"]

warmCool = ["#219ebc","#023047","#ffb703","#fb8500"]
// easter = ["#70d6ff","#ff70a6","#ff9770","#ffd670"]
fall = ["#813405","#d45113","#f9a03f","#f8dda4"]

allCols = [
  "#FF4D21",
  "#ff70a6",
  "#047B37",
  "#74BFFE",
  "#3656C9",
  '#FF6C2F',
  "#5B7554",
  "#9a0603",
  '#BB76CF',
  "#F6A026",
]

const pals = [shepard, source, soft, mcWoot, comboE, comboA, comboF, burn, retroBaby, wildberry];

const palNames = [
  "Commander Shepard",
  "Source",
  "Soft",
  "McWoot",
  "Terra",
  "Spice",
  "Royal",
  "Burn",
  "Retro Baby",
  "Wildberry"
];

//Palette parameters
palNum = ri(0, pals.length-1);
pal = allCols//pals[palNum];
palName = palNames[palNum];

//Shuffle that full palette
truePal = shuff(pal);

//Pass our palette back to the CSS spinner
let root = document.documentElement;
root.style.setProperty("--c1", truePal[0]);
root.style.setProperty("--c2", truePal[1]);
root.style.setProperty("--c3", truePal[2]);
root.style.setProperty("--c4", truePal[3]);
