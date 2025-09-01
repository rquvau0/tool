{
  "manifest_version": 3,
  "name": "TKAIO LocalStorage Extractor",
  "version": "1.0",
  "description": "Tiện ích lấy dữ liệu Local Storage từ tkaio.com",
  "permissions": ["scripting", "activeTab"],
  "host_permissions": ["https://tkaio.com/*"],
  "action": {
    "default_popup": "popup.html",
    "default_title": "Lấy Local Storage"
  },
  "content_scripts": [
    {
      "matches": ["https://tkaio.com/*"],
      "js": ["content.js"]
    }
  ]
}
<!DOCTYPE html>
<html>
<head>
  <title>Local Storage Viewer</title>
</head>
<body>
  <h3>Dữ liệu Local Storage</h3>
  <pre id="output">Đang tải...</pre>
  <script src="popup.js"></script>
</body>
</html>
// Gửi dữ liệu Local Storage về popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getLocalStorage") {
    let data = {};
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      data[key] = localStorage.getItem(key);
    }
    sendResponse({ localStorage: data });
  }
});
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(tabs[0].id, { action: "getLocalStorage" }, function (response) {
    document.getElementById("output").textContent = JSON.stringify(response.localStorage, null, 2);
  });
});
