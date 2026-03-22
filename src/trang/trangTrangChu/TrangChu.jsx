import React from "react";
import { useWeather } from "../../hooks/useWeather"; // Import hook vừa tạo
import "./TrangChu.css";

function TrangChu() {
  // Gọi logic từ file riêng
  const thoiTiet = useWeather("Hanoi");

  return (
    <div className="khung-chinh">
      <section className="thoi-tiet-card">
        {/* KHỐI TRÁI */}
        <div className="thoi-tiet-left">
          <p className="location-text">Hà Nội hiện tại</p>
          <div className="temp-group">
            <span className="temp-number">{thoiTiet.nhietDo}°C</span>
            {thoiTiet.icon && (
              <img src={thoiTiet.icon} alt="weather" className="weather-icon" />
            )}
          </div>
        </div>

        {/* KHỐI GIỮA */}
        <div className="thoi-tiet-mid">
          <p>💧 Độ ẩm: {thoiTiet.doAm}%</p>
          <p>☁️ {thoiTiet.moTa}</p>
        </div>

        {/* KHỐI PHẢI */}
        <div className="thoi-tiet-right">
          <div className="ai-advice-box">
            <p>
              💡 <b>Gợi ý AI:</b> {thoiTiet.goiY}
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
