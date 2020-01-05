import { h, JSX, Fragment } from 'preact';
import { Arrow } from './Arrow';
import { ShapeInstance } from './BaseShape';


export type ConnectorProps = {

  // Two ends of a line
  left: ShapeInstance;
  right: ShapeInstance;
};


export function Connector({ left, right }: ConnectorProps) {

  const { x: lx, y: ly, width: lw, height: lh } = left;
  const { x: rx, y: ry, width: rw, height: rh } = right;

  const x1 = lx + (lw / 2);
  const y1 = ly + (lh / 2);

  const x2 = rx + (rw / 2);
  const y2 = ry + (rh / 2);

  return (
    <Fragment>
      <Arrow x1={x1} y1={y1} x2={x2} y2={y2} />
    </Fragment>
  );

}
