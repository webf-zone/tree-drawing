// All the values are unitless
export interface BaseShape {

  x: number;
  y: number;

  minWidth?: number;
  minHeight?: number;

  maxWidth?: number;
  maxHeight?: number;

  width: number;
  height: number;

  selected?: boolean;
  onResize?: (dim: [number, number]) => void;
  onMove?: (dim: [number, number]) => void;
}
