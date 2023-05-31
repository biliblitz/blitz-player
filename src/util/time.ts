/**
 * convert time into hh:mm:ss
 */
export function formatTimeHms(time: number) {
  if (isNaN(time)) {
    return "--:--:--";
  }

  const hours = Math.floor(time / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((time % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

/**
 * convert time into hh:mm:ss
 */
export function formatTimeMs(time: number) {
  if (isNaN(time)) {
    return "--:--";
  }

  const minutes = Math.floor((time % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
}

/**
 * format to hh:mm:ss/hh:mm:ss or mm:ss/mm:ss
 */
export function formatTime2(current: number, duration: number) {
  if (isNaN(current) || isNaN(duration) || duration < 3600) {
    return `${formatTimeMs(current)}/${formatTimeMs(duration)}`;
  } else {
    return `${formatTimeHms(current)}/${formatTimeHms(duration)}`;
  }
}
