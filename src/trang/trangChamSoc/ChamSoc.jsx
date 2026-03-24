import React from "react";
import { useLichChamSoc } from "../../hooks/useLichChamSoc";
import "./Chamsoc.css"

const ChamSoc = () => {
  const {
    tenCayInput, setTenCayInput,
    timCayValenLich,
    caySelected,
    lichTuoi,
    hienTai, 
    loading,
    error
  } = useLichChamSoc();

  return (
    /* 1. Lớp bao phủ toàn trang (Nền gradient) */
    <div className="cham-soc-page"> 
      
      {/* 2. Lớp căn giữa nội dung (Khung chính) */}
      <div className="khung-chinh">
        
        <div className="header-section">
          <h1>BÁC SĨ CÂY CẢNH</h1>
          <p>Nhập tên cây để lên lịch chăm sóc tự động 7 ngày</p>
        </div>

        <div className="search-cay-section">
          <input 
            type="text" 
            value={tenCayInput}
            onChange={(e) => setTenCayInput(e.target.value)}
            placeholder="Ví dụ: Cây Kim Tiền, Lưỡi Hổ..."
          />
          <button onClick={timCayValenLich} disabled={loading}>
            {loading ? "Đang xử lý..." : "Lên lịch ngay"}
          </button>
        </div>

        {error && <p className="error-msg">{error}</p>}

        {caySelected && (
          <div className="result-section">
            <div className="cay-info-card">
              <img src={`/images/${caySelected.anh}`} alt={caySelected.tenCay} />
              <div className="info-text">
                <h2>{caySelected.tenCay}</h2>
                <p><span>💧 Độ ẩm lý tưởng:</span> <b>{caySelected.doAmLyTuong}%</b></p>
                <p><span>☁️ Độ ẩm khí:</span> <b style={{color: '#3b82f6'}}>{hienTai?.doAm}%</b></p>
                <p><span>🪴 Độ ẩm đất:</span> <b style={{color: '#10b981'}}>{hienTai?.doAmDat}%</b></p>
                <p><span>⏱️ Tần suất tưới:</span> <b>{caySelected.tanSuatTuoiNang} ngày/lần</b></p>
                <p className="note-ai"><i>* Dữ liệu được cập nhật thực tế từ vệ tinh.</i></p>
              </div>
            </div>

            <h3 className="lich-title">LỊCH TƯỚI CÂY 7 NGÀY TỚI</h3>
            <div className="lich-grid">
              {lichTuoi.map((ngay) => (
                <div key={ngay.ngay} className={`lich-item ${ngay.trangThai}`}>
                  <p className="ngay-thang">{ngay.ngay}</p>
                  <span className="weather-icon-display">{ngay.icon}</span>
                  
                  <div className="stats-mini">
                    <p className="nhiet-do">🌡️ {ngay.nhietDoMax}°C</p>
                    <p className="do-am-lich">💧 {ngay.doAmDuBao}%</p>
                  </div>

                  <div className="status-badge">
                     {ngay.trangThai === 'mua' ? '🌧️' : (ngay.trangThai === 'tuoi' ? '💧' : '☀️')}
                  </div>
                  <p className="goi-y">{ngay.goiY}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChamSoc;