"use client";

import type { ChangeEvent } from "react";
import styles from "./ColourControls.module.css";

interface ColourControlsProps {
  colour: string;
  onColourChange: (colour: string) => void;
}

const ColourControls = ({ colour, onColourChange }: ColourControlsProps) => {
  const handleColourChange = (e: ChangeEvent<HTMLInputElement>) => {
    onColourChange(e.target.value);
  };

  return (
    <div className={styles.controlGroup}>
      <label htmlFor="colour-control" className={styles.controlLabel}>
        Colour
      </label>
      <input
        id="colour-control"
        type="colour"
        value={colour}
        onChange={handleColourChange}
        className={styles.colourPicker}
      />
    </div>
  );
};

export default ColourControls;
