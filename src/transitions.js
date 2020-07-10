import React from 'react';
import { Transition } from 'react-transition-group';

const duration = 100;

const defaultStyle = {
	transition: `opacity ${duration}ms, transform ${duration}ms`,
	opacity: 0,
};

const transitionStyle = {
	entering: {
		opacity: 0,
		transform: 'scale(0.5)',
	},
	entered: {
		opacity: 1
	},
};

const Fade = Component => props => (
	<Transition in={true} appear={true} timeout={duration}>
		{state => (
			<div style={{
				...defaultStyle,
				...transitionStyle[state]
			}}>
				<Component {...props} />
			</div>
		)}
	</Transition>
);

export { Fade };
