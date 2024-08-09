export const randomDelay = (minDelay: number = 0, maxDelay: number = 1000) => {
  return Math.floor(Math.random() * (maxDelay - minDelay)) + minDelay;
}
