import { BoxModelValues, BoxShadowValue } from "./types";

// returns '10px'
const convertNumToPixels = (num: number): string => {
	if (typeof num !== "number") {
		console.warn(`INVALID TYPE: NOT A NUMBER ${num}`);
	}

	const withPx = `${num}px`;

	return withPx;
};

// <xOffset> <yOffset> <blur> <spread> <color>
const createShadowFromValues = (values: BoxShadowValue): string => {
	const { xOffset, yOffset, blur, spread, color } = values;

	const shadow = `${xOffset}px ${yOffset}px ${blur}px ${spread}px ${color}`;

	return shadow;
};

const createStylesFromValues = (values: BoxModelValues) => {
	const { boxColor, boxBorderRadius, boxWidth, boxHeight } = values;
	const css = {
		backgroundColor: boxColor,
		borderRadius: `${boxBorderRadius}rem`,
		width: `${boxWidth}rem`,
		height: `${boxHeight}rem`,
	};

	return css;
};

export { convertNumToPixels, createShadowFromValues, createStylesFromValues };
