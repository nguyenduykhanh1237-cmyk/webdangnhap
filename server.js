/**
 * MOCHIZEN - KAWAII SQUISHY ASMR & STRESS RELIEF (100% VANILLA JS)
 * Tính năng:
 * 1. Vật lý đàn hồi thời gian thực (60 FPS): Nhấn giữ để ép xẹp, thả ra tự phồng chậm (Slow-rising) hoặc nảy Jelly.
 * 2. Biểu cảm khuôn mặt động: Tự động đổi mắt/miệng khi đang bình thường, khi bị ép chặt và khi đang phồng lên.
 * 3. Bộ tổng hợp âm thanh Web Audio API 4 chế độ: Bọt Xốp Xì Hơi, Mochi Núng Nính, Kèn Chít Kawaii, Nổ Bong Bóng.
 * 4. Màng xốp hơi (Bubble Wrap) 24 nút bấm nổ vô tận kèm thanh đo Dopamine Hạnh Phúc.
 */

const SQUISHY_CHARACTERS = [
    {
        id: "capybara",
        name: "Capybara Đội Quất",
        subtitle: "Điềm tĩnh vô ưu • Hương Cam Quất",
        themeBg: "from-amber-100 via-orange-50 to-yellow-100",
        accent: "#f59e0b",
        bodyColor: "#c68b59",
        strokeColor: "#7c4a21",
        bellyColor: "#e3b283",
        slowRiseDefault: 6
    },
    {
        id: "mochi_cat",
        name: "Mèo Mochi Đào Tiên",
        subtitle: "Mềm như kem sữa • Hương Đào Hồng",
        themeBg: "from-pink-100 via-rose-50 to-pink-200",
        accent: "#ec4899",
        bodyColor: "#fff0f6",
        strokeColor: "#f472b6",
        bellyColor: "#ffd6e7",
        slowRiseDefault: 4
    },
    {
        id: "bunny_bun",
        name: "Bánh Bao Thỏ Trắng",
        subtitle: "Núng nính mới ra lò • Hương Sữa Dừa",
        themeBg: "from-purple-100 via-indigo-50 to-pink-100",
        accent: "#a855f7",
        bodyColor: "#ffffff",
        strokeColor: "#c084fc",
        bellyColor: "#fae8ff",
        slowRiseDefault: 8
    },
    {
        id: "corgi_peach",
        name: "Cún Corgi Mông Đào",
        subtitle: "Siêu đàn hồi • Hương Vani Bơ Pháp",
        themeBg: "from-orange-100 via-amber-50 to-rose-100",
        accent: "#f97316",
        bodyColor: "#fbbf24",
        strokeColor: "#b45309",
        bellyColor: "#ffffff",
        slowRiseDefault: 5
    },
    {
        id: "cheese_duck",
        name: "Vịt Vàng Phô Mai",
        subtitle: "Nảy tưng tưng • Hương Bơ Sữa",
        themeBg: "from-yellow-100 via-amber-50 to-lime-100",
        accent: "#eab308",
        bodyColor: "#fde047",
        strokeColor: "#ca8a04",
        bellyColor: "#fef9c3",
        slowRiseDefault: 2
    }
];

class SquishyASMRApp {
    constructor() {
        this.state = {
            currentChar: SQUISHY_CHARACTERS[0],
            soundType: "foam",       // "foam" | "boing" | "squeak" | "pop"
            slowRiseSeconds: 6,      // Thời gian phồng lại (1s -> 12s)
            squeezeCount: Number(localStorage.getItem("mochizen_count") || 0),
            zenPoints: 25,           // 0 -> 100%
            isPressing: false,
            pressIntensity: 0,       // 0.0 -> 1.0 (nhấn giữ càng lâu càng xẹp)
            // Biến trạng thái vật lý 60FPS
            scaleX: 1,
            scaleY: 1,
            velX: 0,
            velY: 0,
            tilt: 0,
            faceState: "chill",      // "chill" | "squeezed" | "rising"
            bubbles: new Array(24).fill(false)
        };

        this.audioCtx = null;
        this.injectCustomStyles();
        this.renderUI();
        this.bindEvents();
        this.startPhysicsLoop();
    }

    // =========================================================================
    // 1. TIÊM CSS FONT & HIỆU ỨNG HẠT BAY KAWAII
    // =========================================================================
    injectCustomStyles() {
        const style = document.createElement("style");
        style.textContent = `
            body { font-family: 'Quicksand', sans-serif; }
            .font-kawaii { font-family: 'Fredoka', 'Quicksand', sans-serif; }
            @keyframes floatParticle {
                0% { opacity: 1; transform: translate(0, 0) scale(0.6) rotate(0deg); }
                100% { opacity: 0; transform: translate(var(--tx), -95px) scale(1.35) rotate(25deg); }
            }
            .kawaii-particle {
                position: fixed;
                pointer-events: none;
                z-index: 9999;
                animation: floatParticle 0.95s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            .bubble-cell {
                transition: all 0.14s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .bubble-cell:active {
                transform: scale(0.82);
            }
        `;
        document.head.appendChild(style);
    }

    // =========================================================================
    // 2. BỘ TỔNG HỢP ÂM THANH ASMR 4 CHẾ ĐỘ (WEB AUDIO API)
    // =========================================================================
    initAudio() {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!this.audioCtx && AudioCtx) {
            this.audioCtx = new AudioCtx();
        }
        if (this.audioCtx && this.audioCtx.state === "suspended") {
            this.audioCtx.resume();
        }
    }

    playASMRSound(phase = "press") {
        try {
            this.initAudio();
            if (!this.audioCtx) return;
            const ctx = this.audioCtx;
            const now = ctx.currentTime;
            const mode = this.state.soundType;

            if (mode === "foam") {
                // Tiếng bọt xốp PU Foam xì hơi êm tai (Filtered White Noise + Soft Sub-bass)
                const bufferSize = ctx.sampleRate * 0.32;
                const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
                const output = noiseBuffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    output[i] = Math.random() * 2 - 1;
                }

                const whiteNoise = ctx.createBufferSource();
                whiteNoise.buffer = noiseBuffer;

                const filter = ctx.createBiquadFilter();
                filter.type = "bandpass";
                filter.frequency.setValueAtTime(phase === "press" ? 950 : 520, now);
                filter.frequency.exponentialRampToValueAtTime(phase === "press" ? 380 : 1100, now + 0.28);
                filter.Q.value = 2.2;

                const gain = ctx.createGain();
                gain.gain.setValueAtTime(0.01, now);
                gain.gain.linearRampToValueAtTime(phase === "press" ? 0.22 : 0.12, now + 0.05);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.30);

                whiteNoise.connect(filter);
                filter.connect(gain);
                gain.connect(ctx.destination);
                whiteNoise.start(now);
                whiteNoise.stop(now + 0.31);

                // Âm trầm mềm khi nhấn
                if (phase === "press") {
                    const osc = ctx.createOscillator();
                    const oscGain = ctx.createGain();
                    osc.type = "sine";
                    osc.frequency.setValueAtTime(190, now);
                    osc.frequency.exponentialRampToValueAtTime(85, now + 0.16);
                    oscGain.gain.setValueAtTime(0.18, now);
                    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.17);
                    osc.connect(oscGain);
                    oscGain.connect(ctx.destination);
                    osc.start(now);
                    osc.stop(now + 0.18);
                }
            } else if (mode === "boing") {
                // Tiếng Mochi / Pudding nảy tưng tưng
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sine";
                if (phase === "press") {
                    osc.frequency.setValueAtTime(320, now);
                    osc.frequency.exponentialRampToValueAtTime(180, now + 0.12);
                    osc.frequency.exponentialRampToValueAtTime(420, now + 0.24);
                } else {
                    osc.frequency.setValueAtTime(240, now);
                    osc.frequency.exponentialRampToValueAtTime(520, now + 0.18);
                }
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.27);
            } else if (mode === "squeak") {
                // Tiếng đồ chơi bóp chít Kawaii
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "triangle";
                const startF = phase === "press" ? 780 : 620;
                const endF = phase === "press" ? 1350 : 980;
                osc.frequency.setValueAtTime(startF, now);
                osc.frequency.exponentialRampToValueAtTime(endF, now + 0.11);
                gain.gain.setValueAtTime(0.16, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.15);
            } else if (mode === "pop") {
                this.playBubblePopSound();
            }
        } catch (err) {}
    }

    playBubblePopSound() {
        try {
            this.initAudio();
            if (!this.audioCtx) return;
            const ctx = this.audioCtx;
            const now = ctx.currentTime;

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            const baseFreq = 420 + Math.random() * 220;
            osc.frequency.setValueAtTime(baseFreq, now);
            osc.frequency.exponentialRampToValueAtTime(baseFreq * 2.4, now + 0.065);

            gain.gain.setValueAtTime(0.24, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.08);
        } catch (err) {}
    }

    // =========================================================================
    // 3. VẼ SVG NHÂN VẬT SQUISHY VỚI BIỂU CẢM ĐỘNG THEO LỰC BÓP
    // =========================================================================
    getCharacterSVG(char, faceState) {
        // Biểu cảm mắt & miệng thay đổi theo trạng thái bóp
        let eyesSVG = "";
        let mouthSVG = "";
        let blushOpacity = "0.65";

        if (faceState === "squeezed") {
            // Mắt nhắm tịt > < khi bị bóp mạnh
            eyesSVG = `
                <path d="M56 84 L68 90 L56 96" fill="none" stroke="#432818" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M124 84 L112 90 L124 96" fill="none" stroke="#432818" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
            `;
            mouthSVG = `<path d="M82 103 Q90 95 98 103 Q90 112 82 103Z" fill="#fb7185" stroke="#432818" stroke-width="3"/>`;
            blushOpacity = "0.95";
        } else if (faceState === "rising") {
            // Mắt long lanh ◕ ‿ ◕ khi đang phồng chậm trở lại
            eyesSVG = `
                <circle cx="62" cy="89" r="7" fill="#432818"/>
                <circle cx="60" cy="86" r="2.5" fill="#ffffff"/>
                <circle cx="118" cy="89" r="7" fill="#432818"/>
                <circle cx="116" cy="86" r="2.5" fill="#ffffff"/>
            `;
            mouthSVG = `<path d="M82 99 Q86 105 90 99 Q94 105 98 99" fill="none" stroke="#432818" stroke-width="3.5" stroke-linecap="round"/>`;
        } else {
            // Trạng thái thư giãn bình thường
            if (char.id === "capybara") {
                eyesSVG = `
                    <line x1="54" y1="88" x2="68" y2="88" stroke="#432818" stroke-width="4.5" stroke-linecap="round"/>
                    <line x1="112" y1="88" x2="126" y2="88" stroke="#432818" stroke-width="4.5" stroke-linecap="round"/>
                `;
            } else {
                eyesSVG = `
                    <circle cx="62" cy="88" r="6" fill="#432818"/>
                    <circle cx="60" cy="86" r="2" fill="#ffffff"/>
                    <circle cx="118" cy="88" r="6" fill="#432818"/>
                    <circle cx="116" cy="86" r="2" fill="#ffffff"/>
                `;
            }
            mouthSVG = `<path d="M83 98 Q90 105 97 98" fill="none" stroke="#432818" stroke-width="3.5" stroke-linecap="round"/>`;
        }

        // Phụ kiện trên đầu riêng cho từng nhân vật
        let topAccessory = "";
        if (char.id === "capybara") {
            // Đôi tai tròn + Quả quất vàng trên đỉnh đầu
            topAccessory = `
                <ellipse cx="48" cy="54" rx="12" ry="9" fill="#a46b39" stroke="${char.strokeColor}" stroke-width="4"/>
                <ellipse cx="132" cy="54" rx="12" ry="9" fill="#a46b39" stroke="${char.strokeColor}" stroke-width="4"/>
                <circle cx="90" cy="34" r="17" fill="#ff9f1c" stroke="#d97706" stroke-width="3.5"/>
                <ellipse cx="84" cy="29" rx="4" ry="2.5" fill="#fde68a" opacity="0.7"/>
                <path d="M90 17 Q102 9 108 17 Q98 23 90 17Z" fill="#10b981" stroke="#047857" stroke-width="2"/>
            `;
        } else if (char.id === "mochi_cat" || char.id === "corgi_peach") {
            // Đôi tai mèo / cún nhọn
            topAccessory = `
                <polygon points="38,68 46,28 74,52" fill="${char.bodyColor}" stroke="${char.strokeColor}" stroke-width="4" stroke-linejoin="round"/>
                <polygon points="142,68 134,28 106,52" fill="${char.bodyColor}" stroke="${char.strokeColor}" stroke-width="4" stroke-linejoin="round"/>
                <polygon points="44,62 49,36 68,52" fill="#fda4af"/>
                <polygon points="136,62 131,36 112,52" fill="#fda4af"/>
            `;
        } else if (char.id === "bunny_bun") {
            // Đôi tai thỏ dài
            topAccessory = `
                <ellipse cx="66" cy="36" rx="12" ry="26" transform="rotate(-12 66 36)" fill="#ffffff" stroke="${char.strokeColor}" stroke-width="4"/>
                <ellipse cx="114" cy="36" rx="12" ry="26" transform="rotate(12 114 36)" fill="#ffffff" stroke="${char.strokeColor}" stroke-width="4"/>
                <ellipse cx="66" cy="38" rx="6" ry="16" transform="rotate(-12 66 38)" fill="#f9a8d4"/>
                <ellipse cx="114" cy="38" rx="6" ry="16" transform="rotate(12 114 38)" fill="#f9a8d4"/>
            `;
        } else if (char.id === "cheese_duck") {
            // Chỏm tóc vịt + Miếng phô mai
            topAccessory = `
                <path d="M86 42 Q90 22 98 30 Q106 24 96 42" fill="#fde047" stroke="#ca8a04" stroke-width="3.5" stroke-linecap="round"/>
            `;
        }

        return `
            <svg viewBox="0 0 180 170" class="w-56 h-56 sm:w-64 sm:h-64 mx-auto overflow-visible select-none pointer-events-none">
                ${topAccessory}
                <!-- Thân Squishy Mochi tròn phúng phính -->
                <rect x="26" y="44" width="128" height="104" rx="52" fill="${char.bodyColor}" stroke="${char.strokeColor}" stroke-width="4.5"/>
                <!-- Bóng sáng bóng mượt (Glossy highlight) -->
                <path d="M48 58 Q70 48 95 53" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" opacity="0.75"/>
                <!-- Vùng bụng / mõm -->
                <ellipse cx="90" cy="108" rx="34" ry="22" fill="${char.bellyColor}"/>
                <!-- Hai má hồng phúng phính -->
                <ellipse cx="48" cy="98" rx="10" ry="6" fill="#ff758f" opacity="${blushOpacity}"/>
                <ellipse cx="132" cy="98" rx="10" ry="6" fill="#ff758f" opacity="${blushOpacity}"/>
                <!-- Mắt & Miệng -->
                ${eyesSVG}
                ${mouthSVG}
                <!-- Hai tay nhỏ xinh -->
                <ellipse cx="34" cy="110" rx="9" ry="6" transform="rotate(20 34 110)" fill="${char.bodyColor}" stroke="${char.strokeColor}" stroke-width="3.5"/>
                <ellipse cx="146" cy="110" rx="9" ry="6" transform="rotate(-20 146 110)" fill="${char.bodyColor}" stroke="${char.strokeColor}" stroke-width="3.5"/>
            </svg>
        `;
    }

    // =========================================================================
    // 4. VÒNG LẶP VẬT LÝ ĐÀN HỒI 60 FPS (SPRING & SLOW-RISING ENGINE)
    // =========================================================================
    startPhysicsLoop() {
        const updatePhysics = () => {
            if (this.state.isPressing) {
                // Nhấn giữ càng lâu càng xẹp sâu và bè ngang
                this.state.pressIntensity = Math.min(1.0, this.state.pressIntensity + 0.045);
                const targetX = 1.0 + this.state.pressIntensity * 0.38;
                const targetY = 1.0 - this.state.pressIntensity * 0.52;

                this.state.scaleX += (targetX - this.state.scaleX) * 0.25;
                this.state.scaleY += (targetY - this.state.scaleY) * 0.25;

                if (this.state.faceState !== "squeezed") {
                    this.state.faceState = "squeezed";
                    this.updateSquishyFaceDOM();
                }
            } else {
                this.state.pressIntensity = 0;
                const slowRise = this.state.slowRiseSeconds;

                if (slowRise <= 2) {
                    // Chế độ nảy tưng tưng như bánh Pudding (Harmonic Spring)
                    const stiffness = 0.22;
                    const damping = 0.80;
                    const forceX = (1.0 - this.state.scaleX) * stiffness;
                    const forceY = (1.0 - this.state.scaleY) * stiffness;

                    this.state.velX = (this.state.velX + forceX) * damping;
                    this.state.velY = (this.state.velY + forceY) * damping;
                    this.state.scaleX += this.state.velX;
                    this.state.scaleY += this.state.velY;
                } else {
                    // Chế độ Slow-Rising (Phồng chậm êm ái chuẩn PU Foam)
                    const recoveryRate = 0.085 / slowRise;
                    this.state.scaleX += (1.0 - this.state.scaleX) * recoveryRate;
                    this.state.scaleY += (1.0 - this.state.scaleY) * recoveryRate;
                    this.state.tilt *= 0.92;
                }

                // Cập nhật biểu cảm khuôn mặt theo độ phồng hiện tại
                const deformation = Math.abs(1.0 - this.state.scaleY);
                const newFace = deformation > 0.045 ? "rising" : "chill";
                if (newFace !== this.state.faceState) {
                    this.state.faceState = newFace;
                    this.updateSquishyFaceDOM();
                }

                // Cập nhật thanh hiển thị % độ phồng
                const fullnessPct = Math.min(100, Math.max(10, Math.round(this.state.scaleY * 100)));
                const badgeEl = document.getElementById("riseStatusBadge");
                if (badgeEl) {
                    if (deformation > 0.03) {
                        badgeEl.textContent = `Đang phồng chậm... ${fullnessPct}% 🫧`;
                        badgeEl.className = "px-3.5 py-1 rounded-full text-xs font-extrabold bg-pink-500 text-white shadow-xs";
                    } else {
                        badgeEl.textContent = `Độ căng phồng: 100% (Slow-rise ${this.state.slowRiseSeconds}s) ✨`;
                        badgeEl.className = "px-3.5 py-1 rounded-full text-xs font-bold bg-white/90 text-pink-600 border border-pink-200";
                    }
                }
            }

            // Áp dụng ma trận biến dạng lên nhân vật Squishy và bóng đổ
            const bodyEl = document.getElementById("squishyPhysicsBody");
            const shadowEl = document.getElementById("squishyShadow");
            if (bodyEl) {
                const translateY = (1.0 - this.state.scaleY) * 58;
                bodyEl.style.transform = `translateY(${translateY}px) scale(${this.state.scaleX.toFixed(3)}, ${this.state.scaleY.toFixed(3)}) rotate(${this.state.tilt.toFixed(2)}deg)`;
            }
            if (shadowEl) {
                shadowEl.style.transform = `scaleX(${this.state.scaleX.toFixed(3)})`;
            }

            requestAnimationFrame(updatePhysics);
        };
        requestAnimationFrame(updatePhysics);
    }

    updateSquishyFaceDOM() {
        const container = document.getElementById("squishyPhysicsBody");
        if (container) {
            container.innerHTML = this.getCharacterSVG(this.state.currentChar, this.state.faceState);
        }
    }

    // =========================================================================
    // 5. XỬ LÝ SỰ KIỆN NHẤN GIỮ & THẢ TAY (MOUSE / TOUCH / SPACEBAR)
    // =========================================================================
    startSqueeze(clientX, clientY) {
        if (!this.state.isPressing) {
            this.state.isPressing = true;
            this.state.squeezeCount++;
            this.state.zenPoints = Math.min(100, this.state.zenPoints + 4);
            localStorage.setItem("mochizen_count", this.state.squeezeCount);

            // Tính độ nghiêng nhẹ theo vị trí bấm lệch trái/phải
            const stage = document.getElementById("squishyInteractiveArea");
            if (stage && clientX) {
                const rect = stage.getBoundingClientRect();
                const offsetX = clientX - (rect.left + rect.width / 2);
                this.state.tilt = (offsetX / (rect.width / 2)) * 9;
            }

            this.playASMRSound("press");
            this.spawnKawaiiParticles(clientX || window.innerWidth / 2, clientY || window.innerHeight / 2);
            this.updateCountersDOM();
        }
    }

    endSqueeze() {
        if (this.state.isPressing) {
            this.state.isPressing = false;
            this.state.velX = -0.08;
            this.state.velY = 0.12;
            this.playASMRSound("release");
        }
    }

    spawnKawaiiParticles(x, y) {
        const icons = ["💖", "✨", "🍑", "🌸", "🫧", "🍊", "⭐"];
        for (let i = 0; i < 6; i++) {
            const p = document.createElement("div");
            p.className = "kawaii-particle text-xl select-none";
            p.textContent = icons[Math.floor(Math.random() * icons.length)];
            const tx = (Math.random() * 110 - 55).toFixed(0) + "px";
            p.style.setProperty("--tx", tx);
            p.style.left = `${x + (Math.random() * 40 - 20)}px`;
            p.style.top = `${y + (Math.random() * 20 - 10)}px`;
            document.body.appendChild(p);
            setTimeout(() => p.remove(), 950);
        }
    }

    updateCountersDOM() {
        const countEl = document.getElementById("squeezeCounterText");
        const zenBar = document.getElementById("zenProgressBar");
        const zenLabel = document.getElementById("zenStatusLabel");

        if (countEl) countEl.textContent = this.state.squeezeCount.toLocaleString("vi-VN");
        if (zenBar) zenBar.style.width = `${this.state.zenPoints}%`;
        if (zenLabel) {
            if (this.state.zenPoints >= 100) zenLabel.textContent = "Tâm trạng: Thư thái 100% (Max Dopamine!) 🌸";
            else if (this.state.zenPoints >= 60) zenLabel.textContent = `Tâm trạng: Vui vẻ êm ái (${this.state.zenPoints}%) ✨`;
            else zenLabel.textContent = `Đang xả stress... (${this.state.zenPoints}%) 🫧`;
        }
    }

    selectCharacter(charId) {
        const found = SQUISHY_CHARACTERS.find(c => c.id === charId);
        if (!found) return;
        this.state.currentChar = found;
        this.state.slowRiseSeconds = found.slowRiseDefault;
        this.state.scaleX = 1.25;
        this.state.scaleY = 0.65;
        this.playASMRSound("press");
        this.renderUI();
        this.bindEvents();
    }

    setSoundMode(mode) {
        this.state.soundType = mode;
        this.playASMRSound("press");
        document.querySelectorAll(".sound-mode-btn").forEach(btn => {
            if (btn.dataset.mode === mode) {
                btn.className = "sound-mode-btn p-2.5 rounded-2xl text-xs font-bold border-2 bg-pink-500 text-white border-pink-500 shadow-sm transition";
            } else {
                btn.className = "sound-mode-btn p-2.5 rounded-2xl text-xs font-bold border-2 bg-white text-slate-600 border-pink-100 hover:border-pink-300 transition";
            }
        });
    }

    popBubble(idx, event) {
        this.state.bubbles[idx] = true;
        this.state.squeezeCount++;
        this.state.zenPoints = Math.min(100, this.state.zenPoints + 2);
        this.playBubblePopSound();
        if (event) this.spawnKawaiiParticles(event.clientX, event.clientY);
        this.updateCountersDOM();

        // Nếu đã bấm nổ hết 24 bóng thì tự động làm mới tấm xốp hơi mới!
        if (this.state.bubbles.every(Boolean)) {
            setTimeout(() => {
                this.state.bubbles.fill(false);
                this.renderBubbleGrid();
            }, 350);
        } else {
            this.renderBubbleGrid();
        }
    }

    renderBubbleGrid() {
        const grid = document.getElementById("bubbleWrapGrid");
        if (!grid) return;
        grid.innerHTML = this.state.bubbles.map((popped, idx) => `
            <button onclick="squishyApp.popBubble(${idx}, event)"
                class="bubble-cell h-11 rounded-2xl border-2 flex items-center justify-center text-sm font-bold ${
                    popped
                        ? 'bg-pink-50/50 border-pink-100 text-pink-300 scale-90 shadow-inner'
                        : 'bg-gradient-to-b from-white to-pink-100 border-pink-300 text-pink-500 shadow-sm hover:shadow-md'
                }">
                ${popped ? '💨' : '🐾'}
            </button>
        `).join("");
    }

    // =========================================================================
    // 6. DỰNG GIAO DIỆN CHÍNH BẰNG JAVASCRIPT
    // =========================================================================
    renderUI() {
        const c = this.state.currentChar;
        const app = document.getElementById("app");

        app.innerHTML = `
            <!-- Top Navigation Header -->
            <header class="bg-white/85 backdrop-blur-md border-b-2 border-pink-100 sticky top-0 z-30">
                <div class="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
                    <div class="flex items-center gap-2.5">
                        <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center text-white text-xl shadow-sm">
                            🍑
                        </div>
                        <div>
                            <h1 class="font-kawaii text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent leading-none">
                                MochiZen ASMR
                            </h1>
                            <span class="text-[11px] font-semibold text-pink-400">Góc Bóp Squishy Xả Stress & Âm Thanh Trị Liệu</span>
                        </div>
                    </div>

                    <!-- Thanh Dopamine / Zen Bar -->
                    <div class="flex-1 max-w-xs mx-2">
                        <div class="flex justify-between text-[11px] font-bold text-pink-600 mb-1">
                            <span id="zenStatusLabel">Đang xả stress... (${this.state.zenPoints}%) 🫧</span>
                        </div>
                        <div class="w-full h-2.5 bg-pink-100 rounded-full overflow-hidden p-0.5">
                            <div id="zenProgressBar" class="h-full bg-gradient-to-r from-pink-400 via-rose-400 to-amber-400 rounded-full transition-all duration-300" style="width: ${this.state.zenPoints}%"></div>
                        </div>
                    </div>

                    <!-- Bộ đếm số lần bóp -->
                    <div class="bg-pink-50 border-2 border-pink-200 rounded-2xl px-3.5 py-1.5 flex items-center gap-2">
                        <span class="text-base">🤏</span>
                        <div class="text-xs">
                            <span class="text-slate-400 block text-[10px] leading-none font-bold">Đã bóp xả stress</span>
                            <strong id="squeezeCounterText" class="font-kawaii text-sm text-pink-600">${this.state.squeezeCount.toLocaleString("vi-VN")}</strong> <span class="text-[11px] text-pink-500 font-bold">lần</span>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Main Interactive Content -->
            <main class="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                <!-- CỘT TRÁI (7 COLS): SÂN KHẤU BÓP SQUISHY TƯƠNG TÁC VẬT LÝ -->
                <div class="lg:col-span-7 flex flex-col gap-4">
                    <div id="squishyInteractiveArea"
                        class="bg-gradient-to-br ${c.themeBg} rounded-[32px] border-4 border-white shadow-xl p-6 sm:p-8 flex flex-col items-center justify-between min-h-[430px] relative overflow-hidden cursor-pointer">

                        <!-- Top Status Pills -->
                        <div class="w-full flex flex-wrap items-center justify-between gap-2 z-10">
                            <span class="px-3.5 py-1 rounded-full text-xs font-extrabold bg-white/90 text-slate-700 shadow-2xs">
                                🌸 ${c.name}
                            </span>
                            <span id="riseStatusBadge" class="px-3.5 py-1 rounded-full text-xs font-bold bg-white/90 text-pink-600 border border-pink-200">
                                Độ căng phồng: 100% (Slow-rise ${this.state.slowRiseSeconds}s) ✨
                            </span>
                        </div>

                        <!-- Nhân vật Squishy co giãn 60FPS -->
                        <div class="my-auto py-6 flex flex-col items-center justify-center relative z-10">
                            <div id="squishyPhysicsBody" class="will-change-transform origin-bottom">
                                ${this.getCharacterSVG(c, this.state.faceState)}
                            </div>
                            <!-- Bóng đổ dưới chân Squishy -->
                            <div id="squishyShadow" class="w-36 h-5 bg-amber-950/10 rounded-full blur-[2px] -mt-3 transition-transform"></div>
                        </div>

                        <!-- Hướng dẫn nhấn giữ -->
                        <div class="text-center z-10 space-y-1">
                            <p class="font-kawaii text-base sm:text-lg font-bold text-slate-700">
                                👇 Nhấn giữ chuột (hoặc phím <kbd class="px-2 py-0.5 bg-white rounded-lg border border-pink-300 text-pink-600 text-sm">SPACE</kbd>) để ép xẹp!
                            </p>
                            <p class="text-xs font-semibold text-slate-500">${c.subtitle} • Nhấn giữ càng lâu Squishy càng lún sâu</p>
                        </div>
                    </div>

                    <!-- Thanh chọn 5 Nhân vật Squishy -->
                    <div class="bg-white rounded-3xl p-4 border-2 border-pink-100 shadow-xs">
                        <span class="text-xs font-extrabold uppercase tracking-wider text-pink-500 block mb-2.5">
                            🧸 Đổi Nhân Vật Squishy Trên Bàn:
                        </span>
                        <div class="grid grid-cols-2 sm:grid-cols-5 gap-2">
                            ${SQUISHY_CHARACTERS.map(item => `
                                <button onclick="squishyApp.selectCharacter('${item.id}')"
                                    class="p-2.5 rounded-2xl border-2 text-center transition flex flex-col items-center gap-1 ${
                                        c.id === item.id
                                            ? 'bg-pink-50 border-pink-400 shadow-xs scale-[1.02]'
                                            : 'bg-white border-pink-100 hover:border-pink-200'
                                    }">
                                    <span class="text-xs font-bold text-slate-700 line-clamp-1">${item.name}</span>
                                    <span class="text-[10px] font-semibold text-pink-500">Slow-rise ${item.slowRiseDefault}s</span>
                                </button>
                            `).join("")}
                        </div>
                    </div>
                </div>

                <!-- CỘT PHẢI (5 COLS): BẢNG ĐIỀU KHIỂN ÂM THANH ASMR & MÀNG XỐP HƠI -->
                <div class="lg:col-span-5 flex flex-col gap-4">

                    <!-- Bảng Tùy Chỉnh Âm Thanh ASMR & Độ Phồng Chậm -->
                    <div class="bg-white rounded-3xl p-5 border-2 border-pink-100 shadow-xs space-y-4">
                        <div>
                            <h2 class="font-kawaii text-lg font-bold text-slate-800 flex items-center gap-2">
                                🎧 Phòng Thu Âm Thanh ASMR
                            </h2>
                            <p class="text-xs text-slate-500">Chọn chất liệu âm thanh phát ra mỗi khi bạn bóp và thả tay:</p>
                        </div>

                        <div class="grid grid-cols-2 gap-2">
                            ${[
                                { id: "foam", label: "🌬️ Bọt Xốp Xì Hơi" },
                                { id: "boing", label: "🍮 Mochi Núng Nính" },
                                { id: "squeak", label: "🐤 Kèn Chít Kawaii" },
                                { id: "pop", label: "🫧 Bong Bóng Nổ" }
                            ].map(m => `
                                <button data-mode="${m.id}" onclick="squishyApp.setSoundMode('${m.id}')"
                                    class="sound-mode-btn p-2.5 rounded-2xl text-xs font-bold border-2 transition ${
                                        this.state.soundType === m.id
                                            ? 'bg-pink-500 text-white border-pink-500 shadow-sm'
                                            : 'bg-white text-slate-600 border-pink-100 hover:border-pink-300'
                                    }">
                                    ${m.label}
                                </button>
                            `).join("")}
                        </div>

                        <!-- Thanh trượt chỉnh thời gian phồng chậm (Slow-Rising Slider) -->
                        <div class="pt-2 border-t border-pink-100">
                            <div class="flex justify-between text-xs font-bold mb-1.5">
                                <span class="text-slate-700">⏱️ Độ phồng chậm (Slow-Rising):</span>
                                <span id="slowRiseValueText" class="text-pink-600">${this.state.slowRiseSeconds} giây</span>
                            </div>
                            <input id="slowRiseSlider" type="range" min="1" max="12" step="1" value="${this.state.slowRiseSeconds}"
                                oninput="squishyApp.state.slowRiseSeconds = Number(this.value); document.getElementById('slowRiseValueText').textContent = this.value + (this.value == 1 ? ' giây (Nảy Pudding)' : ' giây');"
                                class="w-full accent-pink-500 cursor-pointer">
                            <div class="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
                                <span>1s (Nảy Pudding)</span>
                                <span>6s (Vừa phải)</span>
                                <span>12s (Siêu chậm)</span>
                            </div>
                        </div>
                    </div>

                    <!-- Màng Xốp Hơi Kawaii Vô Tận (Infinite Bubble Wrap) -->
                    <div class="bg-white rounded-3xl p-5 border-2 border-pink-100 shadow-xs space-y-3">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="font-kawaii text-base font-bold text-slate-800">🐾 Màng Xốp Hơi Đệm Thịt Mèo</h3>
                                <p class="text-[11px] text-slate-500">Bấm nổ hết 24 đệm thịt sẽ tự động thay tấm mới!</p>
                            </div>
                            <button onclick="squishyApp.state.bubbles.fill(false); squishyApp.renderBubbleGrid(); squishyApp.playBubblePopSound();"
                                class="px-3 py-1.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-600 text-xs font-bold">
                                Làm mới
                            </button>
                        </div>

                        <div id="bubbleWrapGrid" class="grid grid-cols-6 gap-2"></div>
                    </div>
                </div>
            </main>
        `;

        this.renderBubbleGrid();
    }

    // =========================================================================
    // 7. GẮN SỰ KIỆN CHUỘT, CẢM ỨNG & BÀN PHÍM
    // =========================================================================
    bindEvents() {
        const stage = document.getElementById("squishyInteractiveArea");
        if (stage) {
            stage.addEventListener("mousedown", (e) => this.startSqueeze(e.clientX, e.clientY));
            stage.addEventListener("touchstart", (e) => {
                e.preventDefault();
                const t = e.touches[0];
                this.startSqueeze(t.clientX, t.clientY);
            }, { passive: false });
        }

        if (!this.globalEventsBound) {
            this.globalEventsBound = true;
            window.addEventListener("mouseup", () => this.endSqueeze());
            window.addEventListener("touchend", () => this.endSqueeze());

            window.addEventListener("keydown", (e) => {
                if (e.code === "Space" && !e.repeat) {
                    e.preventDefault();
                    this.startSqueeze(window.innerWidth / 2, window.innerHeight / 2);
                }
            });
            window.addEventListener("keyup", (e) => {
                if (e.code === "Space") {
                    e.preventDefault();
                    this.endSqueeze();
                }
            });
        }
    }
}

window.addEventListener("DOMContentLoaded", () => {
    window.squishyApp = new SquishyASMRApp();
});
