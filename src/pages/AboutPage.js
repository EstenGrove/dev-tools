import React from "react";
import styles from "../css/pages/AboutPage.module.scss";
import { PropTypes } from "prop-types";
import art1 from "../assets/images/artwork-artist-1.jpg";
import art2 from "../assets/images/artwork-artist--2.jpg";
import art3 from "../assets/images/avicii.webp";
// audio
import sample1 from "../assets/audio/SmoothGTR-1.mp3";
import sample2 from "../assets/audio/audio-sample-2.mp3";
import sample3 from "../assets/audio/thud-1.mp3";

// components
import AudioPlayer from "../components/audio/AudioPlayer.tsx";
import AudioWaveform from "../components/audio/AudioWaveform.js";

const mockTracks = [
	{
		id: 1,
		src: sample1,
		title: "We Keep Movin'",
		artist: "Lil' Momo",
		artSrc: art3,
		// artSrc: null,
	},
	{
		id: 2,
		src: sample2,
		title: "It's Our Life",
		artist: "Plexy Arias",
		artSrc: art2,
		// artSrc: null,
	},
	{
		id: 3,
		src: sample3,
		title: "Tru1sm",
		artist: "The Average Accolades",
		artSrc: art1,
		// artSrc: null,
	},
];
const mockTracks2 = [
	{
		id: 1,
		src: "MY-SOURCE",
		title: "We Keep Movin'",
		artist: "Lil' Momo",
		artSrc: "some-source",
		// artSrc: null,
	},
	{
		id: 2,
		src: "ANOTHER-SRC",
		title: "The World's Changing Already",
		artist: "Plexy",
		artSrc: "new-source",
		// artSrc: null,
	},
];

const AboutPage = () => {
	return (
		<div className={styles.AboutPage}>
			<h1 className={styles.AboutPage_title}>About</h1>
			<div className={styles.AboutPage_inner}>
				<AudioPlayer tracks={mockTracks} />
			</div>
			{/* <div className={styles.AboutPage_inner2}> */}
			{/* <AudioWaveform audioSrc={mockTracks?.[0]?.src} /> */}
			{/* </div> */}
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default AboutPage;

AboutPage.defaultProps = {};

AboutPage.propTypes = {};
