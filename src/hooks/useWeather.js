import { useState, useEffect } from "react";
import axios from "axios";

export const useWeather = (city = "Hanoi") => {
  const [thoiTiet, setThoiTiet] = useState({
    nhietDo: "--",
    doAm: "--",
    moTa: "Đang tải...",
    icon: "",
    goiY: "Đang phân tích...",
    loading: true,
  });

  useEffect(() => {
    const layThoiTiet = async () => {
      const API_KEY = "da651c296d8342aab7c70904262103";
      try {
        const res = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&lang=vi`,
        );
        const data = res.data.current;

        setThoiTiet({
          nhietDo: Math.round(data.temp_c),
          doAm: data.humidity,
          moTa: data.condition.text,
          icon: data.condition.icon,
          goiY:
            data.humidity > 70
              ? "Độ ẩm cao, hạn chế tưới nước và nhớ bật quạt thông gió cho cây nhé!"
              : "Thời tiết đang rất đẹp, cây sẽ phát triển tốt đấy!",
          loading: false,
        });
      } catch (e) {
        console.error("Lỗi lấy thời tiết:", e);
        setThoiTiet((prev) => ({
          ...prev,
          loading: false,
          moTa: "Lỗi tải dữ liệu",
        }));
      }
    };

    layThoiTiet();
  }, [city]);

  return thoiTiet;
};
