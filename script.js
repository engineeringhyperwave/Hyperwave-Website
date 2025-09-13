// 视频切换逻辑
let isOriginalVideo = true; // 初始状态为 2.mp4

function switchVideo() {
  const video = document.getElementById('mainVideo');
  const source = video.querySelector('source');

  source.src = isOriginalVideo ? '3.mp4' : '2.mp4';
  isOriginalVideo = !isOriginalVideo;

  video.load();
  video.play();
}

// 区块跳转逻辑
document.querySelector('.environment').onclick = () => {
  window.open('https://hyper-wave.com/about-us-2/', '_blank');
};

document.querySelector('.what-we-do').onclick = () => {
  window.open('https://hyper-wave.com/', '_blank');
};

document.querySelector('.careers').onclick = () => {
  window.open('https://hyper-wave.com/careers/', '_blank');
};

document.querySelector('.investors').onclick = () => {
  window.open('https://hyper-wave.com/portfolios/', '_blank');
};

// 图像卡片点击滚动至顶部
document.querySelectorAll('.image-card').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// 移动菜单展开与关闭
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileMenu = document.getElementById('mobileMenu');

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
});