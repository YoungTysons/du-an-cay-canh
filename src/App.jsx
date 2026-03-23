import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useCart } from "./hooks/useGioHang"; 
import ThanhDieuHuong from "./components/ThanhDieuHuong";
import TrangChu from "./trang/trangTrangChu/TrangChu";
import SanPham from "./trang/trangSanPham/SanPham";
import GioHang from "./trang/trangGioHang/GioHang";
import ThanhToan from "./trang/trangThanhToan/ThanhToan";
import ChamSoc from "./trang/trangChamSoc/ChamSoc"; // Import trang mới
import LichVaGio from "./components/lichVaGio"; // Đã sửa tên file cho chuẩn PascalCase
import "./trang/trangTrangChu/TrangChu.css";

function App() {
  const {
    gioHangItems,
    handleThemGioHang,
    thayDoiSoLuong,
    xoaSanPham,
    tongTien,
    tongSoLuongBadge,
  } = useCart();

  const [cayDangXem, setCayDangXem] = useState(null);

  return (
    <Router>
      <div className="UngDung">
        {/* Hiển thị Lịch và Giờ trên cùng của toàn bộ ứng dụng */}
        <LichVaGio /> 
        
        <ThanhDieuHuong gioHangItems={tongSoLuongBadge} />

        <Routes>
          <Route path="/" element={<TrangChu setGioHang={handleThemGioHang} setCayDangXem={setCayDangXem} />} />
          <Route path="/san-pham" element={<SanPham setGioHang={handleThemGioHang} setCayDangXem={setCayDangXem} />} />
          <Route path="/gio-hang" element={<GioHang gioHangItems={gioHangItems} tongTien={tongTien} thayDoiSoLuong={thayDoiSoLuong} xoaSanPham={xoaSanPham} />} />
          <Route path="/thanh-toan" element={<ThanhToan gioHangItems={gioHangItems} tongTien={tongTien} />} />
          
          {/* Thêm Route cho trang Chăm sóc */}
          <Route path="/cham-soc" element={<ChamSoc />} />
        </Routes>

        {/* Modal Chi Tiết - Đã tối ưu để hiển thị đúng ảnh từ folder public */}
        {cayDangXem && (
          <div className="modal-overlay" onClick={() => setCayDangXem(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setCayDangXem(null)}>&times;</button>
              <div className="modal-body">
                <img
                  src={cayDangXem.anh ? `/images/${cayDangXem.anh}` : "https://via.placeholder.com/600"}
                  alt={cayDangXem.tenCay || cayDangXem.ten}
                  className="modal-image-detail"
                />
                <div className="modal-info">
                  <h2>{cayDangXem.tenCay || cayDangXem.ten}</h2>
                  <p className="modal-price">{Number(cayDangXem.gia || 0).toLocaleString()}đ</p>
                  <p><b>Độ ẩm lý tưởng:</b> {cayDangXem.doAmLyTuong || cayDangXem.doAm}%</p>
                  <p className="modal-desc">{cayDangXem.moTa || "Thông tin đang cập nhật..."}</p>
                  <button
                    className="nut-mua"
                    onClick={() => {
                      handleThemGioHang(cayDangXem);
                      setCayDangXem(null);
                    }}
                  >
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