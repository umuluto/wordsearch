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

	const mute_ico = sounds.muted
		? (<svg className='ico' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="volume-off"><rect width="24" height="24" opacity="0"/><path d="M16.91 14.08l1.44 1.44a6 6 0 0 0-.07-7.15 1 1 0 1 0-1.56 1.26 4 4 0 0 1 .19 4.45z"/><path d="M21 12a6.51 6.51 0 0 1-1.78 4.39l1.42 1.42A8.53 8.53 0 0 0 23 12a8.75 8.75 0 0 0-3.36-6.77 1 1 0 1 0-1.28 1.54A6.8 6.8 0 0 1 21 12z"/><path d="M15 12.17V4a1 1 0 0 0-1.57-.83L9 6.2z"/><path d="M4.74 7.57H2a1 1 0 0 0-1 1v6.86a1 1 0 0 0 1 1h5l6.41 4.4A1.06 1.06 0 0 0 14 21a1 1 0 0 0 1-1v-2.17z"/><path d="M4.71 3.29a1 1 0 0 0-1.42 1.42l16 16a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/></g></g></svg>)
		: (<svg className='ico' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="volume-up"><rect width="24" height="24" opacity="0"/><path d="M18.28 8.37a1 1 0 1 0-1.56 1.26 4 4 0 0 1 0 4.74A1 1 0 0 0 17.5 16a1 1 0 0 0 .78-.37 6 6 0 0 0 0-7.26z"/><path d="M19.64 5.23a1 1 0 1 0-1.28 1.54A6.8 6.8 0 0 1 21 12a6.8 6.8 0 0 1-2.64 5.23 1 1 0 0 0-.13 1.41A1 1 0 0 0 19 19a1 1 0 0 0 .64-.23A8.75 8.75 0 0 0 23 12a8.75 8.75 0 0 0-3.36-6.77z"/><path d="M14.47 3.12a1 1 0 0 0-1 0L7 7.57H2a1 1 0 0 0-1 1v6.86a1 1 0 0 0 1 1h5l6.41 4.4A1.06 1.06 0 0 0 14 21a1 1 0 0 0 1-1V4a1 1 0 0 0-.53-.88z"/></g></g></svg>);

	return (
		<div className='options'>
			<input className='options__slider' type='range' min='0' max='1' step='0.01'
				disabled={sounds.muted}
				value={sounds.volume}
				onChange={onChange}
			/>
			<a className='bttn bttn--ico' onClick={mute}>
					{mute_ico}
					<span className='bttn__txt'>{sounds.muted ? 'Muted' : 'Mute'}</span>
			</a>
			<a className='bttn bttn--ico' onClick={toggleOptions}>
					<svg className='ico' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="close"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/></g></g></svg>
					<span className='bttn__txt'>Back</span>
			</a>
		</div>
	);
}
