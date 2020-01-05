import { h, JSX, Fragment } from 'preact';

export type ConnectorProps = {

  // Two ends of a line
  children: JSX.Element;

  parent: JSX.Element

};

export function Connector(props: ConnectorProps) {

  return (
    <Fragment>

      {props.children}

      {props.parent}

    </Fragment>
  )

}