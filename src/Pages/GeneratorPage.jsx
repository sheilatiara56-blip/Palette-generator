import React from "react";
import PropTypes from "prop-types";
import { RefreshCw, Copy, Unlock, Bookmark } from "lucide-react";
import ColorCard from "../components/ColorCard";

export default function GeneratorPage({
  palette,
  locked,
  copiedStates,
  copiedAll,
  onGenerate,
  onToggleLock,
  onUnlockAll,
  onCopy,
  onCopyAll,
  onSavePalette,
  hexToRgb,
  isColorLight,
}) {
  return (
    <main className="palette-main">
      <header className="app-header">
        <div className="spacebar-badge">
          <span className="pulse-dot" />
          Tekan <kbd>Spacebar</kbd> untuk acak warna
        </div>
        <h1 className="title">Color Palette Generator</h1>

        <div className="action-bar">
          <button onClick={onGenerate} className="btn btn-primary">
            <RefreshCw size={18} /> Acak Warna
          </button>
          <button onClick={onCopyAll} className="btn btn-secondary">
            {copiedAll ? "Tercopy!" : <><Copy size={18} /> Copy Palet</>}
          </button>
          <button onClick={onSavePalette} className="btn btn-secondary">
            <Bookmark size={18} /> Simpan Palet
          </button>
          <button onClick={onUnlockAll} className="btn btn-secondary">
            <Unlock size={18} /> Buka Semua Lock
          </button>
        </div>
      </header>

      <div className="palette-grid">
        {palette.map((color, index) => (
          <ColorCard
            key={index}
            color={color}
            index={index}
            isLocked={locked[index]}
            isCopied={copiedStates[index]}
            onToggleLock={onToggleLock}
            onCopy={onCopy}
            hexToRgb={hexToRgb}
            isLight={isColorLight(color)}
          />
        ))}
      </div>
    </main>
  );
}

GeneratorPage.propTypes = {
  palette: PropTypes.arrayOf(PropTypes.string).isRequired,
  locked: PropTypes.arrayOf(PropTypes.bool).isRequired,
  copiedStates: PropTypes.object.isRequired,
  copiedAll: PropTypes.bool.isRequired,
  onGenerate: PropTypes.func.isRequired,
  onToggleLock: PropTypes.func.isRequired,
  onUnlockAll: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
  onCopyAll: PropTypes.func.isRequired,
  onSavePalette: PropTypes.func.isRequired,
  hexToRgb: PropTypes.func.isRequired,
  isColorLight: PropTypes.func.isRequired,
};