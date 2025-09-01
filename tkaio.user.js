// ==UserScript==
// @name         TKAIO LocalStorage Viewer
// @namespace    https://tkaio.com/
// @version      1.0
// @description  Hiển thị Local Storage dưới dạng JSON trong popup
// @author       dinh
// @match        https://tkaio.com/index*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Tạo nút mở popup
    const button = document.createElement('button');
    button.textContent = '📦 Xem Local Storage';
    button.style.position = 'fixed';
    button.style.top = '20px';
    button.style.right = '20px';
    button.style.zIndex = '9999';
    button.style.padding = '10px';
    button.style.backgroundColor = '#4CAF50';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';

    // Tạo popup textarea
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '60px';
    popup.style.right = '20px';
    popup.style.width = '400px';
    popup.style.height = '300px';
    popup.style.zIndex = '9999';
    popup.style.backgroundColor = '#fff';
    popup.style.border = '1px solid #ccc';
    popup.style.padding = '10px';
    popup.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
    popup.style.display = 'none';

    const textarea = document.createElement('textarea');
    textarea.style.width = '100%';
    textarea.style.height = '100%';
    textarea.style.fontFamily = 'monospace';
    textarea.readOnly = true;
    popup.appendChild(textarea);

    // Khi nhấn nút → hiển thị popup và dữ liệu
    button.onclick = () => {
        let data = {};
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            data[key] = localStorage.getItem(key);
        }
        textarea.value = JSON.stringify(data, null, 2);
        popup.style.display = popup.style.display === 'none' ? 'block' : 'none';
    };

    document.body.appendChild(button);
    document.body.appendChild(popup);
})();
