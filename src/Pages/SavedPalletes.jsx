import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Trash2, ArrowUpRight, Check } from "lucide-react";

export default function SavedPalettesPage({
  savedPalettes,
  onDeletePalette,
  onLoadPalette,
}) {
  const navigate = useNavigate();
  const [copiedColor, setCopiedColor] = useState(null);

  // Mengirim warna ke Generator lalu pindah halaman otomatis
  const handleUsePalette = (colors) => {
    onLoadPalette(colors);
    navigate("/generator");
  };

  // Menyalin 1 warna saat potongan warnanya diklik
  const handleCopySingle = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1200);
  };

  return (
    <div className="saved-container">
      <h2>Palet Tersimpan</h2>
      {savedPalettes.length === 0 ? (
        <p className="empty-msg">
          Belum ada palet yang disimpan. Simpan palet favoritmu dari halaman Generator!
        </p>
      ) : (
        <div className="saved-grid">
          {savedPalettes.map((item, index) => (
            <div key={index} className="saved-card">
              <div className="saved-colors">
                {item.colors.map((hex, i) => (
                  <div
                    key={i}
                    className="saved-swatch"
                    style={{ backgroundColor: hex }}
                    title={`Klik untuk salin ${hex}`}
                    onClick={() => handleCopySingle(hex)}
                  >
                    {copiedColor === hex && (
                      <span className="swatch-copied">
                        <Check size={14} />
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="saved-footer">
                <span>Disimpan {item.date}</span>
                <div className="saved-actions">
                  <button
                    className="use-btn"
                    onClick={() => handleUsePalette(item.colors)}
                    title="Buka kembali di Generator"
                  >
                    <ArrowUpRight size={15} />
                    <span>Gunakan</span>
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => onDeletePalette(index)}
                    title="Hapus palet"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

SavedPalettesPage.propTypes = {
  savedPalettes: PropTypes.arrayOf(
    PropTypes.shape({
      colors: PropTypes.arrayOf(PropTypes.string).isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeletePalette: PropTypes.func.isRequired,
  onLoadPalette: PropTypes.func.isRequired,
};