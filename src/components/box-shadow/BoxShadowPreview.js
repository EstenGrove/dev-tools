import React, { useMemo } from "react";
import styles from "../../css/box-shadow/BoxShadowPreview.module.scss";
import { PropTypes } from "prop-types";

// FEATURES:
// - Change color of box
// - Change color of canvas background
// - Change shadow color
// - Support inset and outset shadows

const BoxShadowCanvas = ({ backgroundColor = "", children }) => {
	const canvasStyles = useMemo(() => {
		const css = {
			backgroundColor,
		};
		return css;
	}, [backgroundColor]);

	return (
		<div className={styles.BoxShadowCanvas} style={canvasStyles}>
			<div className={styles.BoxShadowCanvas_inner}>{children}</div>
		</div>
	);
};
// support changing size of box (width, height, border-radius, background-color)
const BoxShadowModel = ({ text = "", boxShadow, boxModel }) => {
	const modelStyles = useMemo(() => {
		const css = {
			...boxModel,
			boxShadow,
		};
		return css;
	}, [boxShadow, boxModel]);

	return (
		<div className={styles.BoxShadowModel} style={modelStyles}>
			<div className={styles.BoxShadowModel_inner}>
				<h2 className={styles.BoxShadowModel_inner_text}>{text}</h2>
			</div>
		</div>
	);
};

const BoxShadowPreview = ({ canvasColor, boxShadow, boxModel, boxText }) => {
	return (
		<div className={styles.BoxShadowPreview}>
			<div className={styles.BoxShadowPreview_inner}>
				<BoxShadowCanvas backgroundColor={canvasColor}>
					<BoxShadowModel
						text={boxText}
						boxShadow={boxShadow}
						boxModel={boxModel}
					/>
				</BoxShadowCanvas>
			</div>
		</div>
	);
};

export default BoxShadowPreview;

BoxShadowPreview.defaultProps = {};

BoxShadowPreview.propTypes = {};
