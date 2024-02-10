import React from "react";
import styles from "../../css/box-shadow/MobileBoxShadowControlButton.module.scss";
import sprite from "../../assets/icons/general.svg";
import { PropTypes } from "prop-types";

const icons = {};

const MobileBoxShadowControlButton = ({ icon, actionHandler }) => {
	return (
		<button
			type="button"
			className={styles.MobileBoxShadowControlButton}
			onClick={actionHandler}
		>
			{/*  */}
			<svg className={styles.MobileBoxShadowControlButton_icon}>
				<use xlinkHref={`${sprite}#icon-${icons[icon]}`}></use>
			</svg>
			{/*  */}
			{/*  */}
		</button>
	);
};

export default MobileBoxShadowControlButton;

MobileBoxShadowControlButton.defaultProps = {};

MobileBoxShadowControlButton.propTypes = {};
