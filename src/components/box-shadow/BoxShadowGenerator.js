import React, { useEffect, useMemo, useState } from "react";
import styles from "../../css/box-shadow/BoxShadowGenerator.module.scss";
import sprite from "../../assets/icons/general.svg";
import { PropTypes } from "prop-types";
import {
	createShadowFromValues,
	createStylesFromValues,
} from "../../utils/utils_shadows.ts";
import BoxShadowPreview from "./BoxShadowPreview";
import BoxShadowControl from "./BoxShadowControl.js";
import BoxShadowControlsPanel from "./BoxShadowControlsPanel.js";
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

const BoxShadowGenerator = () => {
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
		<div className={styles.BoxShadowGenerator}>
			<div className={styles.BoxShadowGenerator_top}>
				<h2 className={styles.BoxShadowGenerator_top_title}>
					Box-Shadow Generator
				</h2>
			</div>
			<div className={styles.BoxShadowGenerator_main}>
				<div className={styles.BoxShadowGenerator_main_controls}>
					<BoxShadowControlsPanel panelTitle="Shadow Settings">
						<BoxShadowControl
							key="X-Offset"
							label="Horizontal Offset"
							name="horizontalOffset"
							val={horizontalOffset}
							min={-100}
							max={100}
							handleChange={handleControl}
						/>
						<BoxShadowControl
							key="Y-Offset"
							label="Vertical Offset"
							name="verticalOffset"
							val={verticalOffset}
							min={-100}
							max={100}
							handleChange={handleControl}
						/>
						<BoxShadowControl
							key="Blur-Radius"
							label="Blur Radius"
							name="blurRadius"
							val={blurRadius}
							min={0}
							max={100}
							handleChange={handleControl}
						/>
						<BoxShadowControl
							key="Spread-Radius"
							label="Spread Radius"
							name="spreadRadius"
							val={spreadRadius}
							min={-100}
							max={100}
							handleChange={handleControl}
						/>
						<ShadowColorPicker
							key="Shadow Color"
							initialColor={boxColor}
							getShadowColor={getShadowColor}
						/>
						<CopyButton handleCopy={copyShadow} />
					</BoxShadowControlsPanel>
				</div>
				<div className={styles.BoxShadowGenerator_main_preview}>
					<BoxShadowPreview
						key="Box Shadow Preview"
						boxText={boxText}
						boxShadow={shadowStyles}
						boxModel={boxModelStyles}
						canvasColor={canvasColor}
					/>
				</div>
				<div className={styles.BoxShadowGenerator_main_controls}>
					<BoxShadowControlsPanel panelTitle="Box/Canvas Settings">
						<CanvasColorPicker
							key="Canvas Color"
							initialColor={canvasColor}
							getCanvasColor={getCanvasColor}
						/>
						<BoxModelColorPicker
							key="Box Color"
							initialColor={boxColor}
							getBoxColor={getBoxColor}
						/>
						<br />
						<br />
						<BoxShadowControl
							key="Box Model Border-Radius"
							label="Border Radius"
							name="borderRadius"
							val={boxBorderRadius}
							suffix="rem"
							min={0}
							max={20}
							handleChange={handleControl}
						/>
						<BoxShadowControl
							key="Box Model Width"
							label="Box Width"
							name="boxWidth"
							val={boxWidth}
							suffix="rem"
							min={0}
							max={40}
							handleChange={handleControl}
						/>
						<BoxShadowControl
							key="Box Model Height"
							label="Box Height"
							name="boxHeight"
							val={boxHeight}
							suffix="rem"
							min={0}
							max={40}
							handleChange={handleControl}
						/>
						<TextControl
							key="Box Model Text"
							name="boxText"
							val={boxText}
							handleChange={handleControl}
						/>
					</BoxShadowControlsPanel>
				</div>
			</div>
		</div>
	);
};

export default BoxShadowGenerator;

BoxShadowGenerator.defaultProps = {};

BoxShadowGenerator.propTypes = {};
