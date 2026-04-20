// 创建一个名为 "AnimNav" 的 DevTools 面板
chrome.devtools.panels.create(
  "AnimNav",      // 面板名称
  null,           // 图标路径（可选）
  "panel.html",   // 面板加载的 HTML 文件
  function(panel) {
    console.log("Panel created.");
  }
);
