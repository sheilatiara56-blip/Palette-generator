import React from "react";
import PropTypes from "prop-types";
import { Lock, Unlock, Copy, Check } from "lucide-react";

export default function ColorCard({ color, index, isLocked, isCopied, onToggleLock, onCopy, hexToRgb, isLight }) {
  return (
    <div
      className={`color-card ${isLight ? "light-mode" : "dark-mode"}`}
      style={{ backgroundColor: color }}
    >
      <div className="card-top">
        <span className="card-index">0{index + 1}</span>
        <button
          onClick={() => onToggleLock(index)}
          className={`lock-btn ${isLocked ? "locked" : ""}`}
        >
          {isLocked ? <Lock size={16} /> : <Unlock size={16} />}
        </button>
      </div>

      <div className="card-bottom">
        <div className="glass-panel">
          <button onClick={() => onCopy(color, index)} className="hex-btn">
            {color}
          </button>
          <span className="rgb-text">{hexToRgb(color)}</span>
          <button onClick={() => onCopy(color, index)} className={`copy-badge ${isCopied ? "copied" : ""}`}>
            {isCopied ? <Check size={14} /> : <Copy size={14} />}
            {isCopied ? "Copied!" : "Copy HEX"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Validasi Props dengan Prop-Types
ColorCard.propTypes = {
  color: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isLocked: PropTypes.bool.isRequired,
  isCopied: PropTypes.bool,
  onToggleLock: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
  hexToRgb: PropTypes.func.isRequired,
  isLight: PropTypes.bool.isRequired,
};