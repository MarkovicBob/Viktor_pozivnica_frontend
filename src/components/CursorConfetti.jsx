import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

export default function CursorConfetti() {
  const confettiCanvasRef = useRef(null);
  const lastFireTime = useRef(0);
  const touchStartRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Create a single canvas element for confetti
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "1000";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    // Create confetti instance
    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });
    confettiCanvasRef.current = myConfetti;

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastFireTime.current < 30) {
        return; // Throttle confetti firing
      }
      lastFireTime.current = now;

      // Don't fire confetti if we're over a clickable element
      if (
        e.target.closest(
          'button, a, input, textarea, [role="button"], .no-confetti'
        )
      ) {
        return;
      }

      // Calculate position as ratio of viewport
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      // Fire confetti at mouse position
      confettiCanvasRef.current({
        particleCount: 5,
        spread: 50,
        origin: { x, y },
        colors: ["#4f6f52", "#7a9d7a", "#c4a574", "#8d6e63"],
        disableForReducedMotion: true,
        scalar: 0.9,
        gravity: 0.35,
        ticks: 70,
      });

      // Debug log
      console.log(`Confetti at: ${x.toFixed(2)}, ${y.toFixed(2)}`);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length !== 1) return;

      const now = Date.now();
      if (now - lastFireTime.current < 30) return; // Throttle
      lastFireTime.current = now;

      const touch = e.touches[0];

      // Don't fire confetti if we're over a clickable element
      if (
        e.target.closest(
          'button, a, input, textarea, [role="button"], .no-confetti'
        )
      ) {
        return;
      }

      // Calculate position as ratio of viewport
      const x = touch.clientX / window.innerWidth;
      const y = touch.clientY / window.innerHeight;

      // Fire confetti at touch position
      confettiCanvasRef.current({
        particleCount: 5,
        spread: 50,
        origin: { x, y },
        colors: ["#4f6f52", "#7a9d7a", "#c4a574", "#8d6e63"],
        disableForReducedMotion: true,
        scalar: 0.9,
        gravity: 0.35,
        ticks: 70,
      });
    };

    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    // Add event listeners to document
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });

    // Debug log to confirm event listeners are attached
    console.log("Confetti event listeners attached");

    // Clean up on unmount
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchstart", handleTouchStart);
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);

  return null;
}
