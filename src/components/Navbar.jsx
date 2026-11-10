import React from "react";
import { NavLink } from "react-router-dom";
import { Palette, Bookmark, Info } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Palette size={24} />
        <span>ColorCraft</span>
      </div>
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
          <Palette size={18} /> Generator
        </NavLink>
        <NavLink to="/saved" className={({ isActive }) => (isActive ? "active" : "")}>
          <Bookmark size={18} /> Tersimpan
        </NavLink>

      </div>
    </nav>
  );
}