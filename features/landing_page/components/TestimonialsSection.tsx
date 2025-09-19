"use client";

import FancyFadeIn from "./FancyFadeIn";
import { testimonials } from "./data";

interface TestimonialsSectionProps {
	currentTestimonialIndex: number;
	setCurrentTestimonialIndex: (index: number) => void;
	handleTouchStart: (e: React.TouchEvent) => void;
	handleTouchMove: (e: React.TouchEvent) => void;
	handleTouchEnd: (type: 'steps' | 'testimonials') => void;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
	currentTestimonialIndex,
	setCurrentTestimonialIndex,
	handleTouchStart,
	handleTouchMove,
	handleTouchEnd
}) => {
	return (
		<section
			id="rating"
			className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 pb-10 overflow-hidden px-2 sm:px-4 lg:px-6"
			style={{ height: 'calc(100vh - 100px)', scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
		>
			<FancyFadeIn>
				<div className="relative z-10 w-full">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 text-purple-800 dark:text-purple-300">
						What Our Students Say
					</h2>
					{/* Mobile: Single Card Auto-Slider */}
					<div className="block sm:hidden">
						<div
							className="relative w-full overflow-hidden"
							onTouchStart={handleTouchStart}
							onTouchMove={handleTouchMove}
							onTouchEnd={() => handleTouchEnd('testimonials')}
						>
							<div
								className="flex transition-transform duration-500 ease-in-out"
								style={{ transform: `translateX(-${currentTestimonialIndex * 100}%)` }}
							>
								{testimonials.map((testimonial, i) => (
									<div
										key={i}
										className="w-full flex-shrink-0 px-4"
									>
										<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-700/30 p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300 h-auto mx-auto max-w-sm border border-gray-100 dark:border-gray-700">
											<img
												src={testimonial.avatar}
												alt={testimonial.name}
												className="w-16 h-16 rounded-full mb-4 object-cover"
											/>
											<h4 className="font-bold text-lg mb-1 text-purple-700 dark:text-purple-400">{testimonial.name}</h4>
											<p className="text-purple-500 dark:text-purple-400 text-sm mb-3">{testimonial.score}</p>
											<p className="text-gray-700 dark:text-gray-300 text-center italic text-base leading-relaxed">
												"{testimonial.feedback}"
											</p>
										</div>
									</div>
								))}
							</div>
							{/* Dots indicator */}
							<div className="flex justify-center mt-4 space-x-2">
								{testimonials.map((_, i) => (
									<button
										key={i}
										onClick={() => setCurrentTestimonialIndex(i)}
										className={`w-2 h-2 rounded-full transition-colors ${i === currentTestimonialIndex ? 'bg-purple-600 dark:bg-purple-400' : 'bg-gray-300 dark:bg-gray-600'
											}`}
									/>
								))}
							</div>
						</div>
					</div>
					{/* Desktop: Grid Layout */}
					<div className="hidden sm:flex flex-col sm:flex-row md:flex-row justify-center gap-4 sm:gap-6 md:gap-8">
						{testimonials.map((testimonial, i) => (
							<div
								key={i}
								className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-700/30 p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300 max-w-sm border border-gray-100 dark:border-gray-700"
							>
								<img
									src={testimonial.avatar}
									alt={testimonial.name}
									className="w-14 h-14 rounded-full mb-3 object-cover"
								/>
								<h4 className="font-bold text-lg mb-1 text-purple-700 dark:text-purple-400">{testimonial.name}</h4>
								<p className="text-purple-500 dark:text-purple-400 text-sm mb-2">{testimonial.score}</p>
								<p className="text-gray-700 dark:text-gray-300 text-center italic">
									"{testimonial.feedback}"
								</p>
							</div>
						))}
					</div>
				</div>
			</FancyFadeIn>
		</section>
	);
};

export default TestimonialsSection;
