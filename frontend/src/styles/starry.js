export const starryNight = (canvas, ctx) => {
    const stars = [];
    const palette = ["#8F87F1", "#C68EFD", "#E9A5F1", "#FED2E2"];
  
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        vx: Math.floor(Math.random() * 50) - 25,
        vy: Math.floor(Math.random() * 50) - 25,
        twinkle: Math.random(),
        color: palette[Math.floor(Math.random() * palette.length)]
      });
    }
  
    return () => {
      // Dark purple-blue background
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      stars.forEach((star) => {
        star.twinkle += 0.02;
        const opacity = Math.abs(Math.sin(star.twinkle));
  
        // Glowing outer circle
        const gradient = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          star.radius * 4
        );
        gradient.addColorStop(0, star.color);
        gradient.addColorStop(1, "transparent");
  
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
  
        // Inner twinkling star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
  
        star.x += star.vx / 60;
        star.y += star.vy / 60;
  
        if (star.x < 0 || star.x > canvas.width) star.vx = -star.vx;
        if (star.y < 0 || star.y > canvas.height) star.vy = -star.vy;
      });
    };
  };
  