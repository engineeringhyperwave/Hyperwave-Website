// 视频切换逻辑
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

// 区块跳转逻辑
const environment = document.querySelector('.environment');
if (environment) {
  environment.onclick = () => window.open('https://hyper-wave.com/about-us-2/', '_blank');
}

const whatWeDo = document.querySelector('.what-we-do');
if (whatWeDo) {
  whatWeDo.onclick = () => window.open('https://hyper-wave.com/', '_blank');
}

const careers = document.querySelector('.careers');
if (careers) {
  careers.onclick = () => window.open('https://hyper-wave.com/careers/', '_blank');
}

const investors = document.querySelector('.investors');
if (investors) {
  investors.onclick = () => window.open('https://hyper-wave.com/portfolios/', '_blank');
}

// 图像卡片点击滚动至顶部
const imageCards = document.querySelectorAll('.image-card');
if (imageCards.length > 0) {
  imageCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

// 移动菜单展开与关闭
document.addEventListener('DOMContentLoaded', () => {
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
});

console.log("✅ JavaScript 已成功加载！");

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let current = 0;
    const increment = target / 200;

    const update = () => {
      current += increment;
      if (current < target) {
        counter.textContent = formatNumber(current, target);
        requestAnimationFrame(update);
      } else {
        counter.textContent = formatNumber(target, target);
      }
    };

    update();
  });

  function formatNumber(num, target) {
    const value = Math.floor(num).toLocaleString();
    return target >= 1000000 ? `RM ${value}` : value;
  }
});

document.addEventListener('DOMContentLoaded', () => {
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
          // 停顿 3 秒后重新开始
          setTimeout(animateCounter, 4000);
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
});


function scrollTimeline(direction) {
  const container = document.querySelector('.timeline-container');
  const scrollAmount = 300;
  container.scrollBy({
    left: direction === 'left' ? -scrollAmount : scrollAmount,
    behavior: 'smooth'
  });
}

