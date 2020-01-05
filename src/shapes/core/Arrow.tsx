import { css, cx } from 'emotion';
import { h, JSX, Fragment } from 'preact';
import { useMemo } from 'preact/hooks';


export type ArrowProps = {

  class: string;

  // Two ends of a line
  x2: number;
  y2: number;

  x1: number;
  y1: number;
};

const style = css`
  position: absolute;

  height: 8px;

  transform-origin: left center;

  background-size: contain;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAYCAYAAABKtPtEAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAAmJLR0QAAKqNIzIAAAAHdElNRQfkAQUJJRcvTkQZAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTAxLTA1VDA5OjM3OjIzKzAwOjAwLkFRzAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wMS0wNVQwOTozNzoyMyswMDowMF8c6XAAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAABs0lEQVRYR+WYr47CQBDG5ypIEOBAQILAgCEpAgMGNKg+ABKJQfAKJBhscVgkb0D4Y/AQEDgwIAjBkADfdcmU3OYIdyUnbre/ZNN0OqL7tTP77X7AgXyMwVfluN1utN1u+e59lBXAsiyKx+NUqVRotVpx9A1ECahIKpUSpXsfgUAAjUYDh8OBn/4eZQVYLBYolUoPEcSIRqPodru4Xq+c9TPKCuAyGAyQTCYlIUzTxHA45IzXKC+A4Hw+o9PpIBwOS0I4/QHr9ZqznqOFAC6bzQa1Wg2GYTxEEP2hXq/jeDxyloxWArjMZjMUCgXpb4jFYrBt+1t/0FIAgeMT0O/3kUgkJCFyuRwmkwlnAZ6d4G63o/F4TJfLhSP/m9PpRO12m5xVgyOO+TEMqlar1Gq1HEk8kk6nJUVVHplMBso6wb/Ccwns93sajUb+LQFVeNUEp9MpZ2m8DObzeWniYhns9Xp3Yb6ilQDPjFAwGESz2dTbCLlWOBQKSV/dF1b42WYom83qvxmaz+coFovSxH21Hfb9gYhlWffJl8tlLJdLjnpH2VNh8drClEUiEY68h8+PxYk+ARGdwD0ZzXpKAAAAAElFTkSuQmCC');
  /* background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfkAQUJHxXk6ftMAAAATklEQVQoz2NmgABfhjMM7AwHGHCCPIb/DP8ZWnErYGJYwPCf4T9D99BQwsywiOE/w3+GBJgOEgEzw0KG/wz/GboGnzQRkeXD8ImhAZsEAAnyLDxyDD17AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTAxLTA1VDA5OjMxOjIxKzAwOjAwtMAwogAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wMS0wNVQwOTozMToyMSswMDowMMWdiB4AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC'); */
`;


export function Arrow(props: ArrowProps) {

  const { x1, y1, x2, y2 } = props;


  // Total width
  const width = useMemo(() =>
    Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1)),
    [x1, y1, x2, y2]);


  // Angle in radians
  const angle = (Math.PI / 2) - Math.atan2(x2 - x1, y2 - y1);

  const dynamicStyle = {
    left: `${x1}px`,
    top: `${y1}px`,
    width: `${width}px`,
    transform: `rotateZ(${angle}rad)`
  };

  return (
    <div class={cx('arrow', style, props.class)} style={dynamicStyle}></div>
  )

}
