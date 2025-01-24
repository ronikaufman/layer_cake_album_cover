let backCol = "#fffbe6";

function setup() {
  createCanvas(500, 500, WEBGL);
  pixelDensity(8);
  ortho();
  noLoop();
  noStroke();
}

function draw() {
  background(backCol);
  translate(0, -16);
  rotateX(-PI/8);
  
  let colors = ["#29ac9f", "#ef562f", "#2b67af", "#f589a3", "#f9d531"];
  
  let nLayers = 5;
  let h = 50;
  translate(0, (1-nLayers)*h/2, 0);
  for (let i = 0; i < nLayers; i++) {
    let col = colors[i];
    let nFacets = 3*i+10;
    let w = nFacets*h;
    
    let pg = createGraphics(w, h);
    makePattern(pg, col, i);
    
    push();
    texture(pg);
    rotateX(PI);
    rotateY(PI/nFacets);
    cylinder(w/TAU, h, 200, 1, false, true);
    pop();
    
    pg.remove();
    pg = undefined;
    
    translate(0, h, 0);
  }
}

function makePattern(pg, col, i) {
  let s = pg.height;
  let j = 0;
  for (let x = 0; x < pg.width; x += s) {
    makeTile(pg, x, 0, s, [backCol, col, 5], i);
    j++;
  }
  pg.stroke(col);
  pg.strokeWeight(2/pixelDensity());
  pg.line(0, pg.height, pg.width, pg.height);
}

function makeTile(pg, x, y, s, colors, tileType) {
  tile = createGraphics(width, height);

  let sw = 2.5;
  tile.stroke(colors[2]);
  tile.strokeWeight(sw);
  tile.translate(s/2, s/2);
  tile.rotate(random([0, PI/2, PI, 3*PI/2]));
  tile.translate(-s/2, -s/2);
  let u = s/5;
  switch (tileType) {
    case 0:
      tile.background(colors[0]);
      tile.fill(colors[1]);
      tile.circle(0, 0, 4*u);
      tile.circle(s, 0, 4*u);
      tile.circle(0, s, 4*u);
      tile.circle(s, s, 4*u);
      tile.circle(s/2, s/2, 2*u);
      tile.fill(colors[0]);
      tile.circle(0, 0, 2*u);
      tile.circle(s, 0, 2*u);
      tile.circle(0, s, 2*u);
      tile.circle(s, s, 2*u);
      break;
    case 1:
      tile.background(colors[0]);
      tile.fill(colors[1]);
      tile.circle(0, 0, 6*u);
      tile.circle(s, 0, 2*u);
      tile.circle(0, s, 2*u);
      tile.circle(s, s, 6*u);
      tile.fill(colors[0]);
      tile.circle(s, s, 4*u);
      tile.circle(0, 0, 4*u);
      tile.fill(colors[1]);
      tile.circle(0, 0, 2*u);
      tile.circle(s, s, 2*u);
      break;
    case 2:
      tile.background(colors[0]);
      tile.fill(colors[1]);
      tile.circle(0, 0, 4*u);
      tile.circle(0, s, 4*u);
      tile.circle(s, s, 4*u);
      tile.circle(7/2*u, 0, u);
      tile.circle(s, 3/2*u, u);
      tile.circle(s/2, s/2, 2*u);
      tile.fill(colors[0]);
      tile.circle(0, 0, 2*u);
      tile.circle(0, s, 2*u);
      tile.circle(s, s, 2*u);
      break;
    case 3:
      tile.background(colors[0]);
      tile.fill(colors[1]);
      tile.circle(0, 0, 8*u);
      tile.circle(s, 3/2*u, u);
      tile.circle(3/2*u, s, u);
      tile.fill(colors[0]);
      tile.circle(0, 0, 6*u);
      tile.fill(colors[1]);
      tile.circle(0, 0, 4*u);
      tile.circle(s, s, 4*u);
      tile.fill(colors[0]);
      tile.circle(0, 0, 2*u);
      tile.circle(s, s, 2*u);
      break;
    case 4:
      tile.background(colors[0]);
      tile.fill(colors[1]);
      tile.circle(s/2, 0, 3*u);
      tile.circle(s, s/2, 3*u);
      tile.circle(s/2, s, 3*u);
      tile.circle(0, s/2, 3*u);
      tile.fill(colors[0]);
      tile.circle(s/2, 0, u);
      tile.circle(s, s/2, u);
      tile.circle(s/2, s, u);
      tile.circle(0, s/2, u);
      break;
  }
  pg.image(tile, x, y);
  
  tile.remove();
  tile = undefined;
}