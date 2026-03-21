import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TrangChu.css';

function TrangChu() {
  const [thoiTiet, setThoiTiet] = useState({
    nhietDo: '--',
    doAm: '--',
    moTa: 'Đang tải...',
    icon: '',
    goiY: 'Đang phân tích...'
  });

  useEffect(() => {
    const layThoiTiet = async () => {
      const API_KEY = "da651c296d8342aab7c70904262103"; // Thay bằng API Key thật của bạn
      try {
        const res = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Hanoi&lang=vi`);
        const data = res.data.current;
        setThoiTiet({
          nhietDo: Math.round(data.temp_c),
          doAm: data.humidity,
          moTa: data.condition.text,
          icon: data.condition.icon,
          // Gợi ý AI dựa trên độ ẩm thực tế
          goiY: data.humidity > 70 
            ? "Độ ẩm cao, hạn chế tưới nước và nhớ bật quạt thông gió cho cây nhé!"
            : "Thời tiết đang rất đẹp, cây sẽ phát triển tốt đấy!"
        });
      } catch (e) { console.error(e); }
    };
    layThoiTiet();
  }, []);

  return (
    <div className="khung-chinh">
      <section className="thoi-tiet-card">
        {/* KHỐI TRÁI: ĐỊA ĐIỂM & NHIỆT ĐỘ */}
        <div className="thoi-tiet-left">
          <p className="location-text">Hà Nội hiện tại</p>
          <div className="temp-group">
            <span className="temp-number">{thoiTiet.nhietDo}°C</span>
            {thoiTiet.icon && <img src={thoiTiet.icon} alt="weather" className="weather-icon" />}
          </div>
        </div>

        {/* KHỐI GIỮA: CHI TIẾT (💧 và ☁️) - CÓ VẠCH NGĂN */}
        <div className="thoi-tiet-mid">
          <p>💧 Độ ẩm: {thoiTiet.doAm}%</p>
          <p>☁️ {thoiTiet.moTa}</p>
        </div>

        {/* KHỐI PHẢI: Ô GỢI Ý AI NHỎ GỌN */}
        <div className="thoi-tiet-right">
          <div className="ai-advice-box">
            <p>💡 <b>Gợi ý AI:</b> {thoiTiet.goiY}</p>
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