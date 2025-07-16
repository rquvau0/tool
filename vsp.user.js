// ==UserScript==
//@author.       rquvau0 X caosang13
// @name         VSPhone Auto nhập code (GUI + chọn tốc độ)
// @match        https://cloud.vsphone.com/activation-code/index
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const inputSelector = 'input[placeholder="Vui lòng nhập mã kích hoạt"]';

    function getTruyVanButton() {
        return [...document.querySelectorAll('button')]
            .find(btn => btn.textContent.trim() === "Truy vấn");
    }

    function createGUI() {
        const gui = document.createElement("div");
        gui.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                width: 300px;
                border: 2px solid #333;
                border-radius: 10px;
                padding: 12px;
                z-index: 9999;
                font-family: Arial, sans-serif;
                box-shadow: 2px 2px 12px rgba(0,0,0,0.3);
            ">
            <div style="
                background-image: url(https://www.nait.vn/uploads/news/2025/04/linux14.png);
                background-size: cover;
                background-attachment: scroll;
            ">
                <h3 style="margin: 0 0 8px;">Auto nhập Code</h3>
                <textarea id="vs_code_input" rows="6" style="width: 100%; resize: vertical;background-color: transparent;"></textarea>
                <label style="display: block; margin-top: 8px;">Chọn tốc độ:</label>
                <select id="vs_speed_select" style="width: 100%; margin-bottom: 10px;">
                    <option value="280">⚡ 0.5s / linux mode</option>
                </select>
                <button id="vs_start_btn" style="width: 100%; padding: 6px;">Bắt đầu nhập...</button>
                <div id="vs_status" style="margin-top: 8px; font-size: 14px; color: green;"></div>
            </div>
        `;
        document.body.appendChild(gui);

        document.getElementById("vs_start_btn").addEventListener("click", () => {
            const raw = document.getElementById("vs_code_input").value;
            const speed = parseInt(document.getElementById("vs_speed_select").value, 10);
            const codes = raw.split("\n").map(c => c.trim()).filter(c => c.length > 0);

            if (codes.length === 0) {
                alert("❌ Không có code nào.");
                return;
            }

            runAuto(codes, speed);
        });
    }

    function runAuto(codes, delay) {
        let i = 0;
        const status = document.getElementById("vs_status");

        function next() {
            if (i >= codes.length) {
                status.textContent = "✅ Đã thử xong toàn bộ code.";
                return;
            }

            const input = document.querySelector(inputSelector);
            const button = getTruyVanButton();

            if (!input || !button) {
                status.textContent = "❌ Không tìm thấy ô nhập hoặc nút Truy vấn.";
                return;
            }

            input.value = codes[i];
            input.dispatchEvent(new Event("input", { bubbles: true }));
            button.click();

            status.textContent = `📝 Đang thử: ${codes[i]}`;
            i++;
            setTimeout(next, delay);
        }

        next();
    }

    window.addEventListener("load", () => {
        setTimeout(createGUI, 800);
    });
})();
