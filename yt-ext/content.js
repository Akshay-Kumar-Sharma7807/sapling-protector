// Function to extract video ID and timestamp
function getVideoInfo(url) {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const videoId = urlParams.get('v');
    const timestamp = urlParams.get('t');
    return { videoId, timestamp };
  }
  // Function to create the iFrame player
  function createIframePlayer(videoId, timestamp) {
    let iframeUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
    if (timestamp) {
      iframeUrl += `?start=${timestamp.replace('s', '')}`; 
    }
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.src = iframeUrl;
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer ; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.title = 'YouTube video player';
    // Optional: Add CSS class for styling
    iframe.classList.add('iframe-player');
    return iframe;
  }
  // Main logic to replace the player
  function replacePlayer() {
    const videoInfo = getVideoInfo(window.location.href);
    const iframePlayer = createIframePlayer(videoInfo.videoId, videoInfo.timestamp);
    // Find the original YouTube player (you might need to adjust the selector)
    const originalPlayer = document.querySelector('#movie_player'); 
    if (originalPlayer) {
      originalPlayer.parentNode.replaceChild(iframePlayer, originalPlayer);
    }
  }
  // Run the replacement when the page loads
  window.addEventListener('load', replacePlayer);