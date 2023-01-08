// px2rem for wap website
; (function (doc, win) {
  const DESIGN_SIZE = 375;  // 设计图尺寸
  const PROPORTION_SIZE = 100; // 与设计图比例
  const setView = () => {
    doc.documentElement.style.fontSize = (PROPORTION_SIZE * win.screen.width / DESIGN_SIZE) + 'px'
  }
  doc.addEventListener('gesturestart', function (event) {
    event.preventDefault();
  });
  win.onresize = setView;
  setView();
})(document, window);
