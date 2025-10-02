"use client";

import React, { useState, useEffect } from 'react';
import { Divider } from "@heroui/divider";
import { Button } from "@heroui/button";
import { Onborda, OnbordaProvider, useOnborda } from "onborda";
import type { CardComponentProps } from "onborda";

// Internal imports
import { ScoreResult } from './shared';
import { ScoreCard } from './scoring';
import { FeedbackModal } from './feedback';

// Custom Tutorial Card Component
const TutorialCard: React.FC<CardComponentProps> = ({
	step,
	currentStep,
	totalSteps,
	nextStep,
	prevStep,
	arrow,
}) => {
	const { closeOnborda } = useOnborda();

	const handleSkip = () => {
		localStorage.setItem('ielts-tutorial-seen', 'true');
		closeOnborda();
	};

	const handleNext = () => {
		console.log('Next button clicked, nextStep type:', typeof nextStep);
		if (typeof nextStep === 'function') {
			nextStep();
		} else {
			console.error('nextStep is not a function:', nextStep);
		}
	};

	// Listen for custom event to advance tutorial (for Task Response click)
	useEffect(() => {
		const handleAdvanceTutorial = () => {
			console.log('Received advance tutorial event, nextStep type:', typeof nextStep);
			if (typeof nextStep === 'function') {
				nextStep();
			} else {
				console.error('nextStep is not a function in event handler:', nextStep);
			}
		};

		window.addEventListener('advance-tutorial', handleAdvanceTutorial);
		return () => window.removeEventListener('advance-tutorial', handleAdvanceTutorial);
	}, [nextStep]);

	const isLastStep = currentStep + 1 === totalSteps;
	const isFirstStep = currentStep === 0;
	const showNextButton = !isFirstStep && !isLastStep; // Show Next only for steps 1-2 (Strengths, Improvements)

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 w-[500px] relative z-[100000]">
			<div className="flex items-center gap-3 mb-3">
				<div className="text-2xl flex-shrink-0">{step.icon}</div>
				<div className="flex-1 min-w-0">
					<h3 className="text-base font-semibold text-gray-900 dark:text-white mb-0.5">
						{step.title}
					</h3>
					<p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
						{step.content}
					</p>
				</div>
				<div className="flex gap-2 flex-shrink-0">
					{showNextButton && (
						<Button
							color="primary"
							size="sm"
							onClick={handleNext}
						>
							Next
						</Button>
					)}
					<Button
						color={isLastStep ? "primary" : "default"}
						size="sm"
						variant={isLastStep ? "solid" : "flat"}
						onClick={handleSkip}
					>
						{isLastStep ? 'Finish' : 'Skip'}
					</Button>
				</div>
			</div>
			<div className="text-xs text-gray-500 text-center">
				{currentStep + 1} / {totalSteps}
			</div>
			{arrow}
		</div>
	);
};

interface ResultsDisplayProps {
	result: ScoreResult;
	forExport?: boolean;
}

const ResultsDisplayContent: React.FC<ResultsDisplayProps> = ({ result, forExport = false }) => {
	// State management
	const [selectedFeedback, setSelectedFeedback] = useState<{ title: string; feedback: any } | null>(null);
	const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
	const { startOnborda, currentStep } = useOnborda();

	// Feedback handlers
	const handleFeedbackClick = (title: string, criterion: string) => {
		if (!result.feedback) return;

		const feedbackData = result.feedback[criterion as keyof typeof result.feedback];
		if (feedbackData) {
			setSelectedFeedback({ title, feedback: feedbackData });
			setIsFeedbackModalOpen(true);

			// Auto-advance tutorial to modal steps when Task Response modal opens
			if (criterion === 'Task Response') {
				const hasSeenTutorial = localStorage.getItem('ielts-tutorial-seen');
				console.log('Task Response clicked, tutorial state:', {
					hasSeenTutorial,
					currentStep,
					willAdvance: !hasSeenTutorial && currentStep === 0
				});

				if (!hasSeenTutorial && currentStep === 0) {
					// Wait for modal to render before advancing to next step
					setTimeout(() => {
						console.log('Dispatching advance-tutorial event');
						window.dispatchEvent(new CustomEvent('advance-tutorial'));
					}, 300);
				}
			}
		}
	};

	const closeFeedbackModal = () => {
		setIsFeedbackModalOpen(false);
		setSelectedFeedback(null);
	};

	// Start tutorial when feedback is available
	useEffect(() => {
		if (result.feedback && !forExport) {
			const hasSeenTutorial = localStorage.getItem('ielts-tutorial-seen');
			console.log('Tutorial check:', {
				hasFeedback: !!result.feedback,
				forExport,
				hasSeenTutorial,
				willStartTutorial: !hasSeenTutorial
			});
			if (!hasSeenTutorial) {
				setTimeout(() => {
					console.log('Starting tutorial: ielts-feedback-tour');
					startOnborda("ielts-feedback-tour");
				}, 500);
			}
		}
	}, [result.feedback, forExport, startOnborda]);



	// Export version - clean styling without tutorial
	if (forExport) {
		return (
			<div className="space-y-8 p-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-[600px] border-4 border-blue-200 rounded-2xl shadow-2xl">
				<div className="text-center mb-8">
					<div className="text-6xl font-black text-blue-600 mb-4">
						IELTS Assessment Results
					</div>
					<div className="text-lg text-gray-600 font-medium">
						Professional Writing Evaluation
					</div>
				</div>

				{/* Overall Score */}
				<div className="text-center">
					<div className="text-8xl font-black text-green-600 drop-shadow-lg">
						{result.OVERALL}
					</div>
					<div className="text-2xl font-semibold text-gray-700 mb-2">
						Overall Band Score
					</div>
					<div className="text-lg text-gray-600 bg-gray-100 px-4 py-2 rounded-full inline-block">
						⏱️ Processing time: {result.time ? result.time.toFixed(2) : 'N/A'}s
					</div>
				</div>

				<Divider className="my-8" />

				{/* Individual Scores */}
				<div className="grid grid-cols-2 gap-6">
					<ScoreCard
						title="Task Response"
						score={result.TR}
						colorClass="text-blue-700"
						bgClass="bg-gradient-to-br from-blue-50 to-blue-100"
						borderClass="border-blue-300"
					/>
					<ScoreCard
						title="Coherence & Cohesion"
						score={result.CC}
						colorClass="text-green-700"
						bgClass="bg-gradient-to-br from-green-50 to-green-100"
						borderClass="border-green-300"
					/>
					<ScoreCard
						title="Lexical Resource"
						score={result.LR}
						colorClass="text-purple-700"
						bgClass="bg-gradient-to-br from-purple-50 to-purple-100"
						borderClass="border-purple-300"
					/>
					<ScoreCard
						title="Grammatical Range & Accuracy"
						score={result.GA}
						colorClass="text-orange-700"
						bgClass="bg-gradient-to-br from-orange-50 to-orange-100"
						borderClass="border-orange-300"
					/>
				</div>
			</div>
		);
	}

	// Interactive version with tutorial
	return (
		<div className="space-y-6">
			{/* Overall Score */}
			<div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
				<div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
					{result.OVERALL}
				</div>
				<div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
					Overall Band Score
				</div>
				<div className="text-sm text-gray-600 dark:text-gray-400">
					⏱️ Processing time: {result.time ? result.time.toFixed(2) : 'N/A'}s
				</div>
			</div>

			<Divider />

			{/* Individual Scores with Interactive Elements */}
			<div className="grid grid-cols-2 gap-4">
				{/* Task Response */}
				<div
					id="tutorial-task-response"
					className={`text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 ${result.feedback ? 'cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors' : ''
						}`}
					onClick={() => result.feedback && handleFeedbackClick('Task Response', 'Task Response')}
				>
					<div className="font-semibold text-sm text-blue-700 dark:text-blue-300">Task Response</div>
					<div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{result.TR}</div>
				</div>

				{/* Coherence & Cohesion */}
				<div
					className={`text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 ${result.feedback ? 'cursor-pointer hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors' : ''
						}`}
					onClick={() => result.feedback && handleFeedbackClick('Coherence & Cohesion', 'Coherence & Cohesion')}
				>
					<div className="font-semibold text-sm text-green-700 dark:text-green-300">Coherence & Cohesion</div>
					<div className="text-2xl font-bold text-green-600 dark:text-green-400">{result.CC}</div>
				</div>

				{/* Lexical Resource */}
				<div
					className={`text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 ${result.feedback ? 'cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors' : ''
						}`}
					onClick={() => result.feedback && handleFeedbackClick('Lexical Resource', 'Lexical Resource')}
				>
					<div className="font-semibold text-sm text-purple-700 dark:text-purple-300">Lexical Resource</div>
					<div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{result.LR}</div>
				</div>

				{/* Grammatical Range & Accuracy */}
				<div
					className={`text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800 ${result.feedback ? 'cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors' : ''
						}`}
					onClick={() => result.feedback && handleFeedbackClick('Grammatical Range & Accuracy', 'Grammatical Range & Accuracy')}
				>
					<div className="font-semibold text-sm text-orange-700 dark:text-orange-300">Grammatical Accuracy</div>
					<div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{result.GA}</div>
				</div>
			</div>			{/* Feedback Modal */}
			{selectedFeedback && (
				<FeedbackModal
					isOpen={isFeedbackModalOpen}
					onOpenChange={closeFeedbackModal}
					title={selectedFeedback.title}
					feedback={selectedFeedback.feedback}
				/>
			)}
		</div>
	);
};

// Tutorial tours configuration
const tutorialTours = [
	{
		tour: "ielts-feedback-tour",
		steps: [
			{
				icon: <>🎯</>,
				title: "Click to View Feedback",
				content: <>Click this card to see detailed feedback about your Task Response</>,
				selector: "#tutorial-task-response",
				side: "right" as const,
				showControls: false,
				pointerPadding: 10,
				pointerRadius: 10,
			},
			{
				icon: <>✅</>,
				title: "Strengths Section",
				content: <>Review what you did well in your writing</>,
				selector: "#tutorial-strengths",
				side: "bottom" as const,
				showControls: false,
				pointerPadding: 10,
				pointerRadius: 8,
			},
			{
				icon: <>❌</>,
				title: "Areas for Improvement",
				content: <>Learn what needs improvement</>,
				selector: "#tutorial-improvements",
				side: "bottom" as const,
				showControls: false,
				pointerPadding: 10,
				pointerRadius: 8,
			},
			{
				icon: <>💡</>,
				title: "Suggestions",
				content: <>Get actionable tips to improve your score</>,
				selector: "#tutorial-suggestions",
				side: "top" as const,
				showControls: false,
				pointerPadding: 10,
				pointerRadius: 8,
			}
		]
	}
];

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, forExport = false }) => {
	// Apply pointer-events styles to Onborda elements and add click handler
	useEffect(() => {
		const styleSheet = document.createElement('style');
		styleSheet.textContent = `
			[data-name="onborda-overlay"] {
				pointer-events: none !important;
			}
			[data-name="onborda-pointer"] {
				pointer-events: auto !important;
				cursor: pointer !important;
			}
			[data-name="onborda-card"] {
				pointer-events: auto !important;
			}
			[data-name="onborda-arrow"] {
				color: white !important;
			}
		`;
		document.head.appendChild(styleSheet);

		// Add click handler to forward clicks from pointer to the actual element
		const handlePointerClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const pointer = target.closest('[data-name="onborda-pointer"]');
			const card = target.closest('[data-name="onborda-card"]');

			// If clicking on spotlight (not on tutorial card)
			if (pointer && !card) {
				e.preventDefault();
				e.stopPropagation();

				// Get the element being highlighted
				const taskResponseCard = document.getElementById('tutorial-task-response');
				if (taskResponseCard) {
					// Create and dispatch a new click event
					const clickEvent = new MouseEvent('click', {
						bubbles: true,
						cancelable: true,
						view: window
					});
					taskResponseCard.dispatchEvent(clickEvent);
				}
			}
		};

		document.addEventListener('click', handlePointerClick, true);

		return () => {
			document.head.removeChild(styleSheet);
			document.removeEventListener('click', handlePointerClick, true);
		};
	}, []);

	return (
		<OnbordaProvider>
			<Onborda
				steps={tutorialTours}
				showOnborda={!forExport}
				shadowRgb="100,100,100"
				shadowOpacity="0.8"
				cardComponent={TutorialCard}
			>
				<ResultsDisplayContent result={result} forExport={forExport} />
			</Onborda>
		</OnbordaProvider>
	);
};

export default ResultsDisplay;
