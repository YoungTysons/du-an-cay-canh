import { useState, useEffect } from "react";

export const useClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer); // Xóa bộ đếm khi đóng trang
  }, []);

  // Định dạng ngày: Thứ Hai, 23/03/2026
  const thu = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  const ngayThang = `${thu[time.getDay()]}, ${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;

  // Định dạng giờ: 14:30:05
  const gioPhutGiay = time.toLocaleTimeString("vi-VN");

  return { ngayThang, gioPhutGiay };
};
