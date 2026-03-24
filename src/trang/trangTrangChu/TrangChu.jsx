import React from "react";
import { useWeather } from "../../hooks/useWeather";
import "./TrangChu.css";

function TrangChu() {
  const thoiTietFull = useWeather("Hanoi");
  
  const { hienTai, loading, error } = thoiTietFull;

  if (loading) return <div className="khung-chinh"><p>Đang tải thời tiết...</p></div>;
  if (error) return <div className="khung-chinh"><p>Lỗi: {error}</p></div>;

  return (
    <div className="khung-chinh">
      <section className="thoi-tiet-card">
        {/* KHỐI TRÁI */}
        <div className="thoi-tiet-left">
          <p className="location-text">Hà Nội hiện tại</p>
          <div className="temp-group">
            <span className="temp-number">{hienTai.nhietDo}°C</span>
            
            {/* SỬA TẠI ĐÂY: Thay img bằng span để hiện Emoji ☀️, ☁️... */}
            {hienTai.icon && (
              <span className="main-weather-icon">{hienTai.icon}</span>
            )}
          </div>
        </div>

        {/* KHỐI GIỮA */}
        <div className="thoi-tiet-mid">
          <p>💧 Độ ẩm khí: {hienTai.doAm}%</p>
          {/* Nếu bạn đã thêm độ ẩm đất vào Hook, hãy hiện nó ở đây */}
    
          <p>{hienTai.moTa}</p>
        </div>

        {/* KHỐI PHẢI */}
        <div className="thoi-tiet-right">
          <div className="ai-advice-box">
            <p>
              💡 <b>Gợi ý AI:</b> {
                hienTai.doAm > 70 
                ? "Độ ẩm cao, hạn chế tưới nước cho cây nhé!" 
                : "Thời tiết đẹp, thích hợp để chăm sóc cây."
              }
            </p>
          </div>
        </div>
      </section>

      <div className="welcome-banner">
        <h1>🌿 Chào mừng đến với GreenThumb</h1>
        <p>Mang thiên nhiên vào ngôi nhà của bạn.</p>
      </div>
    </div>
  );
}

export default TrangChu;