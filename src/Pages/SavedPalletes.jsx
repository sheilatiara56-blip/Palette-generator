import React from "react";
import PropTypes from "prop-types";
import { Trash2 } from "lucide-react";

export default function SavedPalettesPage({ savedPalettes, onDeletePalette }) {
  return (
    <div className="saved-container">
      <h2>Palet Tersimpan ({savedPalettes.length})</h2>
      {savedPalettes.length === 0 ? (
        <p className="empty-msg">Belum ada palet yang disimpan. Klik "Simpan Palet" di halaman utama.</p>
      ) : (
        <div className="saved-grid">
          {savedPalettes.map((item, idx) => (
            <div key={idx} className="saved-card">
              <div className="saved-colors">
                {item.colors.map((c, cIdx) => (
                  <div key={cIdx} style={{ backgroundColor: c }} className="saved-swatch" title={c} />
                ))}
              </div>
              <div className="saved-footer">
                <span>{item.date}</span>
                <button onClick={() => onDeletePalette(idx)} className="delete-btn">
                  <Trash2 size={16} /> Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

SavedPalettesPage.propTypes = {
  savedPalettes: PropTypes.array.isRequired,
  onDeletePalette: PropTypes.func.isRequired,
};