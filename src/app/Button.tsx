import { css } from 'emotion';
import { h, JSX } from 'preact';

export type ButtonProps = {
  children: string | JSX.Element | JSX.Element[];

  onClick: () => void;
};

export const buttonStyles = css`
	display: flex;
	align-items: center;
	justify-content: center;

  border: none;

	cursor: pointer;

	margin: 1rem;

	svg {
		height: 55px;
		width: 150px;
		fill: none;
		stroke-width: 5;

		.o1 {
			stroke: rgba(#FFB341, 0.7);
			fill: #FFA114;
			transition: all 1s ease-in-out;
		}

		.o2 {
			stroke: white;
			stroke-dasharray: 20 420;
			stroke-dashoffset: 20;
			transition: all 1s ease-in-out;
		}
	}

	span {
		position: absolute;
		margin: auto 0;
		text-transform: uppercase;
		letter-spacing: 3px;
	}

	&:hover {
		.o1 {
			fill: rgba(#CC8110, 0.3);
		}

		.o2 {
			stroke-dashoffset: -420;
		}
	}
`;

export function Button(props: ButtonProps) {

  return (
    <button class={buttonStyles} onClick={props.onClick}>
      <span>{props.children}</span>
		  <svg>
		    <polyline class='o1' points='0 0, 150 0, 150 55, 0 55, 0 0'></polyline>
		    <polyline class='o2' points='0 0, 150 0, 150 55, 0 55, 0 0'></polyline>
	    </svg>
    </button>
  );
}
