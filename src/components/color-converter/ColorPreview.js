import React, { useState, useEffect, useMemo } from "react";
import styles from "../../css/color-converter/ColorPreview.module.scss";
import sprite from "../../assets/icons/general.svg";
import { PropTypes } from "prop-types";
import ColorCodeCycler from "../tools/ColorCodeCycler";
import { convertHexToType } from "../../utils/utils_colors";

// FEATURES:
// - Color Code Cycler:
// 		- Cycles thru HEX, RGBA, HSLA

const applyColor = (color) => {
	return {
		backgroundColor: color,
	};
};
const getIconStyles = (wasCopied) => {
	return {
		fill: wasCopied ? "green" : "",
	};
};
const getTextStyles = (wasCopied) => {
	return {
		color: wasCopied ? "green" : "",
	};
};

const getSizeClass = (size) => {
	switch (size) {
		case "XSM": {
			return styles.xsm;
		}
		case "SM": {
			return styles.sm;
		}
		case "MD": {
			return styles.md;
		}
		case "LG": {
			return styles.lg;
		}
		case "XLG": {
			return styles.xlg;
		}

		default:
			return styles.lg;
	}
};

const PreviewPanel = ({ color }) => {
	return <div className={styles.PreviewPanel} style={applyColor(color)}></div>;
};

const DetailsPanel = ({
	wasCopied,
	copyColor,
	currentColorCode,
	getNextColorType,
}) => {
	return (
		<div className={styles.DetailsPanel}>
			<div className={styles.DetailsPanel_copy} onClick={copyColor}>
				<svg
					className={styles.DetailsPanel_copy_icon}
					style={getIconStyles(wasCopied)}
				>
					<use
						xlinkHref={`${sprite}#icon-${wasCopied ? "check" : "content_copy"}`}
					></use>
				</svg>
				<div
					className={styles.DetailsPanel_copy_colorCode}
					style={getTextStyles(wasCopied)}
				>
					{wasCopied ? "Copied!" : currentColorCode}
				</div>
			</div>
			<ColorCodeCycler triggerNext={getNextColorType} />
		</div>
	);
};

const ColorPreview = ({ color, size = "MD", initialCodeType = "hex" }) => {
	const [wasCopied, setWasCopied] = useState(false);
	// code type ('hex', 'rgba', 'hsla')
	const [colorCodeType, setColorCodeType] = useState(initialCodeType);
	// current color code (hex, rgba, or hsla)
	const currentColorCode = useMemo(() => {
		const newColorCode = convertHexToType(colorCodeType, color);

		return newColorCode;
	}, [colorCodeType, color]);

	const getNextColorType = (val) => {
		setColorCodeType(val);
		console.log("val", val);
	};

	const copyColor = () => {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(currentColorCode);
			setWasCopied(true);
		} else {
			alert("Cant copy on your device");
		}
	};

	// waits 2 secs & resets wasCopied state
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}
		if (wasCopied) {
			setTimeout(() => {
				setWasCopied(false);
			}, 2000);
		}

		return () => {
			isMounted = false;
		};
	}, [wasCopied]);

	return (
		<div className={`${styles.ColorPreview} ${getSizeClass(size)}`}>
			<PreviewPanel color={color} />
			<DetailsPanel
				wasCopied={wasCopied}
				currentColorCode={currentColorCode}
				copyColor={copyColor}
				getNextColorType={getNextColorType}
			/>
		</div>
	);
};

export default ColorPreview;

ColorPreview.defaultProps = {};

ColorPreview.propTypes = {};
