// check string or number
const isEmptyVal = (val) => {
	if (!val || val === "" || val === null) return true;
	return false;
};
// check object
const isEmptyObj = (obj) => {
	if (typeof obj !== "object") return `NOT AN OBJECT: ${typeof obj}`;
	if (!obj || obj === null || !Object.keys(obj).length) return true;
	return false;
};
// check array
const isEmptyArray = (arr) => {
	if (!Array.isArray(arr)) return `NOT AN ARRAY: ${typeof arr}`;
	if (!arr || !arr.length || arr.length === 0) return true;
	return false;
};

const isBool = (val) => {
	if (typeof val === "boolean") return true;
	return false;
};
// tests for 'Array' type
const isArray = (val) => {
	return Array.isArray(val);
};

// checks is item is base64 encoded
const isBase64 = (str) => {
	try {
		return btoa(atob(str)) === str;
	} catch (err) {
		return false;
	}
};

const hasProp = (prop, obj) => {
	if (obj.hasOwnProperty(prop)) return true;
	return false;
};

// used for initializing arrays to an empty []
const handleEmpties = (val) => {
	if (isEmptyArray(val) || !val) return [];
	return [...val];
};

// removes a single 'falsey' value
const removeFalsey = (val) => {
	return Boolean(val);
};
// removes ALL 'falsey' values from an array
const removeFalseys = (arr) => {
	return arr.filter((x) => removeFalsey(x));
};

const escapeRegex = (string) => {
	return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
};

export {
	isBase64,
	isEmptyArray,
	isEmptyObj,
	isEmptyVal,
	isBool,
	isArray,
	handleEmpties,
	hasProp,
	// FALSEY FILTERING
	removeFalsey,
	removeFalseys,
	escapeRegex,
};
