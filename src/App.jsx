import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./Pages/Home";
import GeneratorPage from "./Pages/GeneratorPage";
import SavedPalettesPage from "./Pages/SavedPalletes";
import "./App.css";

const hslToHex = (h, s, l) => {
  h = ((h % 360) + 360) % 360;
  const lDecimal = l / 100;
  const a = (s * Math.min(lDecimal, 1 - lDecimal)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = lDecimal - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
};

export default function App() {
  const [palette, setPalette] = useState([]);
  const [locked, setLocked] = useState([false, false, false, false, false]);
  const [copiedStates, setCopiedStates] = useState({});
  const [copiedAll, setCopiedAll] = useState(false);
  const [savedPalettes, setSavedPalettes] = useState([]);

  // Logika Acak Warna Berbasis Color Theory + Warna Netral
  const generatePalette = () => {
    const baseHue = Math.floor(Math.random() * 360);
    const modes = ["analogous", "monochromatic", "triadic"];
    const mode = modes[Math.floor(Math.random() * modes.length)];

    const newPalette = [...palette];

    for (let i = 0; i < 5; i++) {
      if (locked[i] && palette[i]) continue;

      let h = baseHue;
      let s = 65;
      let l = 50;

      const isNeutral = Math.random() < 0.25;

      if (isNeutral) {
        s = Math.floor(Math.random() * 6);
        const neutralType = Math.random();

        if (neutralType < 0.35) {
          l = Math.floor(Math.random() * 9) + 88; // Putih / Off-White
        } else if (neutralType < 0.7) {
          l = Math.floor(Math.random() * 11) + 10; // Hitam / Off-Black
        } else {
          l = Math.floor(Math.random() * 26) + 40; // Abu-abu
        }
      } else {
        if (mode === "analogous") {
          h = baseHue + (i - 2) * 15;
          s = Math.floor(Math.random() * 20) + 60;
          l = Math.floor(Math.random() * 30) + 35;
        } else if (mode === "monochromatic") {
          h = baseHue;
          s = Math.floor(Math.random() * 25) + 55;
          l = 20 + i * 15;
        } else if (mode === "triadic") {
          const offsets = [0, 25, 180, 205, 40];
          h = baseHue + offsets[i];
          s = Math.floor(Math.random() * 25) + 60;
          l = Math.floor(Math.random() * 35) + 35;
        }
      }

      newPalette[i] = hslToHex(h, s, l);
    }

    setPalette(newPalette);
  };

  const toggleLock = (index) => {
    const newLocked = [...locked];
    newLocked[index] = !newLocked[index];
    setLocked(newLocked);
  };

  const unlockAll = () => {
    setLocked([false, false, false, false, false]);
  };

  const copyToClipboard = (color, index) => {
    if (copiedStates[index]) return;
    navigator.clipboard.writeText(color);
    setCopiedStates((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setCopiedStates((prev) => {
        const next = { ...prev };
        delete next[index];
        return next;
      });
    }, 1200);
  };

  const copyAllColors = () => {
    if (palette.length === 0) return;
    navigator.clipboard.writeText(palette.join(", "));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleSavePalette = () => {
    if (palette.length === 0) return;
    const newEntry = {
      colors: [...palette],
      date: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setSavedPalettes((prev) => [newEntry, ...prev]);
  };

  const handleDeleteSaved = (index) => {
    setSavedPalettes((prev) => prev.filter((_, i) => i !== index));
  };
  const handleLoadPalette = (colors) => {
    setPalette([...colors]);
    setLocked([false, false, false, false, false]);
  };

  const hexToRgb = (hex) => {
    if (!hex) return "";
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const isColorLight = (hex) => {
    if (!hex) return false;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 155;
  };

  useEffect(() => {
    generatePalette();
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
        generatePalette();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [palette, locked]);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/generator"
            element={
              <div className="fade-in">
                <GeneratorPage
                  palette={palette}
                  locked={locked}
                  copiedStates={copiedStates}
                  copiedAll={copiedAll}
                  onGenerate={generatePalette}
                  onToggleLock={toggleLock}
                  onUnlockAll={unlockAll}
                  onCopy={copyToClipboard}
                  onCopyAll={copyAllColors}
                  onSavePalette={handleSavePalette}
                  hexToRgb={hexToRgb}
                  isColorLight={isColorLight}
                />
              </div>
            }
          />
        <Route
            path="/saved"
            element={
              <div className="fade-in">
                <SavedPalettesPage
                  savedPalettes={savedPalettes}
                  onDeletePalette={handleDeleteSaved}
                  onLoadPalette={handleLoadPalette}
                />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}