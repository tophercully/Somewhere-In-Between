#ifdef GL_ES
precision highp float;
#endif

// grab texcoords from vert shader
varying vec2 vTexCoord;

//textures and uniforms from p5
uniform sampler2D p;
uniform sampler2D g;
uniform sampler2D c;
uniform sampler2D b;
uniform vec2 u_resolution;
uniform float seed;
uniform vec3 bgc;
uniform float marg;
uniform float pxSize;
uniform bool firstPass;
uniform bool lastPass;

float map(float value, float inMin, float inMax, float outMin, float outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

vec3 adjustContrast(vec3 color, float value) {
  return 0.5 + (1.0 + value) * (color - 0.5);
}
vec3 adjustExposure(vec3 color, float value) {
  return (1.0 + value) * color;
}
vec3 adjustSaturation(vec3 color, float value) {
  const vec3 luminosityFactor = vec3(0.2126, 0.7152, 0.0722);
  vec3 grayscale = vec3(dot(color, luminosityFactor));

  return mix(grayscale, color, 1.0 + value);
}
vec3 adjustBrightness(vec3 color, float value) {
  return color + value;
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

mat2 rotate(float angle){
    return mat2(cos(angle),-sin(angle),sin(angle),cos(angle));
}


void main() {
  vec2 uv = vTexCoord*u_resolution;
  vec2 st = vTexCoord;
  vec2 stDebug = vTexCoord;
  vec2 stB = vTexCoord;
  vec2 stPaper = vTexCoord;

  //flip the upside down image
  st.y = 1.0 - st.y;
  stB.y = 1.0 - stB.y;
  stDebug.y = 1.0 - stDebug.y;


  if(lastPass == true) {
    //shrink stB so there is margin
    stB.x = map(stB.x, 0.0, 1.0, -marg, 1.0+marg);
    stB.y = map(stB.y, 0.0, 1.0, -(marg*0.8), 1.0+(marg*0.8));
  }




  //pusha
  vec4 sampC = texture2D(c, st);
  float dis = 1.0/u_resolution.y;
  float angMax = 64.0;
  float ang = floor(map(sampC.r, 0.0, 1.0, 0.0, angMax))*(6.289/angMax);
  float inc = 0.0;
  if(st.x != 0.0 && st.x != 1.0 && st.y != 0.0 && st.y != 1.0) {
    inc = floor(map(sampC.b, 0.0, 1.0, 0.0, 8.0));
  } 
  
  float angDecider = floor(sampC.r*5.0);
  if(angDecider == 0.0) {
    st.x += inc/u_resolution.x;
  } else if(angDecider == 1.0) {
    st.x -= inc/u_resolution.x;
  } else if(angDecider == 2.0) {
    st.y += inc/u_resolution.y;
  } else if(angDecider == 3.0) {
    st.y -= inc/u_resolution.y;
  }

  float angDeciderB = floor(sampC.g*5.0);
  if(angDeciderB == 0.0) {
    st.x += inc/u_resolution.x;
  } else if(angDeciderB == 1.0) {
    st.x -= inc/u_resolution.x;
  } else if(angDeciderB == 2.0) {
    st.y += inc/u_resolution.y;
  } else if(angDeciderB == 3.0) {
    st.y -= inc/u_resolution.y;
  }

  //pull in our main textures
  vec4 texC = texture2D(c, st);
  vec4 texG = texture2D(g, st);
  vec4 texP = texture2D(p, st);
  vec4 texB = texture2D(b, stDebug);
  vec4 texPStatic = texture2D(p, stDebug);

  //map luminance as a y value on our gradient
  vec2 lum = vec2(0.5, texP.r);
  vec2 lumB = vec2(0.5, texPStatic.r);
  //pick the color off of g based on luminance
  vec4 colVal = texture2D(g, lum);
  vec4 colValB = texture2D(g, lum);

  //initialize color
  vec3 color = vec3(0.0);
  
  //only apply color on the last pass, keep image black and white for now
  if(lastPass == false) {
    color = texP.rgb;
  } else {
    color = colVal.rgb;
  }
  
  if(lastPass == true) {
    //Draw margin, use 0 and 1 since we shrunk stB
    if(stB.x <= 0.0 || stB.x >= 1.0 || stB.y <= 0.0 || stB.y >= 1.0) {
      color = bgc.rgb;
    }
   
    color = adjustSaturation(color, 0.5);

    float noiseGray = random(stDebug.xy)*0.035;
    color += noiseGray;
    float expo = 1.0;
    float amt = 0.0;
    if(bgc.r < 0.5) {
      expo = 0.5;
      amt = 0.015;
    } else {
      expo = 0.5;
      amt = 0.02;
    }
    color += map(pow(texB.r, expo), 0.0, pow(1.0, expo), -amt,amt);
    
  }

  gl_FragColor = vec4(color, 1.0);
}
