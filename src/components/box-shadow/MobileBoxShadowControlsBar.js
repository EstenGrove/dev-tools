import React from "react";
import styles from "../../css/box-shadow/MobileBoxShadowControlsBar.module.scss";
import sprite from "../../assets/icons/general.svg";
import { PropTypes } from "prop-types";

// SHADOW SETTINGS
// CANVAS/BOX SETTINGS

const icons = {
	// shadow
	xOffset: "",
	yOffset: "",
	blurRadius: "",
	spreadRadius: "",
	shadowColor: "",
	// box/canvas
	canvasColor: "",
	boxColor: "",
	borderRadius: "",
	boxWidth: "",
	boxHeight: "",
};

const ControlButton = ({ icon, text }) => {
	return (
		<button className={styles.ControlButton}>
			<svg className={styles.ControlButton_icon}>
				<use xlinkHref={`${sprite}#icon-${icons[icon]}`}></use>
			</svg>
			<span>{text}</span>
		</button>
	);
};

const MobileBoxShadowControlsBar = () => {
	return (
		<div className={styles.MobileBoxShadowControlsBar}>
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default MobileBoxShadowControlsBar;

MobileBoxShadowControlsBar.defaultProps = {};

MobileBoxShadowControlsBar.propTypes = {};
