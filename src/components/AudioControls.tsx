"use client";

import type React from "react";

import { formatTime } from "../utils/formatTime";
import styles from "./AudioControls.module.css";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface AudioControlsProps {
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
  onVolumeChange: (volume: number) => void;
  onSeek: (time: number) => void;
  hasAudio: boolean;
}

export default function AudioControls({
  isPlaying,
  volume,
  currentTime,
  duration,
  onPlayPause,
  onVolumeChange,
  onSeek,
  hasAudio,
}: AudioControlsProps) {
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSeek(Number.parseFloat(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onVolumeChange(Number.parseFloat(e.target.value));
  };

  const toggleMute = () => {
    onVolumeChange(volume > 0 ? 0 : 0.7);
  };

  return (
    <div className={styles.audioControls}>
      <div className={styles.playbackControls}>
        <button className={styles.playPauseButton} onClick={onPlayPause} disabled={!hasAudio}>
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>

        <div className={styles.timeDisplay}>
          <span>{formatTime(currentTime)}</span>
          <span>/</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className={styles.progressBarContainer}>
        <input
          type="range"
          min="0"
          max={duration || 1}
          value={currentTime}
          step="0.01"
          onChange={handleSeekChange}
          className={styles.progressBar}
          disabled={!hasAudio}
        />
      </div>

      <div className={styles.volumeControls}>
        <button className={styles.muteButton} onClick={toggleMute} disabled={!hasAudio}>
          {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className={styles.volumeSlider}
          disabled={!hasAudio}
        />
      </div>
    </div>
  );
}
