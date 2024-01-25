interface BoxShadowValue {
	xOffset: number;
	yOffset: number;
	blur: number;
	spread: number;
	color?: number | undefined;
}

interface BoxModelValues {
	boxColor?: string | undefined;
	boxBorderRadius?: number | undefined; // rem
	boxWidth?: number | undefined; // rem
	boxHeight?: number | undefined; // rem
}

export { BoxShadowValue, BoxModelValues };
