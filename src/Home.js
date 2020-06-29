import React from 'react';
import screens from './app_screens.js';

export default function Home({ goTo }) {
	return (
		<div className='home'>
			<p className='home__title'>Word Search</p>
			<ul className='home__buttons'>
				<p className='button'
					onClick={goTo(screens.MENU)}
				>
					Normal Game
				</p>
				<p className='button'
					onClick={goTo(screens.READ)}
				>
					Generate Game
				</p>
			</ul>
		</div>
	);
}
