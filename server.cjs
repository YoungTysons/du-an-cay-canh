const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();

// 1. Cấu hình Middleware
app.use(cors({
  origin: '*', // Cho phép React truy cập không bị chặn CORS
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// 2. Cấu hình kết nối SQL Server
const dbConfig = {
  user: "saa",
  password: "1234",
  server: "localhost",
  database: "db_green_thumb",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

async function startServer() {
  try {
    // Kết nối Database
    const pool = await sql.connect(dbConfig);
    console.log("✅ Đã kết nối SQL Server thành công!");

    // --- API 1: Lấy danh sách sản phẩm (Trang Sản phẩm) ---
    app.get("/api/cay-canh", async (req, res) => {
      try {
        const result = await pool.request().query("SELECT * FROM SanPham");
        res.json(result.recordset);
      } catch (err) {
        console.error("Lỗi lấy danh sách:", err);
        res.status(500).send("Lỗi Database");
      }
    });

    // --- API 2: Tìm kiếm cây thông minh (Trang Chăm sóc) ---
    // Fix lỗi: Tiếng Việt có dấu, không dấu, viết hoa, viết thường, khoảng trắng
    // Đảm bảo có dấu / ở đầu: /api/search-cay
app.get("/api/search-cay", async (req, res) => {
  const { ten } = req.query;
  console.log("🔍 Đang tìm kiếm cây:", ten); // Dòng này để bạn nhìn ở Terminal xem nó có chạy vào đây không
  
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('tenParam', sql.NVarChar, `%${ten}%`)
      .query(`
        SELECT TOP 1 * FROM SanPham 
        WHERE tenCay LIKE @tenParam COLLATE Vietnamese_CI_AI
      `);
    
    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).json({ message: "Không tìm thấy" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});
    // 3. Mở cổng Server
    const PORT = 5000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log("-----------------------------------------");
      console.log(`🚀 BACKEND ĐANG CHẠY TẠI: http://127.0.0.1:${PORT}`);
      console.log(`👉 Link test danh sách: http://127.0.0.1:5000/api/cay-canh`);
      console.log(`👉 Link test tìm kiếm: http://127.0.0.1:5000/api/search-cay?ten=luoi`);
      console.log("-----------------------------------------");
    });

  } catch (err) {
    console.error("❌ Lỗi khởi động Server: ", err);
  }
}

startServer();