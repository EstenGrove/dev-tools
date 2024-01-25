import React from "react";
import styles from "../../css/box-shadow/BoxShadowControl.module.scss";
import { PropTypes } from "prop-types";

const BoxShadowControl = ({
	label,
	val,
	name,
	handleChange,
	suffix = "px",
	min = -100,
	max = 100,
}) => {
	return (
		<div className={styles.BoxShadowControl}>
			<div className={styles.BoxShadowControl_top}>
				<div className={styles.BoxShadowControl_top_label}>{label}</div>
				<div className={styles.BoxShadowControl_top_label}>
					<input
						type="number"
						name={name}
						id={name}
						value={val}
						className={styles.BoxShadowControl_top_input}
						onChange={handleChange}
					/>
					<span>{suffix}</span>
				</div>
			</div>
			<div className={styles.BoxShadowControl_bottom}>
				<input
					type="range"
					name={name}
					id={name}
					value={val}
					min={min}
					max={max}
					onChange={handleChange}
					className={styles.BoxShadowControl_bottom_input}
				/>
			</div>
		</div>
	);
};

export default BoxShadowControl;

BoxShadowControl.defaultProps = {};

BoxShadowControl.propTypes = {};
