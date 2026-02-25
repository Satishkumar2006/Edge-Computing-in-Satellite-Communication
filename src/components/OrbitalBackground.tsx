import { useEffect, useRef } from 'react';

const OrbitalBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let stars: { x: number; y: number; r: number; speed: number; brightness: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 200 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.3 + 0.05,
        brightness: Math.random(),
      }));
    };

    resize();
    window.addEventListener('resize', resize);

    let time = 0;

    const drawOrbit = (cx: number, cy: number, rx: number, ry: number, rotation: number, alpha: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(185, 100%, 50%, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    };

    const drawSatellite = (cx: number, cy: number, rx: number, ry: number, rotation: number, angle: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      const x = Math.cos(angle) * rx;
      const y = Math.sin(angle) * ry;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'hsl(185, 100%, 50%)';
      ctx.fill();
      ctx.shadowColor = 'hsl(185, 100%, 50%)';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Stars
      stars.forEach((star) => {
        const twinkle = 0.5 + Math.sin(time * 3 + star.brightness * 10) * 0.5;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(195, 80%, 85%, ${twinkle * 0.8})`;
        ctx.fill();
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      // Earth glow
      const cx = canvas.width / 2;
      const cy = canvas.height / 2 + 50;
      const gradient = ctx.createRadialGradient(cx, cy, 40, cx, cy, 200);
      gradient.addColorStop(0, 'hsla(210, 80%, 30%, 0.3)');
      gradient.addColorStop(0.5, 'hsla(185, 100%, 50%, 0.05)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Orbits
      drawOrbit(cx, cy, 180, 60, -0.3, 0.15);
      drawOrbit(cx, cy, 260, 90, 0.2, 0.1);
      drawOrbit(cx, cy, 340, 120, -0.1, 0.08);

      // Satellites
      drawSatellite(cx, cy, 180, 60, -0.3, time * 1.2);
      drawSatellite(cx, cy, 260, 90, 0.2, time * 0.8 + 2);
      drawSatellite(cx, cy, 340, 120, -0.1, time * 0.5 + 4);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};

export default OrbitalBackground;
