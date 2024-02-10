import React, {
	useState,
	useRef,
	ReactNode,
	useEffect,
	useCallback,
} from "react";
import styles from "../../css/audio/AudioPlayer.module.scss";
import {
	Base64,
	IMetaData,
	ITrack,
	TArtist,
	TAudioBuffer,
	TAudioPlayerSrc,
	getAudioBufferFromBlob,
	identity,
} from "../../utils/utils_audio.ts";
import { formatDuration } from "../../utils/utils_dates.ts";
// components
import AudioPlayerControls from "./AudioPlayerControls.tsx";
import AudioPlayerArtwork from "./AudioPlayerArtwork.tsx";
import AudioPlayerSettings from "./AudioPlayerSettings.tsx";

// type TArtist = string | "Unknown";

// interface ITrack {
// 	src: TAudioPlayerSrc;
// 	title: string;
// 	artist: TArtist;
// }

// ONLY used when we need to fetch the metaData
type TBlob = Request | URL | Base64;

const getMetaData = async (src: TBlob): Promise<AudioBuffer> => {
	const audioBuffer = await getAudioBufferFromBlob(src);
	return audioBuffer;
};

type AudioPlayerProps = {
	tracks: ITrack[];
};

const AudioPlayer = ({ tracks }): ReactNode => {
	const audioRef = useRef<HTMLAudioElement>(null);
	const [isMuted, setIsMuted] = useState<boolean>(false);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [favorites, setFavorites] = useState<number[]>([]);
	const [currentTrack, setCurrentTrack] = useState(tracks[0]);
	const [trackProgress, setTrackProgress] = useState<number>(0);
	const [audioBuffer, setAudioBuffer] = useState<TAudioBuffer>(null);
	// contains formatted duration/track-length & audio-buffer
	const [metaData, setMetaData] = useState<IMetaData>({
		length: 0,
		duration: 0,
		numberOfChannels: 0,
		sampleRate: 0,
		formattedDuration: "00:00",
	});
	// fetch meta data via audio buffer source & returns custom metaData object
	const getMetaInfo = useCallback(() => {
		const getAudioBuffer = async () => {
			const buffer = await getMetaData(currentTrack.src);
			setMetaData({
				length: buffer?.length,
				duration: buffer?.duration,
				numberOfChannels: buffer?.numberOfChannels,
				sampleRate: buffer?.sampleRate,
				formattedDuration: formatDuration(buffer?.duration),
			});
			setAudioBuffer(buffer);
		};
		return getAudioBuffer();
	}, [currentTrack?.src]);

	const handlePlay = () => {
		if (audioRef.current) {
			audioRef.current.play();
			setIsPlaying(true);
		}
	};
	const handlePause = () => {
		if (audioRef.current) {
			audioRef.current.pause();
			setIsPlaying(false);
		}
	};

	const handleDownload = () => {
		// opened from within 3-dots
	};

	const handleFave = () => {
		const { id: selectedID } = currentTrack;
		// remove selection, if already selected
		if (favorites.includes(selectedID)) {
			const newList = favorites.filter((x) => x !== selectedID);
			return setFavorites(newList);
		}

		setFavorites([...favorites, selectedID]);
	};

	const handleNextTrack = () => {
		const currentIdx: number = tracks.findIndex(
			(x: ITrack) => x.id === currentTrack.id
		);
		const next = currentIdx + 1;
		const nextIdx = next >= tracks.length ? 0 : next;
		const newCurrentTrack: ITrack = tracks[nextIdx];
		setCurrentTrack(newCurrentTrack);
	};
	const handlePrevTrack = () => {
		const currentIdx = tracks.findIndex(
			(x: ITrack) => x.id === currentTrack.id
		);
		const prev = currentIdx - 1;
		const prevIdx = prev < 0 ? tracks.length - 1 : prev;
		const newCurrentTrack: ITrack = tracks[prevIdx];
		setCurrentTrack(newCurrentTrack);
	};

	// fetch metaData from an audio buffer when 'src' changes
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		if (currentTrack.src) {
			getMetaInfo();
		}

		return () => {
			isMounted = false;
		};
	}, [currentTrack.src, getMetaInfo]);

	return (
		<div className={styles.AudioPlayer}>
			<audio
				ref={audioRef}
				src={currentTrack.src}
				style={{ display: "none" }}
			></audio>
			<AudioPlayerSettings />
			<AudioPlayerArtwork track={currentTrack} metaData={metaData} />
			<AudioPlayerControls
				isFavorite={favorites.includes(currentTrack.id)}
				isPlaying={isPlaying}
				isMuted={isMuted}
				handlePlay={handlePlay}
				handlePause={handlePause}
				handleFave={handleFave}
				handleDownload={handleDownload}
				handleNextTrack={handleNextTrack}
				handlePrevTrack={handlePrevTrack}
			/>
		</div>
	);
};

export default AudioPlayer;

AudioPlayer.defaultProps = {};

AudioPlayer.propTypes = {};
