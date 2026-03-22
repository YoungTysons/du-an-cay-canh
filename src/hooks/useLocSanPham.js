import { useState, useMemo } from "react";
import { danhSachCayCanh } from "../data/DanhSachCay";

export const useProductFilter = () => {
  const [tabHienTai, setTabHienTai] = useState("tat-ca");
  const [tuKhoa, setTuKhoa] = useState("");

  // Dùng useMemo để tối ưu hiệu năng: Chỉ tính toán lại khi tab hoặc từ khóa thay đổi
  const cayHienThi = useMemo(() => {
    return danhSachCayCanh.filter(
      (cay) =>
        (tabHienTai === "tat-ca" || cay.loai === tabHienTai) &&
        cay.ten.toLowerCase().includes(tuKhoa.toLowerCase())
    );
  }, [tabHienTai, tuKhoa]);

  const danhSachTabs = [
    { id: "tat-ca", label: "Tất cả" },
    { id: "trong-nha", label: "Trong nhà" },
    { id: "sen-da", label: "Sen đá" },
    { id: "ngoai-troi", label: "Ngoài trời" },
  ];

  return {
    tabHienTai,
    setTabHienTai,
    tuKhoa,
    setTuKhoa,
    cayHienThi,
    danhSachTabs,
  };
};