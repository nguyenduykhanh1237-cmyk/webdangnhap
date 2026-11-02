<!DOCTYPE html>
<html lang="vi" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hệ Thống Đăng Nhập & Đăng Ký Cao Cấp</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-from: #6366f1;
            --primary-via: #a855f7;
            --primary-to: #ec4899;
            --glow-color: rgba(139, 92, 246, 0.45);
            --blob-1: rgba(99, 102, 241, 0.35);
            --blob-2: rgba(168, 85, 247, 0.3);
            --blob-3: rgba(6, 182, 212, 0.25);
        }

        [data-theme="emerald"] {
            --primary-from: #10b981;
            --primary-via: #06b6d4;
            --primary-to: #3b82f6;
            --glow-color: rgba(16, 185, 129, 0.45);
            --blob-1: rgba(16, 185, 129, 0.35);
            --blob-2: rgba(6, 182, 212, 0.3);
            --blob-3: rgba(59, 130, 246, 0.25);
        }

        [data-theme="sunset"] {
            --primary-from: #f43f5e;
            --primary-via: #f97316;
            --primary-to: #eab308;
            --glow-color: rgba(244, 63, 94, 0.45);
            --blob-1: rgba(244, 63, 94, 0.35);
            --blob-2: rgba(249, 115, 22, 0.3);
            --blob-3: rgba(234, 179, 8, 0.25);
        }

        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #030712;
            overflow-x: hidden;
        }

        .font-mono-code {
            font-family: 'JetBrains Mono', monospace;
        }

        /* Animated Aurora Blobs */
        .aurora-blob {
            position: fixed;
            border-radius: 9999px;
            filter: blur(90px);
            z-index: 0;
            pointer-events: none;
            transition: background 0.8s ease;
        }

        .blob-1 {
            width: 420px;
            height: 420px;
            background: var(--blob-1);
            top: -10%;
            left: -5%;
            animation: floatBlob1 16s ease-in-out infinite alternate;
        }

        .blob-2 {
            width: 460px;
            height: 460px;
            background: var(--blob-2);
            bottom: -12%;
            right: -5%;
            animation: floatBlob2 18s ease-in-out infinite alternate;
        }

        .blob-3 {
            width: 360px;
            height: 360px;
            background: var(--blob-3);
            top: 40%;
            left: 55%;
            animation: floatBlob3 14s ease-in-out infinite alternate;
        }

        @keyframes floatBlob1 {
            0% { transform: translate(0, 0) scale(1); }
            100% { transform: translate(80px, 60px) scale(1.15); }
        }
        @keyframes floatBlob2 {
            0% { transform: translate(0, 0) scale(1); }
            100% { transform: translate(-90px, -50px) scale(1.12); }
        }
        @keyframes floatBlob3 {
            0% { transform: translate(0, 0) scale(0.95); }
            100% { transform: translate(-60px, 70px) scale(1.18); }
        }

        /* Glassmorphism Card with Glowing Border */
        .glass-card {
            background: rgba(15, 23, 42, 0.65);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.12);
            box-shadow: 
                0 25px 50px -12px rgba(0, 0, 0, 0.75),
                0 0 40px -10px var(--glow-color),
                inset 0 1px 1px 0 rgba(255, 255, 255, 0.15);
            transition: box-shadow 0.5s ease, transform 0.4s ease;
        }

        /* Dynamic Theme Gradient Classes */
        .theme-gradient-bg {
            background: linear-gradient(135deg, var(--primary-from), var(--primary-via), var(--primary-to));
        }

        .theme-gradient-text {
            background: linear-gradient(135deg, #ffffff 10%, var(--primary-via) 60%, var(--primary-to) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        /* Shimmer Button Effect */
        .btn-shimmer {
            position: relative;
            overflow: hidden;
            background: linear-gradient(135deg, var(--primary-from), var(--primary-via), var(--primary-to));
            background-size: 200% 200%;
            animation: gradientShift 5s ease infinite;
            box-shadow: 0 10px 25px -5px var(--glow-color);
        }

        .btn-shimmer::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -60%;
            width: 40%;
            height: 200%;
            background: linear-gradient(
                to right,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 0.35) 50%,
                rgba(255, 255, 255, 0) 100%
            );
            transform: rotate(25deg);
            transition: all 0.65s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .btn-shimmer:hover::after {
            left: 130%;
        }

        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        /* Input Focus Glow */
        .input-glass {
            background: rgba(2, 6, 23, 0.65);
            border: 1px solid rgba(148, 163, 184, 0.2);
            transition: all 0.25s ease;
        }
        .input-glass:focus {
            border-color: var(--primary-via);
            box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.18), 0 0 18px -3px var(--glow-color);
            background: rgba(2, 6, 23, 0.85);
        }

        /* Logo Ring Pulse */
        .logo-ring {
            box-shadow: 0 0 25px var(--glow-color);
            animation: pulseRing 3s ease-in-out infinite;
        }
        @keyframes pulseRing {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.04); }
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #090d16; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #475569; }
    </style>
</head>
<body class="text-slate-100 min-h-screen flex flex-col justify-between relative selection:bg-indigo-500 selection:text-white">

    <!-- Interactive Starfield Particle Canvas -->
    <canvas id="starfieldCanvas" class="fixed inset-0 pointer-events-none z-0"></canvas>

    <!-- Animated Aurora Gradient Blobs -->
    <div class="aurora-blob blob-1"></div>
    <div class="aurora-blob blob-2"></div>
    <div class="aurora-blob blob-3"></div>

    <!-- Top Navigation & Theme Switcher Bar -->
    <header class="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-2 flex flex-wrap items-center justify-between gap-3">
        <!-- Brand Badge -->
        <div class="flex items-center gap-2.5 bg-slate-900/70 backdrop-blur-md border border-slate-800/80 px-3.5 py-1.5 rounded-full shadow-lg">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="text-xs font-semibold tracking-wide text-slate-200">NovaAuth Portal</span>
            <span class="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                Đã đăng ký: <strong id="topAccountCounter" class="text-white">0</strong>
            </span>
        </div>

        <!-- Decorative Theme Switcher -->
        <div class="flex items-center gap-1.5 bg-slate-900/75 backdrop-blur-md border border-slate-800/80 p-1.5 rounded-full shadow-lg">
            <span class="text-[11px] text-slate-400 px-2 hidden sm:inline"><i class="fa-solid fa-palette mr-1"></i>Giao diện:</span>
            <button onclick="setTheme('nebula')" id="themeBtn-nebula"
                class="text-xs px-3 py-1 rounded-full font-medium transition flex items-center gap-1.5 bg-indigo-600/30 text-indigo-200 border border-indigo-400/40">
                <span class="w-2 h-2 rounded-full bg-purple-400"></span>
                <span>Tím Huyền Ảo</span>
            </button>
            <button onclick="setTheme('emerald')" id="themeBtn-emerald"
                class="text-xs px-3 py-1 rounded-full font-medium transition flex items-center gap-1.5 text-slate-400 hover:text-white">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Xanh Ngọc Bích</span>
            </button>
            <button onclick="setTheme('sunset')" id="themeBtn-sunset"
                class="text-xs px-3 py-1 rounded-full font-medium transition flex items-center gap-1.5 text-slate-400 hover:text-white">
                <span class="w-2 h-2 rounded-full bg-rose-400"></span>
                <span>Hoàng Hôn Neon</span>
            </button>
        </div>
    </header>

    <!-- Main Center Auth Card Container -->
    <main class="relative z-10 flex-1 flex items-center justify-center px-4 py-6">
        <div class="w-full max-w-md">
            
            <!-- GLASSMORPHISM CARD -->
            <div class="glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden">
                
                <!-- Decorative Top Corner Glow Line -->
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] theme-gradient-bg opacity-90"></div>

                <!-- Animated Logo Badge -->
                <div class="flex flex-col items-center text-center mb-6">
                    <div class="relative mb-3">
                        <div class="w-16 h-16 rounded-2xl theme-gradient-bg p-[2px] logo-ring">
                            <div class="w-full h-full bg-slate-950/90 rounded-[14px] flex items-center justify-center">
                                <i id="cardHeaderIcon" class="fa-solid fa-shield-halved text-2xl text-white"></i>
                            </div>
                        </div>
                        <span class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[11px] text-emerald-400 shadow">
                            <i class="fa-solid fa-lock"></i>
                        </span>
                    </div>

                    <h1 id="cardMainTitle" class="text-2xl sm:text-3xl font-extrabold tracking-tight theme-gradient-text">
                        Chào Mừng Trở Lại
                    </h1>
                    <p id="cardSubTitle" class="text-xs sm:text-sm text-slate-400 mt-1">
                        Đăng nhập vào hệ thống bảo mật • Bắt buộc đăng ký trước
                    </p>
                </div>

                <!-- AUTH CONTAINER (LOGIN + REGISTER) -->
                <div id="authViewsWrapper">
                    
                    <!-- Smooth Sliding Segmented Control Tab Switcher -->
                    <div class="relative grid grid-cols-2 p-1.5 bg-slate-950/80 border border-slate-800/90 rounded-2xl mb-6">
                        <!-- Sliding Pill Indicator -->
                        <div id="tabSliderPill" class="absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] rounded-xl theme-gradient-bg shadow-lg transition-transform duration-300 ease-out"></div>
                        
                        <button type="button" onclick="switchAuthTab('login')" id="tabBtnLogin"
                            class="relative z-10 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-white">
                            <i class="fa-solid fa-right-to-bracket"></i>
                            <span>Đăng Nhập</span>
                        </button>
                        <button type="button" onclick="switchAuthTab('register')" id="tabBtnRegister"
                            class="relative z-10 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-slate-400 hover:text-slate-200">
                            <i class="fa-solid fa-user-plus"></i>
                            <span>Đăng Ký</span>
                        </button>
                    </div>

                    <!-- Dynamic Alert Notification Banner -->
                    <div id="authAlertBox" class="hidden mb-5 p-3.5 rounded-2xl text-xs font-medium border backdrop-blur-md transition-all duration-300">
                        <div class="flex items-start gap-2.5">
                            <i id="authAlertIcon" class="fa-solid fa-circle-info mt-0.5 text-base shrink-0"></i>
                            <div class="flex-1">
                                <div id="authAlertText" class="leading-relaxed"></div>
                                <!-- Quick Switch to Register Action when Unregistered -->
                                <div id="authAlertActionWrap" class="hidden mt-2.5">
                                    <button type="button" onclick="jumpToRegisterWithUsername()"
                                        class="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/15 hover:bg-white/25 text-white border border-white/20 transition inline-flex items-center gap-1.5 shadow">
                                        <i class="fa-solid fa-wand-magic-sparkles"></i>
                                        <span>Chuyển sang Đăng Ký tài khoản này ngay</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ==================== 1. FORM ĐĂNG NHẬP ==================== -->
                    <form id="loginForm" onsubmit="handleLogin(event)" class="space-y-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-300 mb-1.5 ml-1">
                                Tên tài khoản hoặc Email
                            </label>
                            <div class="relative group">
                                <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-white transition-colors">
                                    <i class="fa-regular fa-user"></i>
                                </span>
                                <input type="text" id="loginUsername" required placeholder="Nhập tên tài khoản đã đăng ký..."
                                    class="w-full input-glass rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none">
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-300 mb-1.5 ml-1">
                                Mật khẩu bảo mật
                            </label>
                            <div class="relative group">
                                <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-white transition-colors">
                                    <i class="fa-solid fa-lock"></i>
                                </span>
                                <input type="password" id="loginPassword" required placeholder="••••••••••••"
                                    class="w-full input-glass rounded-2xl pl-11 pr-11 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none">
                                <button type="button" onclick="togglePassword('loginPassword', this)"
                                    class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition" title="Hiện/Ẩn mật khẩu">
                                    <i class="fa-regular fa-eye"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Remember me & Forgot password -->
                        <div class="flex items-center justify-between text-xs pt-1">
                            <label class="inline-flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white select-none">
                                <input type="checkbox" id="rememberMeCheck" class="rounded bg-slate-900 border-slate-700 text-indigo-500 focus:ring-0">
                                <span>Ghi nhớ đăng nhập</span>
                            </label>
                            <button type="button" onclick="handleForgotPassword()" class="text-slate-400 hover:text-white underline decoration-slate-600 hover:decoration-white transition">
                                Quên mật khẩu?
                            </button>
                        </div>

                        <!-- Submit Button -->
                        <button type="submit"
                            class="w-full btn-shimmer text-white font-bold py-3.5 rounded-2xl text-sm tracking-wide transition transform active:scale-[0.98] flex items-center justify-center gap-2 mt-2">
                            <span>Đăng Nhập Vào Hệ Thống</span>
                            <i class="fa-solid fa-arrow-right-long"></i>
                        </button>

                        <p class="text-center text-xs text-slate-400 pt-2">
                            Chưa có tài khoản trong hệ thống?
                            <button type="button" onclick="switchAuthTab('register')" class="text-white font-bold hover:underline ml-1">
                                Đăng ký ngay
                            </button>
                        </p>
                    </form>

                    <!-- ==================== 2. FORM ĐĂNG KÝ ==================== -->
                    <form id="registerForm" onsubmit="handleRegister(event)" class="space-y-4 hidden">
                        <div>
                            <label class="block text-xs font-semibold text-slate-300 mb-1.5 ml-1">
                                Tên tài khoản (Username)
                            </label>
                            <div class="relative group">
                                <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-white transition-colors">
                                    <i class="fa-regular fa-user"></i>
                                </span>
                                <input type="text" id="regUsername" required placeholder="Ví dụ: nguyenvana"
                                    class="w-full input-glass rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none">
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-300 mb-1.5 ml-1">
                                Địa chỉ Email
                            </label>
                            <div class="relative group">
                                <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-white transition-colors">
                                    <i class="fa-regular fa-envelope"></i>
                                </span>
                                <input type="email" id="regEmail" required placeholder="name@example.com"
                                    class="w-full input-glass rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none">
                            </div>
                        </div>

                        <div>
                            <div class="flex items-center justify-between mb-1.5 ml-1">
                                <label class="text-xs font-semibold text-slate-300">Mật khẩu tạo mới</label>
                                <span id="strengthLabel" class="text-[11px] font-semibold text-slate-500">Chưa nhập</span>
                            </div>
                            <div class="relative group">
                                <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-white transition-colors">
                                    <i class="fa-solid fa-key"></i>
                                </span>
                                <input type="password" id="regPassword" required placeholder="Tối thiểu 4 ký tự..."
                                    oninput="evaluatePasswordStrength(this.value)"
                                    class="w-full input-glass rounded-2xl pl-11 pr-11 py-3 text-sm text-white placeholder-slate-500 focus:outline-none">
                                <button type="button" onclick="togglePassword('regPassword', this)"
                                    class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition" title="Hiện/Ẩn mật khẩu">
                                    <i class="fa-regular fa-eye"></i>
                                </button>
                            </div>
                            <!-- Live Password Strength Indicator Bar -->
                            <div class="grid grid-cols-3 gap-1.5 mt-2 px-1">
                                <div id="strBar1" class="h-1.5 rounded-full bg-slate-800 transition-colors duration-300"></div>
                                <div id="strBar2" class="h-1.5 rounded-full bg-slate-800 transition-colors duration-300"></div>
                                <div id="strBar3" class="h-1.5 rounded-full bg-slate-800 transition-colors duration-300"></div>
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-300 mb-1.5 ml-1">
                                Xác nhận lại mật khẩu
                            </label>
                            <div class="relative group">
                                <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-white transition-colors">
                                    <i class="fa-solid fa-check-double"></i>
                                </span>
                                <input type="password" id="regConfirmPassword" required placeholder="Nhập lại mật khẩu khớp phía trên..."
                                    class="w-full input-glass rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none">
                            </div>
                        </div>

                        <button type="submit"
                            class="w-full btn-shimmer text-white font-bold py-3.5 rounded-2xl text-sm tracking-wide transition transform active:scale-[0.98] flex items-center justify-center gap-2 mt-2">
                            <i class="fa-solid fa-sparkles"></i>
                            <span>Tạo Tài Khoản Mới</span>
                        </button>
                    </form>
                </div>

                <!-- ==================== 3. TRANG CHỦ THÀNH VIÊN (DASHBOARD VIEW) ==================== -->
                <div id="memberDashboardView" class="hidden space-y-5 pt-1">
                    <div class="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3.5">
                        <div class="w-12 h-12 rounded-2xl theme-gradient-bg flex items-center justify-center text-lg font-extrabold text-white shadow-md shrink-0" id="dashAvatarChar">
                            U
                        </div>
                        <div class="min-w-0 flex-1">
                            <div class="flex items-center gap-2">
                                <span class="text-sm font-bold text-white truncate" id="dashDisplayUser">user</span>
                                <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                    Verified
                                </span>
                            </div>
                            <p class="text-xs text-slate-400 truncate mt-0.5" id="dashDisplayEmail">user@example.com</p>
                        </div>
                    </div>

                    <div class="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-4 space-y-3 text-xs">
                        <div class="flex items-center justify-between py-1 border-b border-slate-800/80">
                            <span class="text-slate-400"><i class="fa-regular fa-id-badge mr-1.5 text-slate-500"></i>Trạng thái phiên:</span>
                            <span class="text-emerald-400 font-semibold flex items-center gap-1.5">
                                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                                Đang hoạt động
                            </span>
                        </div>
                        <div class="flex items-center justify-between py-1 border-b border-slate-800/80">
                            <span class="text-slate-400"><i class="fa-regular fa-clock mr-1.5 text-slate-500"></i>Thời gian trực tuyến:</span>
                            <span id="dashSessionTimer" class="font-mono-code text-white font-semibold">00:00</span>
                        </div>
                        <div class="flex items-center justify-between py-1">
                            <span class="text-slate-400"><i class="fa-solid fa-calendar-check mr-1.5 text-slate-500"></i>Đăng nhập lúc:</span>
                            <span id="dashLoginTimestamp" class="font-mono-code text-slate-300">--:--:--</span>
                        </div>
                    </div>

                    <button type="button" onclick="handleLogout()"
                        class="w-full py-3.5 rounded-2xl bg-rose-500/15 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 font-bold text-sm transition flex items-center justify-center gap-2">
                        <i class="fa-solid fa-power-off"></i>
                        <span>Đăng Xuất Tài Khoản</span>
                    </button>
                </div>

            </div>
        </div>
    </main>

    <!-- Bottom Bar: Server Activity Log & Code Export Modal Trigger -->
    <footer class="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 pb-5 pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div class="flex items-center gap-2 bg-slate-900/75 backdrop-blur-md border border-slate-800 px-3.5 py-2 rounded-xl">
            <i class="fa-solid fa-terminal text-indigo-400"></i>
            <span id="footerLastLog" class="truncate max-w-xs sm:max-w-md">Hệ thống sẵn sàng (0 tài khoản). Phải đăng ký trước khi đăng nhập.</span>
        </div>

        <div class="flex items-center gap-2">
            <button type="button" onclick="openCodeModal('accounts')"
                class="bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 px-3.5 py-2 rounded-xl font-semibold transition flex items-center gap-2 shadow-lg">
                <i class="fa-solid fa-database text-emerald-400"></i>
                <span>Quản Lý Tài Khoản & Logs</span>
            </button>
            <button type="button" onclick="openCodeModal('nodejs')"
                class="bg-indigo-600/25 hover:bg-indigo-600/40 text-indigo-200 border border-indigo-500/40 px-3.5 py-2 rounded-xl font-semibold transition flex items-center gap-2 shadow-lg">
                <i class="fa-solid fa-code text-indigo-300"></i>
                <span>Xem & Copy Mã Nguồn HTML/Node.js</span>
            </button>
        </div>
    </footer>

    <!-- ==================== MODAL: QUẢN LÝ TÀI KHOẢN, LOGS & MÃ NGUỒN ==================== -->
    <div id="codeExportModal" class="fixed inset-0 z-50 hidden items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        <div class="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-4xl w-full max-h-[88vh] flex flex-col shadow-2xl overflow-hidden">
            
            <!-- Modal Header -->
            <div class="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3">
                <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-xl theme-gradient-bg flex items-center justify-center text-white text-sm">
                        <i class="fa-solid fa-server"></i>
                    </div>
                    <div>
                        <h3 class="text-sm sm:text-base font-bold text-white">Bảng Điều Khiển Máy Chủ & Mã Nguồn (Render / Node.js)</h3>
                        <p class="text-[11px] text-slate-400">Kiểm tra danh sách tài khoản đã đăng ký, xem nhật ký hệ thống hoặc copy code</p>
                    </div>
                </div>
                <button type="button" onclick="closeCodeModal()" class="w-8 h-8 rounded-xl bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 flex items-center justify-center transition">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <!-- Modal Navigation Tabs -->
            <div class="px-6 pt-3 bg-slate-950/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto">
                <button type="button" onclick="switchModalTab('accounts')" id="modalTabAccounts"
                    class="px-4 py-2 text-xs font-bold rounded-t-xl border-b-2 border-indigo-500 text-indigo-300 bg-slate-900 flex items-center gap-2">
                    <i class="fa-solid fa-users"></i>
                    <span>Tài Khoản Đã Đăng Ký (<span id="modalAccCount">0</span>)</span>
                </button>
                <button type="button" onclick="switchModalTab('nodejs')" id="modalTabNodejs"
                    class="px-4 py-2 text-xs font-bold rounded-t-xl border-b-2 border-transparent text-slate-400 hover:text-white flex items-center gap-2">
                    <i class="fa-brands fa-node-js text-emerald-400"></i>
                    <span>Code server.js (Express / Render)</span>
                </button>
            </div>

            <!-- Modal Body -->
            <div class="p-6 overflow-y-auto flex-1 space-y-4">
                
                <!-- Tab 1: Accounts & Live Server Logs -->
                <div id="modalContentAccounts" class="space-y-5">
                    <div class="flex flex-wrap items-center justify-between gap-2">
                        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300">
                            Danh Sách Tài Khoản Trong Cơ Sở Dữ Liệu
                        </h4>
                        <button type="button" onclick="resetAllAccounts()" class="text-xs bg-rose-500/15 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-lg transition">
                            <i class="fa-solid fa-trash-can mr-1"></i>Xóa toàn bộ tài khoản (Reset về 0)
                        </button>
                    </div>

                    <div class="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950">
                        <table class="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr class="bg-slate-900/90 text-slate-400 border-b border-slate-800">
                                    <th class="py-3 px-4">#</th>
                                    <th class="py-3 px-4">Tên Tài Khoản</th>
                                    <th class="py-3 px-4">Email</th>
                                    <th class="py-3 px-4">Thời Gian Đăng Ký</th>
                                </tr>
                            </thead>
                            <tbody id="accountsTableBody" class="divide-y divide-slate-800/70 font-mono-code">
                                <!-- Injected by JS -->
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                            Nhật Ký Hoạt Động Máy Chủ (Render Console Logs)
                        </h4>
                        <div id="serverLogsContainer" class="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono-code text-xs h-48 overflow-y-auto space-y-2 text-slate-300">
                            <!-- Logs injected by JS -->
                        </div>
                    </div>
                </div>

                <!-- Tab 2: Node.js Express Code -->
                <div id="modalContentNodejs" class="hidden space-y-3">
                    <div class="flex flex-wrap items-center justify-between gap-2 bg-slate-950/90 p-3.5 rounded-2xl border border-slate-800">
                        <p class="text-xs text-slate-300">
                            Dán đoạn mã này vào tệp <code class="text-amber-300 font-mono-code">server.js</code> trên GitHub để triển khai lên <strong>Render</strong>.
                        </p>
                        <button type="button" onclick="copyNodejsCode()" id="copyNodeBtn"
                            class="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow">
                            <i class="fa-regular fa-copy"></i>
                            <span>Copy Code server.js</span>
                        </button>
                    </div>

                    <pre id="nodejsCodePre" class="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono-code text-[11px] leading-relaxed text-emerald-300 overflow-x-auto max-h-96 select-all">const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Danh sách tài khoản đã đăng ký (Khởi tạo 0 tài khoản - Bắt buộc đăng ký trước)
const registeredUsers = [];

// API Đăng ký tài khoản mới
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ ok: false, message: 'Vui lòng nhập đầy đủ thông tin!' });
    }
    const exists = registeredUsers.find(u => u.username.toLowerCase() === username.trim().toLowerCase());
    if (exists) {
        return res.status(409).json({ ok: false, message: 'Tài khoản này đã tồn tại!' });
    }
    const newUser = {
        username: username.trim(),
        email: email || '',
        password: password,
        createdAt: new Date().toISOString()
    };
    registeredUsers.push(newUser);
    console.log(`[REGISTER] Tài khoản mới: ${newUser.username} | Tổng: ${registeredUsers.length}`);
    return res.json({ ok: true, message: 'Đăng ký thành công! Bây giờ bạn có thể đăng nhập.' });
});

// API Đăng nhập (Kiểm tra tài khoản đã đăng ký chưa)
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = registeredUsers.find(
        u => u.username.toLowerCase() === (username || '').trim().toLowerCase()
    );
    if (!user) {
        console.log(`[LOGIN FAILED] Chưa đăng ký: ${username}`);
        return res.status(404).json({
            ok: false,
            unregistered: true,
            message: 'Tài khoản chưa được đăng ký! Vui lòng đăng ký trước.'
        });
    }
    if (user.password !== password) {
        console.log(`[LOGIN FAILED] Sai mật khẩu cho tài khoản: ${username}`);
        return res.status(401).json({ ok: false, message: 'Mật khẩu không chính xác!' });
    }
    console.log(`[LOGIN SUCCESS] Thành viên đăng nhập: ${user.username}`);
    return res.json({
        ok: true,
        user: { username: user.username, email: user.email }
    });
});

app.listen(PORT, () => console.log(`Server đang chạy tại cổng ${PORT}`));</pre>
                </div>

            </div>
        </div>
    </div>

    <!-- ==================== JAVASCRIPT LOGIC & ANIMATIONS ==================== -->
    <script>
        // 1. DANH SÁCH TÀI KHOẢN (Bắt đầu với 0 tài khoản - Chưa đăng ký không thể đăng nhập)
        let accountsDB = [];
        let lastAttemptedUsername = '';
        let sessionInterval = null;
        let sessionSeconds = 0;

        // 2. CHUYỂN ĐỔI CHỦ ĐỀ MÀU SẮC (3 THEMES)
        function setTheme(themeName) {
            if (themeName === 'nebula') {
                document.documentElement.removeAttribute('data-theme');
            } else {
                document.documentElement.setAttribute('data-theme', themeName);
            }

            const themes = ['nebula', 'emerald', 'sunset'];
            themes.forEach(t => {
                const btn = document.getElementById('themeBtn-' + t);
                if (t === themeName) {
                    btn.className = 'text-xs px-3 py-1 rounded-full font-semibold transition flex items-center gap-1.5 bg-white/15 text-white border border-white/30 shadow';
                } else {
                    btn.className = 'text-xs px-3 py-1 rounded-full font-medium transition flex items-center gap-1.5 text-slate-400 hover:text-white';
                }
            });
        }

        // 3. CHUYỂN ĐỔI TAB ĐĂNG NHẬP / ĐĂNG KÝ VỚI HIỆU ỨNG TRƯỢT MƯỢT MÀ
        function switchAuthTab(tab) {
            hideAlert();
            const loginForm = document.getElementById('loginForm');
            const registerForm = document.getElementById('registerForm');
            const pill = document.getElementById('tabSliderPill');
            const btnLogin = document.getElementById('tabBtnLogin');
            const btnRegister = document.getElementById('tabBtnRegister');
            const title = document.getElementById('cardMainTitle');
            const sub = document.getElementById('cardSubTitle');
            const icon = document.getElementById('cardHeaderIcon');

            if (tab === 'login') {
                pill.style.transform = 'translateX(0%)';
                loginForm.classList.remove('hidden');
                registerForm.classList.add('hidden');
                btnLogin.className = 'relative z-10 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-white';
                btnRegister.className = 'relative z-10 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-slate-400 hover:text-slate-200';
                title.innerText = 'Chào Mừng Trở Lại';
                sub.innerText = 'Đăng nhập vào hệ thống bảo mật • Bắt buộc đăng ký trước';
                icon.className = 'fa-solid fa-shield-halved text-2xl text-white';
            } else {
                pill.style.transform = 'translateX(100%)';
                loginForm.classList.add('hidden');
                registerForm.classList.remove('hidden');
                btnRegister.className = 'relative z-10 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-white';
                btnLogin.className = 'relative z-10 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-slate-400 hover:text-slate-200';
                title.innerText = 'Tạo Tài Khoản Mới';
                sub.innerText = 'Điền thông tin dưới đây để kích hoạt quyền truy cập';
                icon.className = 'fa-solid fa-user-astronaut text-2xl text-white';
            }
        }

        function jumpToRegisterWithUsername() {
            switchAuthTab('register');
            if (lastAttemptedUsername) {
                document.getElementById('regUsername').value = lastAttemptedUsername;
                document.getElementById('regEmail').focus();
            }
        }

        // 4. HIỂN THỊ THÔNG BÁO TRỰC QUAN
        function showAlert(type, message, offerRegisterJump = false) {
            const box = document.getElementById('authAlertBox');
            const icon = document.getElementById('authAlertIcon');
            const text = document.getElementById('authAlertText');
            const actionWrap = document.getElementById('authAlertActionWrap');

            box.classList.remove('hidden');
            text.innerHTML = message;

            if (offerRegisterJump) {
                actionWrap.classList.remove('hidden');
            } else {
                actionWrap.classList.add('hidden');
            }

            if (type === 'success') {
                box.className = 'mb-5 p-3.5 rounded-2xl text-xs font-medium border backdrop-blur-md bg-emerald-500/15 border-emerald-500/40 text-emerald-200';
                icon.className = 'fa-solid fa-circle-check mt-0.5 text-base text-emerald-400 shrink-0';
            } else if (type === 'info') {
                box.className = 'mb-5 p-3.5 rounded-2xl text-xs font-medium border backdrop-blur-md bg-indigo-500/15 border-indigo-500/40 text-indigo-200';
                icon.className = 'fa-solid fa-circle-info mt-0.5 text-base text-indigo-400 shrink-0';
            } else {
                box.className = 'mb-5 p-3.5 rounded-2xl text-xs font-medium border backdrop-blur-md bg-rose-500/15 border-rose-500/40 text-rose-200';
                icon.className = 'fa-solid fa-triangle-exclamation mt-0.5 text-base text-rose-400 shrink-0';
            }
        }

        function hideAlert() {
            document.getElementById('authAlertBox').classList.add('hidden');
        }

        // 5. HIỆN / ẨN MẬT KHẨU
        function togglePassword(inputId, btn) {
            const input = document.getElementById(inputId);
            const icon = btn.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.className = 'fa-regular fa-eye-slash text-indigo-400';
            } else {
                input.type = 'password';
                icon.className = 'fa-regular fa-eye';
            }
        }

        // 6. ĐÁNH GIÁ ĐỘ MẠNH MẬT KHẨU TRỰC TIẾP
        function evaluatePasswordStrength(val) {
            const bar1 = document.getElementById('strBar1');
            const bar2 = document.getElementById('strBar2');
            const bar3 = document.getElementById('strBar3');
            const label = document.getElementById('strengthLabel');

            bar1.className = 'h-1.5 rounded-full bg-slate-800 transition-colors duration-300';
            bar2.className = 'h-1.5 rounded-full bg-slate-800 transition-colors duration-300';
            bar3.className = 'h-1.5 rounded-full bg-slate-800 transition-colors duration-300';

            if (!val) {
                label.innerText = 'Chưa nhập';
                label.className = 'text-[11px] font-semibold text-slate-500';
                return;
            }

            let score = 0;
            if (val.length >= 4) score++;
            if (val.length >= 8 && /[A-Z0-9]/.test(val)) score++;
            if (val.length >= 10 && /[^A-Za-z0-9]/.test(val)) score++;

            if (score <= 1) {
                bar1.classList.replace('bg-slate-800', 'bg-rose-500');
                label.innerText = 'Yếu';
                label.className = 'text-[11px] font-semibold text-rose-400';
            } else if (score === 2) {
                bar1.classList.replace('bg-slate-800', 'bg-amber-400');
                bar2.classList.replace('bg-slate-800', 'bg-amber-400');
                label.innerText = 'Trung bình';
                label.className = 'text-[11px] font-semibold text-amber-400';
            } else {
                bar1.classList.replace('bg-slate-800', 'bg-emerald-400');
                bar2.classList.replace('bg-slate-800', 'bg-emerald-400');
                bar3.classList.replace('bg-slate-800', 'bg-emerald-400');
                label.innerText = 'Mạnh';
                label.className = 'text-[11px] font-semibold text-emerald-400';
            }
        }

        // 7. XỬ LÝ ĐĂNG KÝ TÀI KHOẢN MỚI
        function handleRegister(e) {
            e.preventDefault();
            const username = document.getElementById('regUsername').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('regConfirmPassword').value;

            if (password.length < 4) {
                showAlert('error', 'Mật khẩu phải có ít nhất 4 ký tự!');
                return;
            }

            if (password !== confirmPassword) {
                showAlert('error', 'Mật khẩu xác nhận không khớp! Vui lòng kiểm tra lại.');
                appendServerLog('REGISTER_ERR', `Đăng ký thất bại cho "${username}": Mật khẩu xác nhận không khớp.`);
                return;
            }

            const existing = accountsDB.find(
                a => a.username.toLowerCase() === username.toLowerCase() || a.email.toLowerCase() === email.toLowerCase()
            );

            if (existing) {
                showAlert('error', `Tài khoản <strong>"${username}"</strong> hoặc Email này đã được đăng ký!`);
                appendServerLog('REGISTER_ERR', `Từ chối đăng ký: Tài khoản "${username}" đã tồn tại.`);
                return;
            }

            const nowStr = new Date().toLocaleTimeString('vi-VN', { hour12: false });
            accountsDB.push({
                username,
                email,
                password,
                createdAt: nowStr
            });

            updateAccountsUI();
            appendServerLog('REGISTER_OK', `Đã tạo tài khoản mới: "${username}" (${email}). Tổng số tài khoản: ${accountsDB.length}`);

            document.getElementById('registerForm').reset();
            evaluatePasswordStrength('');
            switchAuthTab('login');
            document.getElementById('loginUsername').value = username;
            document.getElementById('loginPassword').value = '';
            document.getElementById('loginPassword').focus();

            showAlert('success', `🎉 Đăng ký tài khoản <strong>"${username}"</strong> thành công! Hãy nhập mật khẩu để đăng nhập.`);
        }

        // 8. XỬ LÝ ĐĂNG NHẬP (BẮT BUỘC ĐĂNG KÝ TRƯỚC)
        function handleLogin(e) {
            e.preventDefault();
            const userOrEmail = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value;

            const found = accountsDB.find(
                a => a.username.toLowerCase() === userOrEmail.toLowerCase() || a.email.toLowerCase() === userOrEmail.toLowerCase()
            );

            if (!found) {
                lastAttemptedUsername = userOrEmail;
                showAlert(
                    'error',
                    `Tài khoản <strong>"${userOrEmail}"</strong> chưa được đăng ký trên hệ thống! Bạn phải đăng ký tài khoản trước khi đăng nhập.`,
                    true
                );
                appendServerLog('LOGIN_BLOCKED', `Chặn đăng nhập: "${userOrEmail}" chưa đăng ký trong hệ thống.`);
                return;
            }

            if (found.password !== password) {
                showAlert('error', 'Mật khẩu không chính xác! Vui lòng thử lại.');
                appendServerLog('LOGIN_ERR', `Sai mật khẩu khi đăng nhập vào tài khoản "${found.username}".`);
                return;
            }

            // Đăng nhập thành công -> Chuyển sang giao diện Trang Chủ Thành Viên
            appendServerLog('LOGIN_OK', `Thành viên "${found.username}" đã đăng nhập thành công.`);
            enterMemberDashboard(found);
        }

        function enterMemberDashboard(account) {
            hideAlert();
            document.getElementById('authViewsWrapper').classList.add('hidden');
            document.getElementById('memberDashboardView').classList.remove('hidden');

            document.getElementById('cardMainTitle').innerText = 'Trang Chủ Thành Viên';
            document.getElementById('cardSubTitle').innerText = 'Phiên làm việc đã được xác thực an toàn';
            document.getElementById('cardHeaderIcon').className = 'fa-solid fa-circle-check text-2xl text-emerald-400';

            document.getElementById('dashAvatarChar').innerText = account.username.charAt(0).toUpperCase();
            document.getElementById('dashDisplayUser').innerText = account.username;
            document.getElementById('dashDisplayEmail').innerText = account.email;
            document.getElementById('dashLoginTimestamp').innerText = new Date().toLocaleTimeString('vi-VN', { hour12: false });

            sessionSeconds = 0;
            if (sessionInterval) clearInterval(sessionInterval);
            sessionInterval = setInterval(() => {
                sessionSeconds++;
                const mins = String(Math.floor(sessionSeconds / 60)).padStart(2, '0');
                const secs = String(sessionSeconds % 60).padStart(2, '0');
                document.getElementById('dashSessionTimer').innerText = `${mins}:${secs}`;
            }, 1000);
        }

        function handleLogout() {
            if (sessionInterval) clearInterval(sessionInterval);
            document.getElementById('memberDashboardView').classList.add('hidden');
            document.getElementById('authViewsWrapper').classList.remove('hidden');
            document.getElementById('loginPassword').value = '';
            switchAuthTab('login');
            showAlert('info', 'Bạn đã đăng xuất khỏi phiên làm việc an toàn.');
            appendServerLog('LOGOUT', 'Người dùng đã đăng xuất khỏi hệ thống.');
        }

        function handleForgotPassword() {
            if (accountsDB.length === 0) {
                showAlert('info', 'Hiện chưa có tài khoản nào được đăng ký. Hãy chuyển sang tab <strong>Đăng Ký</strong> để tạo tài khoản mới!', true);
            } else {
                showAlert('info', 'Mẹo: Bạn có thể bấm vào nút <strong>"Quản Lý Tài Khoản & Logs"</strong> ở góc dưới màn hình để kiểm tra các tài khoản đã đăng ký.');
            }
        }

        // 9. CẬP NHẬT BẢNG TÀI KHOẢN & LOGS MÁY CHỦ
        function updateAccountsUI() {
            document.getElementById('topAccountCounter').innerText = accountsDB.length;
            document.getElementById('modalAccCount').innerText = accountsDB.length;

            const tbody = document.getElementById('accountsTableBody');
            tbody.innerHTML = '';

            if (accountsDB.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="4" class="py-8 px-4 text-center text-slate-500 font-sans">
                            Chưa có tài khoản nào (0 tài khoản). Mọi yêu cầu đăng nhập sẽ bị từ chối cho tới khi đăng ký.
                        </td>
                    </tr>
                `;
                return;
            }

            accountsDB.forEach((acc, i) => {
                const tr = document.createElement('tr');
                tr.className = 'hover:bg-slate-900/60';
                tr.innerHTML = `
                    <td class="py-3 px-4 text-slate-500">${i + 1}</td>
                    <td class="py-3 px-4 text-indigo-300 font-semibold">${acc.username}</td>
                    <td class="py-3 px-4 text-slate-300">${acc.email}</td>
                    <td class="py-3 px-4 text-slate-400">${acc.createdAt}</td>
                `;
                tbody.appendChild(tr);
            });
        }

        function appendServerLog(tag, text) {
            const time = new Date().toLocaleTimeString('vi-VN', { hour12: false });
            document.getElementById('footerLastLog').innerText = `[${time}] ${text}`;

            const container = document.getElementById('serverLogsContainer');
            const line = document.createElement('div');
            line.className = 'py-1 border-b border-slate-800/60 flex items-start gap-2';
            line.innerHTML = `
                <span class="text-slate-500 shrink-0">[${time}]</span>
                <span class="text-indigo-400 font-semibold shrink-0">[${tag}]</span>
                <span class="text-slate-200">${text}</span>
            `;
            container.appendChild(line);
            container.scrollTop = container.scrollHeight;
        }

        function resetAllAccounts() {
            accountsDB = [];
            updateAccountsUI();
            handleLogout();
            appendServerLog('RESET', 'Đã xóa toàn bộ tài khoản về 0.');
        }

        // 10. ĐIỀU KHIỂN MODAL XEM CODE & QUẢN LÝ
        function openCodeModal(defaultTab) {
            const modal = document.getElementById('codeExportModal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            switchModalTab(defaultTab || 'accounts');
        }

        function closeCodeModal() {
            const modal = document.getElementById('codeExportModal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }

        function switchModalTab(tab) {
            const accContent = document.getElementById('modalContentAccounts');
            const nodeContent = document.getElementById('modalContentNodejs');
            const tabAcc = document.getElementById('modalTabAccounts');
            const tabNode = document.getElementById('modalTabNodejs');

            if (tab === 'accounts') {
                accContent.classList.remove('hidden');
                nodeContent.classList.add('hidden');
                tabAcc.className = 'px-4 py-2 text-xs font-bold rounded-t-xl border-b-2 border-indigo-500 text-indigo-300 bg-slate-900 flex items-center gap-2';
                tabNode.className = 'px-4 py-2 text-xs font-bold rounded-t-xl border-b-2 border-transparent text-slate-400 hover:text-white flex items-center gap-2';
            } else {
                accContent.classList.add('hidden');
                nodeContent.classList.remove('hidden');
                tabNode.className = 'px-4 py-2 text-xs font-bold rounded-t-xl border-b-2 border-indigo-500 text-indigo-300 bg-slate-900 flex items-center gap-2';
                tabAcc.className = 'px-4 py-2 text-xs font-bold rounded-t-xl border-b-2 border-transparent text-slate-400 hover:text-white flex items-center gap-2';
            }
        }

        function copyNodejsCode() {
            const code = document.getElementById('nodejsCodePre').innerText;
            const temp = document.createElement('textarea');
            temp.value = code;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand('copy');
            document.body.removeChild(temp);

            const btn = document.getElementById('copyNodeBtn');
            const oldHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-check"></i> <span>Đã Copy!</span>';
            setTimeout(() => { btn.innerHTML = oldHTML; }, 2000);
        }

        // 11. HIỆU ỨNG HẠT ÁNH SÁNG TƯƠNG TÁC CHUỘT (HTML5 CANVAS STARFIELD)
        const canvas = document.getElementById('starfieldCanvas');
        const ctx = canvas.getContext('2d');
        let stars = [];
        let mouse = { x: -1000, y: -1000 };

        function resizeStarfield() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        }

        function initStars() {
            stars = [];
            const count = Math.min(90, Math.floor((canvas.width * canvas.height) / 14000));
            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.35,
                    vy: (Math.random() - 0.5) * 0.35,
                    radius: Math.random() * 1.8 + 0.6,
                    alpha: Math.random() * 0.65 + 0.25
                });
            }
        }

        window.addEventListener('resize', resizeStarfield);
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        function animateStarfield() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < stars.length; i++) {
                const s = stars[i];
                s.x += s.vx;
                s.y += s.vy;

                if (s.x < 0) s.x = canvas.width;
                if (s.x > canvas.width) s.x = 0;
                if (s.y < 0) s.y = canvas.height;
                if (s.y > canvas.height) s.y = 0;

                // Tương tác đẩy nhẹ khi di chuột lại gần
                const dx = mouse.x - s.x;
                const dy = mouse.y - s.y;
                const dist = Math.hypot(dx, dy);
                if (dist < 110) {
                    s.x -= (dx / dist) * 0.8;
                    s.y -= (dy / dist) * 0.8;
                }

                ctx.beginPath();
                ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(226, 232, 240, ${s.alpha})`;
                ctx.fill();

                // Vẽ đường nối mảnh giữa các hạt gần chuột
                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(s.x, s.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(165, 180, 252, ${(1 - dist / 130) * 0.25})`;
                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                }
            }
            requestAnimationFrame(animateStarfield);
        }

        window.onload = function () {
            resizeStarfield();
            animateStarfield();
            updateAccountsUI();
            appendServerLog('READY', 'Khởi tạo hệ thống hoàn tất (0 tài khoản). Chưa đăng ký không thể đăng nhập.');
        };
    </script>
</body>
</html>
