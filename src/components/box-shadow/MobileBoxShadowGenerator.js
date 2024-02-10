import React, { useEffect, useMemo, useState } from "react";
import styles from "../../css/box-shadow/MobileBoxShadowGenerator.module.scss";
import sprite from "../../assets/icons/general.svg";
import { PropTypes } from "prop-types";
import {
	createShadowFromValues,
	createStylesFromValues,
} from "../../utils/utils_shadows.ts";
import MobileBoxShadowPreview from "./MobileBoxShadowPreview";
import MobileBoxShadowControl from "./MobileBoxShadowControl.js";
import MobileBoxShadowControlsPanel from "./MobileBoxShadowControlsPanel.js";
import ColorPicker from "../color-picker/ColorPicker.js";

// box-shadow: <horizontal> <vertical> <blur> <spread> <color>

const CopyButton = ({ handleCopy }) => {
	const [wasCopied, setWasCopied] = useState(false);

	const copy = () => {
		handleCopy();
		setWasCopied(true);
	};

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
		<button className={styles.CopyButton} onClick={copy}>
			<svg className={styles.CopyButton_icon}>
				<use
					xlinkHref={`${sprite}#icon-${wasCopied ? "check" : "content_copy"}`}
				></use>
			</svg>
			<div className={styles.CopyButton_text}>
				{wasCopied ? "Copied!" : "Copy"}
			</div>
		</button>
	);
};

const CanvasColorPicker = ({ getCanvasColor }) => {
	return (
		<div className={styles.CanvasColorPicker}>
			<ColorPicker initialColor="#eaecef" getColorValue={getCanvasColor} />
			<div className={styles.CanvasColorPicker_label}>Canvas Color</div>
		</div>
	);
};
const BoxModelColorPicker = ({ getBoxColor }) => {
	return (
		<div className={styles.BoxModelColorPicker}>
			<ColorPicker initialColor="#eaecef" getColorValue={getBoxColor} />
			<div className={styles.BoxModelColorPicker_label}>Box Color</div>
		</div>
	);
};
const ShadowColorPicker = ({ getShadowColor }) => {
	return (
		<div className={styles.ShadowColorPicker}>
			<ColorPicker initialColor="#eaecef" getColorValue={getShadowColor} />
			<div className={styles.ShadowColorPicker_label}>Shadow Color</div>
		</div>
	);
};
const TextControl = ({ name, val, handleChange, placeholder }) => {
	return (
		<div className={styles.TextControl}>
			<input
				type="text"
				name={name}
				id={name}
				value={val}
				onChange={handleChange}
				className={styles.TextControl_input}
				placeholder={placeholder}
			/>
		</div>
	);
};

const MobileBoxShadowGenerator = () => {
	// shadow settings
	const [horizontalOffset, setHorizontalOffset] = useState(12);
	const [verticalOffset, setVerticalOffset] = useState(24);
	const [blurRadius, setBlurRadius] = useState(53);
	const [spreadRadius, setSpreadRadius] = useState(14);
	const [shadowColor, setShadowColor] = useState("#000000");
	// canvas/box settings
	const [canvasColor, setCanvasColor] = useState("#eaecef");
	const [boxColor, setBoxColor] = useState("");
	const [boxBorderRadius, setBoxBorderRadius] = useState(0);
	const [boxWidth, setBoxWidth] = useState(20);
	const [boxHeight, setBoxHeight] = useState(20);
	const [boxText, setBoxText] = useState("Text Goes Here");
	// format & combines all styles into readable values as a string
	// box-shadow: <all-value-here>
	const shadowStyles = useMemo(() => {
		const shadow = createShadowFromValues({
			xOffset: horizontalOffset,
			yOffset: verticalOffset,
			blur: blurRadius,
			spread: spreadRadius,
			color: shadowColor,
		});

		return shadow;
	}, [blurRadius, horizontalOffset, shadowColor, spreadRadius, verticalOffset]);
	const boxModelStyles = useMemo(() => {
		const boxStyles = createStylesFromValues({
			boxColor,
			boxBorderRadius,
			boxWidth,
			boxHeight,
		});

		return boxStyles;
	}, [boxBorderRadius, boxColor, boxHeight, boxWidth]);

	const handleControl = (e) => {
		const { name, value } = e.target;

		switch (name) {
			// box-shadow values
			case "horizontalOffset": {
				return setHorizontalOffset(value);
			}
			case "verticalOffset": {
				return setVerticalOffset(value);
			}
			case "blurRadius": {
				return setBlurRadius(value);
			}
			case "spreadRadius": {
				return setSpreadRadius(value);
			}
			// box model values (preview)
			case "borderRadius": {
				return setBoxBorderRadius(value);
			}
			case "boxWidth": {
				return setBoxWidth(value);
			}
			case "boxHeight": {
				return setBoxHeight(value);
			}
			case "boxText": {
				return setBoxText(value);
			}
			default:
				break;
		}
	};

	const getCanvasColor = (color) => {
		setCanvasColor(color);
	};
	const getBoxColor = (color) => {
		setBoxColor(color);
	};
	const getShadowColor = (color) => {
		setShadowColor(color);
	};

	const copyShadow = () => {
		const shadow = `box-shadow: ${shadowStyles}`;
		navigator.clipboard.writeText(shadow);
	};

	return (
		<div className={styles.MobileBoxShadowGenerator}>
			<div className={styles.MobileBoxShadowGenerator_top}>
				<h2 className={styles.MobileBoxShadowGenerator_top_title}>
					Box-Shadow Generator
				</h2>
			</div>
			<div className={styles.MobileBoxShadowGenerator_main}>
				<div className={styles.MobileBoxShadowGenerator_main_preview}>
					<MobileBoxShadowPreview
						key="Box Shadow Preview"
						boxText={boxText}
						boxShadow={shadowStyles}
						boxModel={boxModelStyles}
						canvasColor={canvasColor}
					/>
				</div>
				<div className={styles.MobileBoxShadowGenerator_main_controlBar}>
					{/* <Mo */}
					{/* BUTTONS THAT OPEN DIALOG CONTROLS GO HERE */}
					{/* BUTTONS THAT OPEN DIALOG CONTROLS GO HERE */}
				</div>
			</div>
		</div>
	);
};

export default MobileBoxShadowGenerator;

MobileBoxShadowGenerator.defaultProps = {};

MobileBoxShadowGenerator.propTypes = {};
