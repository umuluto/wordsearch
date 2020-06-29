import React, { useState } from 'react';
import Board from './Board.js';
import List from './List.js';

export default function Play({ data, goHome }) {
	const [founds, setFounds] = useState([]);
	const [hinted, setHinted] = useState(false);

	const toggleHint = () => setHinted(st => !st);

	const push = w => {
		if (founds.includes(w) || !data.words.includes(w)) {
			return false;
		} else {
			setFounds([...founds, w]);
			return true;
		}
	};

	return (
		<div className='play'> 
			<div className='play__left'>
				<p className='play__category'>&ldquo;{data.category}&rdquo;</p>
				<ul className='play__buttons'>
					<p className='button' onClick={toggleHint}>hints.</p>
					<p className='button'>options.</p>
					<p className='button' onClick={goHome}>quit.</p>
				</ul>
			</div>
			<div className='play__mid'>
				<Board letters={data.letters} push={push} />
			</div>
			<div className='play__right'>
				<List words={data.words} wordFounds={founds} hinted={hinted} />
			</div>
		</div>
	);
}
