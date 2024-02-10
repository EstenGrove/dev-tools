import { useEffect, useRef } from "react";

const useSound = ({ src, initialVolume = 0.25 }) => {
	const audioRef = useRef(new Audio(src));

	const play = (e) => {
		if (!audioRef.current) return;
		audioRef.current.play();
	};
	const pause = (e) => {
		if (!audioRef.current) return;
		audioRef.current.pause();
	};
	const stop = (e) => {
		if (!audioRef.current) return;
		audioRef.current.stop();
	};
	const changeVolume = (volume) => {
		// 1.0 === 100% (max)
		// 0.0 === 0% (mute)
		if (!audioRef.current) return;
		audioRef.current.volume = volume;
	};

	// onMount we:
	//  - 'pre-load' audio data
	//  - set initial volume value
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}
		let audioEl = audioRef.current;

		if (audioRef.current) {
			audioEl.volume = initialVolume;
			audioEl.load();
		}

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		audioRef,
		play,
		pause,
		stop,
		changeVolume,
	};
};

export { useSound };
