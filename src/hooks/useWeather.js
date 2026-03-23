import { useState, useEffect } from "react";
import axios from "axios";

export const useWeather = (city = "Hanoi") => {
  const [thoiTiet, setThoiTiet] = useState({
    hienTai: {
      nhietDo: "--",
      doAm: "--",
      moTa: "Đang tải...",
      icon: "",
    },
    duBao: [], // Nơi chứa danh sách 7 ngày
    loading: true,
    error: null
  });

  useEffect(() => {
    const layThoiTiet = async () => {
      const API_KEY = "da651c296d8342aab7c70904262103";
      // Đổi current.json thành forecast.json và thêm &days=7
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no&lang=vi`;

      try {
        const res = await axios.get(url);
        const data = res.data;

        setThoiTiet({
          hienTai: {
            nhietDo: Math.round(data.current.temp_c),
            doAm: data.current.humidity,
            moTa: data.current.condition.text,
            icon: data.current.condition.icon,
          },
          // Map lại dữ liệu dự báo để dễ dùng
          duBao: data.forecast.forecastday.map(item => ({
            ngay: item.date,
            nhietDoMax: Math.round(item.day.maxtemp_c),
            nhietDoMin: Math.round(item.day.mintemp_c),
            moTa: item.day.condition.text,
            icon: item.day.condition.icon,
            coMua: item.day.daily_will_it_rain // 1 là có mưa, 0 là không
          })),
          loading: false,
          error: null
        });
      } catch (e) {
        console.error("Lỗi lấy thời tiết:", e);
        setThoiTiet(prev => ({ ...prev, loading: false, error: "Lỗi tải dữ liệu" }));
      }
    };

    layThoiTiet();
  }, [city]);

  return thoiTiet;
};