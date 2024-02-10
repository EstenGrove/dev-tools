import React, { useState, useEffect } from "react";
import styles from "../css/pages/ToolsPage.module.scss";
import { PropTypes } from "prop-types";
import ColorPreview from "../components/color-converter/ColorPreview";
import ColorPicker from "../components/color-picker/ColorPicker";
import ColorCodeCycler from "../components/tools/ColorCodeCycler";
import BoxShadowPreview from "../components/box-shadow/BoxShadowPreview";
import BoxShadowGenerator from "../components/box-shadow/BoxShadowGenerator";
import MobileDialog from "../components/shared/MobileDialog";
import MobileBoxShadowGenerator from "../components/box-shadow/MobileBoxShadowGenerator";
import PopClick from "../components/audio/PopClick";
import AudioPlayer from "../components/audio/AudioPlayer.tsx";

// const colors = [
// 	"rgb(124, 58, 237)",
// 	"hsl(262, 83%, 58%)",
// 	"hsl(262, 73%, 58%)",
// 	"hsl(262, 63%, 58%)",
// 	"hsl(262, 53%, 58%)",
// ];
const colors = ["#7c3aed", "#7c3bed", "#7f46e2", "#8250d7", "#855bcd"];

const ToolsPage = () => {
	const [showMobileDialog, setShowMobileDialog] = useState(false);

	const checkServerStatus = async () => {
		const endpoint = "/status";
		let url = `http://localhost:5000${endpoint}`;
		url += "?id=" + 3;
		try {
			const req = await fetch(url);
			const res = await req.json();
			console.log("res", res);
			return res;
		} catch (error) {
			console.log(`ERROR:`, error);
			return error;
		}
	};

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		// checkServerStatus();

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className={styles.ToolsPage}>
				<h1 className={styles.ToolsPage_title}>Tools</h1>

				<div className={styles.ToolsPage_content}>
					<BoxShadowGenerator />
					{/* <MobileBoxShadowGenerator /> */}
				</div>
				<div className={styles.ToolsPage_content}>{/* <AudioPlayer /> */}</div>
				<button type="button" onClick={() => setShowMobileDialog(true)}>
					Show Mobile Dialog
				</button>
				<PopClick />
			</div>

			{showMobileDialog && (
				<MobileDialog closeDialog={() => setShowMobileDialog(false)}>
					{/*  */}
				</MobileDialog>
			)}
		</>
	);
};

export default ToolsPage;

ToolsPage.defaultProps = {};

ToolsPage.propTypes = {};
