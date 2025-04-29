# Audio Visualisers

This project showcases a collection of audio visualisers built with **React**, **TypeScript**, **Vite**, and **CSS Modules**. The visualisers use the **Web Audio API** to analyse audio frequency data in real time and render animated graphics onto canvases.

---

## 🛠️ Tech Stack

- **Vite**
- **React**
- **TypeScript**
- **Node**
- **CSS Modules**

---

## Visualiser Components

- Renders colourful animations around a central point.
- Uses an `AnalyserNode` to capture frequency data from an audio source.
- Each bar/orb represents the magnitude of a frequency bin.
- Includes multiple arcs and transformations per frequency bin to create a layered visual.
- Trails are created with semi-transparent background fills, giving a ghosting effect.

## 🔊 How Audio Drives the Visuals

Both components rely on an `AnalyserNode` from the Web Audio API, which provides access to live frequency data from audio input.

1. **Frequency Analysis**  
   The `analyser.getByteFrequencyData()` method fills a `Uint8Array` with current frequency values.

2. **Rendering Loop**  
   An animation loop (`requestAnimationFrame`) updates the canvas frame by frame using the frequency data.

3. **Visual Mapping**

   - In **VisualiserBars**, frequency bins are mapped to bars with height based on loudness.
   - In **VisualiserWeird**, data points create orbs at varying distances and sizes, forming radial shapes.

4. **Styling & Animation**  
   Each component uses CSS Modules for styling and give the canvas a container layout.

---
