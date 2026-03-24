import { useState } from "react";
import axios from "axios";
import { useWeather } from "./useWeather"; 

export const useLichChamSoc = () => {
  const [tenCayInput, setTenCayInput] = useState("");
  const [caySelected, setCaySelected] = useState(null);
  const [lichTuoi, setLichTuoi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Lấy dữ liệu thời tiết (Tọa độ HN: 21.0285, 105.8542)
  const { hienTai, duBao, loading: loadingWeather } = useWeather(21.0285, 105.8542);

  const timCayValenLich = async () => {
    const searchName = tenCayInput.trim();
    if (!searchName) {
      setError("Vui lòng nhập tên cây cần tìm.");
      return;
    }

    setLoading(true);
    setError(null);
    setCaySelected(null);
    setLichTuoi([]);

    try {
      // 1. Gọi API lấy thông tin đặc tính cây từ Database
      const res = await axios.get(
        `http://127.0.0.1:5000/api/search-cay?ten=${encodeURIComponent(searchName)}`
      );
      
      const dataCay = res.data;
      setCaySelected(dataCay);

      // 2. Lên lịch dựa trên logic AI kết hợp thời tiết
      if (duBao && duBao.length > 0) {
        const tanSuatChuan = Number(dataCay.tanSuatTuoiNang) || 3;
        
        const newLich = duBao.map((ngay, index) => {
          let trangThai = "nang"; 
          let goiY = "Chưa đến lịch";
          let luongNuoc = 0; // Đơn vị %

          const nhietDo = ngay.nhietDoMax;
          const doAmKhi = ngay.doAmDuBao; // Độ ẩm khí dự báo ngày đó
          const troiMua = ngay.coMua === 1 || 
                          ngay.moTa.toLowerCase().includes("mưa") || 
                          ngay.moTa.toLowerCase().includes("dông");

          // --- BẮT ĐẦU LOGIC AI THÔNG MINH ---

          // Kiểm tra nếu hôm đó đúng chu kỳ tưới (3 ngày/lần, 2 ngày/lần...)
          const denLichDinhKy = index % tanSuatChuan === 0;

          if (denLichDinhKy) {
            // Trường hợp 1: Trời mưa
            if (troiMua) {
              trangThai = "mua";
              luongNuoc = 0;
              goiY = "Trời mưa: Nghỉ tưới! (0%)";
            } 
            // Trường hợp 2: Độ ẩm không khí quá cao (> 85%)
            else if (doAmKhi > 85) {
              trangThai = "tuoi";
              luongNuoc = 30;
              goiY = `Ẩm cao (${doAmKhi}%): Tưới nhẹ (30%) tránh úng rễ.`;
            }
            // Trường hợp 3: Nhiệt độ quá cao (> 35°C)
            else if (nhietDo > 35) {
              trangThai = "tuoi";
              luongNuoc = 150;
              goiY = `Nắng gắt (${nhietDo}°C): Tưới tăng cường (150%)!`;
            }
            // Trường hợp 4: Bình thường
            else {
              trangThai = "tuoi";
              luongNuoc = 100;
              goiY = "Đến lịch: Cần tưới (100%)";
            }
          } 
          // Nếu không phải ngày tưới nhưng cực nóng (> 38°C)
          else if (nhietDo > 38) {
            trangThai = "tuoi"; // Hiện màu xanh để nhắc nhở
            luongNuoc = 20; // Chỉ tưới rất ít/phun sương
            goiY = "Cực nóng: Phun sương làm mát lá!";
          }
          else {
            trangThai = "nang";
            goiY = "Thời tiết ổn: Chưa đến lịch";
            luongNuoc = 0;
          }

          return { ...ngay, trangThai, goiY, luongNuoc };
        });

        setLichTuoi(newLich);
      } else {
        setError("Không lấy được dữ liệu thời tiết.");
      }

    } catch (err) {
      console.error("Lỗi Hook:", err);
      if (err.response?.status === 404) {
        setError("Không tìm thấy cây này trong hệ thống.");
      } else {
        setError("Lỗi kết nối Server. Kiểm tra 'node server.cjs'.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    tenCayInput, setTenCayInput,
    timCayValenLich,
    caySelected,
    lichTuoi,
    hienTai,
    loading: loading || loadingWeather,
    error
  };
};