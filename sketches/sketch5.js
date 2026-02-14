// HWK 5 Narrative Viz — Building + Parking Lot (instance mode)
registerSketch('sk5', function (p) {

    const DATA = [
      { year: 2020, unemp: 8.1, fitK: 492.7 },
      { year: 2021, unemp: 5.4, fitK: 543.6 },
      { year: 2022, unemp: 3.6, fitK: 618.7 },
      { year: 2023, unemp: 3.6, fitK: 665.9 },
      { year: 2024, unemp: 4.0, fitK: 690.3 },
    ];
  
    const fitMin = 492.7, fitMax = 690.3;
    const unMin  = 3.6,  unMax  = 8.1;
  
    let slider;
  
    p.setup = function () {
      p.createCanvas(1080, 1080);
      p.textFont("Georgia");
  
      slider = p.createSlider(0, DATA.length - 1, 0, 1);
      slider.style("width", "860px");
      slider.position(120, 1020);
    };
  
    p.draw = function () {
      p.background(245);
  
      const d = DATA[slider.value()];
  
      // Header
      p.fill(20);
      p.textStyle(p.BOLD);
      p.textSize(40);
      p.text("U.S. Unemployment vs Fitness Jobs (2020–2024)", 60, 60);
  
      p.textStyle(p.NORMAL);
      p.fill(70);
      p.textSize(18);
      p.text("Drag the slider. Numbers are exact; icons show relative change.", 60, 110);
  
      p.fill(20);
      p.textSize(24);
      p.text(
        `${d.year}  |  Unemployment: ${d.unemp.toFixed(1)}%  |  Fitness employment: ${d.fitK.toFixed(1)}k`,
        60,
        150
      );
  
      // Map to icon counts
      const totalWindows = 30;
      const litWindows = Math.round(p.map(d.fitK, fitMin, fitMax, 10, totalWindows));
  
      // Important fix (less confusing):
      // higher unemployment => fewer cars (more empty spots)
      const totalCars = 10;
      const shownCars = Math.round(p.map(d.unemp, unMin, unMax, totalCars, 2));
  
      // Panels
      drawPanel(60, 210, 470, 720, "Fitness jobs (more lit windows = more jobs)");
      drawBuilding(120, 305, 350, 540, litWindows);
  
      drawPanel(550, 210, 470, 720, "Unemployment (more empty spots = higher unemployment)");
      drawParkingLot(610, 305, 350, 540, shownCars);
  
      // Ethical note
      p.fill(95);
      p.textSize(14);
      p.text("Icons are metaphor; exact values are labeled above.", 60, 955);
  
      // Slider label
      p.fill(60);
      p.textSize(14);
      p.text("Year", 70, 1010);
    };
  
    function drawPanel(x, y, w, h, title) {
      p.noStroke();
      p.fill(255);
      p.rect(x, y, w, h, 18);
  
      p.fill(25);
      p.textStyle(p.BOLD);
      p.textSize(18);
      p.text(title, x + 20, y + 35);
  
      p.stroke(235);
      p.line(x + 20, y + 55, x + w - 20, y + 55);
      p.noStroke();
    }
  
    function drawBuilding(x, y, w, h, litCount) {
      p.fill(35);
      p.rect(x, y, w, h, 16);
  
      const cols = 5, rows = 6;
      const gap = 14;
      const winW = (w - gap * (cols + 1)) / cols;
      const winH = (h - 120 - gap * (rows + 1)) / rows;
  
      let placed = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const wx = x + gap + c * (winW + gap);
          const wy = y + 60 + gap + r * (winH + gap);
  
          if (placed < litCount) p.fill(255, 220, 120);
          else p.fill(80);
  
          p.rect(wx, wy, winW, winH, 10);
          placed++;
          if (placed >= 30) break;
        }
        if (placed >= 30) break;
      }
  
      p.fill(15);
      p.rect(x + w * 0.44, y + h - 70, w * 0.12, 70, 10);
    }
  
    function drawParkingLot(x, y, w, h, carCount) {
      p.fill(50);
      p.rect(x, y, w, h, 16);
  
      const cols = 2, rows = 5;
      const margin = 26, gapX = 26, gapY = 20;
      const spotW = (w - margin * 2 - gapX * (cols - 1)) / cols;
      const spotH = (h - margin * 2 - gapY * (rows - 1)) / rows;
  
      p.stroke(220);
      p.strokeWeight(2);
  
      let spotIndex = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const sx = x + margin + c * (spotW + gapX);
          const sy = y + margin + r * (spotH + gapY);
  
          p.noFill();
          p.rect(sx, sy, spotW, spotH, 14);
  
          if (spotIndex < carCount) {
            drawCarVertical(sx + spotW / 2, sy + spotH / 2, Math.min(spotW, spotH) * 0.9);
          }
  
          spotIndex++;
          if (spotIndex >= 10) break;
        }
        if (spotIndex >= 10) break;
      }
  
      p.noStroke();
    }
  
    function drawCarVertical(cx, cy, s) {
      const bodyW = 0.35 * s;
      const bodyH = 0.70 * s;
  
      p.fill(220, 40, 40);
      p.rect(cx - bodyW / 2, cy - bodyH / 2, bodyW, bodyH, 12);
  
      p.fill(245);
      p.rect(cx - bodyW * 0.18, cy - bodyH * 0.20, bodyW * 0.36, bodyH * 0.18, 8);
  
      p.fill(30);
      p.ellipse(cx - bodyW * 0.55, cy - bodyH * 0.30, bodyW * 0.25, bodyW * 0.35);
      p.ellipse(cx + bodyW * 0.55, cy - bodyH * 0.30, bodyW * 0.25, bodyW * 0.35);
      p.ellipse(cx - bodyW * 0.55, cy + bodyH * 0.30, bodyW * 0.25, bodyW * 0.35);
      p.ellipse(cx + bodyW * 0.55, cy + bodyH * 0.30, bodyW * 0.25, bodyW * 0.35);
    }
  
  });
  