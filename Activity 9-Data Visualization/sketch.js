let games = [
  { name: 'Astro Bot', score: 94, genre: 'Platformer' },
  { name: 'Elden Ring: Shadow of the Erdtree', score: 94, genre: 'Action RPG' },
  { name: 'Metaphor: ReFantazio', score: 94, genre: 'JRPG' },
  { name: 'Final Fantasy VII Rebirth', score: 92, genre: 'Action RPG' },
  { name: 'Marvel Rivals', score: 88, genre: 'Hero Shooter' },
  { name: 'Silent Hill 2 (Remake)', score: 90, genre: 'Horror Adventure' }
];

let genreColors = {};

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(LEFT, CENTER);
  textSize(12);
  assignRandomColors();
  drawChart();
}

function drawChart() {
  background(255);
  let maxScore = max(games.map(g => g.score));

  for (let i = 0; i < games.length; i++) {
    let x = 50;
    let y = 50 + i * 70;
    let w = map(games[i].score, 0, maxScore, 0, width - 200);
    let h = 40;

    fill(genreColors[games[i].genre]);
    rect(x, y, w, h);

    fill(0);
    text(`${games[i].name}`, x + w + 10, y + h / 2 - 10);
    text(`Score: ${games[i].score}`, x + w + 10, y + h / 2 + 5);
    text(`Genre: ${games[i].genre}`, x + w + 10, y + h / 2 + 20);
  }
}

// Assigns a random color to each genre
function assignRandomColors() {
  genreColors = {};
  for (let game of games) {
    if (!genreColors[game.genre]) {
      genreColors[game.genre] = color(random(100, 255), random(100, 255), random(100, 255));
    }
  }
}

// Called when the user clicks the canvas
function mousePressed() {
  assignRandomColors();
  drawChart();
}
