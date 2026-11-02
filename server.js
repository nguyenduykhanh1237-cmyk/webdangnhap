const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Kho lưu trữ tài khoản tạm thời
let users = [];

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="vi">
        <head>
            <meta charset="UTF-8">
            <title>Cổng Xác Thực Đăng Nhập</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
                @keyframes float {
                    0%, 100% { transform: translateY(0px) scale(1); }
                    50% { transform: translateY(-20px) scale(1.05); }
                }
                .animate-blob {
                    animation: float 8s ease-in-out infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .glass-card {
                    background: rgba(15, 23, 42, 0.75);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
            </style>
        </head>
        <body class="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            
            <!-- Hiệu ứng các đốm sáng nền chuyển động -->
            <div class="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-blob"></div>
            <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

            <!-- Khung giao diện chính -->
            <div class="glass-card p-8 rounded-3xl w-full max-w-md shadow-2xl relative z-10 space-y-6">
                
                <!-- Tiêu đề -->
                <div class="text-center space-y-1">
                    <h2 class="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Hệ Thống Thành Viên</h2>
                    <p class="text-xs text-slate-400">Vui lòng đăng nhập hoặc tạo tài khoản mới để tiếp tục</p>
                </div>

                <!-- Thanh chuyển đổi Tab (Đăng Nhập / Đăng Ký) -->
                <div class="grid grid-cols-2 gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
                    <button onclick="switchTab('login')" id="btn-login" class="py-2 text-xs font-semibold rounded-lg transition-all duration-300 bg-indigo-600 text-white shadow-lg">Đăng Nhập</button>
                    <button onclick="switchTab('register')" id="btn-register" class="py-2 text-xs font-semibold rounded-lg transition-all duration-300 text-slate-400 hover:text-white">Tạo Tài Khoản</button>
                </div>

                <!-- Form Đăng Nhập -->
                <form id="form-login" action="/login" method="POST" class="space-y-4">
                    <div class="space-y-1">
                        <label class="block text-xs font-medium text-slate-300">Tên tài khoản</label>
                        <input type="text" name="username" required placeholder="Nhập tên tài khoản..." 
                            class="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition">
                    </div>
                    <div class="space-y-1">
                        <label class="block text-xs font-medium text-slate-300">Mật khẩu</label>
                        <input type="password" name="password" required placeholder="••••••••" 
                            class="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition">
                    </div>
                    <button type="submit" class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all duration-300 transform active:scale-95">
                        Truy Cập Hệ Thống
                    </button>
                </form>

                <!-- Form Đăng Ký (Ẩn mặc định) -->
                <form id="form-register" action="/register" method="POST" class="space-y-4 hidden">
                    <div class="space-y-1">
                        <label class="block text-xs font-medium text-slate-300">Chọn tên đăng nhập mới</label>
                        <input type="text" name="username" required placeholder="Ví dụ: nguyenvand A..." 
                            class="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition">
                    </div>
                    <div class="space-y-1">
                        <label class="block text-xs font-medium text-slate-300">Mật khẩu bảo mật</label>
                        <input type="password" name="password" required placeholder="••••••••" 
                            class="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition">
                    </div>
                    <button type="submit" class="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 py-3 rounded-xl font-bold text-sm shadow-lg shadow-purple-500/20 transition-all duration-300 transform active:scale-95">
                        Hoàn Tất Đăng Ký
                    </button>
                </form>

                <div class="text-center">
                    <p class="text-[11px] text-slate-500">Được bảo mật qua kết nối đám mây an toàn &bull; Phiên bản v2.0</p>
                </div>
            </div>

            <!-- JavaScript xử lý hiệu ứng chuyển tab mượt mà -->
            <script>
                function switchTab(tab) {
                    const loginForm = document.getElementById('form-login');
                    const registerForm = document.getElementById('form-register');
                    const loginBtn = document.getElementById('btn-login');
                    const registerBtn = document.getElementById('btn-register');

                    if (tab === 'login') {
                        loginForm.classList.remove('hidden');
                        registerForm.classList.add('hidden');
                        
                        loginBtn.className = "py-2 text-xs font-semibold rounded-lg transition-all duration-300 bg-indigo-600 text-white shadow-lg";
                        registerBtn.className = "py-2 text-xs font-semibold rounded-lg transition-all duration-300 text-slate-400 hover:text-white";
                    } else {
                        loginForm.classList.add('hidden');
                        registerForm.classList.remove('hidden');
                        
                        registerBtn.className = "py-2 text-xs font-semibold rounded-lg transition-all duration-300 bg-purple-600 text-white shadow-lg";
                        loginBtn.className = "py-2 text-xs font-semibold rounded-lg transition-all duration-300 text-slate-400 hover:text-white";
                    }
                }
            </script>
        </body>
        </html>
    `);
});

// Xử lý Đăng Ký
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.send(`
            <body style="background:#0f172a; color:#fff; text-align:center; padding-top:100px; font-family:sans-serif;">
                <div style="max-width:400px; margin:auto; background:rgba(30,41,59,0.8); padding:30px; border-radius:16px; border:1px solid rgba(255,255,255,0.1);">
                    <h1 style="color:#f87171; font-size:24px;">❌ Tên đã tồn tại!</h1>
                    <p style="color:#94a3b8; font-size:14px;">Tên tài khoản này đã có người đăng ký. Vui lòng chọn tên khác.</p>
                    <a href="/" style="display:inline-block; margin-top:20px; background:#6366f1; color:#fff; padding:10px 20px; border-radius:8px; text-decoration:none; font-weight:bold; font-size:14px;">Quay lại</a>
                </div>
            </body>
        `);
    }

    users.push({ username, password });
    console.log(`\n[ĐĂNG KÝ THÀNH CÔNG] Tài khoản: ${username} \vert{} Mật khẩu: ${password}`);

    res.send(`
        <body style="background:#0f172a; color:#fff; text-align:center; padding-top:100px; font-family:sans-serif;">
            <div style="max-width:400px; margin:auto; background:rgba(30,41,59,0.8); padding:30px; border-radius:16px; border:1px solid rgba(255,255,255,0.1);">
                <h1 style="color:#34d399; font-size:24px;">✅ Đăng ký thành công!</h1>
                <p style="color:#94a3b8; font-size:14px;">Tài khoản của bạn đã được ghi nhận vào hệ thống.</p>
                <a href="/" style="display:inline-block; margin-top:20px; background:#6366f1; color:#fff; padding:10px 20px; border-radius:8px; text-decoration:none; font-weight:bold; font-size:14px;">Đăng nhập ngay</a>
            </div>
        </body>
    `);
});

// Xử lý Đăng Nhập
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`\n[CÓ NGƯỜI THỬ ĐĂNG NHẬP] Tài khoản: ${username} \vert{} Mật khẩu: ${password}`);

    const validUser = users.find(u => u.username === username && u.password === password);

    if (!validUser) {
        const userExists = users.find(u => u.username === username);
        const errorMsg = userExists ? "Mật khẩu không chính xác!" : "Tài khoản này chưa được đăng ký trong hệ thống!";

        return res.send(`
            <body style="background:#0f172a; color:#fff; text-align:center; padding-top:100px; font-family:sans-serif;">
                <div style="max-width:400px; margin:auto; background:rgba(30,41,59,0.8); padding:30px; border-radius:16px; border:1px solid rgba(255,255,255,0.1);">
                    <h1 style="color:#f87171; font-size:24px;">❌ Đăng nhập thất bại</h1>
                    <p style="color:#94a3b8; font-size:14px;">${errorMsg}</p>
                    <a href="/" style="display:inline-block; margin-top:20px; background:#6366f1; color:#fff; padding:10px 20px; border-radius:8px; text-decoration:none; font-weight:bold; font-size:14px;">Thử lại</a>
                </div>
            </body>
        `);
    }

    res.send(`
        <body style="background:#0f172a; color:#fff; text-align:center; padding-top:100px; font-family:sans-serif;">
            <div style="max-width:400px; margin:auto; background:rgba(30,41,59,0.8); padding:30px; border-radius:16px; border:1px solid rgba(255,255,255,0.1);">
                <h1 style="color:#34d399; font-size:24px;">🎉 Chào mừng trở lại!</h1>
                <p style="color:#94a3b8; font-size:14px;">Xin chào người dùng: <b style="color:#fff;">${username}</b></p>
                <a href="/" style="display:inline-block; margin-top:20px; background:#475569; color:#fff; padding:10px 20px; border-radius:8px; text-decoration:none; font-weight:bold; font-size:14px;">Đăng xuất</a>
            </div>
        </body>
    `);
});

app.listen(PORT, () => {
    console.log(`🚀 Máy
