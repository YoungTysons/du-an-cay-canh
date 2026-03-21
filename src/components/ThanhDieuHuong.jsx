import React from "react";
import { Link } from "react-router-dom";
import "./ThanhDieuHuong.css";

function ThanhDieuHuong({ gioHang }) {
  return (
    <nav className="navbar-chinh">
      <div className="khung-chinh noi-dung-nav">
        <Link to="/" className="logo-green">🌿 GreenThumb</Link>
        <div className="links-dieu-huong">
          <Link to="/">Trang chủ</Link>
          <Link to="/san-pham">Sản phẩm</Link>
            <a href="/">Chăm sóc</a>
            <a href="#lien-he">Liên hệ</a>
        </div>
        <div className="gio-hang-icon">🛒 <span className="badge-so-luong">{gioHang}</span></div>
      </div>
    </nav>
  );
}

export default ThanhDieuHuong;