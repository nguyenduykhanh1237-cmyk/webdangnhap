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
            <title>Cổng Đăng Nhập RGB Interactive</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
                @keyframes rgbGlow {
                    0% { border-color: #ff0055; box-shadow: 0 0 30px rgba(255, 0, 85, 0.4); }
                    33% { border-color: #00ffcc; box-shadow: 0 0 30px rgba(0, 255, 204, 0.4); }
                    66% { border-color: #7b00ff; box-shadow: 0 0 30px rgba(123, 0, 255, 0.4); }
                    100% { border-color: #ff0055; box-shadow: 0 0 30px rgba(255, 0, 85, 0.4); }
                }
                @keyframes rgbText {
                    0% { color: #ff0055; }
                    33% { color: #00ffcc; }
                    66% { color: #bf00ff; }
                    100% { color: #ff0055; }
                }
                @keyframes bgMove {
                    0%, 100% { transform: translate(0px, 0px) scale(1); }
                    50% { transform: translate(40px, -40px) scale(1.15); }
                }
                .rgb-border {
                    animation: rgbGlow 6s infinite;
                }
                .rgb-title {
                    animation: rgbText 6s infinite;
                }
                .blob-1 {
                    animation: bgMove 8s ease-in-out infinite;
                }
                .blob-2 {
                    animation: bgMove 10s ease-in-out infinite reverse;
                }
                .glass-card {
                    background: rgba(10, 10, 20, 0.8);
                    backdrop-filter: blur(25px);
                    -webkit-backdrop-filter: blur(25px);
                    border: 2px solid rgba(255, 255, 255, 0.1);
                }
                /* Hiệu ứng hạt sao tương tác */
                canvas {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 1;
                }
            </style>
        </head>
        <body class="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            
            <!-- Canvas vẽ hạt ánh sáng tương tác chuột -->
            <canvas id="canvas"></canvas>

            <!-- Hiệu ứng nền RGB chuyển động -->
            <div class="absolute -top-40 -left-40 w-96 h-96 bg-pink-600/25 rounded-full blur-3xl blob-1 z-0"></div>
            <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-600/25 rounded-full blur-3xl blob-2 z-0"></div>

            <!-- Khung giao diện chính viền RGB -->
            <div class="glass-card rgb-border p-8 rounded-3xl w-full max-w-md shadow-2xl relative z-10 space-y-6">
                
                <div class="text-center space-y-1">
                    <h2 class="text-3xl font-black tracking-wider rgb-title uppercase drop-shadow-lg">Cổng Xác Thực</h2>
                    <p class="text-xs text-slate-400">Web thử nghiệm</p>
                </div>

                <!-- Thanh chuyển Tab -->
                <div class="grid grid-cols-2 gap-1 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
                    <button onclick="switchTab('login')" id="btn-login" class="py-2 text-xs font-bold rounded-lg transition-all duration-300 bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg">Đăng Nhập</button>
                    <button onclick="switchTab('register')" id="btn-register" class="py-2 text-xs font-bold rounded-lg transition-all duration-300 text-slate-400 hover:text-white">Tạo Tài Khoản</button>
                </div>

                <!-- Form Đăng Nhập -->
                <form id="form-login" action="/login" method="POST" class="space-y-4">
                    <div class="space-y-1">
                        <label class="block text-xs font-semibold text-slate-300">Tên tài khoản</label>
                        <input type="text" name="username" required placeholder="Nhập tên tài khoản..." 
                            class="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition">
                    </div>
                    <div class="space-y-1">
                        <label class="block text-xs font-semibold text-slate-300">Mật khẩu</label>
                        <input type="password" name="password" required placeholder="••••••••" 
                            class="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition">
                    </div>
                    <button type="submit" class="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:opacity-90 py-3 rounded-xl font-bold text-sm shadow-lg shadow-purple-500/30 transition-all duration-300 transform active:scale-95 text-white cursor-pointer">
                        TRUY CẬP HỆ THỐNG
                    </button>
                </form>

                <!-- Form Đăng Ký (Ẩn mặc định) -->
                <form id="form-register" action="/register" method="POST" class="space-y-4 hidden">
                    <div class="space-y-1">
                        <label class="block text-xs font-semibold text-slate-300">Chọn tên đăng nhập mới</label>
                        <input type="text" name="username" required placeholder="Ví dụ: khanhduy..." 
                            class="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition">
                    </div>
                    <div class="space-y-1">
                        <label class="block text-xs font-semibold text-slate-300">Mật khẩu bảo mật</label>
                        <input type="password" name="password" required placeholder="••••••••" 
                            class="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition">
                    </div>
                    <button type="submit" class="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:opacity-90 py-3 rounded-xl font-bold text-sm shadow-lg shadow-cyan-500/30 transition-all duration-300 transform active:scale-95 text-white cursor-pointer">
                        HOÀN TẤT ĐĂNG KÝ
                    </button>
                </form>

                <div class="text-center">
                    <p class="text-[11px] text-slate-500">Interactive Cloud System &bull; v3.0</p>
                </div>
            </div>

            <!-- Script xử lý hiệu ứng chuyển tab & hiệu ứng hạt sao tương tác chuột -->
            <script>
                function switchTab(tab) {
                    const loginForm = document.getElementById('form-login');
                    const registerForm = document.getElementById('form-register');
                    const loginBtn = document.getElementById('btn-login');
                    const registerBtn = document.getElementById('btn-register');

                    if (tab === 'login') {
                        loginForm.classList.remove('hidden');
                        registerForm.classList.add('hidden');
                        loginBtn.className = "py-2 text-xs font-bold rounded-lg transition-all duration-300 bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg";
                        registerBtn.className = "py-2 text-xs font-bold rounded-lg transition-all duration-300 text-slate-400 hover:text-white";
                    } else {
                        loginForm.classList.add('hidden');
                        registerForm.classList.remove('hidden');
                        registerBtn.className = "py-2 text-xs font-bold rounded-lg transition-all duration-300 bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg";
                        loginBtn.className = "py-2 text-xs font-bold rounded-lg transition-all duration-300 text-slate-400 hover:text-white";
                    }
                }

                // Hiệu ứng hạt ánh sáng chạy theo chuột
                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');
                let particlesArray = [];

                function resizeCanvas() {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                }
                window.addEventListener('resize', resizeCanvas);
                resizeCanvas();

                const mouse = { x: null, y: null, radius: 150 };
                window.addEventListener('mousemove', function(event) {
                    mouse.x = event.clientX;
                    mouse.y = event.clientY;
                    for (let i = 0; i < 2; i++) {
                        particlesArray.push(new Particle());
                    }
                });

                class Particle {
                    constructor() {
                        this.x = mouse.x;
                        this.y = mouse.y;
                        this.size = Math.random() * 3 + 1;
                        this.speedX = Math.random() * 3 - 1.5;
                        this.speedY = Math.random() * 3 - 1.5;
                        this.color = ['#ff0055', '#00ffcc', '#7b00ff', '#ffffff'][Math.floor(Math.random() * 4)];
                    }
                    update() {
                        this.x += this.speedX;
                        this.y += this.speedY;
                        if (this.size > 0.2) this.size -= 0.03;
                    }
                    draw() {
                        ctx.fillStyle = this.color;
                        ctx.beginPath();
                        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }

                function handleParticles() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    for (let i = 0; i < particlesArray.length; i++) {
                        particlesArray[i].update();
                        particlesArray[i].draw();
                        if (particlesArray[i].size <= 0.3) {
                            particlesArray.splice(i, 1);
                            i--;
                        }
                    }
                    requestAnimationFrame(handleParticles);
                }
                handleParticles();
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
            <body style="background:#09090b; color:#fff; text-align:center; padding-top:100px; font-family:sans-serif;">
                <div style="max-width:400px; margin:auto; background:rgba(20,20,30,0.9); padding:30px; border-radius:16px; border:1px solid #ff0055; box-shadow: 0 0 20px rgba(255,0,85,0.3);">
                    <h1 style="color:#ff0055; font-size:24px;">❌ Tên đã tồn tại!</h1>
                    <p style="color:#a1a1aa; font-size:14px;">Tài khoản này đã có người đăng ký. Vui lòng chọn tên khác.</p>
                    <a href="/" style="display:inline-block; margin-top:20px; background:linear-gradient(to right, #ff0055, #7b00ff); color:#fff; padding:10px 20px; border-radius:8px; text-decoration:none; font-weight:bold; font-size:14px;">Quay lại</a>
                </div>
            </body>
        `);
    }

    users.push({ username, password });
    console.log(`[ĐĂNG KÝ THÀNH CÔNG] Tài khoản: ${username} | Mật khẩu: ${password}`);

    res.send(`
        <body style="background:#09090b; color:#fff; text-align:center; padding-top:100px; font-family:sans-serif;">
            <div style="max-width:400px; margin:auto; background:rgba(20,20,30,0.9); padding:30px; border-radius:16px; border:1px solid #00ffcc; box-shadow: 0 0 20px rgba(0,255,204,0.3);">
                <h1 style="color:#00ffcc; font-size:24px;">✅ Đăng ký thành công!</h1>
                <p style="color:#a1a1aa; font-size:14px;">Tài khoản của bạn đã được ghi nhận vào hệ thống.</p>
                <a href="/" style="display:inline-block; margin-top:20px; background:linear-gradient(to right, #00ffcc, #7b00ff); color:#fff; padding:10px 20px; border-radius:8px; text-decoration:none; font-weight:bold; font-size:14px;">Đăng nhập ngay</a>
            </div>
        </body>
    `);
});

// Xử lý Đăng Nhập
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`[CÓ NGƯỜI THỬ ĐĂNG NHẬP] Tài khoản: ${username} | Mật khẩu: ${password}`);

    const validUser = users.find(u => u.username === username && u.password === password);

    if (!validUser) {
        const userExists = users.find(u => u.username === username);
        const errorMsg = userExists ? "Mật khẩu không chính xác!" : "Tài khoản này chưa được đăng ký trong hệ thống!";

        return res.send(`
            <body style="background:#09090b; color:#fff; text-align:center; padding-top:100px; font-family:sans-serif;">
                <div style="max-width:400px; margin:auto; background:rgba(20,20,30,0.9); padding:30px; border-radius:16px; border:1px solid #ff0055; box-shadow: 0 0 20px rgba(255,0,85,0.3);">
                    <h1 style="color:#ff0055; font-size:24px;">❌ Đăng nhập thất bại</h1>
                    <p style="color:#a1a1aa; font-size:14px;">${errorMsg}</p>
                    <a href="/" style="display:inline-block; margin-top:20px; background:linear-gradient(to right, #ff0055, #7b00ff); color:#fff; padding:10px 20px; border-radius:8px; text-decoration:none; font-weight:bold; font-size:14px;">Thử lại</a>
                </div>
            </body>
        `);
    }

    res.send(`
        <body style="background:#09090b; color:#fff; text-align:center; padding-top:100px; font-family:sans-serif;">
            <div style="max-width:400px; margin:auto; background:rgba(20,20,30,0.9); padding:30px; border-radius:16px; border:1px solid #00ffcc; box-shadow: 0 0 20px rgba(0,255,204,0.3);">
                <h1 style="color:#00ffcc; font-size:24px;">🎉 Chào mừng trở lại!</h1>
                <p style="color:#a1a1aa; font-size:14px;">Xin chào người dùng: <b style="color:#fff;">${username}</b></p>
                <a href="/" style="display:inline-block; margin-top:20px; background:linear-gradient(to right, #00ffcc, #7b00ff); color:#fff; padding:10px 20px; border-radius:8px; text-decoration:none; font-weight:bold; font-size:14px;">Đăng xuất</a>
            </div>
        </body>
    `);
});

app.listen(PORT, () => {
    console.log(`🚀 Máy chủ đang chạy tại cổng ${PORT}`);
});
