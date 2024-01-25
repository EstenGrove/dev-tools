import React, { useState, useMemo, useEffect } from "react";
import styles from "../../css/tools/ColorCodeCycler.module.scss";
import sprite from "../../assets/icons/brand.svg";
import { PropTypes } from "prop-types";

// FEATURES:
// - Takes a list of color code types: ['hex', 'rgba', 'hsl']
// - Every time it's clicked it converts to the current code type in the list & shows the color code
// - Iterates in a circle or cycle (end of array => start of array)

const COLOR_CODES = ["hex", "rgba", "hsla"];

// Usage:
// const cycler = cycleFn(COLOR_CODES);
// cycler.next().value; // 'hex'
// cycler.next().value; // 'rgba'
function* cycleFn(arr) {
	while (true) yield* arr;
}

const ColorCodeCycler = ({ triggerNext }) => {
	const [currentCode, setCurrentCode] = useState(COLOR_CODES[0]);
	const codeCycle = useMemo(() => {
		const cycle = cycleFn(COLOR_CODES);
		// we call it once to initially sync it w/ 'currentCode'
		// - this prevents clicking twice to next to the 'next' value
		cycle.next();
		return cycle;
	}, []);

	const getNext = () => {
		const { value, done } = codeCycle.next();

		setCurrentCode(value);
		triggerNext(value);
	};

	return (
		<div className={styles.ColorCodeCycler}>
			{/* ADD unfold_more */}
			<div className={styles.ColorCodeCycler_iconWrapper} onClick={getNext}>
				<svg className={styles.ColorCodeCycler_iconWrapper_icon}>
					<use xlinkHref={`${sprite}#icon-unfold_more`}></use>
				</svg>
			</div>
		</div>
	);
};

export default ColorCodeCycler;

ColorCodeCycler.defaultProps = {};

ColorCodeCycler.propTypes = {};
