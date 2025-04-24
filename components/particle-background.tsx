"use client"

import { useEffect, useRef } from "react"

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 3 // Make canvas taller to cover scrolling
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle class with enhanced behavior
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number
      hue: number
      saturation: number
      lightness: number
      pulseSpeed: number
      pulseDirection: number
      maxSize: number
      minSize: number
      shape: string
      trail: { x: number; y: number; size: number; alpha: number }[]
      hasTrail: boolean

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.maxSize = this.size + Math.random() * 2
        this.minSize = Math.max(0.5, this.size - Math.random() * 1)
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25

        // Colors in the lavender/purple/mint spectrum
        this.hue =
          Math.random() > 0.7
            ? Math.random() * 40 + 140 // Lavender/Purple range
            : Math.random() * 40 + 160 // Mint/Teal range
        this.saturation = Math.random() * 30 + 70 // High saturation
        this.lightness = Math.random() * 20 + 50 // Medium lightness

        // For pulsing effect
        this.pulseSpeed = Math.random() * 0.02 + 0.01
        this.pulseDirection = Math.random() > 0.5 ? 1 : -1

        this.alpha = Math.random() * 0.5 + 0.1
        this.color = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`

        // Random shapes: circle, square, or triangle
        const shapes = ["circle", "square", "triangle"]
        this.shape = shapes[Math.floor(Math.random() * shapes.length)]

        // Particle trail
        this.trail = []
        this.hasTrail = Math.random() > 0.8 // Only some particles have trails
      }

      update() {
        // Add current position to trail
        if (this.hasTrail && Math.random() > 0.7) {
          this.trail.push({
            x: this.x,
            y: this.y,
            size: this.size * 0.6,
            alpha: this.alpha * 0.5,
          })

          // Limit trail length
          if (this.trail.length > 5) {
            this.trail.shift()
          }
        }

        // Slightly curved motion
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.1
        this.y += this.speedY + Math.cos(this.x * 0.01) * 0.1

        // Pulse size
        this.size += this.pulseSpeed * this.pulseDirection
        if (this.size > this.maxSize || this.size < this.minSize) {
          this.pulseDirection *= -1
        }

        // Slowly shift color
        this.hue += 0.1
        if (this.hue > 280) this.hue = 140
        this.color = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`

        // Wrap around edges with some margin
        if (this.x < -50) this.x = canvas.width + 50
        if (this.x > canvas.width + 50) this.x = -50
        if (this.y < -50) this.y = canvas.height + 50
        if (this.y > canvas.height + 50) this.y = -50
      }

      draw() {
        if (!ctx) return

        // Draw trail
        if (this.hasTrail) {
          this.trail.forEach((point, index) => {
            const trailAlpha = point.alpha * (index / this.trail.length)
            ctx.fillStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${trailAlpha})`
            ctx.beginPath()
            ctx.arc(point.x, point.y, point.size * (index / this.trail.length), 0, Math.PI * 2)
            ctx.fill()
          })
        }

        ctx.fillStyle = this.color

        switch (this.shape) {
          case "circle":
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
            ctx.fill()
            break

          case "square":
            ctx.fillRect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2)
            break

          case "triangle":
            ctx.beginPath()
            ctx.moveTo(this.x, this.y - this.size)
            ctx.lineTo(this.x - this.size, this.y + this.size)
            ctx.lineTo(this.x + this.size, this.y + this.size)
            ctx.closePath()
            ctx.fill()
            break
        }
      }
    }

    // Create particles
    const particlesArray: Particle[] = []
    const numberOfParticles = Math.min(150, window.innerWidth / 15)

    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }

    // Create geometric background elements
    const geometricElements: { x: number; y: number; size: number; rotation: number; type: string; color: string }[] =
      []
    const numberOfElements = 15

    for (let i = 0; i < numberOfElements; i++) {
      geometricElements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 100 + 50,
        rotation: Math.random() * Math.PI,
        type: Math.random() > 0.5 ? "circle" : "rect",
        color: `hsla(${Math.random() * 60 + 160}, 70%, 50%, 0.03)`,
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create a rich, deep background gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 3,
        0,
        canvas.width / 2,
        canvas.height / 3,
        canvas.width,
      )
      gradient.addColorStop(0, "rgba(20, 17, 35, 1)") // Deep purple-blue
      gradient.addColorStop(0.5, "rgba(15, 12, 30, 1)") // Darker purple-blue
      gradient.addColorStop(1, "rgba(10, 8, 20, 1)") // Almost black with purple tint
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw large geometric elements in background
      geometricElements.forEach((element) => {
        ctx.save()
        ctx.translate(element.x, element.y)
        ctx.rotate(element.rotation)
        ctx.fillStyle = element.color

        if (element.type === "circle") {
          ctx.beginPath()
          ctx.arc(0, 0, element.size, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillRect(-element.size / 2, -element.size / 2, element.size, element.size)
        }

        ctx.restore()
      })

      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      // Connect particles with lines if they're close enough
      connectParticles()

      requestAnimationFrame(animate)
    }

    // Connect particles with lines - enhanced with gradient lines
    const connectParticles = () => {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            const opacity = 1 - distance / 120

            // Create gradient line between particles
            const gradient = ctx.createLinearGradient(
              particlesArray[a].x,
              particlesArray[a].y,
              particlesArray[b].x,
              particlesArray[b].y,
            )
            gradient.addColorStop(0, particlesArray[a].color)
            gradient.addColorStop(1, particlesArray[b].color)

            ctx.strokeStyle = gradient
            ctx.lineWidth = opacity * 0.8
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 opacity-70" />
}
