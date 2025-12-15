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
    '.environment': 'about-us.html',
    '.what-we-do': 'services.html',
    '.careers': 'careers.html',
    '.investors': 'projects.html'
  };

  Object.entries(links).forEach(([selector, url]) => {
    const el = document.querySelector(selector);
    if (el) {
      el.style.cursor = 'pointer';
      el.onclick = () => location.href = url;
    }
  });

  // 🖼️ 图像卡片点击滚动至顶部
  document.querySelectorAll('.image-card').forEach((card, i) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const url = ['services.html#maintenance','services.html#calibration','services.html#metering','services.html#aftersales','services.html#training'][i];
      window.location.href = url;
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
      if (e.target.closest('.image-card')) return;
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
    }
  };

  // 页面加载后自动绑定所有图片
  window.addEventListener('load', () => {
    document.querySelectorAll('img').forEach(img => {
      if (!img.dataset.zoomBound) {
        window.bindZoom(img);
        img.dataset.zoomBound = 'true';
      }
    });
  });

  // 自动监听新增图片
  const observer = new MutationObserver(() => {
    document.querySelectorAll('img').forEach(img => {
      if (!img.dataset.zoomBound) {
        window.bindZoom(img);
        img.dataset.zoomBound = 'true';
      }
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // 支持滚轮缩放
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

  // 📱 手势缩放 & 点击关闭
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

  // 🎠 轮播标题逻辑（排除 MEMO 并对应多图）
const allGroups = Array.from(document.querySelectorAll('.policy-group'));
const groups = allGroups.filter(group => {
  const img = group.querySelector('img');
  if(!img) return false;

  const src = img.getAttribute('src').toLowerCase();
  // 排除 MEMO 或包含 employee handbook
  return !src.includes('memo') && !src.includes('employee');
});

// 对应的标题数组，只保留存在的 groups
const titles = [
  "AML POLICY", "ANTI BRIBERY AND ANTI CORRUPTION POLICY", "DRUG AND ALCOHOL POLICY STATEMENT",
  // "EMPLOYEE POLICY AND HANDBOOK"  <- 已去掉
  "ENVIRONMENTAL POLICY", "HOUSEKEEPING POLICY",
  "HUMAN RIGHTS COMMITMENT", "NO SMOKING POLICY", "OSHE POLICY", "PPE POLICY",
  "QUALITY POLICY", "SEXUAL HARASSMENT POLICY", "STOP WORK POLICY", "TRAINING POLICY"
];

// 保持原来的轮播逻辑不变
const titleEl = document.getElementById("carousel-title");
let currentIndex = 0;

function updateCarousel(index) {
  groups.forEach((group, i) => {
    group.classList.toggle("active", i === index);
    const imgs = group.querySelectorAll('img');
    imgs.forEach((img, j) => img.style.display = j === 0 ? 'block' : 'none');
  });
  titleEl.textContent = titles[index];
}

updateCarousel(currentIndex);

document.getElementById("prevBtn").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + groups.length) % groups.length;
  updateCarousel(currentIndex);
});

document.getElementById("nextBtn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % groups.length;
  updateCarousel(currentIndex);
});

}); // ← 这一行是 DOMContentLoaded 的正确结束！到这里就结束了！

// ====================== 下面这整段必须写在外面！======================
window.scrollBrands = function (direction) {
  const scroller = document.getElementById('brandScroller');
  if (!scroller) return;

  const scrollAmount = 320; // 你可以自己调
  scroller.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
};

