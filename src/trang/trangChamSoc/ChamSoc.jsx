import React from "react";
import { useLichChamSoc } from "../../hooks/useLichChamSoc";
import "./ChamSoc.css";

const ChamSoc = () => {
  const {
    tenCayInput, setTenCayInput,
    timCayValenLich,
    caySelected,
    lichTuoi,
    loading,
    error
  } = useLichChamSoc();

  return (
    <div className="cham-soc-page khung-chinh">
      <div className="header-section">
        <h1>BÁC SĨ CÂY CẢNH</h1>
        <p>Nhập tên cây để lên lịch chăm sóc tự động 7 ngày</p>
      </div>

      {/* Phần nhập tên */}
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

      {/* Thông tin cây và lịch */}
      {caySelected && (
        <div className="result-section">
          <div className="cay-info-card">
            <img src={`/images/${caySelected.anh}`} alt={caySelected.tenCay} />
            <div className="info-text">
              <h2>{caySelected.tenCay}</h2>
              <p>💧 Độ ẩm lý tưởng: <b>{caySelected.doAmLyTuong}%</b></p>
              <p>⏱️ Tần suất tưới (nắng): <b>{caySelected.tanSuatTuoiNang} ngày/lần</b></p>
            </div>
          </div>

          <h3 className="lich-title">LỊCH TƯỚI CÂY 7 NGÀY TỚI</h3>
          <div className="lich-grid">
            {lichTuoi.map((ngay) => (
              <div key={ngay.ngay} className={`lich-item ${ngay.trangThai}`}>
                <p className="ngay-thang">{ngay.ngay}</p>
                <img src={ngay.icon} alt="weather" />
                <p className="nhiet-do">{ngay.nhietDoMax}°C</p>
                <div className="status-badge">{ngay.trangThai === 'mua' ? '🌧️' : (ngay.trangThai === 'tuoi' ? '💧' : '☀️')}</div>
                <p className="goi-y">{ngay.goiY}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChamSoc;