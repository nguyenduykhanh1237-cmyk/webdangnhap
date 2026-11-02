const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mảng lưu các tài khoản đã đăng ký trên máy chủ (Ban đầu hoàn toàn trống = 0 tài khoản)
const users = [];

// Giao diện Trang Đăng Nhập & Đăng Ký
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Đăng Nhập & Đăng Ký</title>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-slate-950 text-white min-h-screen flex items-center justify-center p-4">
        <div class="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-md shadow-2xl">
            <div class="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl mb-6 border border-slate-800">
                <button onclick="showTab('login')" id="btnLogin" class="py-2.5 rounded-lg bg-indigo-600 font-bold text-sm">Đăng Nhập</button>
                <button onclick="showTab('register')" id="btnReg" class="py-2.5 rounded-lg text-slate-400 font-bold text-sm">Đăng Ký</button>
            </div>

            <!-- Form Đăng Nhập -->
            <form id="formLogin" action="/login" method="POST" class="space-y-4">
                <h2 class="text-xl font-bold text-center">Đăng Nhập Hệ Thống</h2>
                <p class="text-xs text-slate-400 text-center">Phải đăng ký tài khoản trước mới có thể đăng nhập</p>
                <input type="text" name="username" required placeholder="Tên tài khoản" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm">
                <input type="password" name="password" required placeholder="Mật khẩu" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm">
                <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-semibold text-sm">Đăng Nhập</button>
            </form>

            <!-- Form Đăng Ký -->
            <form id="formReg" action="/register" method="POST" class="space-y-4 hidden">
                <h2 class="text-xl font-bold text-center">Đăng Ký Tài Khoản</h2>
                <p class="text-xs text-slate-400 text-center">Tạo tài khoản mới để truy cập hệ thống</p>
                <input type="text" name="username" required placeholder="Tên tài khoản muốn tạo" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm">
                <input type="password" name="password" required placeholder="Mật khẩu" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm">
                <input type="password" name="confirmPassword" required placeholder="Xác nhận lại mật khẩu" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm">
                <button type="submit" class="w-full bg-purple-600 hover:bg-purple-500 py-3 rounded-xl font-semibold text-sm">Hoàn Tất Đăng Ký</button>
            </form>
        </div>
        <script>
            function showTab(tab) {
                const isLogin = tab === 'login';
                document.getElementById('formLogin').classList.toggle('hidden', !isLogin);
                document.getElementById('formReg').classList.toggle('hidden', isLogin);
                document.getElementById('btnLogin').className = isLogin ? 'py-2.5 rounded-lg bg-indigo-600 font-bold text-sm' : 'py-2.5 rounded-lg text-slate-400 font-bold text-sm';
                document.getElementById('btnReg').className = !isLogin ? 'py-2.5 rounded-lg bg-purple-600 font-bold text-sm' : 'py-2.5 rounded-lg text-slate-400 font-bold text-sm';
            }
        </script>
    </body>
    </html>
    `);
});

// 1. Xử lý Đăng Ký Tài Khoản
app.post('/register', (req, res) => {
    const { username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.send('<body style="background:#020617;color:#f87171;text-align:center;padding-top:80px;font-family:sans-serif;"><h2>❌ Mật khẩu xác nhận không khớp!</h2><a href="/" style="color:#818cf8;">Quay lại</a></body>');
    }

    const existingUser = users.find(u => u.username.toLowerCase() === username.trim().toLowerCase());
    if (existingUser) {
        return res.send('<body style="background:#020617;color:#f87171;text-align:center;padding-top:80px;font-family:sans-serif;"><h2>❌ Tài khoản này đã tồn tại!</h2><a href="/" style="color:#818cf8;">Quay lại</a></body>');
    }

    users.push({ username: username.trim(), password });

    console.log("=========================================");
    console.log("✅ [ĐĂNG KÝ MỚI THÀNH CÔNG]");
    console.log("👤 Tên tài khoản:", username);
    console.log("🔑 Mật khẩu:", password);
    console.log("📊 Tổng số tài khoản hiện có:", users.length);
    console.log("=========================================");

    res.send('<body style="background:#020617;color:#34d399;text-align:center;padding-top:80px;font-family:sans-serif;"><h2>✅ Đăng ký thành công! Bây giờ bạn có thể đăng nhập.</h2><a href="/" style="color:#818cf8;font-size:18px;">👉 Bấm vào đây để Đăng Nhập</a></body>');
});

// 2. Xử lý Đăng Nhập (Bắt buộc phải đăng ký trước)
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const foundUser = users.find(u => u.username.toLowerCase() === username.trim().toLowerCase());

    // Nếu chưa đăng ký
    if (!foundUser) {
        console.log("-----------------------------------------");
        console.log("❌ [ĐĂNG NHẬP THẤT BẠI - CHƯA ĐĂNG KÝ]");
        console.log("👤 Tài khoản vừa nhập:", username);
        console.log("🔑 Mật khẩu vừa nhập:", password);
        console.log("-----------------------------------------");

        return res.send('<body style="background:#020617;color:#f87171;text-align:center;padding-top:80px;font-family:sans-serif;"><h2>❌ Tài khoản này chưa được đăng ký!</h2><p style="color:#94a3b8;">Vui lòng tạo tài khoản ở mục Đăng Ký trước khi đăng nhập.</p><a href="/" style="color:#818cf8;">Quay lại để Đăng Ký</a></body>');
    }

    // Nếu sai mật khẩu
    if (foundUser.password !== password) {
        console.log("-----------------------------------------");
        console.log("⚠️ [ĐĂNG NHẬP THẤT BẠI - SAI MẬT KHẨU]");
        console.log("👤 Tài khoản:", username);
        console.log("🔑 Mật khẩu nhập sai:", password);
        console.log("-----------------------------------------");

        return res.send('<body style="background:#020617;color:#f87171;text-align:center;padding-top:80px;font-family:sans-serif;"><h2>❌ Mật khẩu không chính xác!</h2><a href="/" style="color:#818cf8;">Thử lại</a></body>');
    }

    // Đăng nhập thành công
    console.log("=========================================");
    console.log("🔥 [ĐĂNG NHẬP THÀNH CÔNG]");
    console.log("👤 Tài khoản:", username);
    console.log("🔑 Mật khẩu:", password);
    console.log("=========================================");

    res.send(`<body style="background:#020617;color:#34d399;text-align:center;padding-top:80px;font-family:sans-serif;"><h1>🎉 Đăng nhập thành công!</h1><p style="color:#e2e8f0;">Xin chào <b>${foundUser.username}</b>, chào mừng bạn vào hệ thống!</p><a href="/" style="color:#818cf8;">Đăng xuất</a></body>`);
});

app.listen(PORT, () => console.log("🚀 Server đang chạy tại cổng " + PORT));
