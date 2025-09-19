"use client";

import { useEffect, useRef, useState } from "react";

interface FancyFadeInProps {
	delay?: number;
	children: React.ReactNode;
	className?: string;
}

// Enhanced animated fade-in with scale and blur
const FancyFadeIn: React.FC<FancyFadeInProps> = ({
	delay = 0,
	children,
	className = "",
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const [show, setShow] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		let timeout: NodeJS.Timeout | null = null;

		const observer = new window.IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					timeout = setTimeout(() => setShow(true), delay);
				} else {
					setShow(false);
					if (timeout) clearTimeout(timeout);
				}
			},
			{ threshold: 0.2 }
		);

		observer.observe(node);

		return () => {
			observer.disconnect();
			if (timeout) clearTimeout(timeout);
		};
	}, [delay]);

	return (
		<div
			ref={ref}
			style={{
				opacity: show ? 1 : 0,
				transform: show
					? "scale(1) translateY(0)"
					: "scale(0.95) translateY(60px)",
				filter: show ? "blur(0px)" : "blur(8px)",
				transition:
					"opacity 0.8s cubic-bezier(.4,0,.2,1), transform 0.8s cubic-bezier(.4,0,.2,1), filter 0.7s cubic-bezier(.4,0,.2,1)",
			}}
			className={className}
		>
			{children}
		</div>
	);
};

export default FancyFadeIn;
