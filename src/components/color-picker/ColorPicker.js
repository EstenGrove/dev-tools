import React, { useState } from "react";
import styles from "../../css/color-picker/ColorPicker.module.scss";
import sprite from "../../assets/icons/brand.svg";
import { PropTypes } from "prop-types";

const defaultVal = "#7c3aed";

const ColorPicker = ({ initialColor = defaultVal, getColorValue }) => {
	const [color, setColor] = useState(initialColor);

	const handleChange = (e) => {
		const { value } = e.target;
		setColor(value);

		if (getColorValue) {
			getColorValue(value);
		}
	};

	return (
		<label className={styles.ColorPicker}>
			<input
				type="color"
				value={color}
				className={styles.ColorPicker_input}
				onChange={handleChange}
			/>
			<svg className={styles.ColorPicker_icon}>
				<use xlinkHref={`${sprite}#icon-colorize`}></use>
			</svg>
		</label>
	);
};

export default ColorPicker;

ColorPicker.defaultProps = {};

ColorPicker.propTypes = {};
