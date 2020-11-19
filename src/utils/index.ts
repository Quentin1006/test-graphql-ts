import { MilliSeconds } from "../typings";

export const wait = (time: MilliSeconds = randTime()): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

export const randTime = (
  min: MilliSeconds = 0,
  max: MilliSeconds = 1000
): MilliSeconds => {
  return Math.random() * (max - min) + min;
};
