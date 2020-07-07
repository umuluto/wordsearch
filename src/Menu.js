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
		<p className='button button--medium'
			onClick={goLevel(l)}
			key={i}
		>
			{l}
		</p>
	));

	return (
		<div className='menu'>
			<div className='menu__title'>
				<p className='menu__title__button button' onClick={goTo(screens.HOME)}>quit.</p>
				<p className='menu__title__message'>Categories:</p>
			</div>
			{buttons}
		</div>
	);
}
