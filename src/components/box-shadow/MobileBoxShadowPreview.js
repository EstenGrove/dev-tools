import React, { useState, useMemo } from "react";
import styles from "../../css/box-shadow/MobileBoxShadowPreview.module.scss";
import { PropTypes } from "prop-types";

const MobileBoxShadowCanvas = ({ backgroundColor = "", children }) => {
	const canvasStyles = useMemo(() => {
		const css = {
			backgroundColor,
		};
		return css;
	}, [backgroundColor]);

	return (
		<div className={styles.MobileBoxShadowCanvas} style={canvasStyles}>
			<div className={styles.MobileBoxShadowCanvas_inner}>{children}</div>
		</div>
	);
};
// support changing size of box (width, height, border-radius, background-color)
const MobileBoxShadowModel = ({ text = "", boxShadow, boxModel }) => {
	const modelStyles = useMemo(() => {
		const css = {
			...boxModel,
			boxShadow,
		};
		return css;
	}, [boxShadow, boxModel]);

	return (
		<div className={styles.MobileBoxShadowModel} style={modelStyles}>
			<div className={styles.MobileBoxShadowModel_inner}>
				<h2 className={styles.MobileBoxShadowModel_inner_text}>{text}</h2>
			</div>
		</div>
	);
};

const MobileBoxShadowPreview = ({
	canvasColor,
	boxShadow,
	boxModel,
	boxText,
}) => {
	return (
		<div className={styles.MobileBoxShadowPreview}>
			<div className={styles.MobileBoxShadowPreview_inner}>
				<MobileBoxShadowCanvas backgroundColor={canvasColor}>
					<MobileBoxShadowModel
						text={boxText}
						boxShadow={boxShadow}
						boxModel={boxModel}
					/>
				</MobileBoxShadowCanvas>
			</div>
		</div>
	);
};

export default MobileBoxShadowPreview;

MobileBoxShadowPreview.defaultProps = {};

MobileBoxShadowPreview.propTypes = {};
