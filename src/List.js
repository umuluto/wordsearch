import React from 'react';

export default function List({ words, wordFounds, hinted }) {
	const visibles = hinted
		? [...wordFounds, ...words.filter(e => !wordFounds.includes(e))]
		: [...wordFounds];

	const items = visibles.map((w, i) => {
		const hinted = wordFounds.includes(w)
			? ''
			: 'list__item--hinted';

		return <p className={`list__item ${hinted}`} key={w}>{w}</p>
	});

	return (
		<div className='list'>
			<p className='list__message'>{`Found ${wordFounds.length}/${words.length}`}</p>
			{items}
		</div>
	);
}
