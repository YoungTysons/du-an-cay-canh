import React from "react";
import './TheCayCanh.css'; 

function TheCayCanh({ cay, setGioHang, setCayDangXem }) {
  
  const handleMuaNhanh = (e) => {
    e.stopPropagation(); 
    // Gửi cả đối tượng cây vào giỏ hàng
    setGioHang(cay); 
  };

  // Lấy tên và ảnh linh hoạt
  const tenHienThi = cay.tenCay || cay.ten || cay.Ten || "Cây chưa đặt tên";
  const giaHienThi = Number(cay.gia || cay.Gia || 0).toLocaleString();
  const doAmHienThi = cay.doAmLyTuong || cay.doAm || cay.DoAm || 0;
  const tenFileAnh = cay.anh || cay.Anh || "";

  return (
    <div className="the-cay-card" onClick={() => setCayDangXem(cay)}>
      <div className="khung-anh-cay">
        <img 
          src={`/images/${tenFileAnh}`} 
          alt={tenHienThi} 
          onError={(e) => (e.target.src = "https://via.placeholder.com/300?text=Loi+Anh")} 
        />
      </div>

      <div className="noidung-cay">
        <h4>{tenHienThi}</h4> 
        <p className="gia-tien">{giaHienThi}đ</p>
        
        <div className="do-am-display">
          💧 Độ ẩm lý tưởng: <span>{doAmHienThi}%</span>
        </div>

        <button className="nut-mua-nhanh" onClick={handleMuaNhanh}>
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}

export default TheCayCanh;