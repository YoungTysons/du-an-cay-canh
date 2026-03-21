import React from "react";
import './TheCayCanh.css'; // Kết nối file CSS riêng

function TheCayCanh({ cay, setGioHang, setCayDangXem }) {
  // Hàm xử lý mua nhanh (Ngăn click vào thẻ cây)
  const handleMuaNhanh = (e) => {
    e.stopPropagation(); 
    setGioHang((prev) => prev + 1); 
  };

  return (
    <div className="the-cay-card" onClick={() => setCayDangXem(cay)}>
      {/* 1. Ảnh cây ở trên */}
      <div className="khung-anh-cay">
        <img 
          src={cay.anh} 
          alt={cay.ten} 
          onError={(e) => (e.target.src = "https://via.placeholder.com/600")} 
        />
      </div>

      {/* 2. Thông tin ở dưới */}
      <div className="noidung-cay">
        <h4>{cay.ten}</h4>
        <p className="gia-tien">{cay.gia?.toLocaleString() || "0"}đ</p>
        
        {/* Phần hiển thị độ ẩm như trong hình */}
        <div className="do-am-display">
          💧 Độ ẩm lý tưởng: <span>{cay.doAm || "Chưa cập nhật"}</span>
        </div>

        <button className="nut-mua-nhanh" onClick={handleMuaNhanh}>
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}

export default TheCayCanh;