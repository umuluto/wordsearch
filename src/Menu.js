import React, { useState, useEffect } from 'react';
import screens from './app_screens.js';

export default function Menu({ goTo, mergeData }) {
	const [levels, setLevels] = useState([]);

	useEffect(() => {
		fetch('/wordsearch/data/index.json')
			.then(f => f.json())
			.then(o => setLevels(o));
	}, []);

	const goLevel = l => () => {
		mergeData({ category: l });
		fetch(`/wordsearch/data/${l}.json`)
			.then(f => f.json())
			.then(o => {
				mergeData(o);
				goTo(screens.PLAY)();
			});
	};

	const buttons = levels.map((l, i) => (
		<p className='bttn'
			onClick={goLevel(l)}
			key={i}
		>
			{l}
		</p>
	));

	return (
		<div className='menu'>
			<div className='menu__title'>
				<a className='menu__title__bttn bttn bttn--ico' onClick={goTo(screens.HOME)}>
					<svg className='ico ico--big' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="arrow-back"><rect width="24" height="24" transform="rotate(90 12 12)" opacity="0"/><path d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23 1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z"/></g></g></svg>
					<span className='bttn__txt '>Back</span>
				</a>
				<p className='menu__title__message'>Categories:</p>
			</div>
			{buttons}
		</div>
	);
}
