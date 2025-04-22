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

    const draw = () => {
      //   ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; // lower alpha = longer trails
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      analyser.getByteFrequencyData(dataArray);

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] * 1.5;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(i * bufferLength * 4);
        const hue = i * 2;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.beginPath();
        ctx.arc(0, barHeight, barHeight / 500, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, barHeight, barHeight / 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, barHeight / 2, barHeight / 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

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
