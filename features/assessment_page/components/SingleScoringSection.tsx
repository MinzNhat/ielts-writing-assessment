"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Spinner } from "@heroui/spinner";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import { Tabs, Tab } from "@heroui/tabs";
import FancyFadeIn from "../../landing_page/components/FancyFadeIn";
import { ScoreResult } from './shared';
import ResultsDisplay from './ResultsDisplay';
import { ShareActions } from './scoring';

const SingleScoringSection = () => {
	const [prompt, setPrompt] = useState("");
	const [essay, setEssay] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [result, setResult] = useState<ScoreResult | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [selectedTab, setSelectedTab] = useState("basic");
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const modalContentRef = useRef<HTMLDivElement>(null);

	const resetForm = () => {
		setPrompt("");
		setEssay("");
		setResult(null);
		setError(null);
		setSelectedTab("basic");
	};

	// Add keyboard shortcut for reset
	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === 'r' || event.key === 'R') {
				if (isOpen) {
					resetForm();
					onOpenChange();
				}
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleKeyPress);
		}

		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, [isOpen, onOpenChange]); const handleSubmit = async () => {
		if (!prompt.trim() || !essay.trim()) {
			setError("Please fill in both the prompt and essay fields.");
			return;
		}

		setIsLoading(true);
		setError(null);
		setResult(null);

		try {
			const enableFeedback = selectedTab === "detailed";
			const response = await fetch("https://api.engonow.com/intern_x/single_scoring/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					prompt: prompt.trim(),
					essay: essay.trim(),
					feedback: enableFeedback,
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			setResult(data);
			onOpen(); // Open modal when result is received
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred while scoring your essay.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<FancyFadeIn>
			<div className="w-full space-y-6">
				{/* Input Section */}
				<Card className="w-full">
					<CardHeader className="pb-3 flex justify-between items-center">
						<h3 className="text-xl font-semibold">📌 IELTS Essay Assessment</h3>
					</CardHeader>
					<Divider />
					<CardBody className="space-y-4">
						<div>
							<label className="block text-sm font-medium mb-2">
								Prompt
							</label>
							<Textarea
								placeholder="Enter the IELTS prompt"
								value={prompt}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrompt(e.target.value)}
								className="w-full"
								minRows={3}
							/>
						</div>

						<div>
							<label className="block text-sm font-medium mb-2">
								Essay
							</label>
							<textarea
								placeholder="Enter your IELTS essay"
								value={essay}
								onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEssay(e.target.value)}
								rows={8}
								className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-[#F4F4F5] dark:bg-[#27272A] focus:outline-none focus:ring-2 focus:ring-primary-500 resize-vertical"
							/>
						</div>

						{error && (
							<div className="p-2 px-3 border border-red-400 text-red-500 rounded-lg">
								{error}
							</div>
						)}

						<div className="flex justify-center gap-2">

							<Tabs
								selectedKey={selectedTab}
								onSelectionChange={(key) => setSelectedTab(key as string)}
								size="lg"
								color="primary"
								variant="bordered"
							>
								<Tab key="basic" title="No Feedback"
									className="text-sm" />
								<Tab key="detailed" title="Feedback"
									className="text-sm" />
							</Tabs>

							<Button
								color="primary"
								size="lg"
								className="px-8 w-full"
								onClick={handleSubmit}
								disabled={isLoading}
								startContent={isLoading ? <Spinner size="sm" color="white" /> : null}
							>
								{isLoading ? "Scoring..." : "Score"}
							</Button>
						</div>
					</CardBody>
				</Card>

				{/* Results Section */}
				<Modal
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					size="2xl"
					scrollBehavior="inside"
					isDismissable={false}
					classNames={{
						'closeButton': "mt-2 mr-2",
						backdrop: "z-[60]",
						wrapper: "z-[60]"
					}}
				>
					<ModalContent>
						{(onClose) => (
							<>
								<ModalHeader className="flex flex-col gap-1">
									<h3 className="text-md font-semibold">IELTS Assessment Results</h3>
								</ModalHeader>
								<ModalBody>
									<div ref={modalContentRef} data-modal-content>
										{result && (
											<ResultsDisplay result={result} forExport={false} />
										)}
									</div>
								</ModalBody>
								<ModalFooter>
									{result && (
										<ShareActions
											result={result}
											modalContentRef={modalContentRef}
											onReset={resetForm}
											onClose={onClose}
										/>
									)}
								</ModalFooter>
							</>
						)}
					</ModalContent>
				</Modal>
			</div>
		</FancyFadeIn>
	);
};

export default SingleScoringSection;
