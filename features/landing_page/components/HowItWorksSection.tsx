"use client";

import FancyFadeIn from "./FancyFadeIn";
import { steps } from "./data";

interface HowItWorksSectionProps {
	currentStepIndex: number;
	setCurrentStepIndex: (index: number) => void;
	handleTouchStart: (e: React.TouchEvent) => void;
	handleTouchMove: (e: React.TouchEvent) => void;
	handleTouchEnd: (type: 'steps' | 'testimonials') => void;
}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
	currentStepIndex,
	setCurrentStepIndex,
	handleTouchStart,
	handleTouchMove,
	handleTouchEnd
}) => {
	return (
		<section className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 pb-10 overflow-hidden px-2 sm:px-4 lg:px-6" style={{ height: 'calc(100vh - 100px)', scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
			<FancyFadeIn>
				<div className="relative z-10 w-full">
					<h2
						id="about"
						className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 text-blue-800 dark:text-blue-300">
						How It Works
					</h2>
					{/* Mobile: Single Card Auto-Slider */}
					<div className="block sm:hidden">
						<div
							className="relative w-full overflow-hidden"
							onTouchStart={handleTouchStart}
							onTouchMove={handleTouchMove}
							onTouchEnd={() => handleTouchEnd('steps')}
						>
							<div
								className="flex transition-transform duration-500 ease-in-out"
								style={{ transform: `translateX(-${currentStepIndex * 100}%)` }}
							>
								{steps.map((step, i) => (
									<div
										key={i}
										className="w-full flex-shrink-0 px-4"
									>
										<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-700/30 p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300 h-auto mx-auto max-w-sm border border-gray-100 dark:border-gray-700">
											{<step.icon className="text-4xl mb-4 text-violet-500 dark:text-violet-400" />}
											<h3 className="font-bold text-lg mb-3 text-violet-700 dark:text-violet-400 text-center">{step.title}</h3>
											<p className="text-gray-600 dark:text-gray-300 text-center text-base leading-relaxed">{step.desc}</p>
										</div>
									</div>
								))}
							</div>
							{/* Dots indicator */}
							<div className="flex justify-center mt-4 space-x-2">
								{steps.map((_, i) => (
									<button
										key={i}
										onClick={() => setCurrentStepIndex(i)}
										className={`w-2 h-2 rounded-full transition-colors ${i === currentStepIndex ? 'bg-violet-600 dark:bg-violet-400' : 'bg-gray-300 dark:bg-gray-600'
											}`}
									/>
								))}
							</div>
						</div>
					</div>
					{/* Desktop: Grid Layout */}
					<div className="hidden sm:flex flex-col sm:flex-row md:flex-row justify-center gap-4 sm:gap-6 md:gap-8">
						{steps.map((step, i) => (
							<div
								key={i}
								className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-700/30 p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300 border border-gray-100 dark:border-gray-700"
							>
								{<step.icon className="text-4xl mb-4 text-violet-500 dark:text-violet-400" />}
								<h3 className="font-bold text-lg mb-2 text-violet-700 dark:text-violet-400">{step.title}</h3>
								<p className="text-gray-600 dark:text-gray-300 text-center">{step.desc}</p>
							</div>
						))}
					</div>
				</div>
			</FancyFadeIn>
		</section>
	);
};

export default HowItWorksSection;
