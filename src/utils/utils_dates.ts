import { TFormattedDuration } from "./utils_audio";

const formatDuration = (seconds: number): TFormattedDuration => {
	const date = new Date(seconds * 1000);
	const mins = date.getUTCMinutes();
	const secs = date.getUTCSeconds();
	// format it together
	const duration = `${mins}:${secs}`;

	return duration as TFormattedDuration;
};

export { formatDuration };
