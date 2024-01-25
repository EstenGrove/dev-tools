import React from "react";
import styles from "../../css/box-shadow/BoxShadowControlsPanel.module.scss";
import { PropTypes } from "prop-types";

const BoxShadowControlsPanel = ({ panelTitle, children }) => {
	return (
		<div className={styles.BoxShadowControlsPanel}>
			<div className={styles.BoxShadowControlsPanel_top}>{panelTitle}</div>
			<div className={styles.BoxShadowControlsPanel}>{children}</div>
		</div>
	);
};

export default BoxShadowControlsPanel;

BoxShadowControlsPanel.defaultProps = {};

BoxShadowControlsPanel.propTypes = {};
