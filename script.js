let isOriginalVideo = true; // 初始状态为 2.mp4

function switchVideo() {
  const video = document.getElementById('mainVideo');
  const source = video.querySelector('source');

  if (isOriginalVideo) {
    source.src = '3.mp4'; // 切换到新视频
  } else {
    source.src = '2.mp4'; // 切换回原视频
  }

  isOriginalVideo = !isOriginalVideo; // 状态反转
  video.load();
  video.play();
}

function toggleMenu() {
  const nav = document.getElementById('mainNav');
  nav.classList.toggle('active');
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('active');
}

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

document.querySelectorAll('.image-card').forEach(card => {
  card.style.cursor = 'pointer'; // 鼠标提示
  card.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

//hamburger

window.onload = () => {
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
};

