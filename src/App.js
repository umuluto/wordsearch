import React, { useState } from 'react';
import screens from './app_screens.js';
import Options from './Options.js';
import Home from './Home.js';
import Menu from './Menu.js';
import Play from './Play.js';

import './temp.css';

export default function App() {
	const [screen, setScreen] = useState(screens.HOME);
	const [data, setData] = useState();
	const [blurred, setBlurred] = useState(false);
	const [showOptions, setOptions] = useState(false);
	const [sounds, setSounds] = useState({
		type: {
			correct: new Audio('/wordsearch/correct.mp3'),
			wrong: new Audio('/wordsearch/wrong.mp3'),
		},
		volume: 1,
		muted: false,
	});

	const goTo = d => () => setScreen(d);
	const mergeData = d => setData(dt => ({...dt, ...d}));
	const toggleOptions = () => {
		setBlurred(!blurred);
		setOptions(!showOptions);
	};

	const Over = () => (
		<div className='over'>
			<div className='over__msg'>
				<p className='over__msg__congrats'>Congratulations!<br/>You have complete the puzzle</p>
				<a className='bttn bttn--ico' onClick={goTo(screens.HOME)}>
					<svg className='ico' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="checkmark"><rect width="24" height="24" opacity="0"/><path d="M9.86 18a1 1 0 0 1-.73-.32l-4.86-5.17a1 1 0 1 1 1.46-1.37l4.12 4.39 8.41-9.2a1 1 0 1 1 1.48 1.34l-9.14 10a1 1 0 0 1-.73.33z"/></g></g></svg>
					<span className='bttn__txt'>OK</span>
				</a>
			</div>
		</div>
	);

	let main = null;
	switch (screen) {
		case screens.HOME:
			main = <Home goTo={goTo} toggleOptions={toggleOptions}/>;
			break;
		case screens.MENU:
			main = <Menu goTo={goTo} mergeData={mergeData} />;
			break;
		case screens.PLAY:
			main = <Play goTo={goTo} toggleOptions={toggleOptions} data={data} sounds={sounds.type} />;
			break;
		case screens.OVER:
			main = <Over />;
			break;
		default:
			main = <p>not implemented</p>;
			break;
	}

	let overlay = showOptions
		? <Options sounds={sounds} setSounds={setSounds} toggleOptions={toggleOptions} />
		: null;

	const blur = blurred ? 'wrapper--blurred' : '';

	return (
		<>
			<div className={`wrapper ${blur}`}>
				{main}
			</div>
			{overlay}
		</>
	);
}
