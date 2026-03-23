import { useState, useEffect } from "react";
import axios from "axios";
import { useWeather } from "./useWeather"; 

export const useLichChamSoc = () => {
  const [tenCayInput, setTenCayInput] = useState("");
  const [caySelected, setCaySelected] = useState(null);
  const [lichTuoi, setLichTuoi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Lấy dữ liệu thời tiết (đảm bảo useWeather trả về { duBao, loadingWeather })
  const { duBao, loading: loadingWeather } = useWeather("Hanoi");

  const timCayValenLich = async () => {
    // 1. Kiểm tra đầu vào
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
      // 2. Gọi API Backend (Sử dụng encodeURIComponent để xử lý ký tự đặc biệt/tiếng Việt)
      const res = await axios.get(
        `http://127.0.0.1:5000/api/search-cay?ten=${encodeURIComponent(searchName)}`
      );
      
      const dataCay = res.data;
      setCaySelected(dataCay);

      // 3. Lên lịch dựa trên dữ liệu thời tiết thực tế
      if (duBao && duBao.length > 0) {
        const tanSuatChuan = Number(dataCay.tanSuatTuoiNang) || 3;
        
        const newLich = duBao.map((ngay, index) => {
          let trangThai = "nang"; 
          let goiY = "Chưa đến lịch";

          // KIỂM TRA MƯA: Dựa trên mã 'coMua' hoặc mô tả chữ
          const troiMua = ngay.coMua === 1 || 
                          ngay.moTa.toLowerCase().includes("mưa") || 
                          ngay.moTa.toLowerCase().includes("dông");

          if (troiMua) {
            trangThai = "mua";
            goiY = "Trời mưa: Nghỉ tưới!";
          } 
          // KIỂM TRA LỊCH TƯỚI: Ưu tiên ngày đầu tiên (index 0) và theo chu kỳ
          else if (index % tanSuatChuan === 0) {
            trangThai = "tuoi";
            goiY = "Đến lịch: Cần tưới!";
          }

          return { ...ngay, trangThai, goiY };
        });

        setLichTuoi(newLich);
      } else {
        setError("Không lấy được dữ liệu thời tiết để lên lịch.");
      }

    } catch (err) {
      console.error("Lỗi Hook:", err);
      if (err.response?.status === 404) {
        setError("Không tìm thấy cây này trong hệ thống.");
      } else {
        setError("Lỗi kết nối Server. Hãy chắc chắn bạn đã chạy 'node server.cjs'.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    tenCayInput, 
    setTenCayInput,
    timCayValenLich,
    caySelected,
    lichTuoi,
    loading: loading || loadingWeather,
    error
  };
};