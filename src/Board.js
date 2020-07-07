import React, { useState } from 'react';

const colors = [
	'#002685', '#449adf', '#4dc7fd',
	'#4cde77', '#5e53c7', '#7e77d2',
	'#cd1e10', '#fc007f', '#fe78d1',
	'#763931', '#f1ab00', '#fadf00',
	'#000000', '#007e3a', '#64d13e',
];

let color_idx = 0;

function getColor() {
	color_idx %= colors.length;
	return colors[color_idx++];
}

export default function Board({ letters, push, sounds }) {
	const boardSize = Math.sqrt(letters.length);
	const [marks, setMarks] = useState([]);
	const [hilites, setHilites] = useState([]);

	const boardStyle = {
		gridTemplateRows: `repeat(${boardSize}, 1fr)`,
		gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
	};

	const onMouseDown = i => () => {
		setMarks([i, i]);
	};

	const onMouseEnter = i => () => {
		if (!marks.length) return;

		if (straight2(marks[0], i)) {
			setMarks([marks[0], i]);
		}
	};

	const onMouseUp = () => {
		if (!marks.length) return;

		const col_a = marks[0] % boardSize;
		const col_b = marks[1] % boardSize;

		const row_a = ~~(marks[0] / boardSize);
		const row_b = ~~(marks[1] / boardSize);

		const d = Math.sign(col_b - col_a) + Math.sign(row_b - row_a) * boardSize;

		const points = [];
		for (let i = marks[0], end = marks[1] + d; i !== end; i += d) {
			points.push(i);
		}

		if (push(points.map(i => letters[i]).join(''))) {
			sounds.correct.play();
			setHilites([
				...hilites,
				{ ckpts: points, color: getColor() }
			]);
		} else {
			sounds.wrong.play();
		}

		setMarks([]);
	};

	const straight2 = (a, b) => {
		const col_a = a % boardSize;
		const col_b = b % boardSize;
		if (col_a === col_b) return true;

		const row_a = ~~(a / boardSize);
		const row_b = ~~(b / boardSize);
		if (row_a === row_b) return true;

		return Math.abs((col_a - col_b) / (row_a - row_b)) === 1;
	};

	const straight3 = (a, b, c) => {
		const col_a = a % boardSize;
		const col_b = b % boardSize;
		const col_c = c % boardSize;

		const row_a = ~~(a / boardSize);
		const row_b = ~~(b / boardSize);
		const row_c = ~~(c / boardSize);

		return (col_a - col_b) * (row_a - row_c) === (col_a - col_c) * (row_a - row_b);
	};

	const min = Math.min(...marks);
	const max = Math.max(...marks);
	const cells = [...letters].map((c, i) => {
		const selected = (min <= i && i <= max && straight3(...marks, i))
			? 'board__cell--selected'
			: '';

		const color = hilites.find(e => e.ckpts.includes(i))?.color;
		const hilited = color ? 'board__cell--hilited' : '';

		const style = { color: color };

		return (
			<div className={`board__cell ${selected} ${hilited}`}
				onMouseDown={onMouseDown(i)}
				onMouseEnter={onMouseEnter(i)}
				style={style}
				key={i}
			>
				{c}
			</div>
		);
	});

	return (
		<div className='board'
			style={boardStyle}
			onMouseUp={onMouseUp}
			onMouseLeave={onMouseUp}
		>
			{cells}
		</div>
	);
}
