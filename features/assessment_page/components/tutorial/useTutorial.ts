import { useState, useCallback, useEffect } from 'react';

interface TutorialStep {
	title: string;
	content: string;
	icon: string;
	targetSelector?: string;
	targetRef?: React.RefObject<HTMLDivElement>;
}

interface UseTutorialProps {
	hasFeedback: boolean;
	forExport: boolean;
	trRef: React.RefObject<HTMLDivElement>;
	isFeedbackModalOpen: boolean;
	onFeedbackClick: (title: string, criterion: string) => void;
}

export const useTutorial = ({
	hasFeedback,
	forExport,
	trRef,
	isFeedbackModalOpen,
	onFeedbackClick
}: UseTutorialProps) => {
	const [showTutorial, setShowTutorial] = useState(false);
	const [tutorialStep, setTutorialStep] = useState(0);
	const [tutorialPosition, setTutorialPosition] = useState({ top: 0, left: 0 });
	const [tutorialSkipped, setTutorialSkipped] = useState(false);

	const tutorialSteps: TutorialStep[] = [
		{
			title: "Click on Task Response",
			content: "Click on the highlighted Task Response criterion to view detailed feedback with 3 sections.",
			icon: "👆",
			targetRef: trRef
		},
		{
			title: "View Your Strengths",
			content: "This section highlights what you did well in your Task Response. Look for positive feedback about your content and ideas.",
			icon: "💪",
			targetSelector: '[data-feedback-section="strengths"]'
		},
		{
			title: "Areas for Improvement",
			content: "This section identifies specific aspects that need more work. Pay attention to these areas for better scores.",
			icon: "🎯",
			targetSelector: '[data-feedback-section="improvements"]'
		},
		{
			title: "Actionable Suggestions",
			content: "This section provides practical tips to improve your writing. Follow these suggestions for better IELTS scores.",
			icon: "💡",
			targetSelector: '[data-feedback-section="suggestions"]'
		}
	];

	const updatePosition = useCallback(() => {
		const currentStep = tutorialSteps[tutorialStep];
		let element: Element | null = null;

		if (currentStep.targetRef?.current) {
			element = currentStep.targetRef.current;
		} else if (currentStep.targetSelector) {
			element = document.querySelector(currentStep.targetSelector);
		}

		if (element) {
			const rect = element.getBoundingClientRect();
			setTutorialPosition({
				top: rect.top + window.scrollY,
				left: Math.min(rect.right + 20, window.innerWidth - 400)
			});
		}
	}, [tutorialStep]);

	// Show tutorial when feedback available (only first time)
	useEffect(() => {
		if (hasFeedback && !forExport && !tutorialSkipped && !showTutorial) {
			setShowTutorial(true);
			setTutorialStep(0);
		}
	}, [hasFeedback, forExport, tutorialSkipped, showTutorial]);

	// Update position when step or modal changes
	useEffect(() => {
		if (!showTutorial) return;

		if (tutorialStep === 0 || (isFeedbackModalOpen && tutorialStep > 0)) {
			setTimeout(updatePosition, 100);
		}
	}, [showTutorial, tutorialStep, isFeedbackModalOpen, updatePosition]);

	// Handle Task Response click - LUÔN hoạt động khi đang ở step 0
	const handleTaskResponseClick = useCallback(() => {
		if (showTutorial && tutorialStep === 0 && hasFeedback) {
			onFeedbackClick('Task Response', 'Task Response');
			setTutorialStep(1);
		}
	}, [showTutorial, tutorialStep, hasFeedback, onFeedbackClick]);

	// Skip tutorial
	const skipTutorial = useCallback(() => {
		setShowTutorial(false);
		setTutorialSkipped(true);
	}, []);

	// Auto-advance on click
	useEffect(() => {
		if (!showTutorial || tutorialStep === 0) return;

		const handleClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const currentStep = tutorialSteps[tutorialStep];

			if (currentStep.targetSelector) {
				const element = document.querySelector(currentStep.targetSelector);
				if (element?.contains(target)) {
					if (tutorialStep < tutorialSteps.length - 1) {
						setTutorialStep(tutorialStep + 1);
					} else {
						setShowTutorial(false);
					}
				}
			}
		};

		document.addEventListener('click', handleClick);
		return () => document.removeEventListener('click', handleClick);
	}, [showTutorial, tutorialStep]);

	const getHighlightStyle = useCallback((stepIndex: number) => {
		if (!showTutorial || tutorialStep !== stepIndex) return {};
		return {
			boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)',
			transform: 'scale(1.02)',
			transition: 'all 0.3s ease',
			zIndex: 10
		};
	}, [showTutorial, tutorialStep]);

	return {
		showTutorial,
		tutorialStep,
		tutorialSteps,
		tutorialPosition,
		handleTaskResponseClick,
		skipTutorial,
		getHighlightStyle
	};
};
