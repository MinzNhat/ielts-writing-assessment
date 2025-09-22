"use client";

import { useState } from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { title, subtitle } from "@/components/primitives";
import FancyFadeIn from "../landing_page/components/FancyFadeIn";
import SingleScoringSection from "./components/SingleScoringSection";
import BatchScoringSection from "./components/BatchScoringSection";
import Footer from "./components/Footer";

const AssessmentPage = () => {
	const [selectedMode, setSelectedMode] = useState<string>("single");

	return (
		<div className="h-fit pb-8 overflow-hidden px-2 sm:px-4 lg:px-6 -mt-[50px] sm:-mt-[59px] md:-mt-[68px]">
			<section className="flex flex-col items-center justify-start gap-4 sm:gap-6 pt-4 sm:pt-6 md:pt-8 max-w-6xl mx-auto">

				{/* Compact Header & Mode Switch */}
				<FancyFadeIn>
					<div className="w-full flex flex-col items-center gap-4">
						<div className="text-center">
							<span className={title({ class: "text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight" })}>
								IELTS Writing&nbsp;
							</span>
							<span className={title({ color: "violet", class: "text-2xl sm:text-3xl md:text-4xl font-bold" })}>
								Assessment
							</span>
						</div>

						<Tabs
							selectedKey={selectedMode}
							onSelectionChange={(key) => setSelectedMode(key as string)}
							className="w-auto"
							aria-label="Assessment mode switch"
							size="lg"
							color="primary"
							variant="bordered"
						>
							<Tab
								key="single"
								title="Single Scoring"
								aria-label="Switch to single essay scoring mode"
							/>
							<Tab
								key="batch"
								title="Batch Scoring"
								aria-label="Switch to batch scoring mode"
							/>
						</Tabs>
					</div>
				</FancyFadeIn>

				{/* Content Section */}
				<div className="w-full">
					{selectedMode === "single" ? (
						<SingleScoringSection />
					) : (
						<BatchScoringSection />
					)}
				</div>

				<Footer />
			</section>
		</div>
	);
};

export default AssessmentPage;
