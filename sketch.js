let table;
let numRows;
let unique_countries;
let unique_years;
let height = 20;
let width = 35;
let startX = 120;
let startY = 60;
let labels = [
  "< 5,000",
  "5,000 to 9,999",
  "10,000 to 49,999",
  "50,000 to 99,999",
  "100,000 to 499,999",
  "500,000 to 999,999",
  "1,000,000 to 4,999,999",
  "> 5,000,000",
];

function preload() {
  table = loadTable("./emissions.csv", "csv", "header");
}

function setup() {
  createCanvas(1400, 1400);
  numRows = table.getRowCount();

  for (let r = 0; r < numRows; r++) {
    let years = table.getColumn("Year");
    let countries = table.getColumn("Country");

    unique_countries = [...new Set(countries)];
    unique_years = [...new Set(years)];
  }
}

function draw() {
  background(220);

  textSize(16);
  text("Kilotonnes of C02 emissions", 550, 40);
  textStyle(BOLD);
  let x_ind = 0;
  let y_ind = 0;

  let colors = [
    color(255, 170, 170),
    color(255, 113, 113),
    color(255, 57, 57),
    color(255, 0, 0),
    color(198, 0, 0),
    color(142, 0, 0),
    color(116, 0, 0),
    color(70, 0, 0),
    color(0, 0, 0),
  ];

  for (let r = 0; r < numRows; r++) {
    noStroke();
    textSize(12);
    text(table.get(r, 0), startX - 85, startY + 15 + height * y_ind);
    text(
      table.get(r, 1),
      startX + width * x_ind + 5,
      startY + height * unique_countries.length + 25
    );
    let x = startX + x_ind * width;
    let y = startY + y_ind * height;
    let val = table.get(r, 2);
    if (val < 5000) fill(colors[0]);
    if ((val < 10000) & (val >= 5000)) fill(colors[1]);
    if ((val < 50000) & (val >= 10000)) fill(colors[2]);
    if ((val < 100000) & (val >= 50000)) fill(colors[3]);

    if ((val < 500000) & (val >= 100000)) fill(colors[4]);
    if ((val < 1000000) & (val >= 500000)) fill(colors[5]);
    if ((val < 5000000) & (val >= 1000000)) fill(colors[6]);
    // if ((val < 5000000) & (val >= 2500000)) fill(colors[7]);

    // if ((val < 6000000) & (val >= 5000000)) fill(colors[8]);

    if (val >= 5000000) fill(colors[8]);
    stroke(color(190, 190, 190));
    rect(x, y, width, height);

    fill(150, 150, 150);
    noStroke();
    if (x_ind == unique_years.length - 1) {
      x_ind = 0;
      y_ind += 1;
    } else {
      x_ind += 1;
    }
  }

  noStroke();
  push();
  let axisy = radians(270);
  translate(20, 180);
  rotate(axisy);
  textSize(16);
  text("Countries", -350, 0);
  textSize(16);
  pop();

  noStroke();
  textSize(16);
  text("Years", 600, 960);
  textSize(16);

  textSize(14);
  text("Kilotonnes of C02", 1220, startY + 90);
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    stroke(color(190, 190, 190));
    square(1220, startX + 50 + (i * width) / 2, height / 2);
    noStroke();
    fill(150, 150, 150);
    textSize(14);
    text(labels[i], startX + 1120, startY + 120 + i * height);
    noStroke();
  }
}
