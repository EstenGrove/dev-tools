import React from "react";
import styles from "../../css/audio/AudioPlayerSettings.module.scss";
import sprite from "../../assets/icons/general.svg";

// AUDIO PLAYER SETTINGS:
// - NAVIGATE BACK (eg. close this track's window)
// - OPTIONS MENU (3-dots on the right):
//    - Download track
//    - Share track

const AudioPlayerSettings = () => {
	return (
		<div className={styles.AudioPlayerSettings}>
			<div className={styles.AudioPlayerSettings_inner}>
				<button className={styles.AudioPlayerSettings_inner_nav}>
					<svg className={styles.AudioPlayerSettings_inner_nav_icon}>
						<use xlinkHref={`${sprite}#icon-chevron-down`}></use>
					</svg>
				</button>
				<button className={styles.AudioPlayerSettings_inner_options}>
					<svg className={styles.AudioPlayerSettings_inner_options_icon}>
						<use xlinkHref={`${sprite}#icon-dots-three-vertical`}></use>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default AudioPlayerSettings;
