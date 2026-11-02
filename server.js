// Sử dụng thư viện Express để tạo web server nhanh chóng
const express = require('express');
const app = express();
const PORT = 3000;

// Cho phép server đọc dữ liệu gửi lên từ form HTML
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 1. Giao diện trang đăng nhập gửi thẳng cho trình duyệt
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="vi">
        <head>
            <meta charset="UTF-8">
            <title>Đăng Nhập Thử Nghiệm</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-slate-950 text-white h-screen flex items-center justify-center">
            <form action="/login" method="POST" class="bg-slate-900 p-8 rounded-2xl border border-slate-800 w-80 space-y-4">
                <h2 class="text-xl font-bold text-center mb-4">Đăng Nhập Hệ Thống</h2>
                <div>
                    <label class="block text-xs text-slate-400 mb-1">Tên tài khoản</label>
                    <input type="text" name="username" required class="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm">
                </div>
                <div>
                    <label class="block text-xs text-slate-400 mb-1">Mật khẩu</label>
                    <input type="password" name="password" required class="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm">
                </div>
                <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-500 py-2 rounded font-semibold text-sm">Gửi Thông Tin</button>
            </form>
        </body>
        </html>
    `);
});

// 2. Nhận dữ liệu khi người dùng bấm nút Đăng Nhập
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // IN RA MÀN HÌNH TERMINAL/CONSOLE CỦA MÁY CHỦ
    console.log("\n-----------------------------------------");
    console.log("🔥 CÓ NGƯỜI VỪA NHẬP THÔNG TIN:");
    console.log(`👤 Tên tài khoản: ${username}`);
    console.log(`🔑 Mật khẩu: ${password}`);
    console.log("-----------------------------------------\n");

    res.send(`
        <body style="background:#0f172a; color:#fff; text-align:center; padding-top:100px; font-family:sans-serif;">
            <h1 style="color:#34d399;">✅ Đã nhận được dữ liệu!</h1>
            <p>Tài khoản bạn nhập đã được ghi nhận vào màn hình máy chủ.</p>
            <a href="/" style="color:#60a5fa;">Quay lại trang đăng nhập</a>
        </body>
    `);
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Máy chủ đang chạy! Hãy mở trình duyệt và vào: http://localhost:${PORT}`);
});