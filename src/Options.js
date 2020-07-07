import React from 'react';

export default function Options({ sounds, setSounds, toggleOptions }) {
	const onChange = e => {
		for (const k in sounds.type) {
			sounds.type[k].volume = e.target.value;
		}
		setSounds({...sounds, volume: e.target.value});
	};

	const mute = () => {
		for (const k in sounds.type) {
			sounds.type[k].muted = !sounds.type[k].muted;
		}
		setSounds({...sounds, muted: !sounds.muted});
	};

	return (
		<div className='options'>
			<input className='options__slider' type='range' min='0' max='1' step='0.01'
				value={sounds.volume}
				onChange={onChange}
			/>
			<p className='button button--black' onClick={mute}>
				{sounds.muted ? 'unmute.' : 'mute.'}
			</p>
			<p className='button button--black' onClick={toggleOptions}>back.</p>
		</div>
	);
}
