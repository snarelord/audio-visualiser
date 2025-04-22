"use client";

import { useState, useRef } from "react";
import VisualiserBars from "./components/visualiser-bars/VisualiserBars";
import VisualiserWeird from "./components/visualiser-weird/VisualiserWeird";
import AudioControls from "./components/audio-controls/AudioControls";
import FileUploader from "./components/file-uploader/FileUploader";
import ColourControls from "./components/colour-controls/ColourControls";
import styles from "./App.module.css";

export default function App() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [colour, setColour] = useState("#a5a1ff");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  const handleFileUpload = (file: File) => {
    // prevent memory leaks
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
    }

    const audioUrl = URL.createObjectURL(file);
    audioUrlRef.current = audioUrl;
    setAudioFile(file);

    setIsPlaying(false);
    setCurrentTime(0);

    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.load();
    }
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      if (!audioContextRef.current) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;

        const source = audioContext.createMediaElementSource(audioRef.current);
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
        sourceRef.current = source;
      }

      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className={styles.container}>
      {/* <h1 className={styles.title}>Audio Visualiser</h1> */}

      <div className={styles.visualiserContainer}>
        <VisualiserBars analyser={analyserRef.current} isPlaying={isPlaying} />
        <VisualiserWeird analyser={analyserRef.current} isPlaying={isPlaying} />
      </div>

      <div className={styles.controls}>
        <FileUploader onFileUpload={handleFileUpload} />

        <AudioControls
          isPlaying={isPlaying}
          volume={volume}
          currentTime={currentTime}
          duration={duration}
          onPlayPause={handlePlayPause}
          onVolumeChange={handleVolumeChange}
          onSeek={handleSeek}
          hasAudio={!!audioFile}
        />
        {/* <ColourControls colour={colour} onColourChange={setColour} /> */}
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />
      </div>
    </div>
  );
}
