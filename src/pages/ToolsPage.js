import React, { useState } from "react";
import styles from "../css/pages/ToolsPage.module.scss";
import { PropTypes } from "prop-types";
import ColorPreview from "../components/color-converter/ColorPreview";
import ColorPicker from "../components/color-picker/ColorPicker";
import ColorCodeCycler from "../components/tools/ColorCodeCycler";
import BoxShadowPreview from "../components/box-shadow/BoxShadowPreview";
import BoxShadowGenerator from "../components/box-shadow/BoxShadowGenerator";

// const colors = [
// 	"rgb(124, 58, 237)",
// 	"hsl(262, 83%, 58%)",
// 	"hsl(262, 73%, 58%)",
// 	"hsl(262, 63%, 58%)",
// 	"hsl(262, 53%, 58%)",
// ];
const colors = ["#7c3aed", "#7c3bed", "#7f46e2", "#8250d7", "#855bcd"];

const ToolsPage = () => {
	return (
		<div className={styles.ToolsPage}>
			<h1 className={styles.ToolsPage_title}>Tools</h1>
			{/* <div className={styles.ToolsPage_content}>
				<ColorPicker />
				{colors.map((color, idx) => (
					<ColorPreview key={idx} color={color} />
				))}
			</div> */}
			<div className={styles.ToolsPage_content}>
				<BoxShadowGenerator />
			</div>
		</div>
	);
};

export default ToolsPage;

ToolsPage.defaultProps = {};

ToolsPage.propTypes = {};
