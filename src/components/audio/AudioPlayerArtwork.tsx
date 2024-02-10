import React, { ReactNode } from "react";
import styles from "../../css/audio/AudioPlayerArtwork.module.scss";
import sprite from "../../assets/icons/audio.svg";
import { IMetaData, ITrack } from "../../utils/utils_audio";

const Fallback = () => {
	return (
		<svg className={styles.Fallback}>
			<use xlinkHref={`${sprite}#icon-library_music`}></use>
		</svg>
	);
};
const TrackArt = ({ title, artSrc }) => {
	return (
		<div data-id="artWork" className={styles.TrackArt}>
			<img src={artSrc} alt={title} className={styles.TrackArt_img} />
		</div>
	);
};

type ArtworkProps = {
	title: keyof ITrack;
	artSrc: keyof ITrack;
};

// img or icon fallback
const AudioArtwork = ({ title, artSrc }: ArtworkProps) => {
	return (
		<div className={styles.AudioArtwork}>
			{artSrc ? <TrackArt title={title} artSrc={artSrc} /> : <Fallback />}
		</div>
	);
};

type DetailsProps = {
	title: keyof ITrack;
	artist: keyof ITrack;
};

const AudioDetails = ({ title, artist }: DetailsProps) => {
	return (
		<div className={styles.AudioDetails}>
			<div className={styles.AudioDetails_artist}>{artist}</div>
			<h2 className={styles.AudioDetails_title}>{title}</h2>
		</div>
	);
};

type PlayerArtworkProps = {
	track: ITrack;
	metaData: IMetaData;
};

const AudioPlayerArtwork = ({ track, metaData }): ReactNode => {
	const { artSrc, title, artist } = track;
	const { formattedDuration } = metaData;

	return (
		<div className={styles.AudioPlayerArtwork}>
			<div className={styles.AudioPlayerArtwork_albumArt}>
				<AudioArtwork title={title} artSrc={artSrc} />
			</div>
			<div className={styles.AudioPlayerArtwork_albumDetails}>
				<AudioDetails title={title} artist={artist} />
			</div>
		</div>
	);
};

export default AudioPlayerArtwork;

AudioPlayerArtwork.defaultProps = {};

AudioPlayerArtwork.propTypes = {};
