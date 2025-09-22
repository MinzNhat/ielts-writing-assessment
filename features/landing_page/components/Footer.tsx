
"use client";
import React from 'react';
import Image from 'next/image';
import FancyFadeIn from "./FancyFadeIn";

const Footer = () => {
	return (
		<section className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 pb-10 overflow-hidden px-2 sm:px-4 lg:px-6 text-gray-800 dark:text-white" style={{ height: 'calc(100vh - 100px)', scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
			<FancyFadeIn>
				<div className="relative z-10 w-full">
					<div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full max-w-5xl mx-auto">
						{/* Info */}
						<div className="flex flex-col items-center md:items-start gap-4 md:w-1/2">
							<div className="text-center md:text-left">
								<div className="font-bold text-lg md:text-xl mb-1 text-violet-700 dark:text-violet-400 whitespace-nowrap">IELTS Writing Assessment Website</div>
								<div className="mb-1 text-blue-700 dark:text-blue-200 font-medium">A project for UIT Data Challenge 2025</div>
								<div className="text-gray-600 dark:text-gray-300 text-sm max-w-xs md:max-w-md">Empowering learners to improve their IELTS writing skills with instant feedback and scoring.</div>
							</div>
						</div>
						<div className="flex flex-row items-center gap-6 md:w-1/2 justify-center md:justify-end">
							<div className="w-24 h-24 rounded-full flex items-center justify-center">
								<Image
									src="/engonow.png"
									alt="UIT Logo"
									width={2000}
									height={2000}
									className="object-cover rounded-full"
								/>
							</div>
							<div className="w-24 h-24 rounded-full flex items-center justify-center">
								<Image
									src="/vis.png"
									alt="IELTS Logo"
									width={2000}
									height={2000}
									className="object-cover rounded-full"
								/>
							</div>
						</div>
					</div>
					<div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-6 text-center text-gray-400 dark:text-gray-400 text-xs w-full max-w-5xl mx-auto tracking-wide">
						© 2025 InternX. All rights reserved.
					</div>
				</div>
			</FancyFadeIn>
		</section>
	);
};

export default Footer;
