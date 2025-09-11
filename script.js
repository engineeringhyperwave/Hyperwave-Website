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
