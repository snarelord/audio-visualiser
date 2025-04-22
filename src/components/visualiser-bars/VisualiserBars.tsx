"use client";

import { useRef, useEffect } from "react";
import styles from "./VisualiserBars.module.css";

interface VisualiserProps {
  analyser: AnalyserNode | null;
  isPlaying: boolean;
}

const VisualiserBars = ({ analyser, isPlaying }: VisualiserProps) => {
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
    const barWidth = 2;
    let x = 0;

    const animate = () => {
      x = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      analyser.getByteFrequencyData(dataArray);
      draw();
      requestAnimationFrame(animate);
    };

    const draw = () => {
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      analyser.getByteFrequencyData(dataArray);

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] * 1.7;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((i * Math.PI * 2.1) / bufferLength);
        const hue = i * 1.7;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.fillRect(0, 0, barWidth, barHeight);
        x += barWidth;
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

export default VisualiserBars;
