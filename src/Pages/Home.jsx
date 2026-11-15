import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Lock, Sliders, Bookmark } from "lucide-react";

export default function HomePage() {
  // Contoh palet preview untuk hiasan di Beranda
  const previewColors = ["#1E293B", "#3B82F6", "#38BDF8", "#94A3B8", "#F8FAFC"];

  return (
    <div className="home-container fade-in">
      <div className="hero-section">
        <div className="hero-badge">
          <Sparkles size={16} />
          <span>Color Theory Powered Generator</span>
        </div>

        <h1 className="hero-title">
          Temukan Kombinasi Warna <span className="text-gradient">Harmonis</span> dalam Sekejap
        </h1>

        <p className="hero-subtitle">
          Buat palet warna estetik berbasis teori warna (Analogous, Monochromatic, dan Triadic) 
          lengkap dengan warna netral untuk kebutuhan desain UI/UX dan proyek kreatifmu.
        </p>

        <div className="hero-actions">
          <Link to="/generator" className="btn-primary">
            <span>Mulai Buat Palet</span>
            <ArrowRight size={18} />
          </Link>
          <Link to="/saved" className="btn-secondary">
            <Bookmark size={18} />
            <span>Lihat Tersimpan</span>
          </Link>
        </div>

        {/* Kartu Preview Animasi Melayang */}
        <div className="hero-preview floating">
          {previewColors.map((hex, index) => (
            <div
              key={index}
              className="preview-swatch"
              style={{ backgroundColor: hex }}
              title={hex}
            />
          ))}
        </div>
      </div>

      {/* Bagian Highlight Fitur */}
      <div className="features-grid">
        <div className="feature-card">
          <Sliders size={24} className="feature-icon" />
          <h3>Harmoni Otomatis</h3>
          <p>Algoritma HSL memastikan warna tidak kusam dan tetap selaras di roda warna.</p>
        </div>
        <div className="feature-card">
          <Lock size={24} className="feature-icon" />
          <h3>Kunci Warna Favorit</h3>
          <p>Kunci warna yang sudah cocok, lalu acak sisa warnanya hanya dengan Spacebar.</p>
        </div>
        <div className="feature-card">
          <Bookmark size={24} className="feature-icon" />
          <h3>Simpan & Salin Cepat</h3>
          <p>Salin kode HEX/RGB dalam satu klik atau simpan koleksi palet terbaikmu.</p>
        </div>
      </div>
    </div>
  );
}
