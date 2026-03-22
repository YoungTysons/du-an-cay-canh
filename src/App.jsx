import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useCart } from "./hooks/useGioHang"; // 1. Import hook ở đây
import ThanhDieuHuong from "./components/ThanhDieuHuong";
import TrangChu from "./trang/TrangChu";
import SanPham from "./trang/SanPham";
import GioHang from "./trang/GioHang"; 
import ThanhToan from "./trang/ThanhToan"; 
import "./trang/TrangChu.css";

function App() {
  // 2. Lấy toàn bộ logic ra bằng 1 dòng duy nhất
  const { 
    gioHangItems, 
    handleThemGioHang, 
    thayDoiSoLuong, 
    xoaSanPham, 
    tongTien, 
    tongSoLuongBadge 
  } = useCart();

  const [cayDangXem, setCayDangXem] = useState(null);

  return (
    <Router>
      <div className="UngDung">
        <ThanhDieuHuong gioHangItems={tongSoLuongBadge} />

        <Routes>
          <Route path="/" element={<TrangChu setGioHang={handleThemGioHang} setCayDangXem={setCayDangXem} />} />
          <Route path="/san-pham" element={<SanPham setGioHang={handleThemGioHang} setCayDangXem={setCayDangXem} />} />
          <Route 
            path="/gio-hang" 
            element={
              <GioHang 
                gioHangItems={gioHangItems} 
                tongTien={tongTien}
                thayDoiSoLuong={thayDoiSoLuong}
                xoaSanPham={xoaSanPham}
              />
            } 
          />
          <Route path="/thanh-toan" element={<ThanhToan gioHangItems={gioHangItems} tongTien={tongTien} />} />
        </Routes>

        {/* Modal Chi Tiết */}
        {cayDangXem && (
          <div className="modal-overlay" onClick={() => setCayDangXem(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setCayDangXem(null)}>&times;</button>
              <div className="modal-body">
                <img src={cayDangXem.anh} alt={cayDangXem.ten} className="modal-image-detail" />
                <div className="modal-info">
                  <h2>{cayDangXem.ten}</h2>
                  <p className="modal-price">{cayDangXem.gia?.toLocaleString()}đ</p>
                  <p><b>Độ ẩm:</b> {cayDangXem.doAm}</p>
                  <p className="modal-desc">{cayDangXem.moTa || "Thông tin đang cập nhật..."}</p>
                  <button className="nut-mua" onClick={() => { handleThemGioHang(cayDangXem); setCayDangXem(null); }}>
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;