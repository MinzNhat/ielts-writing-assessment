"use client";

import { useState, useRef } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Spinner } from "@heroui/spinner";
import { Tabs, Tab } from "@heroui/tabs";
import FancyFadeIn from "../../landing_page/components/FancyFadeIn";

const BatchScoringSection = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [isDragOver, setIsDragOver] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [excelUrl, setExcelUrl] = useState<string | null>(null);
	const [selectedTab, setSelectedTab] = useState("basic");
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(false);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(false);

		const files = e.dataTransfer.files;
		if (files.length > 0) {
			const file = files[0];
			validateAndSetFile(file);
		}
	};

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			validateAndSetFile(file);
		}
	};

	const validateAndSetFile = (file: File) => {
		const validTypes = [
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
			'text/csv' // .csv
		];

		const maxSize = 200 * 1024 * 1024; // 200MB

		if (!validTypes.includes(file.type) && !file.name.toLowerCase().endsWith('.xlsx') && !file.name.toLowerCase().endsWith('.csv')) {
			setError("Please upload a valid Excel (.xlsx) or CSV (.csv) file.");
			return;
		}

		if (file.size > maxSize) {
			setError("File size must be less than 200MB.");
			return;
		}

		setSelectedFile(file);
		setError(null);
	};

	const handleUpload = async () => {
		if (!selectedFile) {
			setError("Please select a file to upload.");
			return;
		}

		setIsLoading(true);
		setError(null);
		setExcelUrl(null);

		const formData = new FormData();
		formData.append('file', selectedFile);

		try {
			const feedbackParam = selectedTab === "detailed" ? "1" : "0";
			const apiUrl = `https://api.engonow.com/intern_x/batch_scoring/?feedback=${feedbackParam}`;

			const response = await fetch(apiUrl, {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			setExcelUrl(url);
			onOpen();
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred while processing your file.");
		} finally {
			setIsLoading(false);
		}
	};

	const openFileDialog = () => {
		fileInputRef.current?.click();
	};

	const removeFile = () => {
		setSelectedFile(null);
		setError(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	return (
		<FancyFadeIn>
			<div className="w-full space-y-6">
				{/* Modal download Excel */}
				<Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md" classNames={{
					'closeButton': "mt-2 mr-2"
				}}>
					<ModalContent>
						{(onClose) => (
							<>
								<ModalHeader className="flex flex-col gap-1">
									<h3 className="text-lg font-semibold">Batch Result File</h3>
								</ModalHeader>
								<ModalBody>
									<p className="mb-4">Your batch scoring is complete. Click below to download the result Excel file.</p>
									{excelUrl && (
										<Button className="!p-0 mb-4">
											<a
												href={excelUrl}
												download="batch_result.xlsx"
												className="inline-block w-full h-full bg-primary-600 text-white rounded hover:bg-primary-700 transition pt-2.5"
											>
												Download Excel
											</a>
										</Button>
									)}
								</ModalBody>
							</>
						)}
					</ModalContent>
				</Modal>

				{/* Upload Section */}
				<Card className="w-full">
					<CardHeader className="pb-3 flex justify-between items-center">
						<div className="flex items-center gap-4">
							<h3 className="text-xl font-semibold">📁 Batch Essay Assessment</h3>
						</div>
						<Button
							as="a"
							href="/batch_scoring_sample.xlsx"
							download
							color="secondary"
							variant="flat"
							className="w-fit"
						>
							Download Sample File
						</Button>
					</CardHeader>
					<Divider />
					<CardBody className="space-y-4">
						<div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
							Upload an Excel file with column 1 containing prompts and column 2 containing essays.
						</div>

						{/* File Upload Area */}
						<div
							className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${isDragOver
								? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
								: selectedFile
									? 'border-green-500 bg-green-50 dark:bg-green-900/20'
									: 'border-gray-300 dark:border-gray-600 hover:border-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800'
								}`}
							onDragOver={handleDragOver}
							onDragLeave={handleDragLeave}
							onDrop={handleDrop}
							onClick={openFileDialog}
						>
							<input
								ref={fileInputRef}
								type="file"
								accept=".xlsx,.csv"
								onChange={handleFileSelect}
								className="hidden"
							/>

							{selectedFile ? (
								<div className="space-y-2">
									<div className="text-4xl text-gray-400">📎</div>
									<div className="font-medium text-green-700 dark:text-green-400">
										{selectedFile.name}
									</div>
									<div className="text-sm text-gray-500">
										{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
									</div>
									<Button
										size="sm"
										color="danger"
										variant="flat"
										onClick={(e) => {
											e.stopPropagation();
											removeFile();
										}}
									>
										Remove
									</Button>
								</div>
							) : (
								<div className="space-y-2">
									<div className="text-4xl text-gray-400">📎</div>
									<div className="font-medium">
										Drag and drop file here
									</div>
									<div className="text-sm text-gray-500">
										Limit 200MB per file • XLSX, CSV
									</div>
									<Button color="primary" variant="bordered">
										Choose File
									</Button>
								</div>
							)}
						</div>

						{error && (
							<div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
								{error}
							</div>
						)}

						<div className="flex justify-center pt-2 w-full gap-2">
							<Tabs
								selectedKey={selectedTab}
								onSelectionChange={(key) => setSelectedTab(key as string)}
								size="lg"
								color="primary"
								variant="bordered"
							>
								<Tab key="basic" title="No Feedback" className="text-sm" />
								<Tab key="detailed" title="Feedback" className="text-sm" />
							</Tabs>

							<Button
								color="primary"
								size="lg"
								className="px-8 w-full"
								onClick={handleUpload}
								disabled={isLoading || !selectedFile}
								startContent={isLoading ? <Spinner size="sm" color="white" /> : null}
							>
								{isLoading ? "Processing..." : "Process Batch"}
							</Button>
						</div>
					</CardBody>
				</Card>
			</div>
		</FancyFadeIn>
	);
};

export default BatchScoringSection;
