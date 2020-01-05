import { css ,cx } from 'emotion';
import { h, Fragment } from 'preact';

import { Arrow } from './Arrow';
import { ShapeInstance } from './BaseShape';

export type ConnectorProps = {

  // Two ends of a line
  left: ShapeInstance;
  right: ShapeInstance;
};

const activatedStyle = css`
  opacity: 0.4;
`;

export function Connector({ left, right }: ConnectorProps) {

  const { x: lx, y: ly, width: lw, height: lh } = left;
  const { x: rx, y: ry, width: rw, height: rh } = right;

  const lxx = left.tempX || lx;
  const lyy = left.tempY || ly;
  const rxx = right.tempX || rx;
  const ryy = right.tempY || ry;

  const x1 = lxx + (lw / 2);
  const y1 = lyy + (lh / 2);

  const x2 = rxx + (rw / 2);
  const y2 = ryy + (rh / 2);


  // const x1 = lx + (lw / 2);
  // const y1 = ly + (lh / 2);

  // const x2 = rx + (rw / 2);
  // const y2 = ry + (rh / 2);

  const classes = cx((!!left.tempX || !!right.tempX) && activatedStyle);

  return (
    <Fragment>
      <Arrow class={classes} x1={x1} y1={y1} x2={x2} y2={y2} />
    </Fragment>
  );

}
