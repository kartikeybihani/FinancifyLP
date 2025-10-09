"use client";

import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 3; // Make canvas taller to cover scrolling
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Particle class with enhanced behavior
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      hue: number;
      saturation: number;
      lightness: number;
      pulseSpeed: number;
      pulseDirection: number;
      maxSize: number;
      minSize: number;
      shape: string;
      trail: { x: number; y: number; size: number; alpha: number }[];
      hasTrail: boolean;
      canvasWidth: number;
      canvasHeight: number;
      twinkleSpeed: number;
      twinklePhase: number;
      baseAlpha: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = Math.random() * this.canvasWidth;
        this.y = Math.random() * this.canvasHeight;
        this.size = Math.random() * 1.2 + 0.1; // Even smaller base size for stars
        this.maxSize = this.size + Math.random() * 0.8;
        this.minSize = Math.max(0.1, this.size - Math.random() * 0.4);
        this.speedX = (Math.random() - 0.5) * 0.3; // Slower movement
        this.speedY = (Math.random() - 0.5) * 0.3;

        // Whites and subtle gold colors for stars
        this.hue =
          Math.random() > 0.85
            ? Math.random() * 50 + 30 // Warm gold/yellow for some stars
            : Math.random() * 60 + 200; // Cool white/blue for most stars
        this.saturation = Math.random() > 0.85 ? 70 : 20; // Most stars are more white
        this.lightness = Math.random() * 30 + 70; // Brighter for star effect

        this.pulseSpeed = Math.random() * 0.03 + 0.01; // Slightly faster pulsing
        this.pulseDirection = Math.random() > 0.5 ? 1 : -1;

        this.alpha = Math.random() * 0.7 + 0.3;
        this.color = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`;

        // Only use circles for stars
        this.shape = "circle";

        // Star trail effect
        this.trail = [];
        this.hasTrail = Math.random() > 0.7; // 30% of stars have trails

        // Add enhanced twinkling effect
        this.twinkleSpeed = Math.random() * 0.04 + 0.02;
        this.twinklePhase = Math.random() * Math.PI * 2;
        this.baseAlpha = this.alpha;
      }

      update() {
        // Add current position to trail with reduced frequency for stars
        if (this.hasTrail && Math.random() > 0.85) {
          this.trail.push({
            x: this.x,
            y: this.y,
            size: this.size * 0.4, // Smaller trail for stars
            alpha: this.alpha * 0.3,
          });

          // Limit trail length
          if (this.trail.length > 3) {
            // Shorter trails for stars
            this.trail.shift();
          }
        }

        // Slightly curved motion for stars
        this.x += this.speedX;
        this.y += this.speedY;

        // Enhanced twinkle effect with more variation
        this.twinklePhase += this.twinkleSpeed;
        this.alpha = this.baseAlpha * (0.4 + Math.sin(this.twinklePhase) * 0.6);

        // Update color with new alpha
        this.color = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`;

        // Wrap around edges
        if (this.x < -50) this.x = this.canvasWidth + 50;
        if (this.x > this.canvasWidth + 50) this.x = -50;
        if (this.y < -50) this.y = this.canvasHeight + 50;
        if (this.y > this.canvasHeight + 50) this.y = -50;
      }

      draw() {
        if (!ctx) return;

        // Draw trail with fade effect
        if (this.hasTrail) {
          this.trail.forEach((point, index) => {
            const trailAlpha =
              point.alpha * ((index + 1) / this.trail.length) * 0.5;
            ctx.fillStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${trailAlpha})`;
            ctx.beginPath();
            ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
            ctx.fill();
          });
        }

        // Draw star with enhanced glow effect
        const glow = this.size * 3;
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          glow
        );

        gradient.addColorStop(0, this.color);
        gradient.addColorStop(
          0.3,
          `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${
            this.alpha * 0.6
          })`
        );
        gradient.addColorStop(
          0.7,
          `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${
            this.alpha * 0.2
          })`
        );
        gradient.addColorStop(
          1,
          `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, 0)`
        );

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, glow, 0, Math.PI * 2);
        ctx.fill();

        // Draw the main star point
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create many more particles for a dense star field
    const numberOfParticles = Math.min(400, window.innerWidth / 5);

    // Create particles
    const particlesArray: Particle[] = [];
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle(canvas.width, canvas.height));
    }

    // Create geometric background elements
    const geometricElements: {
      x: number;
      y: number;
      size: number;
      rotation: number;
      type: string;
      color: string;
    }[] = [];
    const numberOfElements = 8;

    for (let i = 0; i < numberOfElements; i++) {
      geometricElements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 100 + 50,
        rotation: Math.random() * Math.PI,
        type: Math.random() > 0.5 ? "circle" : "rect",
        color: `hsla(${Math.random() * 60 + 180}, 30%, 50%, 0.02)`,
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create pure black space gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 3,
        0,
        canvas.width / 2,
        canvas.height / 3,
        canvas.width * 1.2
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 1)"); // Pure black at center
      gradient.addColorStop(0.4, "rgba(1, 1, 1, 1)"); // Almost pure black
      gradient.addColorStop(0.7, "rgba(3, 3, 3, 1)"); // Very dark gray
      gradient.addColorStop(1, "rgba(5, 5, 5, 1)"); // Dark gray at edges

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add a subtle neutral overlay gradient for depth
      const overlayGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      overlayGradient.addColorStop(0, "rgba(255, 255, 255, 0.015)");
      overlayGradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
      overlayGradient.addColorStop(1, "rgba(255, 255, 255, 0.01)");
      ctx.fillStyle = overlayGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw fewer, larger geometric elements for nebula-like effect
      geometricElements.forEach((element) => {
        ctx.save();
        ctx.translate(element.x, element.y);
        ctx.rotate(element.rotation);

        // Use very subtle neutral colors for nebula effect
        const nebulaColor = `hsla(${
          Math.random() * 60 + 180
        }, 30%, 50%, 0.005)`;
        ctx.fillStyle = nebulaColor;

        if (element.type === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, element.size * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }

      // Connect particles with lines if they're close enough
      connectParticles();

      requestAnimationFrame(animate);
    };

    // Connect particles with lines - enhanced with gradient lines
    const connectParticles = () => {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = 1 - distance / 120;

            // Create gradient line between particles
            const gradient = ctx.createLinearGradient(
              particlesArray[a].x,
              particlesArray[a].y,
              particlesArray[b].x,
              particlesArray[b].y
            );
            gradient.addColorStop(0, particlesArray[a].color);
            gradient.addColorStop(1, particlesArray[b].color);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = opacity * 0.8;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 opacity-70"
    />
  );
}
