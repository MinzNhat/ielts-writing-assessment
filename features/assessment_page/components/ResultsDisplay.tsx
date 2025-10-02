"use client";

import React, { useState, useEffect } from 'react';
import { Divider } from "@heroui/divider";
import { Onborda, OnbordaProvider, Step, useOnborda } from "onborda";

// Internal imports
import { ScoreResult } from './shared';
import { ScoreCard } from './scoring';
import { FeedbackModal } from './feedback';

interface ResultsDisplayProps {
	result: ScoreResult;
	forExport?: boolean;
}

const ResultsDisplayContent: React.FC<ResultsDisplayProps> = ({ result, forExport = false }) => {
	// State management
	const [selectedFeedback, setSelectedFeedback] = useState<{ title: string; feedback: any } | null>(null);
	const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
	const { startOnborda } = useOnborda();

	// Feedback handlers
	const handleFeedbackClick = (title: string, criterion: string) => {
		if (!result.feedback) return;

		const feedbackData = result.feedback[criterion as keyof typeof result.feedback];
		if (feedbackData) {
			setSelectedFeedback({ title, feedback: feedbackData });
			setIsFeedbackModalOpen(true);
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
			if (!hasSeenTutorial) {
				setTimeout(() => startOnborda("ielts-feedback-tour"), 500);
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

export default ResultsDisplay;
