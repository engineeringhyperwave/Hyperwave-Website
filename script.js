document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ JavaScript 已成功加载！");

  // 🎥 视频切换逻辑
  let isOriginalVideo = true;
  const video = document.getElementById('mainVideo');
  if (video) {
    const source = video.querySelector('source');
    window.switchVideo = function () {
      source.src = isOriginalVideo ? '3.mp4' : '2.mp4';
      isOriginalVideo = !isOriginalVideo;
      video.load();
      video.play();
    };
  }

  // 🔗 区块跳转逻辑
  const links = {
    '.environment': 'https://hyper-wave.com/about-us-2/',
    '.what-we-do': 'https://hyper-wave.com/',
    '.careers': 'https://hyper-wave.com/careers/',
    '.investors': 'https://hyper-wave.com/portfolios/'
  };
  Object.entries(links).forEach(([selector, url]) => {
    const el = document.querySelector(selector);
    if (el) el.onclick = () => window.open(url, '_blank');
  });

  // 🖼️ 图像卡片点击滚动至顶部
  document.querySelectorAll('.image-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // 📱 移动菜单展开与关闭
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('visible');
    });
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        mobileMenu.classList.remove('visible');
      }
    });
    window.addEventListener('scroll', () => {
      mobileMenu.classList.remove('visible');
    });
  }

  // 🔢 数字计数器动画（循环）
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const isCurrency = target >= 1000000;

    function animateCounter() {
      let current = 0;
      const increment = target / 200;

      function update() {
        current += increment;
        if (current < target) {
          counter.textContent = formatNumber(current, isCurrency);
          requestAnimationFrame(update);
        } else {
          counter.textContent = formatNumber(target, isCurrency);
          setTimeout(animateCounter, 4000); // 循环动画
        }
      }

      update();
    }

    animateCounter();
  });

  function formatNumber(num, isCurrency) {
    const value = Math.floor(num).toLocaleString();
    return isCurrency ? `RM ${value}` : value;
  }

  // 📅 时间轴滚动函数
  window.scrollTimeline = function (direction) {
    const container = document.querySelector('.timeline-container');
    const scrollAmount = 300;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // 🔍 图片弹窗放大逻辑
  let scale = 1;
  let modalImg = null;

  const modal = document.createElement('div');
  modal.id = 'imageModal';
  modal.style.cssText = `
    display: none;
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.8);
    justify-content: center;
    align-items: center;
    z-index: 999;
    overflow: auto;
    touch-action: none;
  `;
  modalImg = document.createElement('img');
  modalImg.style.cssText = `
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    transform-origin: center center;
    transition: transform 0.2s ease;
    user-select: none;
    pointer-events: auto;
  `;
  modal.appendChild(modalImg);
  document.body.appendChild(modal);

  // ✅ 全局函数：图片放大绑定
  window.bindZoom = function (img) {
  const src = img.getAttribute('src');
  const hasLink = img.closest('a'); // 检查是否被 <a> 包裹

  if (src && !hasLink) {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      scale = 1;
      modalImg.src = src;
      modalImg.style.transform = `scale(${scale})`;
      modal.style.display = 'flex';
    });
  } else if (hasLink) {
    console.log(`🔗 ${src} → 跳转链接已存在，跳过 zoom`);
  }
};


  // ✅ 全局函数：检查是否已绑定
  window.checkZoomBinding = function (img) {
    const src = img.getAttribute('src');
    const bound = !!img.onclick;
    console.log(`🖼️ ${src} → ${bound ? '✅ 已绑定 zoom' : '❌ 未绑定 zoom'}`);
  };

  // ✅ 页面加载后自动绑定所有图片
  window.addEventListener('load', () => {
    document.querySelectorAll('img').forEach(img => {
      if (!img.dataset.zoomBound) {
        window.bindZoom(img);
        img.dataset.zoomBound = 'true';
      }
    });
  });

  // ✅ 自动监听新增图片
  const observer = new MutationObserver(() => {
    document.querySelectorAll('img').forEach(img => {
      if (!img.dataset.zoomBound) {
        window.bindZoom(img);
        img.dataset.zoomBound = 'true';
        console.log(`🖼️ ${img.src} → ✅ 自动绑定 zoom`);
      }
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // 🔍 放大图支持滚轮缩放
  modal.addEventListener('wheel', (e) => {
    e.preventDefault();
    const rect = modalImg.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const percentX = offsetX / rect.width;
    const percentY = offsetY / rect.height;
    modalImg.style.transformOrigin = `${percentX * 100}% ${percentY * 100}%`;
    scale += e.deltaY < 0 ? 0.1 : -0.1;
    scale = Math.max(0.5, Math.min(scale, 5));
    modalImg.style.transform = `scale(${scale})`;
  });

  let lastDistance = null;
  modal.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (lastDistance) {
        const delta = distance - lastDistance;
        scale += delta * 0.005;
        scale = Math.max(0.5, Math.min(scale, 5));
        modalImg.style.transform = `scale(${scale})`;
      }
      lastDistance = distance;
    }
  });
  modal.addEventListener('touchend', () => {
    lastDistance = null;
  });
  modal.addEventListener('click', () => {
    modal.style.display = 'none';
    modalImg.src = '';
  });

  // 🎠 轮播标题逻辑
  const titles = [
    "AML POLICY", "ANTI BRIBERY AND ANTI CORRUPTION POLICY", "DRUG AND ALCOHOL POLICY STATEMENT",
    "EMPLOYEE POLICY AND HANDBOOK", "ENVIRONMENTAL POLICY", "HOUSEKEEPING POLICY",
    "HUMAN RIGHTS COMMITMENT", "MEMO HOTEL AND FLIGHT BOOKING", "MEMO OT AND WORKING ON REST DAY OR PH CALCULATION",
    "MEMO REMINDER ABOUT THE CARRY FORWARD LEAVE POLICY", "MEMO REMINDER INFOTECH FOR ATTENDANCE AND LEAVE",
    "MEMO REPLACEMENT LEAVE PROCEDURE", "MEMO SWITCH OFF LIGHTS AND ACS BEFORE LEAVE OFFICE",
    "NO SMOKING POLICY", "OSHE POLICY", "PPE POLICY", "QUALITY POLICY", "SEXUAL HARASSMENT POLICY",
    "STOP WORK POLICY", "TRAINING POLICY"
  ];

  const groups = document.querySelectorAll(".policy-group");
  const titleEl = document.getElementById("carousel-title");
  let currentIndex = 0;

  function updateCarousel(index) {
    groups.forEach((group, i) => {
      group.classList.toggle("active", i === index);
    });
    titleEl.textContent = titles[index];
  }

  document.getElementById("prevBtn").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + groups.length) % groups.length;
    updateCarousel(currentIndex);
  });

    document.getElementById("nextBtn").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % groups.length;
    updateCarousel(currentIndex);
  });

}); // ← 这是你漏掉的结尾


// 🎠 品牌滚动函数
window.scrollBrands = function (direction) {
  const scroller = document.getElementById('brandScroller');
  const scrollAmount = 300;
  scroller.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
};
