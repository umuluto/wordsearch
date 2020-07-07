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
	const goHome = () => setScreen(screens.HOME);
	const mergeData = d => setData(dt => ({...dt, ...d}));
	const toggleOptions = () => {
		setBlurred(!blurred);
		setOptions(!showOptions);
	};

	let main = null;
	switch (screen) {
		case screens.HOME:
			main = <Home goTo={goTo} toggleOptions={toggleOptions}/>;
			break;
		case screens.MENU:
			main = <Menu goTo={goTo} mergeData={mergeData} />;
			break;
		case screens.PLAY:
			main = <Play goHome={goHome} toggleOptions={toggleOptions} data={data} sounds={sounds.type} />;
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
