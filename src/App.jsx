import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThanhDieuHuong from "./components/ThanhDieuHuong";
import TrangChu from "./trang/TrangChu";
import SanPham from "./trang/SanPham";
import "./trang/TrangChu.css";

function App() {
  const [gioHang, setGioHang] = useState(0);
  const [cayDangXem, setCayDangXem] = useState(null);

  return (
    <Router>
      <div className="UngDung">
        <ThanhDieuHuong gioHang={gioHang} />
        <Routes>
          <Route
            path="/"
            element={
              <TrangChu
                setGioHang={() => setGioHang((prev) => prev + 1)}
                setCayDangXem={setCayDangXem}
              />
            }
          />
          <Route
            path="/san-pham"
            element={
              <SanPham
                setGioHang={() => setGioHang((prev) => prev + 1)}
                setCayDangXem={setCayDangXem}
              />
            }
          />
        </Routes>

        {/* Modal Xịn (Có ảnh và giá) */}
        {cayDangXem && (
          <div className="modal-overlay" onClick={() => setCayDangXem(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setCayDangXem(null)}>
                &times;
              </button>
              <div className="modal-body">
                <img
                  src={cayDangXem.anh}
                  alt={cayDangXem.ten}
                  className="modal-image-detail"
                />
                <div className="modal-info">
                  <h2>{cayDangXem.ten}</h2>
                  <p className="modal-price">
                    {cayDangXem.gia?.toLocaleString()}đ
                  </p>
                  <p>
                    <b>Độ ẩm:</b> {cayDangXem.doAm}
                  </p>
                  <p>{cayDangXem.moTa || "Thông tin đang cập nhật..."}</p>
                  <button
                    className="nut-mua"
                    onClick={() => {
                      setGioHang((prev) => prev + 1);
                      setCayDangXem(null);
                    }}
                  >
                    Mua ngay
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
