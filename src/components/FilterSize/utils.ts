
const KB = 1024;
const MB = 1024 * 1024;
export const SIZE_5_MB = 5 * MB;
export const SIZE_10_MB = 10 * MB;

export const getBytesFromPercentage = (percentage: number, totalSize: number): number => {
  const bytes = (percentage / 100) * totalSize;
  return Math.round(bytes);
}

export const getFormattedLabel = (bytes: number): string => {
  if (bytes < KB) {
    return `${bytes} Bytes`;
  }
  if (bytes < MB) {
    return `${(bytes / KB).toFixed(2)} KB`;
  }
  return `${(bytes / MB).toFixed(2)} MB`;
}