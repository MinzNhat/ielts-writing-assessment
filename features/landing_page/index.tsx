"use client";

import { useEffect, useRef, useState } from "react";

// Import new components
import FancyFadeIn from "./components/FancyFadeIn";
import HeroSection from "./components/HeroSection";
import HowItWorksSection from "./components/HowItWorksSection";
import TestimonialsSection from "./components/TestimonialsSection";
import CallToActionSection from "./components/CallToActionSection";
import { testimonials, steps } from "./components/data";
import Footer from "./components/Footer";
const LandingPage = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [currentStepIndex, setCurrentStepIndex] = useState(0);
	const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

	// Touch gestures for sliders
	const [touchStart, setTouchStart] = useState(0);
	const [touchEnd, setTouchEnd] = useState(0);

	const handleTouchStart = (e: React.TouchEvent) => {
		setTouchStart(e.targetTouches[0].clientX);
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		setTouchEnd(e.targetTouches[0].clientX);
	};

	const handleTouchEnd = (type: 'steps' | 'testimonials') => {
		if (!touchStart || !touchEnd) return;

		const distance = touchStart - touchEnd;
		const isLeftSwipe = distance > 50;
		const isRightSwipe = distance < -50;

		if (type === 'steps') {
			if (isLeftSwipe && currentStepIndex < steps.length - 1) {
				setCurrentStepIndex(currentStepIndex + 1);
			}
			if (isRightSwipe && currentStepIndex > 0) {
				setCurrentStepIndex(currentStepIndex - 1);
			}
		} else {
			if (isLeftSwipe && currentTestimonialIndex < testimonials.length - 1) {
				setCurrentTestimonialIndex(currentTestimonialIndex + 1);
			}
			if (isRightSwipe && currentTestimonialIndex > 0) {
				setCurrentTestimonialIndex(currentTestimonialIndex - 1);
			}
		}
	};

	// Auto-scroll for steps slider
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentStepIndex((prev) => (prev + 1) % steps.length);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	// Auto-scroll for testimonials slider
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
		}, 2500);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		let isScrolling = false;
		let scrollTimeout: NodeJS.Timeout;

		const handleWheel = (e: WheelEvent) => {
			e.preventDefault();

			if (isScrolling) return;

			isScrolling = true;
			const sections = container.children;
			const currentScrollTop = container.scrollTop;
			const sectionHeight = container.clientHeight;
			const currentSection = Math.round(currentScrollTop / sectionHeight);

			let targetSection = currentSection;

			if (e.deltaY > 0) {
				// Scroll down
				targetSection = Math.min(currentSection + 1, sections.length - 1);
			} else {
				// Scroll up
				targetSection = Math.max(currentSection - 1, 0);
			}

			container.scrollTo({
				top: targetSection * sectionHeight,
				behavior: 'smooth'
			});

			clearTimeout(scrollTimeout);
			scrollTimeout = setTimeout(() => {
				isScrolling = false;
			}, 800);
		};

		const handleTouchStart = (e: TouchEvent) => {
			const startY = e.touches[0].clientY;

			const handleTouchMove = (e: TouchEvent) => {
				e.preventDefault();
			};

			const handleTouchEnd = (e: TouchEvent) => {
				const endY = e.changedTouches[0].clientY;
				const deltaY = startY - endY;

				if (Math.abs(deltaY) > 50) {
					const sections = container.children;
					const currentScrollTop = container.scrollTop;
					const sectionHeight = container.clientHeight;
					const currentSection = Math.round(currentScrollTop / sectionHeight);

					let targetSection = currentSection;

					if (deltaY > 0) {
						// Swipe up (scroll down)
						targetSection = Math.min(currentSection + 1, sections.length - 1);
					} else {
						// Swipe down (scroll up)
						targetSection = Math.max(currentSection - 1, 0);
					}

					container.scrollTo({
						top: targetSection * sectionHeight,
						behavior: 'smooth'
					});
				}

				container.removeEventListener('touchmove', handleTouchMove);
				container.removeEventListener('touchend', handleTouchEnd);
			};

			container.addEventListener('touchmove', handleTouchMove, { passive: false });
			container.addEventListener('touchend', handleTouchEnd);
		};

		container.addEventListener('wheel', handleWheel, { passive: false });
		container.addEventListener('touchstart', handleTouchStart);

		return () => {
			container.removeEventListener('wheel', handleWheel);
			container.removeEventListener('touchstart', handleTouchStart);
			clearTimeout(scrollTimeout);
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className="overflow-hidden"
			style={{
				height: 'calc(100vh - 118px)',
				scrollSnapType: 'y mandatory',
				scrollBehavior: 'smooth'
			}}
		>
			{/* Page 1: Hero Section */}
			<HeroSection />

			{/* Page 2: How It Works */}
			<HowItWorksSection
				currentStepIndex={currentStepIndex}
				setCurrentStepIndex={setCurrentStepIndex}
				handleTouchStart={handleTouchStart}
				handleTouchMove={handleTouchMove}
				handleTouchEnd={handleTouchEnd}
			/>

			{/* Page 3: Testimonials */}
			<TestimonialsSection
				currentTestimonialIndex={currentTestimonialIndex}
				setCurrentTestimonialIndex={setCurrentTestimonialIndex}
				handleTouchStart={handleTouchStart}
				handleTouchMove={handleTouchMove}
				handleTouchEnd={handleTouchEnd}
			/>

			{/* Page 4: Call to Action */}
			<CallToActionSection />

			<Footer />
		</div>
	);
};

export default LandingPage;
