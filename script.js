const main = document.getElementById("main");
const main_load = document.getElementById("main_load");
const buttons = document.getElementById("buttons");
const nickname = document.getElementById("nickname");

setTimeout(() => {
  main.style.opacity = "1";
  setTimeout(() => {
    main_load.style.height = "250px";
    main_load.style.top = "0";
    main_load.style.borderRadius = "10px";
    document.getElementById("name").style.fontSize = "50px";
    document.getElementById("name").style.top = "60%";
    document.getElementById("name").style.opacity = "0";
    document.getElementById("buttons").style.display = "block";
    setTimeout(() => {
      document.getElementById("name").innerHTML = "BIOGRAPHY";
      document.getElementById("buttons").style.opacity = "1";
      document.getElementById("nickname").style.opacity = "1";
      setTimeout(() => {
        document.getElementById("name").style.opacity = "1";
      }, 200);
    }, 500);
  }, 2000);
}, 1000);

class Rain {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.drops = [];
    this.init();
  }

  init() {
    this.resize();
    this.createDrops();
    this.animate();

    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.width = this.canvas.width = this.canvas.offsetWidth;
    this.height = this.canvas.height = this.canvas.offsetHeight;
    this.createDrops(); 
  }

  createDrops() {
    this.drops = [];
    const count =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--rain-count"
        )
      ) || 150;

    for (let i = 0; i < count; i++) {
      this.drops.push({
        x: Math.random() * this.width,
        y: Math.random() * -this.height, 
        speed:
          (Math.random() * 2 + 1) *
          (parseInt(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--rain-speed"
            )
          ) || 3),
        length:
          (Math.random() * 3 + 1) *
          (parseInt(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--rain-length"
            )
          ) || 2),
        size: Math.random() * 1.5 + 0.5,
        trail: [],
      });
    }
  }

  animate() {
    
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    this.ctx.fillRect(0, 0, this.width, this.height);

    const rainColor =
      getComputedStyle(document.documentElement).getPropertyValue(
        "--rain-color"
      ) || "rgba(255, 255, 255, 0.8)";

    for (let drop of this.drops) {
      
      drop.trail.push({ x: drop.x, y: drop.y });

      
      const maxTrail =
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--trail-length"
          )
        ) || 20;
      if (drop.trail.length > maxTrail) {
        drop.trail.shift();
      }

      
      for (let i = 0; i < drop.trail.length; i++) {
        const point = drop.trail[i];
        const alpha = (i / drop.trail.length) * 0.3;

        this.ctx.beginPath();
        this.ctx.arc(
          point.x,
          point.y,
          drop.size * (i / drop.trail.length),
          0,
          Math.PI * 2
        );
        this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        this.ctx.fill();
      }

      
      this.ctx.beginPath();
      this.ctx.arc(drop.x, drop.y, drop.size, 0, Math.PI * 2);
      this.ctx.fillStyle = rainColor;
      this.ctx.fill();

      
      this.ctx.beginPath();
      this.ctx.moveTo(drop.x, drop.y);
      this.ctx.lineTo(drop.x, drop.y - drop.length);
      this.ctx.strokeStyle = rainColor;
      this.ctx.lineWidth = drop.size / 2;
      this.ctx.stroke();

      
      drop.y += drop.speed;
      drop.x += Math.sin(drop.y * 0.01) * 0.5; 

      
      if (drop.y > this.height + 50) {
        drop.y = -20;
        drop.x = Math.random() * this.width;
        drop.trail = [];
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("rain-canvas");
  new Rain(canvas);
});
