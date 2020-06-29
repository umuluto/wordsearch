import React, { useState } from 'react';
import screens from './app_screens.js';
import Home from './Home.js';
import Menu from './Menu.js';
import Play from './Play.js';

import './temp.css';

export default function App() {
	const [screen, setScreen] = useState(screens.HOME);
	const [data, setData] = useState();

	const goTo = d => () => setScreen(d);
	const goHome = () => setScreen(screens.HOME);
	const mergeData = d => setData(dt => ({...dt, ...d}));

	let main = null;
	switch (screen) {
		case screens.HOME:
			main = <Home goTo={goTo} />;
			break;
		case screens.MENU:
			main = <Menu goTo={goTo} mergeData={mergeData} />;
			break;
		case screens.PLAY:
			main = <Play goHome={goHome} data={data} />;
			break;
		default:
			main = <p>not implemented</p>;
			break;
	}

	let overlay = null;

	return <>{main}{overlay}</>;
}
