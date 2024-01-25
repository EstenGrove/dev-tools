import { isEmptyVal } from "./utils_types";

const COLOR_PALETTE = {
	primary: {
		background: "#0d1115",
		text: "#ffffff",
		color: "#009ddc",
	},
	accents: {
		// accent: "#009ddc",
		accent: "#8a4fff",
		redAccent: "#ed254e",
		brightRedAccent: "#ff0066",
		purpleAccent: "#8a4fff",
		blueAccent: "#009ddc",
		greenAccent: "#21d19f",
		neonGreenAccent: "#80ff72",
		brightGreenAccent: "#2cda9d",
		yellowAccent: "#fff07c",
	},
	text: {
		primary: "#ffffff",
		secondary: "rgb(100, 116, 139)",
		grey: "rgb(100, 116, 139)",
		grey2: "rgb(100, 116, 139)",
		// grey: "rgb(71, 85, 105)",
		// $blueGrey700: rgb(51, 65, 85);
		// $blueGrey800: rgb(30, 41, 59);
	},
};

const COLORS_MAP = {
	purple: {
		50: "rgb(245, 243, 255)",
		100: "rgb(237, 233, 254)",
		200: "rgb(221, 214, 254)",
		300: "rgb(196, 181, 253)",
		400: "rgb(167, 139, 250)",
		500: "rgb(139, 92, 246)",
		600: "rgb(124, 58, 237)",
		700: "rgb(109, 40, 217)",
		800: "rgb(91, 33, 182)",
		900: "rgb(76, 29, 149)",
	},
	blue: {
		50: "rgb(239, 246, 255)",
		100: "rgb(219, 234, 254)",
		200: "rgb(191, 219, 254)",
		300: "rgb(147, 197, 253)",
		400: "rgb(96, 165, 250)",
		500: "rgb(59, 130, 246)",
		600: "rgb(37, 99, 235)",
		700: "rgb(29, 78, 216)",
		800: "rgb(30, 64, 175)",
		900: "rgb(30, 58, 138)",
	},
	red: {
		50: "rgb(254, 242, 242)",
		100: "rgb(254, 226, 226)",
		200: "rgb(254, 202, 202)",
		300: "rgb(252, 165, 165)",
		400: "rgb(248, 113, 113)",
		500: "rgb(239, 68, 68)",
		600: "rgb(220, 38, 38)",
		700: "rgb(185, 28, 28)",
		800: "rgb(153, 27, 27)",
		900: "rgb(127, 29, 29)",
	},
	pink: {
		100: "rgb(255, 245, 247)",
		200: "rgb(254, 215, 226)",
		300: "rgb(251, 182, 206)",
		400: "rgb(246, 135, 179)",
		500: "rgb(237, 100, 166)",
		600: "rgb(213, 63, 140)",
		700: "rgb(184, 50, 128)",
		800: "rgb(151, 38, 109)",
		900: "rgb(112, 36, 89)",
	},
	green: {
		50: "rgb(236, 253, 245)",
		100: "rgb(209, 250, 229)",
		200: "rgb(167, 243, 208)",
		300: "rgb(110, 231, 183)",
		400: "rgb(52, 211, 153)",
		500: "rgb(16, 185, 129)",
		600: "rgb(5, 150, 105)",
		700: "rgb(4, 120, 87)",
		800: "rgb(6, 95, 70)",
		900: "rgb(6, 78, 59)",
	},
	yellow: {
		50: "rgb(255, 251, 235)",
		100: "rgb(254, 243, 199)",
		200: "rgb(253, 230, 138)",
		300: "rgb(252, 211, 77)",
		400: "rgb(251, 191, 36)",
		500: "rgb(245, 158, 11)",
		600: "rgb(217, 119, 6)",
		700: "rgb(180, 83, 9)",
		800: "rgb(146, 64, 14)",
		900: "rgb(120, 53, 15)",
	},
	orange: {
		50: "rgb(255, 247, 237)",
		100: "rgb(255, 237, 213)",
		200: "rgb(254, 215, 170)",
		300: "rgb(253, 186, 116)",
		400: "rgb(251, 146, 60)",
		500: "rgb(249, 115, 22)",
		600: "rgb(234, 88, 12)",
		700: "rgb(194, 65, 12)",
		800: "rgb(154, 52, 18)",
		900: "rgb(124, 45, 18)",
	},
	grey: {
		50: "rgb(250, 250, 250)",
		100: "rgb(244, 244, 245)",
		200: "rgb(228, 228, 231)",
		300: "rgb(212, 212, 216)",
		400: "rgb(161, 161, 170)",
		500: "rgb(113, 113, 122)",
		600: "rgb(82, 82, 91)",
		700: "rgb(63, 63, 70)",
		800: "rgb(39, 39, 42)",
		900: "rgb(24, 24, 27)",
	},
	blueGrey: {
		50: "rgb(248, 250, 252)",
		100: "rgb(241, 245, 249)",
		200: "rgb(226, 232, 240)",
		300: "rgb(203, 213, 225)",
		400: "rgb(148, 163, 184)",
		500: "rgb(100, 116, 139)",
		600: "rgb(71, 85, 105)",
		700: "rgb(51, 65, 85)",
		800: "rgb(30, 41, 59)",
		900: "rgb(15, 23, 42)",
	},
	teal: {
		100: "rgb(230, 255, 250)",
		200: "rgb(178, 245, 234)",
		300: "rgb(129, 230, 217)",
		400: "rgb(79, 209, 197)",
		500: "rgb(56, 178, 172)",
		600: "rgb(49, 151, 149)",
		700: "rgb(44, 122, 123)",
		800: "rgb(40, 94, 97)",
		900: "rgb(35, 78, 82)",
	},
};

const { purple, blue, red, pink, green, yellow, orange, grey, blueGrey, teal } =
	COLORS_MAP;

// COLOR CONVERSION UTILS //

const rgbToHex = ({ r, g, b }) => {
	r = Number(r);
	g = Number(g);
	b = Number(b);

	return ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0");
};

const hexToRGB = (hex) => {
	let alpha = false;
	let h = hex.slice(hex.startsWith("#") ? 1 : 0);

	if (h.length === 3) h = [...h].map((x) => x + x).join("");
	else if (h.length === 8) alpha = true;
	h = parseInt(h, 16);
	return (
		"rgb" +
		(alpha ? "a" : "") +
		"(" +
		(h >>> (alpha ? 24 : 16)) +
		", " +
		((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
		", " +
		((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
		(alpha ? `, ${h & 0x000000ff}` : "") +
		")"
	);
};

/**
 * Converts a hex color w/ opacity value to rgba format.
 * @param {String} hex - A color code hex w/ '#' included.
 * @param {Number|String} opacity - A numeric/string opacity value (eg 0.0-1.0)
 * @returns {String} - Returns formatted rgba (eg "rgba(0,0,0,.75)")
 */
const hexToRGBA = (hex, opacity = 1) => {
	const rgb = hexToRGB(hex);
	// insert 'rgba' & 'opacity'
	const temp = rgb.replace("rgb", "rgba");
	const rgba = temp.replace(")", `, ${opacity})`);
	return rgba;
};

// string: '#FFFFFF'
const hexToHSL = (hex) => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

	let r = parseInt(result[1], 16);
	let g = parseInt(result[2], 16);
	let b = parseInt(result[3], 16);

	// divides variable by 255
	r /= 255;
	g /= 255;
	b /= 255;
	let max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	let h,
		s,
		l = (max + min) / 2;

	if (max === min) {
		h = s = 0; // achromatic
	} else {
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
			default:
				break;
		}

		h /= 6;
	}

	h = Math.round(h * 360);
	s = Math.round(s * 100);
	l = Math.round(l * 100);

	return { h, s, l };
};
const hexToHSLA = (hex) => {
	const { h, s, l } = hexToHSL(hex);
	// insert base opacity of '1'
	const hsl = `hsla(${h}, ${s}%, ${l}%, 1)`;
	return hsl;
};

const extractHSL = (hsl) => {
	// const reg = /(.*?)hsl\((\d+),(\d+)%,(\d+)%\)/gm;
	const reg = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/gm;
	const results = reg.exec(hsl);
	const [all, h, s, l, ...rest] = results;

	return {
		hsl,
		h,
		s,
		l,
	};
};

/**
 * Extracts just the 'R', 'G' and 'B' values from an rgb string.
 * @param {String} rgb - A string RGB color (eg. 'rgb(254, 68, 192)')
 * @returns {Object} - Returns an object w/ rgb as values.
 */
const extractRGB = (rgb) => {
	if (isEmptyVal(rgb) || !rgb) return { r: "0", g: "0", b: "0" };
	const reg =
		/^(rgb\((?<r>[0-9]{1,3}), (?<g>[0-9]{1,3}), (?<b>[0-9]{1,3}))\)/gm;
	const matches = reg.exec(rgb);
	return matches?.groups;
};
/**
 * Removes the '#' from a hex color code string.
 * @param {String} hex - A string hex color (eg. '#e84855')
 */
const removeHexHash = (hex) => {
	return hex.slice("#")[1];
};
/**
 * Removes the hash(#) in a hex color code.
 * @param {String} colorCode - A hex color code to be converted.
 */
const removeHex = (colorCode) => {
	if (isEmptyVal(colorCode)) return "";
	const hex = /^(#)/;
	return colorCode.replace(hex, "");
};

const hslToString = ({ h, s, l }) => {
	const hsl = `hsl(${h}, ${s}, ${l})`;
	return hsl;
};
const rgbToString = ({ r, g, b }) => {
	const rgb = `rgb(${r}, ${g}, ${b})`;
	return rgb;
};

const convertHexToType = (type, color) => {
	switch (type) {
		case "hex": {
			return color;
		}
		case "rgba": {
			const rgba = hexToRGBA(color);
			return rgba;
		}
		case "hsla": {
			const hsla = hexToHSLA(color);
			return hsla;
		}
		default:
			break;
	}
};

export { COLOR_PALETTE, COLORS_MAP };

export { purple, blue, red, pink, green, yellow, orange, grey, blueGrey, teal };

export { rgbToHex, hexToRGB, hexToRGBA, hexToHSL };

export {
	extractRGB,
	extractHSL,
	removeHex,
	removeHexHash,
	hslToString,
	rgbToString,
	convertHexToType,
};
