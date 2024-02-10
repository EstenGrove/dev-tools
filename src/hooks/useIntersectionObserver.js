import { useRef, useState, useCallback } from "react";

const useIntersectionObserver = ({
	threshold = 1,
	root = null,
	rootMargin = "0px",
}) => {
	const [entry, setEntry] = useState(null);
	const prevObserver = useRef(null);
	const currentEntryRef = useCallback(
		(node) => {
			// if previous observer exists, reset it
			if (prevObserver.current) {
				prevObserver.current.disconnect();
				prevObserver.current = null;
			}

			// if 'node' is an actual DOM element node, then attach an observer to it
			if (node?.nodeType === Node.ELEMENT_NODE) {
				const observer = new IntersectionObserver(
					([entry]) => {
						setEntry(entry);
					},
					{ threshold, root, rootMargin }
				);

				// connect observer to 'node'
				// ...then set prevObserver to our current one to prepare for next cycle (if applicable)
				observer.observe(node);
				prevObserver.current = observer;
			}
		},
		[root, rootMargin, threshold]
	);

	return { entryRef: currentEntryRef, entry: entry };
};

export { useIntersectionObserver };
