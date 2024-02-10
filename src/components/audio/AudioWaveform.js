import React, { useRef, useState, useEffect, useCallback } from "react";
import styles from "../../css/audio/AudioWaveform.module.scss";
import { blobToArrayBuffer } from "../../utils/utils_audio.ts";

// REQUIRES ARRAY-BUFFER FORMAT
// - Resources:
// 	- https://stackoverflow.com/questions/66776487/how-to-convert-mp3-to-the-sound-wave-image-using-javascript
// 	- https://tchryssos.medium.com/building-an-audio-waveform-progress-bar-with-react-for-quadio-132223928b14

const margin = 10;
const chunkSize = 50;

const getArrayBufferFromSrc = async (audioSrc) => {
	try {
		const res = await fetch(audioSrc);
		const buffer = await res.arrayBuffer();
		// setBufferSrc(buffer);
		return buffer;
	} catch (error) {
		return error;
	}
};

const AudioWaveform = ({ audioSrc }) => {
	// const audioCtx = useRef(null);
	const [canvasRef, setCanvasRef] = useState(null);
	const [bufferSrc, setBufferSrc] = useState(null);
	// waveform drawing fn()
	const drawCaller = useCallback(
		(canvas, canvasCtx) => {
			const drawToCanvas = async () => {
				const audioCtx = new AudioContext();
				const buffer = !bufferSrc
					? await getArrayBufferFromSrc(audioSrc)
					: bufferSrc;
				const audioBuffer = await audioCtx?.decodeAudioData(buffer);
				const float32Array = audioBuffer.getChannelData(0);

				const width = canvas?.width ?? "100%";
				const height = canvas?.height ?? "100%";

				// const canvasCtx = canvasRef.getContext("2d");
				const centerHeight = Math.ceil(height / 2);
				const scaleFactor = (height - margin * 2) / 2;

				const array = [];

				let i = 0;
				const length = float32Array.length;
				while (i < length) {
					array.push(
						float32Array.slice(i, (i += chunkSize)).reduce((total, value) => {
							return Math.max(total, Math.abs(value));
						})
					);
				}

				const waveWidth = Math.ceil(
					float32Array.length / chunkSize + margin * 2
				);
				const canvasWidth = waveWidth / width;
				// canvas.width = waveWidth * 0.05;
				canvas.width = waveWidth;

				for (let index in array) {
					canvasCtx.strokeStyle = "black";
					canvasCtx.beginPath();
					canvasCtx.moveTo(
						margin + Number(index),
						centerHeight - array[index] * scaleFactor
					);
					canvasCtx.lineTo(
						margin + Number(index),
						centerHeight + array[index] * scaleFactor
					);
					canvasCtx.stroke();
				}
			};
			return drawToCanvas();
		},
		[audioSrc, bufferSrc]
	);
	// }, [audioSrc, bufferSrc, canvasRef]);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		if (canvasRef) {
			const canvas = canvasRef;
			const context = canvas?.getContext("2d");
			drawCaller(canvas, context);
		}

		return () => {
			isMounted = false;
		};
	}, [canvasRef, drawCaller]);

	return (
		<div className={styles.AudioWaveform}>
			<canvas
				ref={(newRef) => setCanvasRef(newRef)}
				width={400}
				height={100}
				className={styles.AudioWaveform_canvas}
			></canvas>
		</div>
	);
};

export default AudioWaveform;

AudioWaveform.defaultProps = {};

AudioWaveform.propTypes = {};
