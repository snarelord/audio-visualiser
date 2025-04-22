"use client";

import type React from "react";

import { useRef } from "react";
import styles from "./FileUploader.module.css";
import { Upload, Music } from "lucide-react";

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
  audioFile?: File | null;
}

export default function FileUploader({ onFileUpload, audioFile }: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("audio/")) {
        console.log("File selected:", file.name);
        onFileUpload(file);
        e.target.value = "";
      } else {
        alert("Please select an audio file");
      }
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={styles.container}>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="audio/*" className={styles.fileInput} />

      <button onClick={handleClick} className={styles.uploadButton} type="button">
        {audioFile ? (
          <>
            <Music size={18} />
            <span className={styles.fileName}>{audioFile.name}</span>
            <span className={styles.changeText}>Change</span>
          </>
        ) : (
          <>
            <Upload size={18} />
            <span>Select Audio File</span>
          </>
        )}
      </button>
    </div>
  );
}
