import React, { useMemo } from "react";
import styles from "../../css/audio/AudioPlayerControls.module.scss";
import { PropTypes } from "prop-types";
import sprite from "../../assets/icons/audio.svg";

const ICONS = {
	play: "play_arrow",
	pause: "pause1",
	stop: "stop",
	skipNext: "skip_next",
	skipPrev: "skip_previous",
	forward: "fast_forward",
	rewind: "fast_rewind",
	replay: "replay",
	loop: "loop",
	shuffle: "shuffle2",
	library: "library_music",
	audioTrack: "audiotrack",
	volume: "volume",
	volumeDown: "volume_down",
	volumeUp: "volume_up",
	mute: "mute",
	prev5: "replay_5",
	next5: "forward_5",
	prev10: "replay_10",
	next10: "forward_10",
	prev15: "replay_15",
	next15: "forward_15",
	add: "add",
	fave: "favorite",
	unFave: "favorite_outline",
};

const PlayButton = ({ handlePlay }) => {
	return (
		<button type="button" onClick={handlePlay} className={styles.PlayButton}>
			<svg className={styles.PlayButton_icon}>
				<use xlinkHref={`${sprite}#icon-play_arrow`}></use>
			</svg>
		</button>
	);
};

const PauseButton = ({ handlePause }) => {
	return (
		<button type="button" onClick={handlePause} className={styles.PauseButton}>
			<svg className={styles.PauseButton_icon}>
				<use xlinkHref={`${sprite}#icon-pause1`}></use>
			</svg>
		</button>
	);
};

const PrimaryButton = ({ icon, handleClick }) => {
	return (
		<button
			type="button"
			onClick={handleClick}
			className={styles.PrimaryButton}
		>
			<svg className={styles.PrimaryButton_icon}>
				<use xlinkHref={`${sprite}#icon-${ICONS[icon]}`}></use>
			</svg>
		</button>
	);
};

const SecondaryButton = ({ icon, handleClick }) => {
	return (
		<button
			type="button"
			onClick={handleClick}
			className={styles.SecondaryButton}
		>
			<svg className={styles.SecondaryButton_icon}>
				<use xlinkHref={`${sprite}#icon-${ICONS[icon]}`}></use>
			</svg>
		</button>
	);
};

const AncillaryButton = ({ icon, handleClick }) => {
	return (
		<button
			ype="button"
			onClick={handleClick}
			className={styles.AncillaryButton}
		>
			<svg className={styles.AncillaryButton_icon}>
				<use xlinkHref={`${sprite}#icon-${ICONS[icon]}`}></use>
			</svg>
		</button>
	);
};

const HeartButton = ({ isFavorite = false, handleFave }) => {
	return (
		<button onClick={handleFave} className={styles.HeartButton}>
			<svg
				className={styles.HeartButton_icon}
				style={isFavorite ? { fill: "red" } : {}}
			>
				<use
					xlinkHref={`${sprite}#icon-${
						isFavorite ? ICONS["fave"] : ICONS["unFave"]
					}`}
				></use>
			</svg>
		</button>
	);
};

type ControlsProps = {
	isPlaying: boolean;
	isMuted: boolean;
	handlePlay: () => void;
	handlePause: () => void;
	controlsHandler: () => void;
};

const AudioPlayerControls = ({
	isPlaying = false,
	isMuted = false,
	isFavorite = false,
	handlePlay,
	handlePause,
	handleFave,
	handleDownload,
	handleNextTrack,
	handlePrevTrack,
}) => {
	return (
		<div className={styles.AudioPlayerControls}>
			<div className={styles.AudioPlayerControls_inner}>
				{/* SCRUB BACK 10s */}
				<SecondaryButton
					key="SCRUB_BACK_10s"
					icon="prev10"
					// handleClick={() => controlsHandler("SCRUB_BACK_10s")}
				/>
				{/* PREV TRACK */}
				<SecondaryButton
					key="PREV_TRACK"
					icon="skipPrev"
					handleClick={handlePrevTrack}
				/>
				{/* PLAY/PAUSE */}
				{isPlaying ? (
					<PauseButton handlePause={handlePause} />
				) : (
					<PlayButton handlePlay={handlePlay} />
				)}
				{/* <PlayButton /> */}
				{/* NEXT TRACK */}
				<SecondaryButton
					key="NEXT_TRACK"
					icon="skipNext"
					handleClick={handleNextTrack}
				/>
				{/* SCRUB FORWARD 10s */}
				<SecondaryButton
					key="SCRUB_FORWARD_10s"
					icon="next10"
					// handleClick={() => controlsHandler("SCRUB_FORWARD_10s")}
				/>
			</div>
			<div className={styles.AudioPlayerControls_bottom}>
				<AncillaryButton
					key="LOOP"
					icon="loop"
					// handleClick={() => controlsHandler("LOOP")}
				/>
				<HeartButton
					key="TOGGLE_FAVE"
					isFavorite={isFavorite}
					handleFave={handleFave}
				/>
			</div>
		</div>
	);
};

export default AudioPlayerControls;

AudioPlayerControls.defaultProps = {};

AudioPlayerControls.propTypes = {};
