"use client";

import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { siteConfig } from "@/config/site";
import FancyFadeIn from "./FancyFadeIn";

const CallToActionSection: React.FC = () => {
	return (
		<section className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 pb-10 overflow-hidden px-2 sm:px-4 lg:px-6" style={{ height: 'calc(100vh - 100px)', scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
			<FancyFadeIn>
				<div className="relative z-10 w-full text-center">
					<div className="bg-gradient-to-r from-violet-500 to-blue-500 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col items-center gap-3 sm:gap-4">
						<h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2">Ready to level up your IELTS Writing?</h3>
						<p className="text-white/90 mb-3 sm:mb-4 text-base sm:text-lg">
							Join thousands of learners using AI to achieve their dream band scores.
						</p>
						<Link
							className={buttonStyles({
								color: "primary",
								radius: "full",
								size: "lg",
								class: "bg-white text-violet-700 font-bold shadow-lg hover:scale-105 transition-transform w-full sm:w-auto",
							})}
							href={siteConfig.links.docs}
						>
							Try for Free
						</Link>
					</div>
				</div>
			</FancyFadeIn>
		</section>
	);
};

export default CallToActionSection;
