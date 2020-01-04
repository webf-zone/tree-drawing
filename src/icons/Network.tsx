import { h } from 'preact';
import { JSXInternal } from 'preact/src/jsx';

type SVGAttributes = JSXInternal.SVGAttributes;

export function Network(props: SVGAttributes) {
  return (
    <svg x={props.x} y={props.y} width={props.width} height={props.height} class='icon-network' viewBox="0 0 32 32">
	    <path d="M32,17v-2H17v-4h4.5V0h-11v11H15v4H0v2h5v4H0v11h11V21H7v-4h19v4h-5v11h11V21h-4v-4H32z M9,23v7H2v-7H9z M12.5,9V2h7v7H12.5
	      z M30,23v7h-7v-7H30z"></path>
    </svg>
  );
}
