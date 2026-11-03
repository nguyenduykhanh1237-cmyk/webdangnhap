<!DOCTYPE html>
<html lang="vi" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MochiSquish — Tiệm Squishy & Đồ Chơi Bóp Mềm Dễ Thương</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <!-- Google Fonts: Fredoka (Rounded Display) & Quicksand (Cute Body) -->
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Quicksand:wght@500;600;700&display=swap" rel="stylesheet">

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        peach: {
                            50: '#FFF9FB',
                            100: '#FFE5EC',
                            200: '#FFC2D1',
                            300: '#FFB3C6',
                            400: '#FF8FAB',
                            500: '#FB6F92',
                            600: '#E04D75'
                        },
                        mint: {
                            100: '#E8FBF2',
                            200: '#C7F5DF',
                            300: '#A8E6CF',
                            500: '#38B28B',
                            700: '#237A5E'
                        },
                        butter: {
                            100: '#FFFBE6',
                            200: '#FFF3B0',
                            400: '#F59E0B'
                        },
                        lavender: {
                            100: '#F4ECFA',
                            200: '#E2CFEA',
                            500: '#9B5DE5',
                            700: '#6C35B5'
                        },
                        cocoa: '#4A3540'
                    },
                    fontFamily: {
                        display: ['"Fredoka"', 'sans-serif'],
                        sans: ['"Quicksand"', 'sans-serif']
                    }
                }
            }
        }
    </script>

    <style>
        body {
            font-family: 'Quicksand', sans-serif;
            background-color: #FFF9FB;
            color: #4A3540;
            overflow-x: hidden;
        }
        .font-cute {
            font-family: 'Fredoka', sans-serif;
        }

        /* Custom Pastel Scrollbar */
        ::-webkit-scrollbar {
            width: 10px;
            height: 10px;
        }
        ::-webkit-scrollbar-track {
            background: #FFF9FB;
        }
        ::-webkit-scrollbar-thumb {
            background: #FFB3C6;
            border-radius: 9999px;
            border: 2px solid #FFF9FB;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #FF8FAB;
        }

        /* Squishy Elastic Physics Animation */
        .squish-target {
            transform-origin: center bottom;
            transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
            will-change: transform;
        }
        .squish-btn {
            transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
        }
        .squish-btn:hover {
            transform: translateY(-2px) scale(1.03);
        }
        .squish-btn:active {
            transform: scaleX(1.12) scaleY(0.86);
        }

        /* Card Hover Jelly Effect */
        .squishy-card {
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            border: 2.5px solid #FFE5EC;
        }
        .squishy-card:hover {
            transform: translateY(-6px);
            border-color: #FF8FAB;
            box-shadow: 0 18px 35px -10px rgba(255, 143, 171, 0.35);
        }

        @keyframes floatBubble {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(2deg); }
        }
        .animate-bubble {
            animation: floatBubble 3.8s ease-in-out infinite;
        }

        .pastel-backdrop {
            background: rgba(74, 53, 64, 0.45);
            backdrop-filter: blur(5px);
        }
    </style>
</head>
<body class="min-h-screen flex flex-col selection:bg-peach-200 selection:text-cocoa">

    <!-- Confetti Canvas for Order Success -->
    <canvas id="confettiCanvas" class="fixed inset-0 pointer-events-none z-50 hidden"></canvas>

    <!-- =====================================================
         TOP KAWAII PROMO BAR
         ===================================================== -->
    <div class="bg-gradient-to-r from-peach-400 via-lavender-500 to-mint-500 text-white text-xs sm:text-sm py-2 px-4 font-semibold shadow-xs">
        <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full bg-butter-200 text-cocoa font-cute text-[11px] uppercase tracking-wider shadow-2xs">Siêu hội bóp mềm</span>
                <span>Nhập mã <strong class="underline cursor-pointer text-butter-200" onclick="quickApplyCoupon('CAPYBARA')">CAPYBARA</strong> giảm 15% • Đơn từ 250K Freeship + Tặng túi mù Squishy!</span>
            </div>
            <div class="hidden md:flex items-center gap-4 text-xs">
                <span><i class="fa-solid fa-wand-magic-sparkles mr-1 text-butter-200"></i>100% PU Foam Chậm Tăng Thơm Phức</span>
                <span>•</span>
                <span><i class="fa-solid fa-gift mr-1 text-butter-200"></i>Tặng kèm Túi Zip bảo quản</span>
            </div>
        </div>
    </div>

    <!-- =====================================================
         STICKY KAWAII HEADER
         ===================================================== -->
    <header class="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b-2 border-peach-100 shadow-xs">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
            <!-- Brand Logo -->
            <a href="#" class="flex items-center gap-3 group">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-peach-400 to-peach-300 p-1 shadow-md shadow-peach-300/50 flex items-center justify-center group-hover:scale-110 transition">
                    <!-- Mini Cute Mochi SVG Icon -->
                    <svg viewBox="0 0 64 64" class="w-9 h-9">
                        <ellipse cx="32" cy="36" rx="24" ry="20" fill="#FFF9FB"/>
                        <circle cx="23" cy="34" r="3" fill="#4A3540"/>
                        <circle cx="41" cy="34" r="3" fill="#4A3540"/>
                        <ellipse cx="17" cy="38" rx="4" ry="2.2" fill="#FF8FAB"/>
                        <ellipse cx="47" cy="38" rx="4" ry="2.2" fill="#FF8FAB"/>
                        <path d="M28 38 Q32 42 36 38" stroke="#4A3540" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                        <path d="M28 16 Q32 8 38 14 Q34 20 28 16 Z" fill="#A8E6CF"/>
                    </svg>
                </div>
                <div>
                    <div class="flex items-center gap-1.5">
                        <span class="font-cute text-2xl sm:text-3xl font-bold tracking-tight text-peach-500">Mochi</span>
                        <span class="font-cute text-2xl sm:text-3xl font-bold tracking-tight text-lavender-500">Squish</span>
                        <span class="text-xs px-2 py-0.5 rounded-full bg-mint-200 text-mint-700 font-bold hidden sm:inline-block">Kawaii Shop</span>
                    </div>
                    <span class="text-[11px] font-bold text-stone-400 block -mt-1">Tiệm Đồ Chơi Bóp Mềm & Túi Mù Giảm Stress</span>
                </div>
            </a>

            <!-- Navigation Links -->
            <nav class="hidden lg:flex items-center gap-6 text-sm font-bold text-cocoa">
                <a href="#shopSection" onclick="filterCategory('Tất cả')" class="hover:text-peach-500 transition">Tất Cả Squishy</a>
                <a href="#shopSection" onclick="filterCategory('Thú Cưng Kawaii')" class="hover:text-peach-500 transition">Thú Cưng Kawaii</a>
                <a href="#shopSection" onclick="filterCategory('Tiệm Bánh Ngọt')" class="hover:text-peach-500 transition">Tiệm Bánh Ngọt</a>
                <a href="#shopSection" onclick="filterCategory('Hàng Hiếm Limited')" class="hover:text-peach-500 transition">Hàng Hiếm Limited</a>
                <a href="#shopSection" onclick="filterCategory('Combo Quà Tặng')" class="hover:text-peach-500 transition">Combo Quà Tặng</a>
            </nav>

            <!-- Right Action Buttons -->
            <div class="flex items-center gap-2 sm:gap-2.5">
                <!-- Sound FX Toggle -->
                <button id="soundToggleBtn" onclick="toggleSoundFX()" class="squish-btn w-10 h-10 rounded-2xl bg-butter-100 hover:bg-butter-200 text-amber-600 border border-amber-200 flex items-center justify-center" title="Bật/Tắt âm thanh bóp Squishy">
                    <i id="soundIcon" class="fa-solid fa-volume-high"></i>
                </button>

                <!-- Order History -->
                <button onclick="openOrdersModal()" class="squish-btn relative w-10 h-10 rounded-2xl bg-lavender-100 hover:bg-lavender-200 text-lavender-700 border border-lavender-200 flex items-center justify-center" title="Đơn hàng đã đặt">
                    <i class="fa-solid fa-box-open"></i>
                    <span id="orderHistoryBadge" class="hidden absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-lavender-500 text-white text-[10px] font-bold items-center justify-center">0</span>
                </button>

                <!-- User Login / Profile -->
                <div id="headerUserBox">
                    <button onclick="openAuthModal('login')" class="squish-btn px-3.5 py-2 rounded-2xl bg-peach-100 hover:bg-peach-200 text-peach-600 font-bold text-xs sm:text-sm flex items-center gap-2">
                        <i class="fa-solid fa-face-smile-wink text-base"></i>
                        <span class="hidden sm:inline">Đăng nhập</span>
                    </button>
                </div>

                <!-- Cart Button -->
                <button id="headerCartBtn" onclick="toggleCartDrawer(true)" class="squish-btn relative px-4 py-2.5 rounded-2xl bg-gradient-to-r from-peach-500 to-peach-400 hover:from-peach-600 hover:to-peach-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-peach-400/30 flex items-center gap-2">
                    <i class="fa-solid fa-basket-shopping text-base"></i>
                    <span class="hidden sm:inline">Giỏ Squishy</span>
                    <span id="headerCartCount" class="px-2 py-0.5 rounded-full bg-white text-peach-600 font-cute text-xs">0</span>
                </button>
            </div>
        </div>
    </header>

    <!-- =====================================================
         HERO BANNER WITH INTERACTIVE GIANT CAPYBARA SQUISHY
         ===================================================== -->
    <section class="relative overflow-hidden bg-gradient-to-b from-peach-100/60 via-peach-50 to-peach-50 pt-6 pb-12 sm:py-12">
        <!-- Decorative Pastel Blobs -->
        <div class="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-mint-200/40 blur-3xl pointer-events-none"></div>
        <div class="absolute top-10 right-10 w-72 h-72 rounded-full bg-lavender-200/40 blur-3xl pointer-events-none"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <!-- Left Column: Hero Copy -->
                <div class="lg:col-span-7 space-y-5">
                    <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-peach-200 shadow-2xs text-peach-600 text-xs sm:text-sm font-bold">
                        <span class="w-2.5 h-2.5 rounded-full bg-peach-500 animate-ping"></span>
                        <span>Thế Giới Squishy Chậm Tăng Siêu Mềm Mịn • Thơm Lừng Hương Bánh Sữa</span>
                    </div>

                    <h1 class="font-cute text-4xl sm:text-5xl lg:text-6xl text-cocoa leading-[1.15]">
                        Bóp Mềm Tan Mọi <span class="text-peach-500 underline decoration-wavy decoration-mint-300">Áp Lực</span> Cùng Hội Bạn <span class="text-lavender-500">MochiSquish!</span>
                    </h1>

                    <p class="text-stone-600 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
                        Từ <strong>Capybara đội quất ngâm mình</strong>, <strong>Mèo Mochi đào tiên</strong> đến <strong>Bánh sừng bò bơ Pháp</strong> — tất cả đều làm từ PU Foam cao cấp an toàn, bóp xẹp rồi từ từ phồng căng cực đã tay!
                    </p>

                    <div class="flex flex-wrap items-center gap-3.5 pt-1">
                        <a href="#shopSection" class="squish-btn px-6 py-3.5 rounded-2xl bg-gradient-to-r from-peach-500 to-peach-400 text-white font-cute text-base shadow-lg shadow-peach-400/35 flex items-center gap-2">
                            <span>Săn Squishy Ngay</span>
                            <i class="fa-solid fa-paw"></i>
                        </a>
                        <button onclick="squishHeroMascot()" class="squish-btn px-5 py-3.5 rounded-2xl bg-butter-200 hover:bg-amber-200 text-cocoa font-cute text-base border-2 border-amber-300 shadow-sm flex items-center gap-2">
                            <i class="fa-solid fa-hand-sparkles text-amber-600"></i>
                            <span>Bóp Thử Capybara Khổng Lồ!</span>
                        </button>
                    </div>

                    <!-- 3 Cute Badges -->
                    <div class="grid grid-cols-3 gap-3 pt-4 max-w-xl">
                        <div class="bg-white/90 p-3 rounded-2xl border-2 border-peach-100 text-center">
                            <div class="font-cute text-xl text-peach-500">10s - 15s</div>
                            <div class="text-xs font-bold text-stone-500">Độ chậm tăng cực đỉnh</div>
                        </div>
                        <div class="bg-white/90 p-3 rounded-2xl border-2 border-mint-200 text-center">
                            <div class="font-cute text-xl text-mint-700">100% Thơm</div>
                            <div class="text-xs font-bold text-stone-500">Hương Đào, Sữa & Vani</div>
                        </div>
                        <div class="bg-white/90 p-3 rounded-2xl border-2 border-lavender-200 text-center">
                            <div class="font-cute text-xl text-lavender-700">Quà Tặng</div>
                            <div class="text-xs font-bold text-stone-500">Kèm Túi Zip & Sticker</div>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Interactive Hero Squishy Playground -->
                <div class="lg:col-span-5">
                    <div class="bg-gradient-to-br from-white via-peach-50 to-butter-100 rounded-[2.5rem] p-6 border-4 border-white shadow-2xl relative text-center">
                        <!-- Top Status Pill -->
                        <div class="flex items-center justify-between mb-2">
                            <span class="px-3 py-1 rounded-full bg-peach-100 text-peach-600 font-cute text-xs">
                                🔥 Best Seller Tuần Này
                            </span>
                            <span id="heroSquishCounter" class="px-3 py-1 rounded-full bg-mint-100 text-mint-700 font-bold text-xs">
                                Đã bóp: 0 lần
                            </span>
                        </div>

                        <!-- Interactive Capybara SVG Area -->
                        <div onclick="squishHeroMascot()" class="cursor-pointer py-4 select-none relative group" title="Nhấn vào mình để bóp thử nhé!">
                            <div id="heroMascotWrapper" class="squish-target w-56 h-56 mx-auto flex items-center justify-center">
                                <!-- Giant Cute Capybara with Tangerine SVG -->
                                <svg viewBox="0 0 200 200" class="w-full h-full drop-shadow-md">
                                    <!-- Water Tub Ripple -->
                                    <ellipse cx="100" cy="172" rx="76" ry="16" fill="#A8E6CF" opacity="0.7"/>
                                    <ellipse cx="100" cy="170" rx="64" ry="11" fill="#FFF9FB" opacity="0.8"/>
                                    <!-- Capybara Chubby Body -->
                                    <rect x="42" y="75" width="116" height="92" rx="46" fill="#D49B6A" stroke="#4A3540" stroke-width="4.5"/>
                                    <ellipse cx="100" cy="132" rx="40" ry="28" fill="#E6B88A"/>
                                    <!-- Cute Ears -->
                                    <ellipse cx="56" cy="78" rx="12" ry="9" transform="rotate(-25 56 78)" fill="#B57C4E" stroke="#4A3540" stroke-width="4"/>
                                    <ellipse cx="144" cy="78" rx="12" ry="9" transform="rotate(25 144 78)" fill="#B57C4E" stroke="#4A3540" stroke-width="4"/>
                                    <!-- Tangerine (Quả Quất) on Head -->
                                    <ellipse cx="100" cy="56" rx="20" ry="15" fill="#FF9F1C" stroke="#4A3540" stroke-width="4"/>
                                    <path d="M100 41 Q108 30 116 38 Q108 45 100 41 Z" fill="#38B28B" stroke="#4A3540" stroke-width="3"/>
                                    <!-- Snout & Cheeks -->
                                    <ellipse cx="100" cy="110" rx="24" ry="17" fill="#B57C4E"/>
                                    <ellipse cx="64" cy="112" rx="9" ry="5.5" fill="#FF8FAB" opacity="0.85"/>
                                    <ellipse cx="136" cy="112" rx="9" ry="5.5" fill="#FF8FAB" opacity="0.85"/>
                                    <!-- Happy Closed Eyes -->
                                    <path d="M64 98 Q71 91 78 98" stroke="#4A3540" stroke-width="4.5" fill="none" stroke-linecap="round"/>
                                    <path d="M122 98 Q129 91 136 98" stroke="#4A3540" stroke-width="4.5" fill="none" stroke-linecap="round"/>
                                    <!-- Nose & Mouth -->
                                    <path d="M95 104 L105 104 L100 110 Z" fill="#4A3540"/>
                                    <path d="M100 110 L100 118 M92 118 Q100 123 108 118" stroke="#4A3540" stroke-width="3.5" fill="none" stroke-linecap="round"/>
                                    <!-- Cute Paws -->
                                    <ellipse cx="68" cy="152" rx="13" ry="9" fill="#B57C4E" stroke="#4A3540" stroke-width="4"/>
                                    <ellipse cx="132" cy="152" rx="13" ry="9" fill="#B57C4E" stroke="#4A3540" stroke-width="4"/>
                                </svg>
                            </div>
                            <span id="heroSquishStateBadge" class="inline-block mt-1 px-3.5 py-1 rounded-full bg-white/90 border border-peach-200 text-xs font-bold text-peach-600 shadow-2xs">
                                👆 Nhấn vào Capybara để bóp thử! (Slow-rising 12s)
                            </span>
                        </div>

                        <!-- Bottom Quick Add Hero Card -->
                        <div class="bg-white rounded-2xl p-3.5 border-2 border-peach-100 flex items-center justify-between gap-2 text-left mt-2">
                            <div>
                                <div class="font-cute text-base text-cocoa">Capybara Đội Quất Ngâm Mình</div>
                                <div class="text-xs text-stone-500">Hương Cam Đào • Chậm tăng 12 giây</div>
                                <div class="text-peach-600 font-cute text-lg">89.000đ <span class="text-xs text-stone-400 line-through font-sans">120.000đ</span></div>
                            </div>
                            <button onclick="addToCart(1, 'Hương Đào Ngọt', 'Bản Tiêu Chuẩn', 0, 1)" class="squish-btn px-4 py-2.5 rounded-xl bg-peach-500 hover:bg-peach-600 text-white font-cute text-xs sm:text-sm shadow-md">
                                + Thêm vào giỏ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- =====================================================
         MAIN CATALOG SECTION: 12 KAWAII SQUISHY ITEMS
         ===================================================== -->
    <main id="shopSection" class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">

        <!-- Section Heading -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
                <span class="text-xs font-bold uppercase tracking-widest text-peach-500">Kệ Hàng Thơm Phức</span>
                <h2 class="font-cute text-3xl sm:text-4xl text-cocoa mt-0.5">Khám Phá 12 Bé Squishy Siêu Đáng Yêu</h2>
            </div>
            <p class="text-xs sm:text-sm font-semibold text-stone-500">
                💡 Mẹo nhỏ: Bạn có thể bấm nút <strong>"Bóp thử!"</strong> trên từng thẻ sản phẩm để cảm nhận độ phồng chậm tăng nhé!
            </p>
        </div>

        <!-- Filter & Search Bar -->
        <div class="bg-white rounded-3xl p-4 sm:p-5 border-2 border-peach-100 shadow-xs mb-7 space-y-4">
            <!-- Category Filter Pills -->
            <div id="categoryFilterBar" class="flex items-center gap-2 overflow-x-auto pb-1">
                <!-- Populated by JS -->
            </div>

            <!-- Search, Sort & Wishlist Filter -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-3 pt-3 border-t border-peach-100">
                <div class="md:col-span-6 relative">
                    <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-peach-400 text-sm"></i>
                    <input id="searchInput" type="text" oninput="renderProductGrid()"
                           placeholder="Tìm tên bé Squishy (VD: Capybara, Mèo Mochi, Bánh bao, Corgi, Dâu tây...)"
                           class="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-peach-50/70 border-2 border-peach-100 text-sm font-semibold focus:outline-none focus:border-peach-400 focus:bg-white transition">
                    <button id="clearSearchBtn" onclick="clearSearchInput()" class="hidden absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-peach-500">
                        <i class="fa-solid fa-circle-xmark"></i>
                    </button>
                </div>

                <div class="md:col-span-4">
                    <select id="sortSelect" onchange="renderProductGrid()" class="w-full px-4 py-2.5 rounded-2xl bg-peach-50/70 border-2 border-peach-100 text-sm font-bold text-cocoa focus:outline-none focus:border-peach-400">
                        <option value="featured">✨ Sắp xếp: Được yêu thích nhất</option>
                        <option value="slow-desc">⏳ Độ chậm tăng: Lâu nhất (15s → 8s)</option>
                        <option value="price-asc">💰 Giá: Thấp đến Cao</option>
                        <option value="price-desc">💎 Giá: Cao đến Thấp</option>
                    </select>
                </div>

                <div class="md:col-span-2 flex items-center justify-between md:justify-end gap-2">
                    <button id="wishlistFilterBtn" onclick="toggleWishlistMode()" class="squish-btn w-full md:w-auto px-4 py-2.5 rounded-2xl border-2 border-peach-200 bg-white text-peach-600 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5">
                        <i class="fa-solid fa-heart text-peach-500"></i>
                        <span>Yêu thích (<span id="wishlistCounter">0</span>)</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Product Grid (12 Items) -->
        <div id="productGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <!-- Rendered by JS -->
        </div>

        <!-- Empty State -->
        <div id="emptyGridState" class="hidden bg-white rounded-3xl p-12 text-center border-2 border-peach-100 my-4">
            <div class="w-16 h-16 rounded-full bg-peach-100 text-peach-500 flex items-center justify-center mx-auto text-2xl mb-3">
                <i class="fa-solid fa-face-sad-tear"></i>
            </div>
            <h3 class="font-cute text-xl text-cocoa">Chưa tìm thấy bé Squishy nào khớp từ khóa</h3>
            <p class="text-sm text-stone-500 mt-1 mb-4">Bạn thử tìm từ khóa khác hoặc xem toàn bộ 12 bé Squishy trên kệ nhé!</p>
            <button onclick="resetAllFilters()" class="squish-btn px-5 py-2.5 rounded-2xl bg-peach-500 text-white font-cute text-sm">
                Xem Tất Cả 12 Sản Phẩm
            </button>
        </div>
    </main>

    <!-- =====================================================
         VOUCHER & KAWAII GUARANTEE BANNER
         ===================================================== -->
    <section class="bg-white border-y-2 border-peach-100 py-10 mt-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
            <div class="rounded-3xl bg-gradient-to-r from-peach-100/80 via-butter-100 to-mint-100 p-6 sm:p-8 border-2 border-peach-200">
                <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div>
                        <span class="px-3 py-1 rounded-full bg-white text-peach-600 font-cute text-xs">🎁 Trạm Phát Kẹo Bông & Voucher</span>
                        <h3 class="font-cute text-2xl sm:text-3xl text-cocoa mt-2">Lưu Mã Giảm Giá Cho Giỏ Hàng Của Bạn</h3>
                        <p class="text-xs sm:text-sm font-semibold text-stone-600 mt-1">Nhấn "Dùng ngay" để áp dụng trực tiếp vào giỏ hàng nhé!</p>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div class="bg-white rounded-2xl p-3.5 border-2 border-dashed border-peach-300 flex items-center justify-between gap-3">
                            <div>
                                <span class="font-cute text-base text-peach-500 block">CAPYBARA</span>
                                <span class="text-[11px] font-bold text-stone-500">Giảm 15% tổng đơn</span>
                            </div>
                            <button onclick="quickApplyCoupon('CAPYBARA')" class="squish-btn px-3 py-1.5 rounded-xl bg-peach-500 text-white font-bold text-xs">
                                Dùng ngay
                            </button>
                        </div>

                        <div class="bg-white rounded-2xl p-3.5 border-2 border-dashed border-lavender-500 flex items-center justify-between gap-3">
                            <div>
                                <span class="font-cute text-base text-lavender-700 block">MOCHI20</span>
                                <span class="text-[11px] font-bold text-stone-500">Giảm ngay 20.000đ</span>
                            </div>
                            <button onclick="quickApplyCoupon('MOCHI20')" class="squish-btn px-3 py-1.5 rounded-xl bg-lavender-500 text-white font-bold text-xs">
                                Dùng ngay
                            </button>
                        </div>

                        <div class="bg-white rounded-2xl p-3.5 border-2 border-dashed border-mint-500 flex items-center justify-between gap-3">
                            <div>
                                <span class="font-cute text-base text-mint-700 block">FREESHIP</span>
                                <span class="text-[11px] font-bold text-stone-500">Miễn phí vận chuyển</span>
                            </div>
                            <button onclick="quickApplyCoupon('FREESHIP')" class="squish-btn px-3 py-1.5 rounded-xl bg-mint-500 text-white font-bold text-xs">
                                Dùng ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- =====================================================
         FOOTER
         ===================================================== -->
    <footer class="bg-cocoa text-peach-50 pt-10 pb-8 text-xs sm:text-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-white/10">
            <div class="space-y-2.5">
                <div class="font-cute text-2xl text-peach-300">MochiSquish 🐾</div>
                <p class="text-xs text-peach-100/80 leading-relaxed">
                    Thiên đường đồ chơi Squishy bóp mềm chậm tăng, túi mù Blindbag và quà tặng Kawaii chất liệu PU Foam an toàn, hương thơm dễ chịu giúp giải tỏa căng thẳng sau giờ học và làm việc.
                </p>
            </div>
            <div>
                <h4 class="font-cute text-base text-butter-200 mb-2.5">Cam Kết Từ Tiệm MochiSquish</h4>
                <ul class="space-y-1.5 text-xs text-peach-100/80">
                    <li>✨ Chất liệu PU Foam không độc hại, đàn hồi chậm tăng 8-15 giây</li>
                    <li>🍓 Tặng kèm bao bì túi Zip chính hãng & Sticker mỗi đơn</li>
                    <li>🎀 Hỗ trợ gói quà hộp nơ hồng & viết thiệp tay miễn phí</li>
                </ul>
            </div>
            <div>
                <h4 class="font-cute text-base text-mint-300 mb-2.5">Liên Hệ Cửa Hàng</h4>
                <ul class="space-y-1.5 text-xs text-peach-100/80">
                    <li>📍 Cơ sở 1: 128 Chùa Bộc, Đống Đa, Hà Nội</li>
                    <li>📍 Cơ sở 2: 215 Nguyễn Trãi, Quận 1, TP.HCM</li>
                    <li>📞 Hotline CSKH: 1900 8866 (08:30 - 21:30)</li>
                </ul>
            </div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 pt-5 flex flex-wrap justify-between text-xs text-peach-200/70">
            <span>© 2026 MochiSquish Kawaii Store. Made with Pastel Love 💖</span>
            <span>Thanh toán an toàn: COD • VietQR • Ví MoMo</span>
        </div>
    </footer>

    <!-- =====================================================
         TOAST NOTIFICATION CONTAINER
         ===================================================== -->
    <div id="toastContainer" class="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"></div>

    <!-- =====================================================
         SLIDE-OVER SHOPPING CART DRAWER
         ===================================================== -->
    <div id="cartBackdrop" onclick="toggleCartDrawer(false)" class="fixed inset-0 z-40 hidden pastel-backdrop transition-opacity"></div>
    <aside id="cartDrawer" class="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl transform translate-x-full transition-transform duration-300 flex flex-col border-l-4 border-peach-200">
        <!-- Drawer Header -->
        <div class="p-5 bg-gradient-to-r from-peach-100 to-lavender-100 border-b-2 border-peach-200 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
                <div class="w-10 h-10 rounded-2xl bg-peach-500 text-white flex items-center justify-center shadow-xs">
                    <i class="fa-solid fa-basket-shopping"></i>
                </div>
                <div>
                    <h3 class="font-cute text-lg text-cocoa leading-none">Giỏ Squishy Của Bạn</h3>
                    <span id="drawerCountLabel" class="text-xs font-bold text-peach-600">0 bé trong giỏ</span>
                </div>
            </div>
            <button onclick="toggleCartDrawer(false)" class="w-8 h-8 rounded-xl bg-white hover:bg-peach-50 text-cocoa border border-peach-200 flex items-center justify-center">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>

        <!-- Freeship + Free Capybara Sticker Progress Bar -->
        <div class="px-5 py-3 bg-mint-100/70 border-b border-mint-200 text-xs">
            <div id="freeshipPrompt" class="font-bold text-mint-700 mb-1.5">
                Mua thêm <strong>250.000đ</strong> để được <strong>Freeship + Tặng Sticker Capybara</strong>!
            </div>
            <div class="w-full h-2 bg-white rounded-full overflow-hidden border border-mint-300">
                <div id="freeshipBar" class="h-full bg-gradient-to-r from-mint-500 to-peach-400 transition-all duration-300" style="width: 0%"></div>
            </div>
        </div>

        <!-- Cart Items List -->
        <div id="cartItemsContainer" class="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
            <!-- Rendered by JS -->
        </div>

        <!-- Cart Footer -->
        <div class="p-5 bg-peach-50 border-t-2 border-peach-100 space-y-4">
            <!-- Promo Code Input -->
            <div>
                <div class="flex gap-2">
                    <input id="couponInput" type="text" placeholder="Mã giảm giá (CAPYBARA, MOCHI20, FREESHIP)"
                           class="flex-1 px-3.5 py-2 rounded-xl bg-white border-2 border-peach-200 text-xs font-bold uppercase focus:outline-none focus:border-peach-500">
                    <button onclick="applyInputCoupon()" class="squish-btn px-4 py-2 rounded-xl bg-cocoa text-white font-bold text-xs">
                        Áp dụng
                    </button>
                </div>
                <div id="activeCouponBox" class="hidden mt-2 items-center justify-between px-3 py-1.5 rounded-xl bg-mint-100 border border-mint-300 text-mint-700 text-xs font-bold">
                    <span id="activeCouponLabel">Đã áp dụng mã CAPYBARA</span>
                    <button onclick="clearCoupon()" class="text-peach-600 hover:underline">Bỏ mã</button>
                </div>
            </div>

            <!-- Totals -->
            <div class="space-y-1.5 text-xs sm:text-sm border-t border-peach-200 pt-3 font-semibold">
                <div class="flex justify-between text-stone-600">
                    <span>Tạm tính:</span>
                    <strong id="cartSubtotalVal" class="text-cocoa">0đ</strong>
                </div>
                <div class="flex justify-between text-stone-600">
                    <span>Giảm giá Voucher:</span>
                    <strong id="cartDiscountVal" class="text-mint-700">-0đ</strong>
                </div>
                <div class="flex justify-between text-stone-600">
                    <span>Phí vận chuyển:</span>
                    <strong id="cartShipVal" class="text-cocoa">25.000đ</strong>
                </div>
                <div class="flex justify-between text-base font-cute text-cocoa pt-2 border-t border-peach-200">
                    <span>Tổng thanh toán:</span>
                    <span id="cartTotalVal" class="text-peach-600 text-xl">0đ</span>
                </div>
            </div>

            <button onclick="openCheckoutModal()" class="squish-btn w-full py-3.5 rounded-2xl bg-gradient-to-r from-peach-500 to-lavender-500 text-white font-cute text-base shadow-lg shadow-peach-400/30 flex items-center justify-center gap-2">
                <span>Thanh Toán & Nhận Quà Ngay</span>
                <i class="fa-solid fa-heart"></i>
            </button>
        </div>
    </aside>

    <!-- =====================================================
         MODAL 1: QUICK VIEW & CUSTOM SCENT / VARIANT
         ===================================================== -->
    <div id="quickViewModal" class="fixed inset-0 z-50 hidden pastel-backdrop flex items-center justify-center p-4">
        <div class="bg-white rounded-[2rem] max-w-3xl w-full overflow-hidden shadow-2xl border-4 border-peach-200 grid grid-cols-1 md:grid-cols-12 max-h-[92vh]">
            <!-- Left Interactive Squishy Stage -->
            <div id="qvStageBg" class="md:col-span-5 p-6 flex flex-col items-center justify-between relative bg-gradient-to-br from-peach-100 to-butter-100">
                <span id="qvBadge" class="self-start px-3 py-1 rounded-full bg-white text-peach-600 font-cute text-xs shadow-2xs">Hot</span>

                <div onclick="squishModalPreview()" class="cursor-pointer my-auto py-4 text-center select-none">
                    <div id="qvSvgContainer" class="squish-target w-44 h-44 mx-auto flex items-center justify-center"></div>
                    <span id="qvSquishStatus" class="inline-block mt-3 px-3 py-1 rounded-full bg-white/90 text-peach-600 font-bold text-xs shadow-2xs">
                        👆 Nhấn vào hình để bóp thử!
                    </span>
                </div>

                <div class="w-full grid grid-cols-2 gap-2 text-center text-xs bg-white/80 p-2.5 rounded-2xl">
                    <div>
                        <span class="text-stone-400 block text-[10px]">Độ chậm tăng</span>
                        <strong id="qvSlowRising" class="font-cute text-peach-600">12 giây</strong>
                    </div>
                    <div>
                        <span class="text-stone-400 block text-[10px]">Độ mềm mịn</span>
                        <strong class="text-amber-500">★★★★★</strong>
                    </div>
                </div>
            </div>

            <!-- Right Options & Add to Cart -->
            <div class="md:col-span-7 p-6 flex flex-col justify-between overflow-y-auto space-y-4">
                <div>
                    <div class="flex items-center justify-between">
                        <span id="qvCategory" class="text-xs font-bold uppercase tracking-wider text-lavender-700"></span>
                        <button onclick="closeQuickViewModal()" class="w-8 h-8 rounded-xl bg-peach-50 hover:bg-peach-100 text-cocoa">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    <h3 id="qvTitle" class="font-cute text-2xl text-cocoa mt-1"></h3>

                    <div class="flex items-baseline gap-3 mt-1.5">
                        <span id="qvPrice" class="font-cute text-2xl text-peach-600"></span>
                        <span id="qvOldPrice" class="text-sm text-stone-400 line-through font-semibold"></span>
                    </div>

                    <p id="qvDesc" class="text-xs sm:text-sm text-stone-600 mt-2.5 leading-relaxed font-medium"></p>

                    <!-- Choose Scent -->
                    <div class="mt-4">
                        <label class="text-xs font-bold text-cocoa block mb-1.5">🌸 Chọn mùi hương yêu thích:</label>
                        <div id="qvScentList" class="grid grid-cols-2 gap-2">
                            <!-- Rendered by JS -->
                        </div>
                    </div>

                    <!-- Choose Variant / Size -->
                    <div class="mt-4">
                        <label class="text-xs font-bold text-cocoa block mb-1.5">🎁 Chọn phiên bản:</label>
                        <div id="qvVariantList" class="grid grid-cols-3 gap-2">
                            <!-- Rendered by JS -->
                        </div>
                    </div>
                </div>

                <div class="pt-4 border-t border-peach-100 flex items-center gap-3">
                    <div class="flex items-center border-2 border-peach-200 rounded-2xl overflow-hidden bg-peach-50">
                        <button type="button" onclick="changeQvQty(-1)" class="w-9 h-10 font-bold text-peach-600 hover:bg-peach-100">-</button>
                        <span id="qvQtyText" class="w-9 text-center font-cute text-sm">1</span>
                        <button type="button" onclick="changeQvQty(1)" class="w-9 h-10 font-bold text-peach-600 hover:bg-peach-100">+</button>
                    </div>
                    <button type="button" onclick="confirmAddFromModal()" class="squish-btn flex-1 py-3 rounded-2xl bg-gradient-to-r from-peach-500 to-peach-400 text-white font-cute text-sm sm:text-base shadow-md flex items-center justify-center gap-2">
                        <i class="fa-solid fa-cart-plus"></i>
                        <span>Thêm Vào Giỏ Squishy</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- =====================================================
         MODAL 2: ĐĂNG NHẬP / ĐĂNG KÝ TÀI KHOẢN KAWAII
         ===================================================== -->
    <div id="authModal" class="fixed inset-0 z-50 hidden pastel-backdrop flex items-center justify-center p-4">
        <div class="bg-white rounded-[2rem] max-w-md w-full p-6 sm:p-7 shadow-2xl border-4 border-peach-200 space-y-5">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2.5">
                    <div class="w-10 h-10 rounded-2xl bg-peach-400 text-white flex items-center justify-center text-lg">
                        <i class="fa-solid fa-heart"></i>
                    </div>
                    <div>
                        <h3 class="font-cute text-xl text-cocoa">CLB Bạn Thân MochiSquish</h3>
                        <p class="text-xs font-semibold text-stone-500">Tích điểm Kẹo Bông đổi túi mù miễn phí</p>
                    </div>
                </div>
                <button onclick="closeAuthModal()" class="w-8 h-8 rounded-xl bg-peach-50 hover:bg-peach-100 text-cocoa">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <!-- Tabs -->
            <div class="grid grid-cols-2 bg-peach-50 p-1 rounded-2xl text-xs font-bold border border-peach-100">
                <button id="authTabLogin" onclick="switchAuthTab('login')" class="py-2 rounded-xl bg-white text-peach-600 shadow-2xs transition">Đăng Nhập</button>
                <button id="authTabRegister" onclick="switchAuthTab('register')" class="py-2 rounded-xl text-stone-500 transition">Đăng Ký Mới</button>
            </div>

            <!-- Login Form -->
            <form id="loginForm" onsubmit="submitLogin(event)" class="space-y-3.5">
                <div>
                    <label class="text-xs font-bold text-cocoa block mb-1">Số điện thoại hoặc Email</label>
                    <input id="loginIdentifier" type="text" required value="bemochi.cute@gmail.com"
                           class="w-full px-4 py-2.5 rounded-2xl border-2 border-peach-100 text-sm font-semibold focus:outline-none focus:border-peach-400">
                </div>
                <div>
                    <label class="text-xs font-bold text-cocoa block mb-1">Mật khẩu</label>
                    <input id="loginPass" type="password" required value="12345678"
                           class="w-full px-4 py-2.5 rounded-2xl border-2 border-peach-100 text-sm font-semibold focus:outline-none focus:border-peach-400">
                </div>
                <button type="submit" class="squish-btn w-full py-3 rounded-2xl bg-peach-500 hover:bg-peach-600 text-white font-cute text-sm shadow-md">
                    Đăng Nhập Vào Tiệm
                </button>
                <button type="button" onclick="instantVipLogin()" class="squish-btn w-full py-2.5 rounded-2xl bg-butter-200 hover:bg-amber-200 text-cocoa font-bold text-xs border border-amber-300">
                    ⚡ Đăng Nhập Nhanh Khách VIP (Bé Mochi - 250 Kẹo Bông)
                </button>
            </form>

            <!-- Register Form -->
            <form id="registerForm" onsubmit="submitRegister(event)" class="hidden space-y-3.5">
                <div>
                    <label class="text-xs font-bold text-cocoa block mb-1">Biệt danh / Họ tên của bạn</label>
                    <input id="regName" type="text" required placeholder="VD: Bảo Ngọc Mochi"
                           class="w-full px-4 py-2.5 rounded-2xl border-2 border-peach-100 text-sm font-semibold focus:outline-none focus:border-peach-400">
                </div>
                <div class="grid grid-cols-2 gap-2.5">
                    <div>
                        <label class="text-xs font-bold text-cocoa block mb-1">Số điện thoại</label>
                        <input id="regPhone" type="tel" required placeholder="0988 123 456"
                               class="w-full px-3.5 py-2.5 rounded-2xl border-2 border-peach-100 text-sm font-semibold focus:outline-none focus:border-peach-400">
                    </div>
                    <div>
                        <label class="text-xs font-bold text-cocoa block mb-1">Email</label>
                        <input id="regEmail" type="email" required placeholder="ban@email.com"
                               class="w-full px-3.5 py-2.5 rounded-2xl border-2 border-peach-100 text-sm font-semibold focus:outline-none focus:border-peach-400">
                    </div>
                </div>
                <div>
                    <label class="text-xs font-bold text-cocoa block mb-1">Mật khẩu</label>
                    <input id="regPass" type="password" required placeholder="Từ 6 ký tự trở lên"
                           class="w-full px-4 py-2.5 rounded-2xl border-2 border-peach-100 text-sm font-semibold focus:outline-none focus:border-peach-400">
                </div>
                <button type="submit" class="squish-btn w-full py-3 rounded-2xl bg-lavender-500 hover:bg-lavender-700 text-white font-cute text-sm shadow-md">
                    Đăng Ký & Nhận 100 Kẹo Bông + Mã Giảm 15%
                </button>
            </form>
        </div>
    </div>

    <!-- =====================================================
         MODAL 3: THANH TOÁN ĐƠN HÀNG (CHECKOUT & VIETQR)
         ===================================================== -->
    <div id="checkoutModal" class="fixed inset-0 z-50 hidden pastel-backdrop flex items-center justify-center p-3 sm:p-5">
        <div class="bg-white rounded-[2rem] max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border-4 border-peach-200 overflow-hidden">
            <!-- Header -->
            <div class="px-6 py-4 bg-gradient-to-r from-peach-100 via-butter-100 to-mint-100 border-b-2 border-peach-200 flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-2xl bg-peach-500 text-white flex items-center justify-center">
                        <i class="fa-solid fa-gift"></i>
                    </div>
                    <div>
                        <h3 class="font-cute text-xl text-cocoa">Xác Nhận Đơn Squishy & Gói Quà</h3>
                        <p class="text-xs font-bold text-stone-500">Tặng kèm Túi Zip bảo quản & Sticker Capybara cho mọi đơn hàng</p>
                    </div>
                </div>
                <button onclick="closeCheckoutModal()" class="w-8 h-8 rounded-xl bg-white text-cocoa border border-peach-200">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <!-- Form Body -->
            <form id="checkoutForm" onsubmit="completeOrderSubmit(event)" class="flex-1 overflow-y-auto p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                <!-- Left 7 Cols -->
                <div class="lg:col-span-7 space-y-5">
                    <!-- 1. Recipient Info -->
                    <div class="bg-peach-50/60 p-4 rounded-2xl border-2 border-peach-100 space-y-3">
                        <h4 class="font-cute text-base text-cocoa flex items-center gap-2">
                            <span class="w-6 h-6 rounded-full bg-peach-500 text-white text-xs flex items-center justify-center">1</span>
                            Địa Chỉ Nhận Hộp Squishy
                        </h4>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label class="text-xs font-bold text-cocoa block mb-1">Họ tên người nhận *</label>
                                <input id="chkName" type="text" required placeholder="VD: Nguyễn Bảo Ngọc"
                                       class="w-full px-3.5 py-2 rounded-xl bg-white border-2 border-peach-100 text-sm font-semibold focus:outline-none focus:border-peach-400">
                            </div>
                            <div>
                                <label class="text-xs font-bold text-cocoa block mb-1">Số điện thoại *</label>
                                <input id="chkPhone" type="tel" required placeholder="VD: 0988 123 456"
                                       class="w-full px-3.5 py-2 rounded-xl bg-white border-2 border-peach-100 text-sm font-semibold focus:outline-none focus:border-peach-400">
                            </div>
                        </div>
                        <div>
                            <label class="text-xs font-bold text-cocoa block mb-1">Địa chỉ nhận hàng chi tiết *</label>
                            <input id="chkAddress" type="text" required placeholder="Số nhà, ngõ/đường, Phường/Xã, Quận/Huyện, Tỉnh/TP..."
                                   class="w-full px-3.5 py-2 rounded-xl bg-white border-2 border-peach-100 text-sm font-semibold focus:outline-none focus:border-peach-400">
                        </div>
                    </div>

                    <!-- 2. Cute Gift Wrapping & Greeting Card -->
                    <div class="bg-butter-100/60 p-4 rounded-2xl border-2 border-butter-200 space-y-3">
                        <div class="flex items-center justify-between">
                            <h4 class="font-cute text-base text-cocoa flex items-center gap-2">
                                <span class="w-6 h-6 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center">2</span>
                                Tùy Chọn Gói Quà & Lời Nhắn Đáng Yêu
                            </h4>
                            <label class="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-peach-600">
                                <input id="chkGiftBoxToggle" type="checkbox" onchange="updateCheckoutSummary()" class="w-4 h-4 accent-pink-500 rounded">
                                <span>+ Hộp quà nơ hồng (+15.000đ)</span>
                            </label>
                        </div>

                        <textarea id="chkWishNote" rows="2" placeholder="Viết lời chúc trên thiệp đính kèm (Miễn phí)..."
                                  class="w-full px-3.5 py-2 rounded-xl bg-white border-2 border-butter-200 text-xs sm:text-sm font-semibold focus:outline-none focus:border-amber-400">Chúc cậu mỗi lần bóp bé Squishy này là mọi mệt mỏi đều tan biến hết nha! 💖</textarea>
                    </div>

                    <!-- 3. Payment Method -->
                    <div class="bg-mint-100/50 p-4 rounded-2xl border-2 border-mint-200 space-y-3">
                        <h4 class="font-cute text-base text-cocoa flex items-center gap-2">
                            <span class="w-6 h-6 rounded-full bg-mint-500 text-white text-xs flex items-center justify-center">3</span>
                            Phương Thức Thanh Toán
                        </h4>
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            <label class="cursor-pointer">
                                <input type="radio" name="payMethod" value="COD" checked onchange="toggleQRDisplay('COD')" class="peer sr-only">
                                <div class="p-3 rounded-xl border-2 border-stone-200 bg-white peer-checked:border-peach-500 peer-checked:bg-peach-50 text-xs font-bold flex items-center gap-2">
                                    <i class="fa-solid fa-truck-fast text-mint-700 text-base"></i>
                                    <span>Tiền mặt (COD)</span>
                                </div>
                            </label>
                            <label class="cursor-pointer">
                                <input type="radio" name="payMethod" value="VIETQR" onchange="toggleQRDisplay('VIETQR')" class="peer sr-only">
                                <div class="p-3 rounded-xl border-2 border-stone-200 bg-white peer-checked:border-peach-500 peer-checked:bg-peach-50 text-xs font-bold flex items-center gap-2">
                                    <i class="fa-solid fa-qrcode text-lavender-700 text-base"></i>
                                    <span>Quét Mã VietQR</span>
                                </div>
                            </label>
                            <label class="cursor-pointer">
                                <input type="radio" name="payMethod" value="MOMO" onchange="toggleQRDisplay('MOMO')" class="peer sr-only">
                                <div class="p-3 rounded-xl border-2 border-stone-200 bg-white peer-checked:border-peach-500 peer-checked:bg-peach-50 text-xs font-bold flex items-center gap-2">
                                    <i class="fa-solid fa-wallet text-peach-600 text-base"></i>
                                    <span>Ví MoMo</span>
                                </div>
                            </label>
                        </div>

                        <!-- Dynamic QR Box -->
                        <div id="qrPaymentPanel" class="hidden p-4 rounded-2xl bg-white border-2 border-lavender-200 flex flex-col sm:flex-row items-center gap-4">
                            <div class="w-28 h-28 rounded-xl bg-peach-50 p-2 border border-peach-200 shrink-0 flex items-center justify-center">
                                <svg viewBox="0 0 100 100" class="w-full h-full text-cocoa">
                                    <rect width="100" height="100" fill="#ffffff"/>
                                    <path fill="currentColor" d="M10,10 h25 v25 h-25 z M15,15 v15 h15 v-15 z M20,20 h5 v5 h-5 z M65,10 h25 v25 h-25 z M70,15 v15 h15 v-15 z M75,20 h5 v5 h-5 z M10,65 h25 v25 h-25 z M15,70 v15 h15 v-15 z M20,75 h5 v5 h-5 z M45,12 h10 v10 h-10 z M42,32 h16 v10 h-16 z M12,45 h20 v10 h-20 z M42,45 h18 v18 h-18 z M68,45 h20 v10 h-20 z M45,72 h15 v15 h-15 z M70,65 h10 v22 h-10 z"/>
                                </svg>
                            </div>
                            <div class="text-xs space-y-1 flex-1">
                                <div class="font-cute text-sm text-lavender-700">Ngân hàng MB Bank (Quân Đội)</div>
                                <div>Chủ TK: <strong>TIEM DO CHOI MOCHISQUISH</strong></div>
                                <div class="flex items-center gap-2">
                                    <span>Số TK: <strong class="font-mono text-peach-600">889966889999</strong></span>
                                    <button type="button" onclick="copyTextToClipboard('889966889999')" class="px-2 py-0.5 rounded bg-peach-100 text-peach-600 font-bold text-[11px]">
                                        Sao chép
                                    </button>
                                </div>
                                <div>Số tiền: <strong id="qrAmountText" class="text-mint-700">0đ</strong> • Nội dung: <strong id="qrMemoText" class="font-mono text-lavender-700">MOCHI 1234</strong></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right 5 Cols: Summary -->
                <div class="lg:col-span-5 bg-peach-50/80 p-5 rounded-2xl border-2 border-peach-200 flex flex-col justify-between space-y-4">
                    <div>
                        <h4 class="font-cute text-base text-cocoa pb-2.5 border-b border-peach-200">
                            Đơn Hàng Của Bạn (<span id="chkCountLabel">0</span> món)
                        </h4>
                        <div id="chkItemsList" class="max-h-56 overflow-y-auto divide-y divide-peach-100 my-2 pr-1"></div>
                    </div>

                    <div class="space-y-3 pt-3 border-t border-peach-200">
                        <div class="space-y-1.5 text-xs sm:text-sm font-semibold">
                            <div class="flex justify-between text-stone-600">
                                <span>Tạm tính:</span>
                                <strong id="chkSubVal">0đ</strong>
                            </div>
                            <div class="flex justify-between text-stone-600">
                                <span>Giảm giá Voucher:</span>
                                <strong id="chkDiscVal" class="text-mint-700">-0đ</strong>
                            </div>
                            <div class="flex justify-between text-stone-600">
                                <span>Gói hộp quà nơ hồng:</span>
                                <strong id="chkGiftVal">0đ</strong>
                            </div>
                            <div class="flex justify-between text-stone-600">
                                <span>Phí giao hàng:</span>
                                <strong id="chkShipVal">0đ</strong>
                            </div>
                            <div class="flex justify-between text-stone-600">
                                <span>Quà tặng kèm:</span>
                                <strong class="text-lavender-700">Túi Zip + Sticker Capybara (0đ)</strong>
                            </div>
                            <div class="flex justify-between text-base font-cute text-cocoa pt-2 border-t border-peach-200">
                                <span>Tổng thanh toán:</span>
                                <span id="chkTotalVal" class="text-peach-600 text-2xl">0đ</span>
                            </div>
                        </div>

                        <button type="submit" class="squish-btn w-full py-3.5 rounded-2xl bg-gradient-to-r from-peach-500 to-peach-400 text-white font-cute text-base shadow-lg shadow-peach-400/35 flex items-center justify-center gap-2">
                            <i class="fa-solid fa-paper-plane"></i>
                            <span>Hoàn Tất Đặt Mua Squishy</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <!-- =====================================================
         MODAL 4: ĐẶT HÀNG THÀNH CÔNG
         ===================================================== -->
    <div id="successModal" class="fixed inset-0 z-50 hidden pastel-backdrop flex items-center justify-center p-4">
        <div class="bg-white rounded-[2rem] max-w-md w-full p-6 sm:p-8 shadow-2xl border-4 border-mint-300 text-center space-y-4">
            <div class="w-16 h-16 rounded-full bg-mint-100 text-mint-700 flex items-center justify-center text-3xl mx-auto">
                <i class="fa-solid fa-face-laugh-beam"></i>
            </div>
            <div>
                <span class="px-3 py-1 rounded-full bg-mint-100 text-mint-700 font-cute text-xs">Đặt Hàng Thành Công!</span>
                <h3 class="font-cute text-2xl sm:text-3xl text-cocoa mt-2">Cảm Ơn Cậu Rất Nhiều! 💖</h3>
                <p class="text-xs sm:text-sm font-semibold text-stone-500 mt-1">Các bé Squishy thơm phức đang được đóng gói vào túi Zip để lên đường tới nhà cậu!</p>
            </div>
            <div id="successSummaryCard" class="bg-peach-50 rounded-2xl p-4 border-2 border-peach-100 text-left text-xs sm:text-sm space-y-1.5 font-semibold"></div>
            <div class="flex gap-2.5 pt-2">
                <button onclick="closeSuccessAndViewOrders()" class="squish-btn flex-1 py-3 rounded-xl bg-lavender-100 text-lavender-700 font-bold text-xs sm:text-sm">
                    Xem Đơn Đã Đặt
                </button>
                <button onclick="closeSuccessModal()" class="squish-btn flex-1 py-3 rounded-xl bg-peach-500 text-white font-cute text-xs sm:text-sm">
                    Tiếp Tục Dạo Tiệm
                </button>
            </div>
        </div>
    </div>

    <!-- =====================================================
         MODAL 5: LỊCH SỬ ĐƠN HÀNG
         ===================================================== -->
    <div id="ordersModal" class="fixed inset-0 z-50 hidden pastel-backdrop flex items-center justify-center p-4">
        <div class="bg-white rounded-[2rem] max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border-4 border-lavender-200 overflow-hidden">
            <div class="p-5 bg-lavender-100 border-b-2 border-lavender-200 flex items-center justify-between">
                <div class="flex items-center gap-2.5">
                    <i class="fa-solid fa-box-open text-lavender-700 text-lg"></i>
                    <h3 class="font-cute text-xl text-cocoa">Hộp Đơn Hàng Squishy Của Cậu</h3>
                </div>
                <button onclick="closeOrdersModal()" class="w-8 h-8 rounded-xl bg-white text-cocoa">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div id="ordersListBox" class="flex-1 overflow-y-auto p-5 space-y-3.5"></div>
        </div>
    </div>

    <!-- =====================================================
         JAVASCRIPT ENGINE: KAWAII SVG ART, AUDIO & COMMERCE
         ===================================================== -->
    <script>
        // 1. BỘ VẼ 12 NHÂN VẬT KAWAII SQUISHY SVG ĐỘC QUYỀN
        function getSquishySVG(id) {
            const svgs = {
                // 1. Capybara Đội Quất
                1: `<svg viewBox="0 0 160 160" class="w-full h-full drop-shadow-xs">
                        <ellipse cx="80" cy="138" rx="54" ry="11" fill="#A8E6CF" opacity="0.65"/>
                        <rect x="34" y="56" width="92" height="76" rx="38" fill="#D49B6A" stroke="#4A3540" stroke-width="3.5"/>
                        <ellipse cx="80" cy="105" rx="32" ry="22" fill="#E6B88A"/>
                        <ellipse cx="46" cy="58" rx="9" ry="7" transform="rotate(-25 46 58)" fill="#B57C4E" stroke="#4A3540" stroke-width="3"/>
                        <ellipse cx="114" cy="58" rx="9" ry="7" transform="rotate(25 114 58)" fill="#B57C4E" stroke="#4A3540" stroke-width="3"/>
                        <ellipse cx="80" cy="42" rx="16" ry="12" fill="#FF9F1C" stroke="#4A3540" stroke-width="3"/>
                        <path d="M80 30 Q86 22 92 28 Q86 34 80 30 Z" fill="#38B28B" stroke="#4A3540" stroke-width="2.5"/>
                        <ellipse cx="52" cy="88" rx="7" ry="4.5" fill="#FF8FAB"/>
                        <ellipse cx="108" cy="88" rx="7" ry="4.5" fill="#FF8FAB"/>
                        <path d="M53 78 Q58 72 64 78 M96 78 Q102 72 107 78" stroke="#4A3540" stroke-width="3.5" fill="none" stroke-linecap="round"/>
                        <ellipse cx="80" cy="86" rx="16" ry="12" fill="#B57C4E"/>
                        <path d="M76 82 L84 82 L80 87 Z" fill="#4A3540"/>
                        <path d="M74 92 Q80 96 86 92" stroke="#4A3540" stroke-width="3" fill="none" stroke-linecap="round"/>
                    </svg>`,
                // 2. Mèo Mochi Đào Tiên
                2: `<svg viewBox="0 0 160 160" class="w-full h-full drop-shadow-xs">
                        <path d="M40 65 L32 34 L64 48 Z" fill="#FFB3C6" stroke="#4A3540" stroke-width="3.5" stroke-linejoin="round"/>
                        <path d="M120 65 L128 34 L96 48 Z" fill="#FFB3C6" stroke="#4A3540" stroke-width="3.5" stroke-linejoin="round"/>
                        <ellipse cx="80" cy="92" rx="52" ry="44" fill="#FFF0F5" stroke="#4A3540" stroke-width="3.5"/>
                        <path d="M55 52 Q80 38 105 52" fill="#FF8FAB" opacity="0.5"/>
                        <circle cx="58" cy="88" r="5.5" fill="#4A3540"/>
                        <circle cx="56" cy="86" r="2" fill="#FFFFFF"/>
                        <circle cx="102" cy="88" r="5.5" fill="#4A3540"/>
                        <circle cx="100" cy="86" r="2" fill="#FFFFFF"/>
                        <ellipse cx="46" cy="96" rx="8" ry="5" fill="#FF8FAB"/>
                        <ellipse cx="114" cy="96" rx="8" ry="5" fill="#FF8FAB"/>
                        <path d="M73 95 Q76.5 100 80 95 Q83.5 100 87 95" stroke="#4A3540" stroke-width="3" fill="none" stroke-linecap="round"/>
                    </svg>`,
                // 3. Bánh Bao Thỏ Trắng Nhân Sữa
                3: `<svg viewBox="0 0 160 160" class="w-full h-full drop-shadow-xs">
                        <ellipse cx="62" cy="42" rx="11" ry="26" transform="rotate(-12 62 42)" fill="#FFFFFF" stroke="#4A3540" stroke-width="3.5"/>
                        <ellipse cx="62" cy="44" rx="5" ry="15" transform="rotate(-12 62 44)" fill="#FFC2D1"/>
                        <ellipse cx="98" cy="42" rx="11" ry="26" transform="rotate(12 98 42)" fill="#FFFFFF" stroke="#4A3540" stroke-width="3.5"/>
                        <ellipse cx="98" cy="44" rx="5" ry="15" transform="rotate(12 98 44)" fill="#FFC2D1"/>
                        <path d="M28 105 C28 62 132 62 132 105 C132 130 28 130 28 105 Z" fill="#FFFFFF" stroke="#4A3540" stroke-width="3.5"/>
                        <circle cx="62" cy="96" r="5" fill="#E04D75"/>
                        <circle cx="98" cy="96" r="5" fill="#E04D75"/>
                        <ellipse cx="50" cy="103" rx="7" ry="4" fill="#FFB3C6"/>
                        <ellipse cx="110" cy="103" rx="7" ry="4" fill="#FFB3C6"/>
                        <path d="M75 102 Q80 107 85 102" stroke="#4A3540" stroke-width="3" fill="none" stroke-linecap="round"/>
                    </svg>`,
                // 4. Cún Corgi Mông Đào Đàn Hồi
                4: `<svg viewBox="0 0 160 160" class="w-full h-full drop-shadow-xs">
                        <circle cx="62" cy="94" r="38" fill="#F4A261" stroke="#4A3540" stroke-width="3.5"/>
                        <circle cx="98" cy="94" r="38" fill="#F4A261" stroke="#4A3540" stroke-width="3.5"/>
                        <ellipse cx="62" cy="102" rx="24" ry="22" fill="#FFF9FB"/>
                        <ellipse cx="98" cy="102" rx="24" ry="22" fill="#FFF9FB"/>
                        <circle cx="80" cy="68" r="10" fill="#FFF9FB" stroke="#4A3540" stroke-width="3"/>
                        <path d="M76 88 L84 96 M84 88 L76 96" stroke="#FF8FAB" stroke-width="3.5" stroke-linecap="round"/>
                        <ellipse cx="54" cy="126" rx="10" ry="7" fill="#FFF9FB" stroke="#4A3540" stroke-width="3"/>
                        <ellipse cx="106" cy="126" rx="10" ry="7" fill="#FFF9FB" stroke="#4A3540" stroke-width="3"/>
                    </svg>`,
                // 5. Gấu Trúc Ôm Trà Sữa Trân Châu
                5: `<svg viewBox="0 0 160 160" class="w-full h-full drop-shadow-xs">
                        <circle cx="44" cy="46" r="14" fill="#4A3540"/>
                        <circle cx="116" cy="46" r="14" fill="#4A3540"/>
                        <ellipse cx="80" cy="90" rx="48" ry="44" fill="#FFFFFF" stroke="#4A3540" stroke-width="3.5"/>
                        <ellipse cx="60" cy="82" rx="11" ry="14" transform="rotate(-15 60 82)" fill="#4A3540"/>
                        <ellipse cx="100" cy="82" rx="11" ry="14" transform="rotate(15 100 82)" fill="#4A3540"/>
                        <circle cx="60" cy="80" r="3" fill="#FFFFFF"/>
                        <circle cx="100" cy="80" r="3" fill="#FFFFFF"/>
                        <rect x="64" y="100" width="32" height="36" rx="8" fill="#F3D5B5" stroke="#4A3540" stroke-width="3"/>
                        <line x1="80" y1="88" x2="80" y2="104" stroke="#FF8FAB" stroke-width="5" stroke-linecap="round"/>
                        <circle cx="72" cy="128" r="3" fill="#4A3540"/>
                        <circle cx="80" cy="130" r="3" fill="#4A3540"/>
                        <circle cx="88" cy="128" r="3" fill="#4A3540"/>
                    </svg>`,
                // 6. Vịt Vàng Đội Mũ Lá Sen
                6: `<svg viewBox="0 0 160 160" class="w-full h-full drop-shadow-xs">
                        <ellipse cx="80" cy="98" rx="46" ry="40" fill="#FFE156" stroke="#4A3540" stroke-width="3.5"/>
                        <ellipse cx="80" cy="56" rx="38" ry="12" fill="#38B28B" stroke="#4A3540" stroke-width="3.5"/>
                        <path d="M80 56 L88 44" stroke="#237A5E" stroke-width="3.5" stroke-linecap="round"/>
                        <circle cx="60" cy="88" r="5" fill="#4A3540"/>
                        <circle cx="100" cy="88" r="5" fill="#4A3540"/>
                        <ellipse cx="80" cy="96" rx="14" ry="8" fill="#FF9F1C" stroke="#4A3540" stroke-width="3"/>
                        <ellipse cx="46" cy="96" rx="7" ry="4" fill="#FF8FAB"/>
                        <ellipse cx="114" cy="96" rx="7" ry="4" fill="#FF8FAB"/>
                    </svg>`,
                // 7. Bánh Sừng Bò Croissant Bơ Pháp
                7: `<svg viewBox="0 0 160 160" class="w-full h-full drop-shadow-xs">
                        <path d="M24 102 C18 65 55 44 80 44 C105 44 142 65 136 102 C132 122 108 118 102 100 C95 88 65 88 58 100 C52 118 28 122 24 102 Z" fill="#F4A261" stroke="#4A3540" stroke-width="3.5"/>
                        <ellipse cx="80" cy="78" rx="34" ry="24" fill="#F6BD60" stroke="#4A3540" stroke-width="3"/>
                        <circle cx="66" cy="78" r="4.5" fill="#4A3540"/>
                        <circle cx="94" cy="78" r="4.5" fill="#4A3540"/>
                        <ellipse cx="56" cy="84" rx="6" ry="3.5" fill="#FF8FAB"/>
                        <ellipse cx="104" cy="84" rx="6" ry="3.5" fill="#FF8FAB"/>
                        <path d="M75 84 Q80 89 85 84" stroke="#4A3540" stroke-width="3" fill="none" stroke-linecap="round"/>
                    </svg>`,
                // 8. Dâu Tây Kem Tuyết Phủ Socola
                8: `<svg viewBox="0 0 160 160" class="w-full h-full drop-shadow-xs">
                        <path d="M80 138 C42 138 32 82 52 54 C64 38 96 38 108 54 C128 82 118 138 80 138 Z" fill="#FB6F92" stroke="#4A3540" stroke-width="3.5"/>
                        <path d="M48 62 Q64 78 80 64 Q96 78 112 62 C102 42 58 42 48 62 Z" fill="#FFF9FB" stroke="#4A3540" stroke-width="3"/>
                        <path d="M60 44 L80 26 L100 44 Q80 54 60 44 Z" fill="#38B28B" stroke="#4A3540" stroke-width="3"/>
                        <circle cx="64" cy="92" r="4.5" fill="#4A3540"/>
                        <circle cx="96" cy="92" r="4.5" fill="#4A3540"/>
                        <path d="M75 98 Q80 103 85 98" stroke="#4A3540" stroke-width="3" fill="none" stroke-linecap="round"/>
                        <circle cx="56" cy="112" r="2.5" fill="#FFF3B0"/>
                        <circle cx="80" cy="118" r="2.5" fill="#FFF3B0"/>
                        <circle cx="104" cy="112" r="2.5" fill="#FFF3B0"/>
                    </svg>`,
                // 9. Hamster Ôm Hạt Dẻ Phô Mai
                9: `<svg viewBox="0 0 160 160" class="w-full h-full drop-shadow-xs">
                        <circle cx="48" cy="52" r="13" fill="#F6BD60" stroke="#4A3540" stroke-width="3.5"/>
                        <circle cx="112" cy="52" r="13" fill="#F6BD60" stroke="#4A3540" stroke-width="3.5"/>
                        <ellipse cx="80" cy="94" rx="48" ry="42" fill="#FFF9FB" stroke="#4A3540" stroke-width="3.5"/>
                        <path d="M42 72 Q80 45 118 72" fill="#F6BD60"/>
                        <circle cx="50" cy="96" r="14" fill="#FFE5EC"/>
                        <circle cx="110" cy="96" r="14" fill="#FFE5EC"/>
                        <circle cx="62" cy="84" r="4.5" fill="#4A3540"/>
                        <circle cx="98" cy="84" r="4.5" fill="#4A3540"/>
                        <polygon points="80,98 66,124 94,124" fill="#FF9F1C" stroke="#4A3540" stroke-width="3" stroke-linejoin="round"/>
                    </svg>`,
                // 10. Khủng Long Dino Xanh Mint
                10: `<svg viewBox="0 0 160 160" class="w-full h-full drop-shadow-xs">
                        <polygon points="80,28 70,46 90,46" fill="#FFE156" stroke="#4A3540" stroke-width="3"/>
                        <polygon points="108,38 96,54 114,58" fill="#FFE156" stroke="#4A3540" stroke-width="3"/>
                        <ellipse cx="80" cy="94" rx="46" ry="42" fill="#A8E6CF" stroke="#4A3540" stroke-width="3.5"/>
                        <ellipse cx="80" cy="108" rx="28" ry="24" fill="#FFFBE6"/>
                        <circle cx="60" cy="80" r="5" fill="#4A3540"/>
                        <circle cx="100" cy="80" r="5" fill="#4A3540"/>
                        <ellipse cx="48" cy="88" rx="7" ry="4" fill="#FF8FAB"/>
                        <ellipse cx="112" cy="88" rx="7" ry="4" fill="#FF8FAB"/>
                        <path d="M72 86 Q80 93 88 86" stroke="#4A3540" stroke-width="3" fill="none" stroke-linecap="round"/>
                    </svg>`,
                // 11. Heo Hồng Ngủ Ngày Trên Mây
                11: `<svg viewBox="0 0 160 160" class="w-full h-full drop-shadow-xs">
                        <ellipse cx="80" cy="124" rx="58" ry="18" fill="#FFFFFF" stroke="#E2CFEA" stroke-width="4"/>
                        <ellipse cx="80" cy="88" rx="46" ry="38" fill="#FFC2D1" stroke="#4A3540" stroke-width="3.5"/>
                        <path d="M44 58 L36 40 L60 50 Z" fill="#FF8FAB" stroke="#4A3540" stroke-width="3"/>
                        <path d="M116 58 L124 40 L100 50 Z" fill="#FF8FAB" stroke="#4A3540" stroke-width="3"/>
                        <path d="M54 82 Q60 88 66 82 M94 82 Q100 88 106 82" stroke="#4A3540" stroke-width="3.5" fill="none" stroke-linecap="round"/>
                        <ellipse cx="80" cy="92" rx="14" ry="10" fill="#FF8FAB" stroke="#4A3540" stroke-width="3"/>
                        <circle cx="76" cy="92" r="2.5" fill="#4A3540"/>
                        <circle cx="84" cy="92" r="2.5" fill="#4A3540"/>
                    </svg>`,
                // 12. Cá Voi Xanh Pastel Bụng Tròn
                12: `<svg viewBox="0 0 160 160" class="w-full h-full drop-shadow-xs">
                        <path d="M80 44 Q70 24 56 30 M80 44 Q90 24 104 30" stroke="#72EFDD" stroke-width="4" fill="none" stroke-linecap="round"/>
                        <path d="M30 98 C30 52 130 52 130 98 C130 122 30 122 30 98 Z" fill="#90E0EF" stroke="#4A3540" stroke-width="3.5"/>
                        <path d="M44 104 C44 88 116 88 116 104 C116 120 44 120 44 104 Z" fill="#FFF9FB"/>
                        <circle cx="56" cy="84" r="5" fill="#4A3540"/>
                        <circle cx="104" cy="84" r="5" fill="#4A3540"/>
                        <ellipse cx="46" cy="92" rx="6" ry="3.5" fill="#FF8FAB"/>
                        <ellipse cx="114" cy="92" rx="6" ry="3.5" fill="#FF8FAB"/>
                        <path d="M74 90 Q80 96 86 90" stroke="#4A3540" stroke-width="3" fill="none" stroke-linecap="round"/>
                    </svg>`
            };
            return svgs[id] || svgs[1];
        }

        // 2. DANH SÁCH 12 SẢN PHẨM SQUISHY
        const PRODUCTS = [
            {
                id: 1,
                name: 'Squishy Capybara Đội Quất Ngâm Mình',
                category: 'Thú Cưng Kawaii',
                price: 89000,
                oldPrice: 120000,
                slowRising: 12,
                scent: 'Hương Đào Ngọt',
                badge: 'Best Seller 🔥',
                bgClass: 'from-peach-100 via-butter-100 to-mint-100',
                desc: 'Bé chuột lang nước Capybara bụng phệ đội quả quất vàng ươm trên đầu. Chất foam siêu đặc, bóp xẹp lép rồi từ từ phồng căng tròn sau 12 giây!'
            },
            {
                id: 2,
                name: 'Squishy Mèo Mochi Đào Tiên Má Hồng',
                category: 'Thú Cưng Kawaii',
                price: 75000,
                oldPrice: 95000,
                slowRising: 10,
                scent: 'Hương Đào Ngọt',
                badge: 'Siêu Mềm 🍑',
                bgClass: 'from-peach-100 to-lavender-100',
                desc: 'Bé mèo Mochi trắng hồng núng nính như chiếc bánh bao đào tiên, sờ mịn mượt như nhung kèm hương đào chín ngọt lịm.'
            },
            {
                id: 3,
                name: 'Squishy Bánh Bao Thỏ Trắng Nhân Sữa',
                category: 'Tiệm Bánh Ngọt',
                price: 69000,
                oldPrice: 89000,
                slowRising: 9,
                scent: 'Sữa Dừa Béo',
                badge: 'Thơm Nức Mũi 🥛',
                bgClass: 'from-butter-100 to-peach-100',
                desc: 'Bánh bao thỏ ngọc tai dài trắng muốt nằm gọn trong lòng bàn tay, tỏa hương sữa dừa béo ngậy giúp xua tan cơn buồn ngủ.'
            },
            {
                id: 4,
                name: 'Squishy Cún Corgi Mông Đào Đàn Hồi',
                category: 'Thú Cưng Kawaii',
                price: 85000,
                oldPrice: 110000,
                slowRising: 11,
                scent: 'Vani Pháp',
                badge: 'Cực Đàn Hồi 🐶',
                bgClass: 'from-butter-100 to-peach-200/60',
                desc: 'Thiết kế mông Corgi tròn xoe siêu hài hước, độ nảy và độ chậm tăng cực đã tay, món quà xả stress tuyệt vời trên bàn học.'
            },
            {
                id: 5,
                name: 'Squishy Gấu Trúc Ôm Bình Trà Sữa',
                category: 'Hàng Hiếm Limited',
                price: 115000,
                oldPrice: 145000,
                slowRising: 14,
                scent: 'Sữa Dừa Béo',
                badge: 'Bản Limited 🧋',
                bgClass: 'from-lavender-100 to-mint-100',
                desc: 'Phiên bản giới hạn Gấu trúc Panda ôm ly trà sữa trân châu đường đen cỡ đại, chậm tăng lên tới 14 giây.'
            },
            {
                id: 6,
                name: 'Squishy Vịt Vàng Đội Mũ Lá Sen',
                category: 'Thú Cưng Kawaii',
                price: 72000,
                oldPrice: 92000,
                slowRising: 9,
                scent: 'Vani Pháp',
                badge: 'Yêu Thích 🦆',
                bgClass: 'from-butter-100 to-mint-100',
                desc: 'Chú vịt vàng mỏ cam đội chiếc lá sen xanh mát, kích thước vừa vặn để bóp liên tục khi ôn bài hoặc code.'
            },
            {
                id: 7,
                name: 'Squishy Bánh Sừng Bò Croissant Bơ Pháp',
                category: 'Tiệm Bánh Ngọt',
                price: 79000,
                oldPrice: 99000,
                slowRising: 10,
                scent: 'Vani Pháp',
                badge: 'Giống Thật 99% 🥐',
                bgClass: 'from-butter-200/60 to-peach-100',
                desc: 'Chiếc bánh Croissant ngàn lớp vàng óng ả thơm lừng mùi bơ nướng Pháp, lớp sơn bóng dẻo dai không bong tróc.'
            },
            {
                id: 8,
                name: 'Squishy Dâu Tây Kem Tuyết Phủ Socola',
                category: 'Tiệm Bánh Ngọt',
                price: 82000,
                oldPrice: 105000,
                slowRising: 11,
                scent: 'Dâu Tây Kem',
                badge: 'Hương Dâu 🍓',
                bgClass: 'from-peach-200/70 to-butter-100',
                desc: 'Quả dâu tây khổng lồ phủ lớp kem tuyết trắng mịn trên đỉnh, hương dâu tây ngọt ngào lưu hương suốt nhiều tháng.'
            },
            {
                id: 9,
                name: 'Squishy Hamster Ôm Hạt Dẻ Phô Mai',
                category: 'Thú Cưng Kawaii',
                price: 78000,
                oldPrice: 98000,
                slowRising: 10,
                scent: 'Sữa Dừa Béo',
                badge: 'Má Phúng Phính 🐹',
                bgClass: 'from-butter-100 via-peach-50 to-mint-100',
                desc: 'Hai bên má phúng phính hồng hào của bé chuột Hamster ôm miếng phô mai vàng khiến bất kỳ ai nhìn thấy cũng tan chảy.'
            },
            {
                id: 10,
                name: 'Squishy Khủng Long Dino Xanh Mint',
                category: 'Hàng Hiếm Limited',
                price: 109000,
                oldPrice: 135000,
                slowRising: 13,
                scent: 'Hương Đào Ngọt',
                badge: 'Slow-rising 13s 🦖',
                bgClass: 'from-mint-100 to-butter-100',
                desc: 'Bé khủng long cổ ngắn màu xanh bạc hà dịu mắt với hàng gai lưng mềm xốp, dòng Jumbo bóp êm cả hai tay.'
            },
            {
                id: 11,
                name: 'Squishy Heo Hồng Ngủ Ngày Trên Mây',
                category: 'Combo Quà Tặng',
                price: 129000,
                oldPrice: 165000,
                slowRising: 15,
                scent: 'Dâu Tây Kem',
                badge: 'Chậm Tăng 15s 🐷',
                bgClass: 'from-peach-100 via-lavender-100 to-white',
                desc: 'Combo bé heo hồng nằm ngủ ngon lành trên đám mây trắng siêu chậm tăng (15 giây), tặng kèm móc khóa và túi mù mini.'
            },
            {
                id: 12,
                name: 'Squishy Cá Voi Xanh Pastel Bụng Tròn',
                category: 'Combo Quà Tặng',
                price: 119000,
                oldPrice: 150000,
                slowRising: 13,
                scent: 'Sữa Dừa Béo',
                badge: 'Combo Quà 🐳',
                bgClass: 'from-mint-100 via-lavender-100 to-peach-100',
                desc: 'Chú cá voi xanh biển Pastel phun nước đáng yêu, đi kèm hộp quà sang trọng thích hợp làm quà sinh nhật cho bạn bè.'
            }
        ];

        const CATEGORIES = ['Tất cả', 'Thú Cưng Kawaii', 'Tiệm Bánh Ngọt', 'Hàng Hiếm Limited', 'Combo Quà Tặng'];
        const SCENTS = ['Hương Đào Ngọt', 'Sữa Dừa Béo', 'Dâu Tây Kem', 'Vani Pháp'];
        const VARIANTS = [
            { name: 'Bản Tiêu Chuẩn', extra: 0 },
            { name: 'Bản Jumbo Khổng Lồ', extra: 45000 },
            { name: 'Combo Kèm Túi Mù', extra: 75000 }
        ];

        // 3. STATE QUẢN LÝ & LOCALSTORAGE
        const STORAGE_KEY_MOCHI = 'mochiSquish_store_v1';
        let activeCategory = 'Tất cả';
        let wishlistOnly = false;
        let wishlistIds = [1, 2, 11];
        let soundEnabled = true;
        let heroSquishCount = 0;

        let cart = [
            { productId: 1, scent: 'Hương Đào Ngọt', variant: 'Bản Tiêu Chuẩn', extra: 0, qty: 1 },
            { productId: 2, scent: 'Dâu Tây Kem', variant: 'Bản Tiêu Chuẩn', extra: 0, qty: 1 }
        ];
        let activeCoupon = null;
        let currentUser = null;
        let orders = [
            {
                code: 'MS-90821',
                date: '02/11/2026',
                recipient: 'Bé Mochi (0988 686 868)',
                address: '128 Chùa Bộc, Đống Đa, Hà Nội',
                total: 164000,
                payMethod: 'Quét Mã VietQR',
                status: 'Đã giao thành công 🎀',
                items: ['1x Squishy Capybara Đội Quất (Hương Đào Ngọt)', '1x Squishy Mèo Mochi Đào Tiên (Dâu Tây Kem)']
            }
        ];

        // Quick View Modal State
        let qvProduct = null;
        let qvSelectedScent = 'Hương Đào Ngọt';
        let qvSelectedVariant = 'Bản Tiêu Chuẩn';
        let qvSelectedExtra = 0;
        let qvQty = 1;

        function loadSavedState() {
            try {
                const raw = localStorage.getItem(STORAGE_KEY_MOCHI);
                if (raw) {
                    const data = JSON.parse(raw);
                    if (data.cart) cart = data.cart;
                    if (data.wishlistIds) wishlistIds = data.wishlistIds;
                    if (data.currentUser) currentUser = data.currentUser;
                    if (data.orders) orders = data.orders;
                }
            } catch (e) {}
        }

        function saveState() {
            try {
                localStorage.setItem(STORAGE_KEY_MOCHI, JSON.stringify({
                    cart,
                    wishlistIds,
                    currentUser,
                    orders
                }));
            } catch (e) {}
        }

        function formatVND(n) {
            return n.toLocaleString('vi-VN') + 'đ';
        }

        // =====================================================
        // 4. ÂM THANH WEB AUDIO API (TIẾNG BÓP SQUISHY & POP)
        // =====================================================
        let audioCtx = null;
        function playSquishSound(type = 'squish') {
            if (!soundEnabled) return;
            try {
                if (!audioCtx) {
                    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                    audioCtx = new AudioContextClass();
                }
                if (audioCtx.state === 'suspended') audioCtx.resume();

                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);

                const now = audioCtx.currentTime;
                if (type === 'squish') {
                    // Cute downward then upward elastic boing
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(520, now);
                    osc.frequency.exponentialRampToValueAtTime(240, now + 0.12);
                    osc.frequency.exponentialRampToValueAtTime(620, now + 0.28);
                    gain.gain.setValueAtTime(0.18, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.30);
                    osc.start(now);
                    osc.stop(now + 0.30);
                } else {
                    // Cute Pop sound for cart
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(440, now);
                    osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
                    gain.gain.setValueAtTime(0.16, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
                    osc.start(now);
                    osc.stop(now + 0.14);
                }
            } catch (e) {}
        }

        function toggleSoundFX() {
            soundEnabled = !soundEnabled;
            const icon = document.getElementById('soundIcon');
            icon.className = soundEnabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark text-stone-400';
            showToast(soundEnabled ? 'Đã bật hiệu ứng âm thanh bóp Squishy! 🎵' : 'Đã tắt âm thanh.');
            if (soundEnabled) playSquishSound('pop');
        }

        function showToast(msg) {
            const container = document.getElementById('toastContainer');
            const div = document.createElement('div');
            div.className = 'pointer-events-auto bg-white border-2 border-peach-300 shadow-xl rounded-2xl p-3.5 flex items-center gap-3 text-xs sm:text-sm font-bold text-cocoa transition-all duration-300';
            div.innerHTML = `
                <div class="w-8 h-8 rounded-xl bg-peach-100 text-peach-500 flex items-center justify-center shrink-0">
                    <i class="fa-solid fa-wand-magic-sparkles"></i>
                </div>
                <div class="flex-1">${msg}</div>
            `;
            container.appendChild(div);
            setTimeout(() => {
                div.style.opacity = '0';
                div.style.transform = 'translateY(10px)';
                setTimeout(() => div.remove(), 300);
            }, 2600);
        }

        // =====================================================
        // 5. HIỆU ỨNG VẬT LÝ "BÓP THỬ SQUISHY" (SLOW-RISING)
        // =====================================================
        function triggerSquishAnimation(element, statusBadge, slowSeconds) {
            if (!element) return;
            playSquishSound('squish');

            // Bước 1: Bóp dẹp ngay lập tức
            element.style.transition = 'transform 0.14s cubic-bezier(0.25, 1, 0.5, 1)';
            element.style.transform = 'scaleX(1.32) scaleY(0.56) translateY(14px)';

            if (statusBadge) {
                statusBadge.innerHTML = `⏳ Đang từ từ phồng lại... (Slow-rising ${slowSeconds}s)`;
                statusBadge.className = 'inline-block mt-1 px-3.5 py-1 rounded-full bg-butter-200 text-cocoa font-bold text-xs shadow-2xs';
            }

            // Bước 2: Từ từ phồng căng trở lại (Slow-rising)
            setTimeout(() => {
                element.style.transition = 'transform 1.8s cubic-bezier(0.22, 1, 0.36, 1)';
                element.style.transform = 'scaleX(1) scaleY(1) translateY(0)';
            }, 220);

            setTimeout(() => {
                if (statusBadge) {
                    statusBadge.innerHTML = `✨ Đã phồng căng tròn! Bóp tiếp nào!`;
                    statusBadge.className = 'inline-block mt-1 px-3.5 py-1 rounded-full bg-mint-100 text-mint-700 font-bold text-xs shadow-2xs';
                }
            }, 1950);
        }

        function squishHeroMascot() {
            heroSquishCount++;
            document.getElementById('heroSquishCounter').textContent = `Đã bóp: ${heroSquishCount} lần`;
            const el = document.getElementById('heroMascotWrapper');
            const badge = document.getElementById('heroSquishStateBadge');
            triggerSquishAnimation(el, badge, 12);
        }

        function squishCardProduct(id, event) {
            if (event) event.stopPropagation();
            const prod = PRODUCTS.find(p => p.id === id);
            const el = document.getElementById(`cardSvg_${id}`);
            const btn = document.getElementById(`squishBtn_${id}`);
            if (!el || !prod) return;

            playSquishSound('squish');
            el.style.transition = 'transform 0.14s ease-out';
            el.style.transform = 'scaleX(1.3) scaleY(0.55) translateY(10px)';
            if (btn) btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Đang phồng (${prod.slowRising}s)...`;

            setTimeout(() => {
                el.style.transition = 'transform 1.6s cubic-bezier(0.22, 1, 0.36, 1)';
                el.style.transform = 'scaleX(1) scaleY(1) translateY(0)';
            }, 200);

            setTimeout(() => {
                if (btn) btn.innerHTML = `<i class="fa-solid fa-hand-New"></i> 🤏 Bóp thử!`;
            }, 1750);
        }

        function squishModalPreview() {
            if (!qvProduct) return;
            const el = document.getElementById('qvSvgContainer');
            const badge = document.getElementById('qvSquishStatus');
            triggerSquishAnimation(el, badge, qvProduct.slowRising);
        }

        // =====================================================
        // 6. HIỂN THỊ DANH SÁCH SẢN PHẨM & BỘ LỌC
        // =====================================================
        function renderCategoryBar() {
            const bar = document.getElementById('categoryFilterBar');
            bar.innerHTML = CATEGORIES.map(cat => {
                const active = (cat === activeCategory && !wishlistOnly);
                return `
                    <button onclick="filterCategory('${cat}')"
                            class="squish-btn px-4 py-2 rounded-2xl text-xs sm:text-sm font-cute whitespace-nowrap transition ${
                                active
                                    ? 'bg-peach-500 text-white shadow-md shadow-peach-400/30'
                                    : 'bg-peach-50 hover:bg-peach-100 text-cocoa'
                            }">
                        ${cat}
                    </button>
                `;
            }).join('');
        }

        function filterCategory(cat) {
            activeCategory = cat;
            wishlistOnly = false;
            renderCategoryBar();
            renderProductGrid();
        }

        function toggleWishlistMode() {
            wishlistOnly = !wishlistOnly;
            renderCategoryBar();
            renderProductGrid();
        }

        function toggleWishlistItem(id, event) {
            if (event) event.stopPropagation();
            const idx = wishlistIds.indexOf(id);
            const p = PRODUCTS.find(x => x.id === id);
            if (idx > -1) {
                wishlistIds.splice(idx, 1);
                showToast(`Đã bỏ "${p.name}" khỏi mục yêu thích.`);
            } else {
                wishlistIds.push(id);
                playSquishSound('pop');
                showToast(`Đã thả tim "${p.name}" vào mục yêu thích! 💖`);
            }
            saveState();
            renderProductGrid();
        }

        function clearSearchInput() {
            document.getElementById('searchInput').value = '';
            renderProductGrid();
        }

        function resetAllFilters() {
            activeCategory = 'Tất cả';
            wishlistOnly = false;
            document.getElementById('searchInput').value = '';
            document.getElementById('sortSelect').value = 'featured';
            renderCategoryBar();
            renderProductGrid();
        }

        function renderProductGrid() {
            const query = document.getElementById('searchInput').value.trim().toLowerCase();
            const sortMode = document.getElementById('sortSelect').value;
            document.getElementById('clearSearchBtn').classList.toggle('hidden', !query);
            document.getElementById('wishlistCounter').textContent = wishlistIds.length;

            const wishBtn = document.getElementById('wishlistFilterBtn');
            wishBtn.className = wishlistOnly
                ? 'squish-btn w-full md:w-auto px-4 py-2.5 rounded-2xl border-2 border-peach-500 bg-peach-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5'
                : 'squish-btn w-full md:w-auto px-4 py-2.5 rounded-2xl border-2 border-peach-200 bg-white text-peach-600 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5';

            let list = PRODUCTS.filter(p => {
                const matchCat = activeCategory === 'Tất cả' || p.category === activeCategory;
                const matchWish = !wishlistOnly || wishlistIds.includes(p.id);
                const matchQ = !query ||
                    p.name.toLowerCase().includes(query) ||
                    p.desc.toLowerCase().includes(query) ||
                    p.scent.toLowerCase().includes(query) ||
                    p.category.toLowerCase().includes(query);
                return matchCat && matchWish && matchQ;
            });

            if (sortMode === 'slow-desc') list.sort((a, b) => b.slowRising - a.slowRising);
            else if (sortMode === 'price-asc') list.sort((a, b) => a.price - b.price);
            else if (sortMode === 'price-desc') list.sort((a, b) => b.price - a.price);

            const grid = document.getElementById('productGrid');
            const emptyState = document.getElementById('emptyGridState');

            if (list.length === 0) {
                grid.innerHTML = '';
                emptyState.classList.remove('hidden');
                return;
            }
            emptyState.classList.add('hidden');

            grid.innerHTML = list.map(p => {
                const liked = wishlistIds.includes(p.id);
                return `
                    <article class="squishy-card bg-white rounded-[2rem] overflow-hidden flex flex-col justify-between">
                        <div>
                            <!-- Pastel Illustration Stage -->
                            <div onclick="openQuickView(${p.id})" class="relative h-52 bg-gradient-to-br ${p.bgClass} p-4 flex items-center justify-center cursor-pointer select-none">
                                <span class="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 text-peach-600 font-cute text-[11px] shadow-2xs">
                                    ${p.badge}
                                </span>
                                <button onclick="toggleWishlistItem(${p.id}, event)"
                                        class="squish-btn absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 text-peach-500 flex items-center justify-center shadow-2xs">
                                    <i class="${liked ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                                </button>

                                <!-- Interactive SVG Character -->
                                <div id="cardSvg_${p.id}" class="squish-target w-36 h-36 flex items-center justify-center">
                                    ${getSquishySVG(p.id)}
                                </div>

                                <!-- Interactive Squish Button on Card -->
                                <button id="squishBtn_${p.id}" onclick="squishCardProduct(${p.id}, event)"
                                        class="squish-btn absolute bottom-2.5 right-3 px-3 py-1 rounded-full bg-white/95 hover:bg-butter-200 text-cocoa font-bold text-[11px] border border-peach-200 shadow-2xs">
                                    🤏 Bóp thử!
                                </button>
                                <span class="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full bg-white/80 text-[11px] font-bold text-stone-600">
                                    ⏳ ${p.slowRising}s
                                </span>
                            </div>

                            <!-- Card Body -->
                            <div class="p-4 sm:p-5">
                                <div class="flex items-center justify-between text-[11px] font-bold text-lavender-700 mb-1">
                                    <span>${p.category}</span>
                                    <span class="text-peach-500">🌸 ${p.scent}</span>
                                </div>
                                <h3 onclick="openQuickView(${p.id})" class="font-cute text-lg text-cocoa hover:text-peach-500 cursor-pointer line-clamp-1 transition">
                                    ${p.name}
                                </h3>
                                <p class="text-xs text-stone-500 font-medium mt-1 line-clamp-2 leading-relaxed">
                                    ${p.desc}
                                </p>
                            </div>
                        </div>

                        <!-- Card Footer: Price & Add to Cart -->
                        <div class="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 border-t border-peach-100 flex items-center justify-between gap-2">
                            <div>
                                <span class="font-cute text-xl text-peach-600 block leading-none">${formatVND(p.price)}</span>
                                <span class="text-[11px] text-stone-400 line-through font-semibold">${formatVND(p.oldPrice)}</span>
                            </div>
                            <div class="flex items-center gap-1.5">
                                <button onclick="openQuickView(${p.id})" class="squish-btn w-9 h-9 rounded-xl bg-peach-50 hover:bg-peach-100 text-peach-600 flex items-center justify-center text-xs" title="Tùy chọn mùi hương & kích cỡ">
                                    <i class="fa-solid fa-sliders"></i>
                                </button>
                                <button onclick="addToCart(${p.id}, '${p.scent}', 'Bản Tiêu Chuẩn', 0, 1)" class="squish-btn px-3.5 py-2 rounded-xl bg-gradient-to-r from-peach-500 to-peach-400 text-white font-cute text-xs sm:text-sm shadow-xs flex items-center gap-1">
                                    <i class="fa-solid fa-plus"></i>
                                    <span>Thêm giỏ</span>
                                </button>
                            </div>
                        </div>
                    </article>
                `;
            }).join('');
        }

        // =====================================================
        // 7. QUICK VIEW MODAL
        // =====================================================
        function openQuickView(id) {
            const p = PRODUCTS.find(x => x.id === id);
            if (!p) return;
            qvProduct = p;
            qvSelectedScent = p.scent;
            qvSelectedVariant = 'Bản Tiêu Chuẩn';
            qvSelectedExtra = 0;
            qvQty = 1;

            document.getElementById('qvBadge').textContent = p.badge;
            document.getElementById('qvSvgContainer').innerHTML = getSquishySVG(p.id);
            document.getElementById('qvSlowRising').textContent = `${p.slowRising} giây`;
            document.getElementById('qvCategory').textContent = p.category;
            document.getElementById('qvTitle').textContent = p.name;
            document.getElementById('qvDesc').textContent = p.desc;
            document.getElementById('qvQtyText').textContent = '1';

            renderQvOptions();
            document.getElementById('quickViewModal').classList.remove('hidden');
        }

        function closeQuickViewModal() {
            document.getElementById('quickViewModal').classList.add('hidden');
        }

        function renderQvOptions() {
            if (!qvProduct) return;
            document.getElementById('qvPrice').textContent = formatVND(qvProduct.price + qvSelectedExtra);
            document.getElementById('qvOldPrice').textContent = formatVND(qvProduct.oldPrice + qvSelectedExtra);

            document.getElementById('qvScentList').innerHTML = SCENTS.map(sc => {
                const active = sc === qvSelectedScent;
                return `
                    <button type="button" onclick="selectQvScent('${sc}')"
                            class="py-2 px-3 rounded-xl border-2 text-xs font-bold transition ${
                                active ? 'border-peach-500 bg-peach-50 text-peach-600' : 'border-peach-100 text-stone-600 hover:border-peach-200'
                            }">
                        🌸 ${sc}
                    </button>
                `;
            }).join('');

            document.getElementById('qvVariantList').innerHTML = VARIANTS.map(v => {
                const active = v.name === qvSelectedVariant;
                return `
                    <button type="button" onclick="selectQvVariant('${v.name}', ${v.extra})"
                            class="py-2 px-2 rounded-xl border-2 text-[11px] font-bold transition ${
                                active ? 'border-lavender-500 bg-lavender-100/60 text-lavender-700' : 'border-peach-100 text-stone-600 hover:border-peach-200'
                            }">
                        ${v.name}<br><span class="text-[10px] font-normal">+${formatVND(v.extra)}</span>
                    </button>
                `;
            }).join('');
        }

        function selectQvScent(scent) {
            qvSelectedScent = scent;
            renderQvOptions();
        }

        function selectQvVariant(name, extra) {
            qvSelectedVariant = name;
            qvSelectedExtra = extra;
            renderQvOptions();
        }

        function changeQvQty(delta) {
            qvQty = Math.max(1, qvQty + delta);
            document.getElementById('qvQtyText').textContent = qvQty;
        }

        function confirmAddFromModal() {
            if (!qvProduct) return;
            addToCart(qvProduct.id, qvSelectedScent, qvSelectedVariant, qvSelectedExtra, qvQty);
            closeQuickViewModal();
            toggleCartDrawer(true);
        }

        // =====================================================
        // 8. GIỎ HÀNG & MÃ GIẢM GIÁ
        // =====================================================
        function toggleCartDrawer(open) {
            const drawer = document.getElementById('cartDrawer');
            const backdrop = document.getElementById('cartBackdrop');
            if (open) {
                backdrop.classList.remove('hidden');
                drawer.classList.remove('translate-x-full');
                renderCartUI();
            } else {
                drawer.classList.add('translate-x-full');
                backdrop.classList.add('hidden');
            }
        }

        function addToCart(productId, scent, variant, extra, qty) {
            const prod = PRODUCTS.find(p => p.id === productId);
            if (!prod) return;
            playSquishSound('pop');

            const existing = cart.find(i => i.productId === productId && i.scent === scent && i.variant === variant);
            if (existing) {
                existing.qty += qty;
            } else {
                cart.push({ productId, scent, variant, extra, qty });
            }

            saveState();
            renderCartUI();
            showToast(`Đã thêm <strong>${qty}x ${prod.name}</strong> (${scent}) vào giỏ!`);
        }

        function changeCartItemQty(idx, delta) {
            if (!cart[idx]) return;
            cart[idx].qty += delta;
            if (cart[idx].qty <= 0) cart.splice(idx, 1);
            saveState();
            renderCartUI();
        }

        function removeCartItem(idx) {
            cart.splice(idx, 1);
            saveState();
            renderCartUI();
        }

        function computeTotals(includeGiftBox = false) {
            let subtotal = 0;
            let count = 0;
            cart.forEach(item => {
                const p = PRODUCTS.find(x => x.id === item.productId);
                if (p) {
                    subtotal += (p.price + item.extra) * item.qty;
                    count += item.qty;
                }
            });

            let shipping = subtotal === 0 ? 0 : (subtotal >= 250000 ? 0 : 25000);
            let discount = 0;
            if (activeCoupon === 'CAPYBARA') discount = Math.round(subtotal * 0.15);
            else if (activeCoupon === 'MOCHI20') discount = Math.min(subtotal, 20000);
            else if (activeCoupon === 'FREESHIP') shipping = 0;

            const giftFee = includeGiftBox ? 15000 : 0;
            const total = Math.max(0, subtotal - discount + shipping + giftFee);
            return { subtotal, discount, shipping, giftFee, total, count };
        }

        function quickApplyCoupon(code) {
            activeCoupon = code;
            document.getElementById('couponInput').value = code;
            renderCartUI();
            showToast(`Đã áp dụng mã ưu đãi <strong>${code}</strong>! 🎉`);
        }

        function applyInputCoupon() {
            const code = document.getElementById('couponInput').value.trim().toUpperCase();
            if (['CAPYBARA', 'MOCHI20', 'FREESHIP'].includes(code)) {
                activeCoupon = code;
                renderCartUI();
                showToast(`Kích hoạt mã <strong>${code}</strong> thành công!`);
            } else {
                showToast('Mã chưa đúng! Hãy thử CAPYBARA, MOCHI20 hoặc FREESHIP nhé.');
            }
        }

        function clearCoupon() {
            activeCoupon = null;
            document.getElementById('couponInput').value = '';
            renderCartUI();
        }

        function renderCartUI() {
            const { subtotal, discount, shipping, total, count } = computeTotals(false);
            document.getElementById('headerCartCount').textContent = count;
            document.getElementById('drawerCountLabel').textContent = `${count} bé Squishy trong giỏ`;

            // Freeship target 250,000đ
            const target = 250000;
            const pct = Math.min(100, Math.round((subtotal / target) * 100));
            document.getElementById('freeshipBar').style.width = `${pct}%`;
            const promptEl = document.getElementById('freeshipPrompt');
            if (subtotal >= target || activeCoupon === 'FREESHIP') {
                promptEl.innerHTML = `🎉 Tuyệt vời! Đơn của cậu đã được <strong>Freeship + Tặng Sticker Capybara</strong>!`;
            } else {
                promptEl.innerHTML = `Mua thêm <strong class="text-peach-600">${formatVND(target - subtotal)}</strong> để được <strong>Freeship + Tặng Sticker Capybara</strong>!`;
            }

            const container = document.getElementById('cartItemsContainer');
            if (cart.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-12 space-y-3">
                        <div class="w-16 h-16 rounded-full bg-peach-100 text-peach-400 flex items-center justify-center mx-auto text-2xl">
                            <i class="fa-solid fa-face-sad-cry"></i>
                        </div>
                        <p class="font-cute text-lg text-cocoa">Giỏ Squishy đang trống trơn</p>
                        <p class="text-xs font-semibold text-stone-400">Hãy rước vài bé Squishy thơm phức về bóp xả stress nhé!</p>
                    </div>
                `;
            } else {
                container.innerHTML = cart.map((item, idx) => {
                    const p = PRODUCTS.find(x => x.id === item.productId);
                    const unit = p.price + item.extra;
                    return `
                        <div class="flex items-center gap-3 p-3 rounded-2xl bg-peach-50/60 border-2 border-peach-100">
                            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br ${p.bgClass} p-1.5 shrink-0 flex items-center justify-center">
                                ${getSquishySVG(p.id)}
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="flex items-start justify-between gap-1">
                                    <h4 class="font-cute text-sm text-cocoa truncate">${p.name}</h4>
                                    <button onclick="removeCartItem(${idx})" class="text-stone-400 hover:text-peach-600 text-xs">
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                </div>
                                <span class="text-[11px] font-bold text-lavender-700 block">${item.scent} • ${item.variant}</span>
                                <div class="flex items-center justify-between mt-1.5">
                                    <span class="font-cute text-sm text-peach-600">${formatVND(unit * item.qty)}</span>
                                    <div class="flex items-center bg-white border border-peach-200 rounded-xl overflow-hidden">
                                        <button onclick="changeCartItemQty(${idx}, -1)" class="w-6 h-6 text-xs font-bold text-peach-600 hover:bg-peach-50">-</button>
                                        <span class="w-6 text-center text-xs font-bold">${item.qty}</span>
                                        <button onclick="changeCartItemQty(${idx}, 1)" class="w-6 h-6 text-xs font-bold text-peach-600 hover:bg-peach-50">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');
            }

            const couponBox = document.getElementById('activeCouponBox');
            if (activeCoupon) {
                couponBox.classList.remove('hidden');
                couponBox.classList.add('flex');
                document.getElementById('activeCouponLabel').textContent = `Mã đang dùng: ${activeCoupon}`;
            } else {
                couponBox.classList.add('hidden');
                couponBox.classList.remove('flex');
            }

            document.getElementById('cartSubtotalVal').textContent = formatVND(subtotal);
            document.getElementById('cartDiscountVal').textContent = `-${formatVND(discount)}`;
            document.getElementById('cartShipVal').textContent = shipping === 0 ? 'Miễn phí (0đ)' : formatVND(shipping);
            document.getElementById('cartTotalVal').textContent = formatVND(total);
        }

        // =====================================================
        // 9. HỆ THỐNG ĐĂNG NHẬP / ĐĂNG KÝ
        // =====================================================
        function openAuthModal(tab = 'login') {
            document.getElementById('authModal').classList.remove('hidden');
            switchAuthTab(tab);
        }

        function closeAuthModal() {
            document.getElementById('authModal').classList.add('hidden');
        }

        function switchAuthTab(tab) {
            const isLogin = tab === 'login';
            document.getElementById('loginForm').classList.toggle('hidden', !isLogin);
            document.getElementById('registerForm').classList.toggle('hidden', isLogin);
            document.getElementById('authTabLogin').className = isLogin
                ? 'py-2 rounded-xl bg-white text-peach-600 shadow-2xs transition'
                : 'py-2 rounded-xl text-stone-500 transition';
            document.getElementById('authTabRegister').className = !isLogin
                ? 'py-2 rounded-xl bg-white text-peach-600 shadow-2xs transition'
                : 'py-2 rounded-xl text-stone-500 transition';
        }

        function submitLogin(e) {
            e.preventDefault();
            const idVal = document.getElementById('loginIdentifier').value.trim();
            currentUser = {
                name: idVal.includes('@') ? 'Bé Mochi Cute' : idVal,
                phone: '0988 686 868',
                points: 250
            };
            saveState();
            renderUserHeader();
            closeAuthModal();
            showToast(`Chào mừng <strong>${currentUser.name}</strong> đã quay lại tiệm! 💖`);
        }

        function instantVipLogin() {
            currentUser = {
                name: 'Bé Mochi VIP',
                phone: '0988 686 868',
                points: 250
            };
            saveState();
            renderUserHeader();
            closeAuthModal();
            showToast('Đã đăng nhập nhanh tài khoản VIP: <strong>Bé Mochi VIP (250 Kẹo Bông)</strong>! 🍬');
        }

        function submitRegister(e) {
            e.preventDefault();
            const name = document.getElementById('regName').value.trim();
            const phone = document.getElementById('regPhone').value.trim();
            currentUser = { name, phone, points: 100 };
            activeCoupon = 'CAPYBARA';
            saveState();
            renderUserHeader();
            renderCartUI();
            closeAuthModal();
            showToast(`Chào mừng <strong>${name}</strong>! Tặng cậu 100 Kẹo Bông & mã <strong>CAPYBARA</strong> giảm 15%!`);
        }

        function logoutAccount() {
            currentUser = null;
            saveState();
            renderUserHeader();
            showToast('Đã đăng xuất tài khoản.');
        }

        function renderUserHeader() {
            const box = document.getElementById('headerUserBox');
            if (currentUser) {
                box.innerHTML = `
                    <div class="flex items-center gap-2 bg-peach-100/80 border-2 border-peach-200 rounded-2xl px-3 py-1">
                        <div class="w-7 h-7 rounded-xl bg-peach-500 text-white font-cute text-xs flex items-center justify-center">
                            ${currentUser.name.charAt(0).toUpperCase()}
                        </div>
                        <div class="hidden sm:block text-xs">
                            <span class="font-bold text-cocoa block leading-none">${currentUser.name}</span>
                            <span class="text-[10px] font-bold text-peach-600">🍬 ${currentUser.points} Kẹo Bông</span>
                        </div>
                        <button onclick="logoutAccount()" class="text-stone-400 hover:text-peach-600 text-xs ml-1" title="Đăng xuất">
                            <i class="fa-solid fa-right-from-bracket"></i>
                        </button>
                    </div>
                `;
            } else {
                box.innerHTML = `
                    <button onclick="openAuthModal('login')" class="squish-btn px-3.5 py-2 rounded-2xl bg-peach-100 hover:bg-peach-200 text-peach-600 font-bold text-xs sm:text-sm flex items-center gap-2">
                        <i class="fa-solid fa-face-smile-wink text-base"></i>
                        <span class="hidden sm:inline">Đăng nhập</span>
                    </button>
                `;
            }

            const ordBadge = document.getElementById('orderHistoryBadge');
            if (orders.length > 0) {
                ordBadge.textContent = orders.length;
                ordBadge.classList.remove('hidden');
                ordBadge.classList.add('flex');
            }
        }

        // =====================================================
        // 10. THANH TOÁN (CHECKOUT) & PHÁO GIẤY CONFETTI
        // =====================================================
        function openCheckoutModal() {
            if (cart.length === 0) {
                showToast('Giỏ hàng đang trống, cậu hãy chọn ít nhất 1 bé Squishy nhé!');
                return;
            }
            toggleCartDrawer(false);

            if (currentUser) {
                document.getElementById('chkName').value = currentUser.name;
                document.getElementById('chkPhone').value = currentUser.phone;
            }
            document.getElementById('qrMemoText').textContent = 'MOCHI ' + Math.floor(1000 + Math.random() * 9000);
            updateCheckoutSummary();
            document.getElementById('checkoutModal').classList.remove('hidden');
        }

        function closeCheckoutModal() {
            document.getElementById('checkoutModal').classList.add('hidden');
        }

        function updateCheckoutSummary() {
            const includeGift = document.getElementById('chkGiftBoxToggle').checked;
            const { subtotal, discount, shipping, giftFee, total, count } = computeTotals(includeGift);

            document.getElementById('chkCountLabel').textContent = count;
            document.getElementById('chkSubVal').textContent = formatVND(subtotal);
            document.getElementById('chkDiscVal').textContent = `-${formatVND(discount)}`;
            document.getElementById('chkGiftVal').textContent = formatVND(giftFee);
            document.getElementById('chkShipVal').textContent = shipping === 0 ? 'Miễn phí (0đ)' : formatVND(shipping);
            document.getElementById('chkTotalVal').textContent = formatVND(total);
            document.getElementById('qrAmountText').textContent = formatVND(total);

            document.getElementById('chkItemsList').innerHTML = cart.map(item => {
                const p = PRODUCTS.find(x => x.id === item.productId);
                return `
                    <div class="py-2 flex items-center justify-between gap-2 text-xs font-semibold">
                        <div class="flex items-center gap-2 min-w-0">
                            <div class="w-10 h-10 rounded-xl bg-gradient-to-br ${p.bgClass} p-1 shrink-0 flex items-center justify-center">
                                ${getSquishySVG(p.id)}
                            </div>
                            <div class="truncate">
                                <div class="text-cocoa font-bold truncate">${item.qty}x ${p.name}</div>
                                <div class="text-stone-400 text-[11px]">${item.scent} • ${item.variant}</div>
                            </div>
                        </div>
                        <span class="font-cute text-peach-600 shrink-0">${formatVND((p.price + item.extra) * item.qty)}</span>
                    </div>
                `;
            }).join('');
        }

        function toggleQRDisplay(method) {
            const panel = document.getElementById('qrPaymentPanel');
            if (method === 'VIETQR' || method === 'MOMO') panel.classList.remove('hidden');
            else panel.classList.add('hidden');
        }

        function copyTextToClipboard(text) {
            const t = document.createElement('textarea');
            t.value = text;
            document.body.appendChild(t);
            t.select();
            document.execCommand('copy');
            document.body.removeChild(t);
            showToast(`Đã sao chép số tài khoản <strong>${text}</strong>!`);
        }

        function completeOrderSubmit(e) {
            e.preventDefault();
            const name = document.getElementById('chkName').value.trim();
            const phone = document.getElementById('chkPhone').value.trim();
            const address = document.getElementById('chkAddress').value.trim();
            const includeGift = document.getElementById('chkGiftBoxToggle').checked;
            const payVal = document.querySelector('input[name="payMethod"]:checked').value;
            const payLabel = payVal === 'COD' ? 'Tiền mặt khi nhận (COD)' : (payVal === 'VIETQR' ? 'Chuyển khoản VietQR' : 'Ví MoMo');

            const { total } = computeTotals(includeGift);
            const code = 'MS-' + Math.floor(10000 + Math.random() * 90000);
            const today = new Date().toLocaleDateString('vi-VN');
            const itemNames = cart.map(i => {
                const p = PRODUCTS.find(x => x.id === i.productId);
                return `${i.qty}x ${p.name} (${i.scent})`;
            });

            const newOrd = {
                code,
                date: today,
                recipient: `${name} (${phone})`,
                address,
                total,
                payMethod: payLabel,
                status: 'Đang đóng gói túi Zip 🎁',
                items: itemNames
            };

            orders.unshift(newOrd);
            if (currentUser) currentUser.points += Math.round(total / 1000);
            cart = [];
            activeCoupon = null;
            saveState();
            renderCartUI();
            renderUserHeader();
            closeCheckoutModal();

            document.getElementById('successSummaryCard').innerHTML = `
                <div class="flex justify-between border-b border-peach-200 pb-1">
                    <span class="text-stone-500">Mã đơn hàng:</span>
                    <strong class="text-peach-600">${newOrd.code}</strong>
                </div>
                <div class="flex justify-between">
                    <span class="text-stone-500">Người nhận:</span>
                    <strong class="text-cocoa">${newOrd.recipient}</strong>
                </div>
                <div class="flex justify-between">
                    <span class="text-stone-500">Địa chỉ:</span>
                    <strong class="text-cocoa text-right">${newOrd.address}</strong>
                </div>
                <div class="flex justify-between">
                    <span class="text-stone-500">Thanh toán:</span>
                    <strong class="text-lavender-700">${newOrd.payMethod}</strong>
                </div>
                <div class="flex justify-between pt-1.5 border-t border-peach-200 text-sm">
                    <span class="font-cute text-cocoa">Tổng cộng:</span>
                    <strong class="font-cute text-peach-600 text-base">${formatVND(newOrd.total)}</strong>
                </div>
            `;

            document.getElementById('successModal').classList.remove('hidden');
            launchPastelConfetti();
        }

        function closeSuccessModal() {
            document.getElementById('successModal').classList.add('hidden');
        }

        function closeSuccessAndViewOrders() {
            closeSuccessModal();
            openOrdersModal();
        }

        function openOrdersModal() {
            const box = document.getElementById('ordersListBox');
            if (orders.length === 0) {
                box.innerHTML = `<p class="text-center text-stone-400 py-8 font-bold text-sm">Cậu chưa có đơn hàng nào.</p>`;
            } else {
                box.innerHTML = orders.map(o => `
                    <div class="p-4 rounded-2xl bg-peach-50/70 border-2 border-peach-100 space-y-2 text-xs sm:text-sm font-semibold">
                        <div class="flex items-center justify-between border-b border-peach-200 pb-1.5">
                            <span class="font-cute text-peach-600">${o.code} • <span class="text-stone-400 font-sans text-xs">${o.date}</span></span>
                            <span class="px-2.5 py-0.5 rounded-full bg-mint-100 text-mint-700 text-xs font-bold">${o.status}</span>
                        </div>
                        <div class="text-xs text-stone-600 space-y-0.5">
                            <div><strong>Người nhận:</strong> ${o.recipient}</div>
                            <div><strong>Địa chỉ:</strong> ${o.address}</div>
                            <div><strong>Sản phẩm:</strong> ${o.items.join(', ')}</div>
                        </div>
                        <div class="flex justify-between items-center pt-1.5 border-t border-peach-100 text-xs">
                            <span class="text-stone-500">${o.payMethod}</span>
                            <span class="font-cute text-base text-peach-600">${formatVND(o.total)}</span>
                        </div>
                    </div>
                `).join('');
            }
            document.getElementById('ordersModal').classList.remove('hidden');
        }

        function closeOrdersModal() {
            document.getElementById('ordersModal').classList.add('hidden');
        }

        // Hiệu ứng pháo giấy Pastel chúc mừng đặt hàng
        function launchPastelConfetti() {
            const canvas = document.getElementById('confettiCanvas');
            canvas.classList.remove('hidden');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const ctx = canvas.getContext('2d');
            const colors = ['#FF8FAB', '#A8E6CF', '#FFF3B0', '#E2CFEA', '#FB6F92'];
            const pieces = Array.from({ length: 75 }, () => ({
                x: Math.random() * canvas.width,
                y: -20 - Math.random() * 100,
                r: Math.random() * 6 + 4,
                vy: Math.random() * 3.5 + 2,
                vx: (Math.random() - 0.5) * 2.5,
                color: colors[Math.floor(Math.random() * colors.length)]
            }));

            let frames = 0;
            function step() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                pieces.forEach(p => {
                    p.x += p.vx;
                    p.y += p.vy;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fillStyle = p.color;
                    ctx.fill();
                });
                frames++;
                if (frames < 130) requestAnimationFrame(step);
                else canvas.classList.add('hidden');
            }
            step();
        }

        // Khởi chạy khi trang tải xong
        window.addEventListener('DOMContentLoaded', () => {
            loadSavedState();
            renderCategoryBar();
            renderProductGrid();
            renderCartUI();
            renderUserHeader();
        });
    </script>
</body>
</html>
