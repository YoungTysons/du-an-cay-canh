import React, { useState } from "react";
import { danhSachCayCanh } from "../data/DanhSachCay";
import TheCayCanh from "../components/TheCayCanh";
import "./SanPham.css";

function SanPham({ setGioHang, setCayDangXem }) {
  const [tabHienTai, setTabHienTai] = useState("tat-ca");
  const [tuKhoa, setTuKhoa] = useState("");

  // Logic lọc và tìm kiếm kết hợp
  const cayHienThi = danhSachCayCanh.filter(
    (cay) =>
      (tabHienTai === "tat-ca" || cay.loai === tabHienTai) &&
      cay.ten.toLowerCase().includes(tuKhoa.toLowerCase()),
  );

  return (
    <div className="san-pham-page">
      <div className="khung-chinh">
        {/* THANH TÌM KIẾM & BỘ LỌC */}
        <div className="filter-search-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Tìm tên cây cảnh bạn yêu thích..."
              value={tuKhoa}
              onChange={(e) => setTuKhoa(e.target.value)}
            />
          </div>
          <div className="filter-tags">
            {[
              { id: "tat-ca", label: "Tất cả" },
              { id: "trong-nha", label: "Trong nhà" },
              { id: "sen-da", label: "Sen đá" },
              { id: "ngoai-troi", label: "Ngoài trời" },
            ].map((tag) => (
              <button
                key={tag.id}
                className={`nut-loc ${tabHienTai === tag.id ? "dang-chon" : ""}`}
                onClick={() => setTabHienTai(tag.id)}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* LƯỚI SẢN PHẨM */}
        <main className="luoi-cay">
          {cayHienThi.length > 0 ? (
            cayHienThi.map((cay) => (
              <TheCayCanh
                key={cay.id}
                cay={cay}
                setGioHang={setGioHang}
                setCayDangXem={setCayDangXem}
              />
            ))
          ) : (
            <div className="khong-tim-thay">
              <p>😢 Không tìm thấy cây nào phù hợp với từ khóa "{tuKhoa}"</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default SanPham;
