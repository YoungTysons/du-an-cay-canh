import React from "react";
import TheCayCanh from "../../components/TheCayCanh";
import { useProductFilter } from "../../hooks/useLocSanPham"; // Import hook
import "./SanPham.css";

function SanPham({ setGioHang, setCayDangXem }) {
  // Lấy toàn bộ logic từ Hook
  const {
    tabHienTai,
    setTabHienTai,
    tuKhoa,
    setTuKhoa,
    cayHienThi,
    danhSachTabs,
  } = useProductFilter();

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
            {danhSachTabs.map((tag) => (
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
                setGioHang={() => setGioHang(cay)}
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
