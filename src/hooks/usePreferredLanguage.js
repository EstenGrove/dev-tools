import { useSyncExternalStore } from "react";

const usePreferredLanguageSubscribe = (cb) => {
	window.addEventListener("languagechange", cb);
	return () => window.removeEventListener("languagechange", cb);
};

const getPreferredLanguageSnapshot = () => {
	return navigator.language;
};

const getPreferredLanguageServerSnapshot = () => {
	throw Error("usePreferredLanguage is a client-only hook");
};

const usePreferredLanguage = () => {
	return useSyncExternalStore(
		usePreferredLanguageSubscribe,
		getPreferredLanguageSnapshot,
		getPreferredLanguageServerSnapshot
	);
};

export { usePreferredLanguage };
