import { useState, useEffect } from "react";

export const useCart = () => {
  const [gioHangItems, setGioHangItems] = useState(() => {
    try {
      const saved = localStorage.getItem("greenThumbCart");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Lỗi đọc LocalStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("greenThumbCart", JSON.stringify(gioHangItems));
  }, [gioHangItems]);

  const handleThemGioHang = (cay) => {
    if (!cay) return;
    setGioHangItems((prevItems) => {
      const itemTonTai = prevItems.find((item) => item.id === cay.id);
      if (itemTonTai) {
        return prevItems.map((item) =>
          item.id === cay.id ? { ...item, soLuong: item.soLuong + 1 } : item
        );
      }
      return [...prevItems, { ...cay, soLuong: 1 }];
    });
  };

  const thayDoiSoLuong = (id, delta) => {
    setGioHangItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, soLuong: Math.max(1, item.soLuong + delta) } : item
      )
    );
  };

  const xoaSanPham = (id) => {
    setGioHangItems((prev) => prev.filter((item) => item.id !== id));
  };

  // THÊM: Hàm xóa sạch giỏ hàng sau khi thanh toán thành công
  const clearCart = () => {
    setGioHangItems([]);
    localStorage.removeItem("greenThumbCart");
  };

  // Tối ưu tính toán (Thêm Number cho an toàn)
  const tongTien = gioHangItems.reduce(
    (acc, item) => acc + (Number(item.gia) || 0) * (Number(item.soLuong) || 0), 
    0
  );
  
  const tongSoLuongBadge = gioHangItems.reduce(
    (acc, item) => acc + (Number(item.soLuong) || 0), 
    0
  );

  return {
    gioHangItems,
    handleThemGioHang,
    thayDoiSoLuong,
    xoaSanPham,
    clearCart, // Trả thêm hàm này ra ngoài
    tongTien,
    tongSoLuongBadge,
  };
};