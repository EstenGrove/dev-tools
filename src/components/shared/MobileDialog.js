import React, { useEffect, useRef } from "react";
import styles from "../../css/shared/MobileDialog.module.scss";
import sprite from "../../assets/icons/general.svg";
import { PropTypes } from "prop-types";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useKeyboardShortcut } from "../../hooks/useKeyboardShortcut";

const MobileDialog = ({ title, closeDialog, children }) => {
	const dialogRef = useRef();
	const { isOutside } = useOutsideClick(dialogRef);
	const wasEscaped = useKeyboardShortcut(["Escape"]);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		if (isOutside || wasEscaped) {
			closeDialog();
		}

		return () => {
			isMounted = false;
		};
	}, [closeDialog, isOutside, wasEscaped]);

	return (
		<aside className={styles.MobileDialog} ref={dialogRef}>
			<div className={styles.MobileDialog_top}>
				<div className={styles.MobileDialog_top_title}>{title}</div>
				<div className={styles.MobileDialog_top_close} onClick={closeDialog}>
					<svg className={styles.MobileDialog_top_close_icon}>
						<use xlinkHref={`${sprite}#icon-clear`}></use>
					</svg>
				</div>
			</div>
			<div className={styles.MobileDialog_inner}>{children}</div>
		</aside>
	);
};

export default MobileDialog;

MobileDialog.defaultProps = {};

MobileDialog.propTypes = {};
