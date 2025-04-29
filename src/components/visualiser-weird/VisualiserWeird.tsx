"use client";

import { useRef, useEffect } from "react";
import styles from "./VisualiserWeird.module.css";

interface VisualiserProps {
  analyser: AnalyserNode | null;
  isPlaying: boolean;
}

const VisualiserWeird = ({ analyser, isPlaying }: VisualiserProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!analyser || !canvasRef.current || !isPlaying) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = Math.min(1000, 1000);
    canvas.width = size;
    canvas.height = size;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    let rotation = 0;

    const draw = () => {
      //   ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // lower alpha = longer trails
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      analyser.getByteFrequencyData(dataArray);
      ctx.save();

      ctx.rotate(rotation);
      const radius = 100;

      for (let i = 0; i < bufferLength; i++) {
        const angle = (i / bufferLength) * Math.PI * 2;
        const barHeight = dataArray[i] * 1;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(i * bufferLength * 2);
        const hue = i * 2;

        const x = Math.cos(angle) * (radius + barHeight);
        const y = Math.sin(angle) * (radius + barHeight);

        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;

        ctx.beginPath();
        ctx.arc(x, y, barHeight, barHeight / 300, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, barHeight, barHeight / 20, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, barHeight / 2, barHeight / 30, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      ctx.restore();

      // rotation += 0.001;

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, analyser]);

  return (
    <div className={styles.visualiserContainer}>
      <canvas ref={canvasRef} className={styles.visualiser} />
    </div>
  );
};

export default VisualiserWeird;
