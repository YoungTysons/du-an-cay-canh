import { useState, useEffect } from "react";

export const useProductFilter = () => {
  const [allProducts, setAllProducts] = useState([]); 
  const [tabHienTai, setTabHienTai] = useState("tat-ca");
  const [tuKhoa, setTuKhoa] = useState("");

  useEffect(() => {
    // Gọi API từ Server Node.js
    fetch("http://127.0.0.1:5000/api/cay-canh")
      .then((res) => res.json())
      .then((data) => {
        console.log("Dữ liệu nhận được từ SQL:", data);
        setAllProducts(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Lỗi kết nối API:", err));
  }, []);

  const danhSachTabs = [
    { id: "tat-ca", label: "Tất cả" },
    { id: "trong-nha", label: "Trong nhà" }, 
    { id: "sen-da", label: "Sen đá" },
    { id: "ngoai-troi", label: "Ngoài trời" },
  ];

  // Logic lọc linh hoạt chấp nhận mọi kiểu tên cột
  const cayHienThi = allProducts.filter((cay) => {
    const tenThucTe = String(cay.tenCay || cay.ten || cay.Ten || "").trim();
    const loaiThucTe = String(cay.loai || cay.Loai || "").trim();

    const matchesTab = tabHienTai === "tat-ca" || loaiThucTe === tabHienTai;
    const matchesSearch = tenThucTe.toLowerCase().includes(tuKhoa.toLowerCase().trim());

    return matchesTab && matchesSearch;
  });

  return { tabHienTai, setTabHienTai, tuKhoa, setTuKhoa, cayHienThi, danhSachTabs };
};