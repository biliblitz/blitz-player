export function getBufferPercent(video: HTMLVideoElement) {
  if (isNaN(video.duration)) {
    return 0;
  }

  const buffered = video.buffered;
  let result = 0;
  for (let i = 0; i < buffered.length; ++i) {
    if (buffered.start(i) <= video.currentTime) {
      result = Math.max(result, buffered.end(i));
    }
  }
  return result / video.duration;
}
