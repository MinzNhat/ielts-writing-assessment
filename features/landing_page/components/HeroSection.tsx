"use client";

import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import FancyFadeIn from "./FancyFadeIn";
import Image from "next/image";

const HeroSection = () => {
	return (
		<section className="flex items-center justify-center gap-6 sm:gap-8 md:gap-10 py-8 sm:py-12 md:py-20 overflow-hidden px-2 sm:px-4 lg:px-6" style={{ height: 'calc(100vh - 100px)', scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
			<div className="w-2/3 lg:w-full flex flex-col gap-8 sm:gap-12 md:gap-16 lg:gap-20">
				<FancyFadeIn>
					<div className="relative z-10 inline-block w-full text-left px-0">
						<span className={title({ class: "text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight" })}>
							IELTS Writing&nbsp;
						</span>
						<span className={title({ color: "violet", class: "text-3xl sm:text-4xl md:text-5xl font-extrabold" })}>
							AI Assessment
						</span>
						<div className={subtitle({ class: "mt-3 sm:mt-4 text-md sm:text-lg text-gray-800 dark:text-gray-200" })}>
							Instant feedback, band scores, and tips to boost your IELTS Writing.
						</div>
					</div>
				</FancyFadeIn>

				<div className="flex flex-col">
					<FancyFadeIn>
						<div className="relative z-10 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center sm:justify-start">
							<Link
								className={buttonStyles({
									color: "primary",
									radius: "full",
									size: "lg",
									class: "w-full sm:w-auto"
								})}
								href={siteConfig.links.docs}
							>
								Get Started
							</Link>
							<Link
								isExternal
								className={buttonStyles({
									variant: "bordered",
									radius: "full",
									size: "lg",
									class: "w-full sm:w-auto flex items-center gap-2 hover:bg-gray-50 transition-colors",
								})}
								href={siteConfig.links.github}
							>
								<GithubIcon size={22} />
								GitHub
							</Link>
						</div>
					</FancyFadeIn>

					<FancyFadeIn>
						<div className="relative z-10 mt-6 sm:mt-8 w-full flex justify-start">
							<Snippet hideCopyButton hideSymbol variant="bordered" className="bg-white/90 dark:bg-gray-800/90 w-full sm:w-auto text-sm sm:text-sm overflow-visible min-h-fit border-violet-200 dark:border-violet-700">
								<span className="block break-words leading-relaxed whitespace-normal text-gray-700 dark:text-gray-200">
									<span className="font-semibold text-violet-700 dark:text-violet-400">Tip:</span> Paste your essay into <Code color="primary" className="text-sm sm:text-sm inline-block">IELTS Writing Assessment</Code> and get instant, actionable feedback!
								</span>
							</Snippet>
						</div>
					</FancyFadeIn>
				</div>
			</div>

			<FancyFadeIn className="w-2/3 hidden lg:block">
				<Image
					src="/student.webp"
					alt="Student image"
					width={2000}
					height={2000}
					className="inset-0 object-cover hidden lg:block w-full h-full"
					priority
				/>
			</FancyFadeIn>

		</section>
	);
};

export default HeroSection;
