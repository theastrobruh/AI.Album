/**
 * js/core/starfield.js
 * Animated canvas background — violet/indigo palette.
 * Adapted from Background_Layer.html (original by theAstroBruh).
 * Self-initializing IIFE, no external dependencies.
 */

(() => {
    const canvas = document.getElementById('starfield-canvas');
    const ctx    = canvas.getContext('2d');
    let W, H;
    const stars    = [];
    const shooters = [];
    const COUNT    = 280;

    // ── Resize handler ──────────────────────────────────────
    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    // ── Star class ──────────────────────────────────────────
    class Star {
        constructor(randomY = false) {
            this.reset();
            if (randomY) this.y = Math.random() * H;
        }

        reset() {
            this.x   = Math.random() * W;
            this.y   = Math.random() * H;
            this.r   = Math.random() * 1.6;
            this.spd = 0.01 + Math.random() * 0.03;
            this.a   = Math.random();
            this.dir = Math.random() > 0.5 ? 1 : -1;
        }

        update() {
            this.a += this.spd * this.dir;
            if (this.a >= 1 || this.a <= 0.05) this.dir *= -1;
            this.y -= 0.08;
            if (this.y < 0) this.y = H;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(230, 210, 255, ${this.a})`;
            ctx.fill();
        }
    }

    // ── Shooting star class ─────────────────────────────────
    class ShootingStar {
        constructor() { this.reset(); }

        reset() {
            this.x      = Math.random() * W * 1.5;
            this.y      = 0;
            this.len    = 70 + Math.random() * 100;
            this.spd    = 5  + Math.random() * 4;
            this.active = false;
            this.timer  = Math.random() * 320;
        }

        update() {
            if (this.active) {
                this.x -= this.spd;
                this.y += this.spd;
                if (this.x < -this.len || this.y > H + this.len) {
                    this.active = false;
                    this.reset();
                }
            } else {
                this.timer--;
                if (this.timer <= 0) {
                    this.active = true;
                    this.x = W * 0.5 + Math.random() * W * 0.8;
                    this.y = -50;
                }
            }
        }

        draw() {
            if (!this.active) return;
            const g = ctx.createLinearGradient(
                this.x, this.y,
                this.x + this.len, this.y - this.len
            );
            g.addColorStop(0, 'rgba(200, 180, 255, 0.9)');
            g.addColorStop(1, 'rgba(200, 180, 255, 0)');

            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.len, this.y - this.len);
            ctx.strokeStyle = g;
            ctx.lineWidth   = 2;
            ctx.stroke();
        }
    }

    // ── Init & loop ─────────────────────────────────────────
    function init() {
        resize();
        for (let i = 0; i < COUNT; i++) stars.push(new Star(true));
        for (let i = 0; i < 3; i++) shooters.push(new ShootingStar());
    }

    function loop() {
        ctx.clearRect(0, 0, W, H);
        stars.forEach(s => { s.update(); s.draw(); });
        shooters.forEach(s => { s.update(); s.draw(); });
        requestAnimationFrame(loop);
    }

    window.addEventListener('resize', resize);
    init();
    loop();
})();
