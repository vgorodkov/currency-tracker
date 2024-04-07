export const formatRate = (rate: number, toFlip: boolean = false) => {
  if (rate < 0) {
    return '???';
  }
  const value = toFlip ? 1 / rate : rate;

  if (Math.abs(value) < 0.01) {
    return Number(value.toFixed(4));
  }

  return Number(value.toFixed(2));
};
