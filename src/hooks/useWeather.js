import { useState, useEffect } from "react";
import axios from "axios";

export const useWeather = (lat = 21.0285, lon = 105.8542) => {
  const [thoiTiet, setThoiTiet] = useState({
    hienTai: { nhietDo: "--", doAm: "--", moTa: "Đang tải...", icon: "", doAmDat: "--" },
    duBao: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const layThoiTiet = async () => {
      // 1. CẬP NHẬT URL: Thêm relative_humidity_2m_max vào phần daily
      const url = `https://api.open-meteo.com/v1/forecast?latitude=21.0285&longitude=105.8542&current=temperature_2m,relative_humidity_2m,weather_code,soil_moisture_0_to_7cm&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,relative_humidity_2m_max&timezone=auto`;

      try {
        const res = await axios.get(url);
        const data = res.data;

        const dichThoiTiet = (code) => {
          if (code === 0) return { txt: "Trời nắng", icon: "☀️" };
          if (code <= 3) return { txt: "Mây rải rác", icon: "🌤️" };
          if (code >= 45 && code <= 48) return { txt: "Có sương mù", icon: "🌫️" };
          if (code >= 51 && code <= 67) return { txt: "Mưa phùn", icon: "🌧️" };
          if (code >= 71 && code <= 82) return { txt: "Có tuyết/Mưa đá", icon: "❄️" };
          if (code >= 95) return { txt: "Dông sét", icon: "⛈️" };
          return { txt: "Có mưa", icon: "🌧️" };
        };

        const currentInfo = dichThoiTiet(data.current.weather_code);

        setThoiTiet({
          hienTai: {
            nhietDo: Math.round(data.current.temperature_2m),
            doAm: data.current.relative_humidity_2m,
            doAmDat: Math.round(data.current.soil_moisture_0_to_7cm * 100),
            moTa: currentInfo.txt,
            icon: currentInfo.icon,
          },
          // 2. CẬP NHẬT MẢNG DỰ BÁO: Lấy độ ẩm từng ngày
          duBao: data.daily.time.map((date, i) => ({
            ngay: date,
            nhietDoMax: Math.round(data.daily.temperature_2m_max[i]),
            nhietDoMin: Math.round(data.daily.temperature_2m_min[i]),
            // Lấy độ ẩm cao nhất trong ngày dự báo
            doAmDuBao: data.daily.relative_humidity_2m_max[i], 
            moTa: dichThoiTiet(data.daily.weather_code[i]).txt,
            icon: dichThoiTiet(data.daily.weather_code[i]).icon,
            coMua: data.daily.precipitation_probability_max[i] > 40 ? 1 : 0
          })),
          loading: false,
          error: null
        });
      } catch (e) {
        console.error("Lỗi Open-Meteo:", e);
        setThoiTiet(prev => ({ ...prev, loading: false, error: "Lỗi kết nối vệ tinh" }));
      }
    };

    layThoiTiet();
  }, [lat, lon]);

  return thoiTiet;
};