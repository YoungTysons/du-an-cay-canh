import { useState, useEffect } from "react";

export const useCart = () => {
  // 1. Khởi tạo giỏ hàng từ LocalStorage (giữ lại các món đã chọn trước đó)
  const [gioHangItems, setGioHangItems] = useState(() => {
    try {
      const saved = localStorage.getItem("greenThumbCart");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Lỗi đọc LocalStorage:", error);
      return [];
    }
  });

  // 2. Tự động lưu vào LocalStorage mỗi khi giỏ hàng thay đổi
  useEffect(() => {
    localStorage.setItem("greenThumbCart", JSON.stringify(gioHangItems));
  }, [gioHangItems]);

  // 3. Hàm thêm sản phẩm vào giỏ
  const handleThemGioHang = (cay) => {
    if (!cay) return;

    // Lấy ID linh hoạt (chấp cả id viết thường hoặc ID viết hoa từ SQL)
    const idCayMoi = cay.id || cay.ID;

    setGioHangItems((prevItems) => {
      // Kiểm tra xem sản phẩm đã có trong giỏ chưa
      const itemTonTai = prevItems.find((item) => (item.id || item.ID) === idCayMoi);

      if (itemTonTai) {
        // Nếu đã có, tăng số lượng lên 1
        return prevItems.map((item) =>
          (item.id || item.ID) === idCayMoi 
            ? { ...item, soLuong: (Number(item.soLuong) || 1) + 1 } 
            : item
        );
      }
      
      // Nếu chưa có, thêm mới và đặt soLuong = 1
      // Lưu ý: Copy toàn bộ thuộc tính của 'cay' để có tên, giá, ảnh...
      return [...prevItems, { ...cay, soLuong: 1 }];
    });
  };

  // 4. Hàm thay đổi số lượng (Tăng/Giảm)
  const thayDoiSoLuong = (id, delta) => {
    setGioHangItems((prev) =>
      prev.map((item) =>
        (item.id || item.ID) === id 
          ? { ...item, soLuong: Math.max(1, (Number(item.soLuong) || 1) + delta) } 
          : item
      )
    );
  };

  // 5. Hàm xóa 1 sản phẩm khỏi giỏ
  const xoaSanPham = (id) => {
    setGioHangItems((prev) => prev.filter((item) => (item.id || item.ID) !== id));
  };

  // 6. Hàm xóa sạch giỏ (Dùng sau khi thanh toán)
  const clearCart = () => {
    setGioHangItems([]);
    localStorage.removeItem("greenThumbCart");
  };

  // 7. Tính tổng tiền (Dùng Number() để ép kiểu dữ liệu từ SQL)
  const tongTien = gioHangItems.reduce(
    (acc, item) => {
      const gia = Number(item.gia || item.Gia || 0);
      const sl = Number(item.soLuong || 0);
      return acc + (gia * sl);
    }, 
    0
  );
  
  // 8. Tính tổng số lượng hiển thị trên icon Giỏ hàng (Badge)
  const tongSoLuongBadge = gioHangItems.reduce(
    (acc, item) => acc + (Number(item.soLuong) || 0), 
    0
  );

  return {
    gioHangItems,
    handleThemGioHang,
    thayDoiSoLuong,
    xoaSanPham,
    clearCart,
    tongTien,
    tongSoLuongBadge,
  };
};