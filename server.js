const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Kho lưu trữ tài khoản tạm thời
let users = [];

// 1. Trang chủ: Đăng nhập & Đăng ký (Giao diện RGB + Hiệu ứng hạt chuột)
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="vi">
        <head>
            <meta charset="UTF-8">
            <title>Cổng Xác Thực RGB Gaming</title>
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
                .rgb-border { animation: rgbGlow 6s infinite; }
                .rgb-title { animation: rgbText 6s infinite; }
                .blob-1 { animation: bgMove 8s ease-in-out infinite; }
                .blob-2 { animation: bgMove 10s ease-in-out infinite reverse; }
                .glass-card {
                    background: rgba(10, 10, 20, 0.8);
                    backdrop-filter: blur(25px);
                    -webkit-backdrop-filter: blur(25px);
                    border: 2px solid rgba(255, 255, 255, 0.1);
                }
                canvas {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;
                }
            </style>
        </head>
        <body class="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            <canvas id="canvas"></canvas>
            <div class="absolute -top-40 -left-40 w-96 h-96 bg-pink-600/25 rounded-full blur-3xl blob-1 z-0"></div>
            <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-600/25 rounded-full blur-3xl blob-2 z-0"></div>

            <div class="glass-card rgb-border p-8 rounded-3xl w-full max-w-md shadow-2xl relative z-10 space-y-6">
                <div class="text-center space-y-1">
                    <h2 class="text-3xl font-black tracking-wider rgb-title uppercase drop-shadow-lg">Cổng Xác Thực</h2>
                    <p class="text-xs text-slate-400">Đăng nhập để vào cửa hàng trực tuyến</p>
                </div>

                <div class="grid grid-cols-2 gap-1 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
                    <button onclick="switchTab('login')" id="btn-login" class="py-2 text-xs font-bold rounded-lg transition-all duration-300 bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg">Đăng Nhập</button>
                    <button onclick="switchTab('register')" id="btn-register" class="py-2 text-xs font-bold rounded-lg transition-all duration-300 text-slate-400 hover:text-white">Tạo Tài Khoản</button>
                </div>

                <form id="form-login" action="/login" method="POST" class="space-y-4">
                    <div class="space-y-1">
                        <label class="block text-xs font-semibold text-slate-300">Tên tài khoản</label>
                        <input type="text" name="username" required placeholder="Nhập tên tài khoản..." class="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 transition">
                    </div>
                    <div class="space-y-1">
                        <label class="block text-xs font-semibold text-slate-300">Mật khẩu</label>
                        <input type="password" name="password" required placeholder="••••••••" class="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 transition">
                    </div>
                    <button type="submit" class="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:opacity-90 py-3 rounded-xl font-bold text-sm shadow-lg shadow-purple-500/30 transition-all text-white cursor-pointer">TRUY CẬP CỬA HÀNG</button>
                </form>

                <form id="form-register" action="/register" method="POST" class="space-y-4 hidden">
                    <div class="space-y-1">
                        <label class="block text-xs font-semibold text-slate-300">Chọn tên đăng nhập mới</label>
                        <input type="text" name="username" required placeholder="Ví dụ: khanhduy..." class="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition">
                    </div>
                    <div class="space-y-1">
                        <label class="block text-xs font-semibold text-slate-300">Mật khẩu bảo mật</label>
                        <input type="password" name="password" required placeholder="••••••••" class="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition">
                    </div>
                    <button type="submit" class="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:opacity-90 py-3 rounded-xl font-bold text-sm shadow-lg shadow-cyan-500/30 transition-all text-white cursor-pointer">HOÀN TẤT ĐĂNG KÝ</button>
                </form>
            </div>

            <script>
                function switchTab(tab) {
                    const loginForm = document.getElementById('form-login');
                    const registerForm = document.getElementById('form-register');
                    const loginBtn = document.getElementById('btn-login');
                    const registerBtn = document.getElementById('btn-register');
                    if (tab === 'login') {
                        loginForm.classList.remove('hidden');
                        registerForm.classList.add('hidden');
                        loginBtn.className = "py-2 text-xs font-bold rounded-lg transition-all bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg";
                        registerBtn.className = "py-2 text-xs font-bold rounded-lg transition-all text-slate-400 hover:text-white";
                    } else {
                        loginForm.classList.add('hidden');
                        registerForm.classList.remove('hidden');
                        registerBtn.className = "py-2 text-xs font-bold rounded-lg transition-all bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg";
                        loginBtn.className = "py-2 text-xs font-bold rounded-lg transition-all text-slate-400 hover:text-white";
                    }
                }
                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');
                let particlesArray = [];
                function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
                window.addEventListener('resize', resizeCanvas); resizeCanvas();
                window.addEventListener('mousemove', function(e) {
                    for (let i = 0; i < 2; i++) particlesArray.push({ x: e.clientX, y: e.clientY, size: Math.random() * 3 + 1, speedX: Math.random() * 3 - 1.5, speedY: Math.random() * 3 - 1.5, color: ['#ff0055', '#00ffcc', '#7b00ff', '#ffffff'][Math.floor(Math.random() * 4)] });
                });
                function handleParticles() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    particlesArray.forEach((p, index) => {
                        p.x += p.speedX; p.y += p.speedY; p.size -= 0.03;
                        ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
                        if (p.size <= 0.3) particlesArray.splice(index, 1);
                    });
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
    if (users.find(u => u.username === username)) {
        return res.send(`<body style="background:#09090b; color:#fff; text-align:center; padding-top:100px; font-family:sans-serif;"><div style="max-width:400px; margin:auto; background:rgba(20,20,30,0.9); padding:30px; border-radius:16px; border:1px solid #ff0055;"><h1 style="color:#ff0055; font-size:24px;">❌ Tên đã tồn tại!</h1><a href="/" style="display:inline-block; margin-top:20px; background:#ff0055; color:#fff; padding:10px 20px; border-radius:8px; text-decoration:none;">Quay lại</a></div></body>`);
    }
    users.push({ username, password });
    res.send(`<body style="background:#09090b; color:#fff; text-align:center; padding-top:100px; font-family:sans-serif;"><div style="max-width:400px; margin:auto; background:rgba(20,20,30,0.9); padding:30px; border-radius:16px; border:1px solid #00ffcc;"><h1 style="color:#00ffcc; font-size:24px;">✅ Đăng ký thành công!</h1><a href="/" style="display:inline-block; margin-top:20px; background:#00ffcc; color:#000; padding:10px 20px; border-radius:8px; text-decoration:none; font-weight:bold;">Đăng nhập ngay</a></div></body>`);
});

// Xử lý Đăng Nhập -> Dẫn sang Trang Bán Hàng (Shop Dashboard)
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const validUser = users.find(u => u.username === username && u.password === password);

    if (!validUser) {
        return res.send(`<body style="background:#09090b; color:#fff; text-align:center; padding-top:100px; font-family:sans-serif;"><div style="max-width:400px; margin:auto; background:rgba(20,20,30,0.9); padding:30px; border-radius:16px; border:1px solid #ff0055;"><h1 style="color:#ff0055; font-size:24px;">❌ Sai tài khoản hoặc mật khẩu!</h1><a href="/" style="display:inline-block; margin-top:20px; background:#ff0055; color:#fff; padding:10px 20px; border-radius:8px; text-decoration:none;">Thử lại</a></div></body>`);
    }

    // Giao diện trang bán hàng nhiều danh mục
    res.send(`
        <!DOCTYPE html>
        <html lang="vi">
        <head>
            <meta charset="UTF-8">
            <title>Cửa Hàng Trực Tuyến - Chào ${username}</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-slate-950 text-slate-100 min-h-screen">
            <!-- Thanh điều hướng (Navbar) -->
            <header class="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
                <h1 class="text-xl font-black bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">⚡ CYBER SHOP</h1>
                <div class="flex items-center space-x-4">
                    <span class="text-sm text-slate-300">Xin chào, <b class="text-cyan-400">${username}</b></span>
                    <a href="/" class="bg-red-600/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-600 hover:text-white transition">Đăng Xuất</a>
                </div>
            </header>

            <!-- Nội dung chính -->
            <main class="max-w-6xl mx-auto p-6 space-y-8">
                <!-- Banner Quảng cáo -->
                <div class="bg-gradient-to-r from-purple-900/50 via-indigo-900/50 to-pink-900/50 border border-purple-500/30 p-8 rounded-3xl text-center space-y-3 shadow-2xl">
                    <h2 class="text-3xl font-extrabold text-white">Khuyến Mãi Mùa Hè - Giảm Giá Đến 50%</h2>
                    <p class="text-sm text-slate-300">Khám phá các thiết bị công nghệ, phụ kiện gaming và linh kiện cao cấp giá tốt nhất.</p>
                </div>

                <!-- Bộ lọc Danh Mục -->
                <div class="flex space-x-3 overflow-x-auto pb-2">
                    <button onclick="filterCategory('all')" class="cat-btn px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 transition">Tất Cả</button>
                    <button onclick="filterCategory('laptop')" class="cat-btn px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 transition">Laptop Gaming</button>
                    <button onclick="filterCategory('phone')" class="cat-btn px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 transition">Điện Thoại</button>
                    <button onclick="filterCategory('accessory')" class="cat-btn px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 transition">Phụ Kiện</button>
                </div>

                <!-- Danh sách sản phẩm -->
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" id="product-grid">
                    <!-- Sản phẩm 1 -->
                    <div class="product-card bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3" data-category="laptop">
                        <div class="h-40 bg-slate-950 rounded-xl flex items-center justify-center text-4xl">💻</div>
                        <h3 class="font-bold text-base text-white">Laptop ASUS ROG Strix</h3>
                        <p class="text-xs text-slate-400">Core i7, RTX 4060, Màn hình 144Hz cực mượt.</p>
                        <div class="flex justify-between items-center pt-2">
                            <span class="text-cyan-400 font-black text-sm">28.500.000 đ</span>
                            <button onclick="alert('Đã thêm Laptop ASUS ROG Strix vào giỏ hàng!')" class="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold transition">Mua Ngay</button>
                        </div>
                    </div>

                    <!-- Sản phẩm 2 -->
                    <div class="product-card bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3" data-category="phone">
                        <div class="h-40 bg-slate-950 rounded-xl flex items-center justify-center text-4xl">📱</div>
                        <h3 class="font-bold text-base text-white">iPhone 15 Pro Max</h3>
                        <p class="text-xs text-slate-400">Titan tự nhiên, Chip A17 Pro, Camera đỉnh cao.</p>
                        <div class="flex justify-between items-center pt-2">
                            <span class="text-pink-400 font-black text-sm">29.900.000 đ</span>
                            <button onclick="alert('Đã thêm iPhone 15 Pro Max vào giỏ hàng!')" class="bg-pink-500 hover:bg-pink-400 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold transition">Mua Ngay</button>
                        </div>
                    </div>

                    <!-- Sản phẩm 3 -->
                    <div class="product-card bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3" data-category="accessory">
                        <div class="h-40 bg-slate-950 rounded-xl flex items-center justify-center text-4xl">🎧</div>
                        <h3 class="font-bold text-base text-white">Tai Nghe Gaming RGB 7.1</h3>
                        <p class="text-xs text-slate-400">Âm thanh vòm sống động, chống ồn chủ động.</p>
                        <div class="flex justify-between items-center pt-2">
                            <span class="text-purple-400 font-black text-sm">1.200.000 đ</span>
                            <button onclick="alert('Đã thêm Tai Nghe Gaming vào giỏ hàng!')" class="bg-purple-500 hover:bg-purple-400 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold transition">Mua Ngay</button>
                        </div>
                    </div>

                    <!-- Sản phẩm 4 -->
                    <div class="product-card bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3" data-category="laptop">
                        <div class="h-40 bg-slate-950 rounded-xl flex items-center justify-center text-4xl">💻</div>
                        <h3 class="font-bold text-base text-white">MacBook Pro M3</h3>
                        <p class="text-xs text-slate-400">Hiệu năng khủng, thời lượng pin lên đến 22 giờ.</p>
                        <div class="flex justify-between items-center pt-2">
                            <span class="text-cyan-400 font-black text-sm">35.000.000 đ</span>
                            <button onclick="alert('Đã thêm MacBook Pro M3 vào giỏ hàng!')" class="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold transition">Mua Ngay</button>
                        </div>
                    </div>

                    <!-- Sản phẩm 5 -->
                    <div class="product-card bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3" data-category="accessory">
                        <div class="h-40 bg-slate-950 rounded-xl flex items-center justify-center text-4xl">⌨️</div>
                        <h3 class="font-bold text-base text-white">Bàn Phím Cơ RGB Custom</h3>
                        <p class="text-xs text-slate-400">Switch êm ái, LED nền đổi màu cực đẹp.</p>
                        <div class="flex justify-between items-center pt-2">
                            <span class="text-purple-400 font-black text-sm">1.850.000 đ</span>
                            <button onclick="alert('Đã thêm Bàn Phím Cơ vào giỏ hàng!')" class="bg-purple-500 hover:bg-purple-400 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold transition">Mua Ngay</button>
                        </div>
                    </div>

                    <!-- Sản phẩm 6 -->
                    <div class="product-card bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3" data-category="phone">
                        <div class="h-40 bg-slate-950 rounded-xl flex items-center justify-center text-4xl">📱</div>
                        <h3 class="font-bold text-base text-white">Samsung Galaxy S24 Ultra</h3>
                        <p class="text-xs text-slate-400">Tích hợp AI thông minh, bút S-Pen tiện lợi.</p>
                        <div class="flex justify-between items-center pt-2">
                            <span class="text-pink-400 font-black text-sm">26.500.000 đ</span>
                            <button onclick="alert('Đã thêm Samsung S24 Ultra vào giỏ hàng!')" class="bg-pink-500 hover:bg-pink-400 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold transition">Mua Ngay</button>
                        </div>
                    </div>
                </div>
            </main>

            <!-- Script lọc danh mục sản phẩm -->
            <script>
                function filterCategory(category) {
                    const cards = document.querySelectorAll('.product-card');
                    const buttons = document.querySelectorAll('.cat-btn');

                    buttons.forEach(btn => {
                        btn.className = "cat-btn px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 transition";
                    });
                    event.target.className = "cat-btn px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 transition";

                    cards.forEach(card => {
                        if (category === 'all' || card.getAttribute('data-category') === category) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                }
            </script>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`🚀 Máy chủ cửa hàng đang chạy tại cổng ${PORT}`);
});
