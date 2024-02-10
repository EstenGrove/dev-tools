import React, {
	useState,
	useEffect,
	useRef,
	useCallback,
	useMemo,
} from "react";
import styles from "../../css/audio/PopClick.module.scss";
import { PropTypes } from "prop-types";
import audioSrc from "../../assets/audio/pop-2--Edited2.mp3";
import { useSound } from "../../hooks/useSound";

const MAX_VOL = 1 || 1.0;

const PopClick = () => {
	const { play, changeVolume } = useSound({
		src: audioSrc,
		initialVolume: 0.1,
	});
	const [volume, setVolume] = useState(0.1);
	// ONLY RUNS IF WE CHANGE 'volume' LOCALLY
	const updateVol = useCallback(() => {
		changeVolume(volume);
	}, [changeVolume, volume]);

	const handleClick = (e) => {
		play();
		const newVol = volume + 0.1;
		if (newVol >= MAX_VOL) {
			return;
		}
		// increase volume after each click IF we haven't reached maxVol
		setVolume(newVol);
	};

	// updates audioRef.current.volume when we change 'volume' state
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		updateVol();

		return () => {
			isMounted = false;
		};
	}, [updateVol]);

	return (
		<div className={styles.PopClick}>
			<div className={styles.PopClick}>
				<button
					type="button"
					onClick={handleClick}
					className={styles.PopClick_button}
				>
					Click Me!
				</button>
				{/* <audio
					ref={audioRef}
					src={audioSrc}
					preload="auto"
					controls
					style={{ display: "none" }}
				></audio> */}
			</div>
		</div>
	);
};

export default PopClick;

PopClick.defaultProps = {};

PopClick.propTypes = {};
