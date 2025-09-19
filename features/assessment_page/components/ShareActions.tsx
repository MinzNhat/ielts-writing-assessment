import React, { useState } from 'react';
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
// @ts-ignore
import domtoimage from "dom-to-image-more";
import { ScoreResult } from './types';
import { Code } from '@heroui/code';

interface ShareActionsProps {
	result: ScoreResult;
	modalContentRef: React.RefObject<HTMLDivElement>;
	onReset: () => void;
	onClose: () => void;
}

const ShareActions: React.FC<ShareActionsProps> = ({
	result,
	modalContentRef,
	onReset,
	onClose
}) => {
	const [isSavingImage, setIsSavingImage] = useState(false);

	// Enhanced save as image functionality with beautiful styling
	const saveAsImage = async () => {
		if (!result) return;

		setIsSavingImage(true);
		try {
			// Create a beautifully styled export container
			const exportContainer = document.createElement('div');
			exportContainer.style.position = 'absolute';
			exportContainer.style.left = '-9999px';
			exportContainer.style.top = '-9999px';
			exportContainer.style.width = '900px';
			exportContainer.style.background = '#ffffff';
			exportContainer.style.fontFamily = '"Inter", "SF Pro Display", system-ui, -apple-system, BlinkMacSystemFont, sans-serif';

			// Create the beautiful export content
			exportContainer.innerHTML = `
                <div style="
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
					padding: 0;
					margin: 0;
					min-height: 700px;
					width: 100%;
					height: 100%;
					position: relative;
					overflow: hidden;
					box-sizing: border-box;
                ">
                    <!-- Background decoration -->
                    <div style="
                        position: absolute;
                        top: -50%;
                        right: -20%;
                        width: 500px;
                        height: 500px;
                        background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
                        border-radius: 50%;
                    "></div>

                    <div style="
                        position: absolute;
                        bottom: -30%;
                        left: -10%;
                        width: 400px;
                        height: 400px;
                        background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
                        border-radius: 50%;
                    "></div>

                    <div style="
                        position: relative;
                        z-index: 1;
                        padding: 50px;
                        color: white;
                    ">
                        <!-- Header -->
                        <div style="text-align: center; margin-bottom: 50px; border:none;">
                            <div style="
                                font-size: 16px;
                                font-weight: 600;
                                text-transform: uppercase;
                                letter-spacing: 2px;
                                opacity: 0.9;
                                margin-bottom: 15px;
                            	border: none;
                            ">IELTS Writing Assessment</div>
                            <div style="
                                font-size: 48px;
                                font-weight: 900;
                                margin-bottom: 20px;
                                text-shadow: 0 4px 20px rgba(0,0,0,0.3);
                            	border: none;
                            ">Results Report</div>
                            <div style="
                                font-size: 18px;
                                opacity: 0.85;
                                font-weight: 400;
                            	border: none;
                            ">Professional AI-Powered Evaluation</div>
                        </div>

                        <!-- Overall Score Card -->
                        <div style="
                            background: rgba(255,255,255,0.95);
                            backdrop-filter: blur(20px);
                            border-radius: 24px;
                            padding: 40px;
                            text-align: center;
                            margin-bottom: 40px;
                            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                            border: 1px solid rgba(255,255,255,0.2);
                        ">
                            <div style="
                                font-size: 24px;
                                font-weight: 700;
                                color: #6366f1;
                                margin-bottom: 15px;
                                text-transform: uppercase;
                                letter-spacing: 1px;
                            ">Overall Band Score</div>
                            <div style="
                                font-size: 120px;
                                font-weight: 900;
                                color: #10b981;
                                line-height: 1;
                                margin-bottom: 15px;
                                text-shadow: 0 4px 20px rgba(16,185,129,0.3);
                            ">${result.OVERALL}</div>
                            <div style="
                                display: inline-flex;
                                align-items: center;
                                background: #f3f4f6;
                                padding: 12px 24px;
                                border-radius: 50px;
                                font-size: 16px;
                                color: #6b7280;
                                font-weight: 600;
                            ">
                                ⏱️ Processed in ${result.time.toFixed(2)}s
                            </div>
                        </div>

                        <!-- Individual Scores Grid -->
                        <div style="
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 30px;
                            margin-bottom: 40px;
                            border: none;
                        ">
                            <div style="
                                background: rgba(255,255,255,0.9);
                                backdrop-filter: blur(20px);
                                border-radius: 20px;
                                padding: 30px;
                                text-align: center;
                                box-shadow: 0 15px 30px rgba(0,0,0,0.1);
                                border: 1px solid rgba(255,255,255,0.3);
                                transition: transform 0.3s ease;
                            ">
                                <div style="
                                    font-size: 14px;
                                    font-weight: 700;
                                    color: #3b82f6;
                                    margin-bottom: 12px;
                                    text-transform: uppercase;
                                    letter-spacing: 1px;
                                ">Task Response</div>
                                <div style="
                                    font-size: 48px;
                                    font-weight: 900;
                                    color: #1e40af;
                                    text-shadow: 0 2px 10px rgba(30,64,175,0.2);
                                ">${result.TR}</div>
                            </div>

                            <div style="
                                background: rgba(255,255,255,0.9);
                                backdrop-filter: blur(20px);
                                border-radius: 20px;
                                padding: 30px;
                                text-align: center;
                                box-shadow: 0 15px 30px rgba(0,0,0,0.1);
                                border: 1px solid rgba(255,255,255,0.3);
                            ">
                                <div style="
                                    font-size: 14px;
                                    font-weight: 700;
                                    color: #10b981;
                                    margin-bottom: 12px;
                                    text-transform: uppercase;
                                    letter-spacing: 1px;
                                ">Coherence & Cohesion</div>
                                <div style="
                                    font-size: 48px;
                                    font-weight: 900;
                                    color: #047857;
                                    text-shadow: 0 2px 10px rgba(4,120,87,0.2);
                                ">${result.CC}</div>
                            </div>

                            <div style="
                                background: rgba(255,255,255,0.9);
                                backdrop-filter: blur(20px);
                                border-radius: 20px;
                                padding: 30px;
                                text-align: center;
                                box-shadow: 0 15px 30px rgba(0,0,0,0.1);
                                border: 1px solid rgba(255,255,255,0.3);
                            ">
                                <div style="
                                    font-size: 14px;
                                    font-weight: 700;
                                    color: #8b5cf6;
                                    margin-bottom: 12px;
                                    text-transform: uppercase;
                                    letter-spacing: 1px;
                                ">Lexical Resource</div>
                                <div style="
                                    font-size: 48px;
                                    font-weight: 900;
                                    color: #7c3aed;
                                    text-shadow: 0 2px 10px rgba(124,58,237,0.2);
                                ">${result.LR}</div>
                            </div>

                            <div style="
                                background: rgba(255,255,255,0.9);
                                backdrop-filter: blur(20px);
                                border-radius: 20px;
                                padding: 30px;
                                text-align: center;
                                box-shadow: 0 15px 30px rgba(0,0,0,0.1);
                                border: 1px solid rgba(255,255,255,0.3);
                            ">
                                <div style="
                                    font-size: 14px;
                                    font-weight: 700;
                                    color: #f59e0b;
                                    margin-bottom: 12px;
                                    text-transform: uppercase;
                                    letter-spacing: 1px;
                                ">Grammatical Accuracy</div>
                                <div style="
                                    font-size: 48px;
                                    font-weight: 900;
                                    color: #d97706;
                                    text-shadow: 0 2px 10px rgba(217,119,6,0.2);
                                ">${result.GA}</div>
                            </div>
                        </div>

                        <!-- Footer -->
                        <div style="
                            text-align: center;
                            background: rgba(255,255,255,0.1);
                            backdrop-filter: blur(20px);
                            border-radius: 16px;
                            padding: 25px;
                            border: 1px solid rgba(255,255,255,0.2);
                        ">
                            <div style="
                                font-size: 18px;
                                font-weight: 600;
                                margin-bottom: 8px;
                                opacity: 0.95;
                            ">📚 IELTS Assessment Tool</div>
                            <div style="
                                font-size: 14px;
                                opacity: 0.8;
                                font-weight: 400;
                            ">${new Date().toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})} • AI-Powered Analysis</div>
                        </div>
                    </div>
                </div>
            `;

			document.body.appendChild(exportContainer);

			// Wait for styles to render
			await new Promise(resolve => setTimeout(resolve, 200));

			// Capture with high quality
			const dataUrl = await domtoimage.toPng(exportContainer, {
				quality: 2.0,
				bgcolor: '#ffffff',
				width: 540,
				height: 700,
				style: {
					transform: 'scale(0.595)',
					transformOrigin: 'top left'
				}
			});

			// Clean up
			document.body.removeChild(exportContainer);

			// Download the image
			const response = await fetch(dataUrl);
			const blob = await response.blob();

			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = `IELTS-Results-${result.OVERALL}-${new Date().toISOString().split('T')[0]}.png`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);

			alert('Beautiful image saved successfully!');

		} catch (error) {
			console.error('Error saving image:', error);

			// Fallback: Try capturing modal directly
			try {
				if (!modalContentRef.current) return;

				const dataUrl = await domtoimage.toPng(modalContentRef.current, {
					bgcolor: '#ffffff',
					quality: 0.9,
					width: modalContentRef.current.scrollWidth,
					height: modalContentRef.current.scrollHeight,
				});

				const response = await fetch(dataUrl);
				const blob = await response.blob();

				const url = URL.createObjectURL(blob);
				const link = document.createElement('a');
				link.href = url;
				link.download = `IELTS-Assessment-${result.OVERALL}-standard.png`;
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				URL.revokeObjectURL(url);

				alert('Image saved successfully! (fallback mode)');

			} catch (fallbackError) {
				console.error('Fallback save failed:', fallbackError);
				alert('❌ Failed to save image. Please try taking a screenshot manually (Ctrl+Shift+S or Cmd+Shift+4).');
			}
		} finally {
			setIsSavingImage(false);
		}
	};

	return (
		<div className="flex gap-2 w-full modal-footer">
			<div className="flex gap-3">
				<Button
					color="default"
					variant="flat"
					onClick={() => {
						onReset();
						onClose();
					}}
					className="font-medium"
				>
					Reset <Code className='bg-white dark:bg-gray-600/30'>R</Code>
				</Button>
			</div>
			<div className="flex gap-3  flex-grow">
				<Button
					color="primary"
					variant="flat"
					onClick={saveAsImage}
					disabled={isSavingImage}
					startContent={isSavingImage ? <Spinner size="sm" /> : null}
					className="font-medium flex-grow"
				>
					{isSavingImage ? "Saving..." : "Save Image"}
				</Button>
			</div>
		</div>
	);
};

export default ShareActions;
